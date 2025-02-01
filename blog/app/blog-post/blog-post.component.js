const BlogPost = {
    template: `
        <article class="bg-[#2b213a] rounded-xl p-10 neon-border">
            <h2 class="text-4xl font-bold mb-8 text-[#ff7edb]">{{ post.title }}</h2>
            <div class="mb-10">
                <img :src="post.images[0]" :alt="post.title" class="w-full rounded-lg border border-[#34294f] post-image" @click="openLightbox">
            </div>
            
            <div class="lightbox" :class="{'active': showLightbox}" @click="handleLightboxClick">
                <div class="relative inline-block">
                    <div class="image-container">
                        <img :src="currentImage" :alt="post.title" class="lightbox-image">
                    </div>
                    
                    <button v-if="post.images.length > 1" @click.stop="prevImage" class="nav-button prev-button">
                        ←
                    </button>
                    <button v-if="post.images.length > 1" @click.stop="nextImage" class="nav-button next-button">
                        →
                    </button>

                    <div v-if="post.images.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <button v-for="(image, index) in post.images" 
                                :key="index"
                                @click.stop="setImage(index)"
                                class="w-3 h-3 rounded-full transition-colors"
                                :class="{'bg-[#ff7edb]': currentImageIndex === index, 'bg-[#34294f]': currentImageIndex !== index}">
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="space-y-10">
                <section>
                    <h3 class="text-2xl font-semibold mb-4 text-[#2ee2fa]">User Interface</h3>
                    <p class="leading-relaxed text-lg">{{ post.descriptions.userInterface }}</p>
                </section>

                <section>
                    <h3 class="text-2xl font-semibold mb-4 text-[#2ee2fa]">Autocomplete</h3>
                    <p class="leading-relaxed text-lg">{{ post.descriptions.autocomplete }}</p>
                </section>

                <section>
                    <h3 class="text-2xl font-semibold mb-4 text-[#2ee2fa]">Integration with Sonnet</h3>
                    <p class="leading-relaxed text-lg">{{ post.descriptions.integrationWithSonnet }}</p>
                </section>

                <section>
                    <h3 class="text-2xl font-semibold mb-4 text-[#2ee2fa]">Integration with Other Models</h3>
                    <p class="leading-relaxed text-lg">{{ post.descriptions.integrationWithOtherModels }}</p>
                </section>

                <section>
                    <h3 class="text-2xl font-semibold mb-4 text-[#2ee2fa]">Unique Features</h3>
                    <p class="leading-relaxed text-lg">{{ post.descriptions.uniqueFeatures }}</p>
                </section>

                <section>
                    <h3 class="text-2xl font-semibold mb-4 text-[#2ee2fa]">Price</h3>
                    <p class="leading-relaxed text-lg">{{ post.descriptions.price }}</p>
                </section>
            </div>

            <footer class="mt-10 pt-6 border-t border-[#34294f]">
                <div class="rating text-3xl">
                    <span v-for="star in stars" :key="star.text" class="star">{{ star.text }}</span>
                </div>
            </footer>
        </article>
    `,
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
