<template>
    <div
        class="skills"
        v-for="category in technologiesByCategory"
        :key="category.type"
    >
        <div>{{ category.type }}:</div>
        <span v-for="tech in category.technologies" :key="tech.handler">
            <TechItem
                :handler="tech.handler"
                :name="tech.name"
                :url="tech.url"
            />
        </span>
    </div>
</template>

<script setup>
import TechItem from "./TechItem.vue";

defineProps({
    technologiesByCategory: Array,
});
</script>

<style scoped></style>
