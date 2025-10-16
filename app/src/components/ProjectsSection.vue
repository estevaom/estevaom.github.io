<template>
  <div class="mdl-card__title">
    <i class="material-icons">code</i>
    <h2 class="mdl-card__title-text">Open Source Projects</h2>
  </div>
  <div class="mdl-card__supporting-text mdl-cell--12-col">
    <Project
      v-for="project in projectsWithTechnologies"
      :key="project.name"
      :name="project.name"
      :description="project.description"
      :url="project.url"
      :highlights="project.highlights"
      :technologiesData="project.technologiesData"
      :year="project.year"
      class="mdl-cell mdl-cell--12-col"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Project from './Project.vue';

const props = defineProps({
  projects: {
    type: Array,
    default: () => []
  },
  technologies: {
    type: Array,
    default: () => []
  }
});

// Map project technologies to full technology objects
const projectsWithTechnologies = computed(() => {
  return props.projects.map(project => ({
    ...project,
    technologiesData: project.technologies
      .map(handler => props.technologies.find(t => t.handler === handler))
      .filter(Boolean)
  }));
});
</script>

<style scoped>
</style>