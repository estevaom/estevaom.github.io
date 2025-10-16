<template>
    <div class="mdl-card inner-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <i class="material-icons">star</i>
            <h3 class="mdl-card__title-text">{{ name }}</h3>
            <a :href="url" target="_blank" rel="noopener noreferrer" class="project-year mdl-chip">
                <span class="mdl-chip__text">Github</span>
            </a>
        </div>
        <div class="mdl-card__supporting-text mdl-cell--12-col">
            <ul v-if="highlights && highlights.length">
                <li class="project-description">{{ description }}</li>
                <li v-for="(highlight, index) in highlights" :key="index">
                    {{ highlight }}
                </li>
            </ul>
        </div>
        <div class="footer" v-if="technologiesData && technologiesData.length">
            <TechItem
                v-for="tech in technologiesData"
                :key="tech.handler"
                :handler="tech.handler"
                :name="tech.name"
                :url="tech.url"
            />
        </div>
    </div>
</template>

<script setup>
import TechItem from './TechItem.vue';

defineProps({
    name: String,
    description: String,
    url: String,
    highlights: Array,
    technologiesData: Array,
    year: String
});
</script>

<style scoped>
.inner-card {
    width: 100%;
}

.mdl-card__title {
    position: relative;
}

.project-year {
    position: absolute;
    right: 24px;
    top: 30%;
    transform: translateY(-50%);
    text-decoration: none;
    color: inherit;
}

.project-year:hover {
    opacity: 0.8;
}

.mdl-card__supporting-text {
    width: 100%;
    box-sizing: border-box;
}

.project-description {
    font-weight: 600;
    margin-bottom: 12px;
}

@media (max-width: 768px) {
    .mdl-card__title {
        flex-wrap: wrap;
    }

    .project-year {
        position: relative;
        right: auto;
        top: auto;
        transform: none;
        margin-top: 8px;
    }
}

@media (min-width: 1400px) {
    .inner-card {
        width: calc(50% - 12px);
    }
}
</style>