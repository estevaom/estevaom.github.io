async function loadTemplate(url) {
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (error) {
        console.error('Error loading template:', error);
        return '';
    }
}

async function initApp() {
    const [headerTemplate, postTemplate, containerTemplate] = await Promise.all([
        loadTemplate('app/blog-header/blog-header.template.html'),
        loadTemplate('app/blog-post/blog-post.template.html'),
        loadTemplate('app/posts-container/posts-container.template.html')
    ]);

    BlogHeader.template = headerTemplate;
    BlogPost.template = postTemplate;
    PostsContainer.template = containerTemplate;

    const app = Vue.createApp({});
    app.component('blog-header', BlogHeader);
    app.component('blog-post', BlogPost);
    app.component('posts-container', PostsContainer);
    app.mount('#app');
}

initApp().catch(console.error);
