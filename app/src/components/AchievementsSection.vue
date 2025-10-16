<template>
  <div class="mdl-card__title">
    <i class="material-icons">emoji_events</i>
    <h2 class="mdl-card__title-text">Key Achievements</h2>
  </div>
  <div class="mdl-card__supporting-text mdl-cell--12-col">
    <Achievement
      v-for="achievement in achievements"
      :key="achievement.title"
      :title="achievement.title"
      :description="achievement.description"
      :details="achievement.details"
      :impact="achievement.impact"
      :year="achievement.year"
      class="mdl-cell mdl-cell--12-col"
    />
  </div>
</template>

<script setup>
import Achievement from './Achievement.vue';

defineProps({
  achievements: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
</style>