<template>
    <div class="mdl-card__title">
        <i class="material-icons">person</i>
        <h2 class="mdl-card__title-text">About Me</h2>
    </div>
    <div class="mdl-card__supporting-text">
        <p class="about-me-intro">
            I'm a full stack web developer who likes to write clean and
            organized code.
        </p>

        <div class="about-me-details">
            <p>
                I read a lot of "Best Practices", "Patterns" and "Refactoring"
                articles and books.
            </p>

            <p>I have designed, built and tested many projects including:</p>
            <ul class="about-me-projects-list">
                <li>High-traffic e-commerce sites</li>
                <li>Real-time auction platforms</li>
                <li>Advertisement platforms</li>
                <li>E-learning systems</li>
                <li>Dating applications</li>
                <li>Social networks</li>
                <li>News crawlers</li>
                <li>Marketplaces</li>
                <li>Dashboards and admin interfaces</li>
            </ul>

            <p>
                I care about unit and integration testing, continuous
                integration, continuous deployment and performance measurement.
            </p>

            <p>
                When I'm not working, I can usually be found practicing the
                piano or playing old arcade games :)
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    profileData: Object,
});
</script>

<style scoped></style>
