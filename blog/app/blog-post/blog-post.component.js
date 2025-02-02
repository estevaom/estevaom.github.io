const BlogPost = {
    template: '', // Will be set by app.js
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showLightbox: false,
            currentImageIndex: 0,
            starsCache: null
        }
    },
    computed: {
        currentImage() {
            return this.post.images[this.currentImageIndex];
        },
        stars() {
            if (!this.starsCache) {
                const maxStars = this.post.rating > 5 ? 6 : 5;
                const rating = Math.min(this.post.rating, maxStars);
                const stars = '★'.repeat(rating) + '☆'.repeat(maxStars - rating);
                this.starsCache = stars.split('').map(star => ({ text: star }));
            }
            return this.starsCache;
        }
    },
    methods: {
        openLightbox() {
            this.showLightbox = true;
            document.addEventListener('keydown', this.handleKeyDown);
        },
        closeLightbox() {
            this.showLightbox = false;
            document.removeEventListener('keydown', this.handleKeyDown);
        },
        handleLightboxClick(event) {
            if (event.target.tagName.toLowerCase() === 'img' ||
                event.target.tagName.toLowerCase() === 'button') {
                return;
            }
            this.closeLightbox();
        },
        nextImage() {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.post.images.length;
        },
        prevImage() {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.post.images.length) % this.post.images.length;
        },
        setImage(index) {
            this.currentImageIndex = index;
        },
        handleKeyDown(event) {
            if (!this.showLightbox) return;

            switch (event.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    if (this.post.images.length > 1) {
                        this.prevImage();
                    }
                    break;
                case 'ArrowRight':
                    if (this.post.images.length > 1) {
                        this.nextImage();
                    }
                    break;
            }
        }
    },
    unmounted() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }
};
