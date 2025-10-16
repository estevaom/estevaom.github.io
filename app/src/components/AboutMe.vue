<template>
    <div class="mdl-card__title">
        <i class="material-icons">person</i>
        <h2 class="mdl-card__title-text">About Me</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <p class="about-me-intro">
          I'm a Staff Engineer specializing in Ruby and Rust, with 15+ years building production systems at scale while pioneering AI-augmented development practices.
      </p>

      <div class="about-me-details">
          <p>
              I operate at the intersection of deep technical expertise and cross-team influence,
              setting engineering standards adopted company-wide, building institutional tooling,
              and driving technical excellence. While I currently hold an Engineering Lead title
              due to organizational structure, my primary focus is technical architecture,
              system design, and creating tools that multiply team effectiveness.
          </p>

          <p>Throughout my career, I have designed, built and tested many projects including:</p>
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
              I'm deeply committed to engineering excellence through comprehensive testing (90%+ coverage),
              continuous integration/deployment, and performance measurement using tools like
              Datadog, New Relic, and Scout APM. I've replaced Python MCPs with Rust CLI tools
              achieving 24x performance improvements while reducing context overhead by 30%.
          </p>

          <p>
              I've delivered technical presentations to 130+ engineers on AI-augmented development,
              created institutional onboarding systems adopted across departments, and built
              cross-team engineering standards that define quality expectations company-wide.
          </p>

          <p>
              When I'm not architecting systems, I can usually be found diving deeper into Rust,
              building open-source developer tools, practicing piano, or playing old arcade games :)
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
