<template>
    <div class="mdl-card employment-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <i class="material-icons">star</i>
            <h3 class="mdl-card__title-text">{{ title }}</h3>
        </div>
        <div
            class="mdl-card__supporting-text mdl-cell--12-col"
            v-if="description && description.length"
        >
            <ul>
                <li v-for="(desc, index) in description" :key="index">
                    {{ desc }}
                </li>
            </ul>
        </div>
        <div class="footer" v-if="technologies && technologies.length">
            <TechItem
                v-for="tech in technologies"
                :key="tech.handler"
                :handler="tech.handler"
                :name="tech.name"
                :url="tech.url"
            />
        </div>
    </div>
</template>

<script setup>
import TechItem from "./TechItem.vue";

defineProps({
    name: String,
    title: String,
    location: String,
    remote: Boolean,
    url: String,
    description: Array,
    technologies: Array,
});
</script>

<style scoped></style>
