const PostsContainer = {
    template: `
        <main class="posts-list">
            <blog-post v-for="post in posts" 
                      :key="post.title" 
                      :post="post">
            </blog-post>
        </main>
    `,
    data() {
        return {
            posts: []
        }
    },
    async created() {
        try {
            const response = await fetch('data/posts.json');
            this.posts = await response.json();
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    }
};
