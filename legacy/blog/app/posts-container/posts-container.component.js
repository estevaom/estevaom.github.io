const PostsContainer = {
    template: '', // Will be set by app.js
    data() {
        return {
            posts: []
        }
    },
    async created() {
        try {
            const response = await fetch('data/posts.json');
            this.posts = [...await response.json()];
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    }
};
