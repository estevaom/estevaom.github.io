<template>
  <div class="mdl-card__title">
    <i class="material-icons">engineering</i>
    <h2 class="mdl-card__title-text">Professional Summary</h2>
  </div>
  <div class="mdl-card__supporting-text">
    <div class="professional-summary">
      <p class="summary-headline">
        <strong>Engineering Lead with 15+ years</strong> building and modernizing Ruby on Rails applications at scale.
      </p>

      <div class="summary-highlights">
        <p>
          Currently leading the <strong>highest-performing team at Readytech</strong> (2x company average productivity)
          while driving company-wide AI adoption.
        </p>

        <p class="key-achievement">
          Recently automated a Rails 5.0 to 5.1 upgrade fixing <strong>23,000 broken tests in 19 days</strong>
          using AI orchestration - a <strong>35x productivity multiplier</strong>.
        </p>

        <p>
          Combines deep Rails expertise with pioneering AI-augmented development practices to deliver
          exceptional results in legacy modernization and feature delivery.
        </p>
      </div>

      <div class="summary-stats">
        <div class="stat-item">
          <span class="stat-number">15+</span>
          <span class="stat-label">Years Rails Experience</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">35x</span>
          <span class="stat-label">AI Productivity Gain</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">90%+</span>
          <span class="stat-label">Test Coverage Standard</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">10+</span>
          <span class="stat-label">Years Remote Work</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  summaryData: Object,
});
</script>

<style scoped>
.professional-summary {
  line-height: 1.6;
}

.summary-headline {
  font-size: 1.1em;
  margin-bottom: 1em;
  color: #333;
}

.summary-highlights p {
  margin-bottom: 0.8em;
}

.key-achievement {
  padding: 12px;
  background: rgba(33, 150, 243, 0.05);
  border-left: 3px solid #2196f3;
  border-radius: 2px;
}

.summary-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.stat-item {
  flex: 1;
  min-width: 120px;
  text-align: center;
  padding: 10px;
}

.stat-number {
  display: block;
  font-size: 2em;
  font-weight: bold;
  color: #2196f3;
  margin-bottom: 5px;
}

.stat-label {
  display: block;
  font-size: 0.85em;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .summary-stats {
    justify-content: space-around;
  }

  .stat-item {
    min-width: 45%;
  }
}
</style>