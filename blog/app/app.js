const app = Vue.createApp({});

// Register components
app.component('blog-header', BlogHeader);
app.component('blog-post', BlogPost);
app.component('posts-container', PostsContainer);

// Mount the app
app.mount('#app');
