<template>
    <div class="mdl-card__title">
        <i class="material-icons">person</i>
        <h2 class="mdl-card__title-text">About Me</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <p class="about-me-intro">
          I'm a Senior Software Engineer specializing in Ruby and Rust, with 15+ years building production systems at scale while pioneering AI-augmented development practices.
      </p>

      <div class="about-me-details">
          <p>
              I currently wear many hats. I set engineering standards that get adopted company-wide,
              build internal tools, and help teams work more effectively. My current title is
              Engineering Lead, but I spend most of my time on technical architecture and system
              design rather than people management.
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
              I've given technical talks to 130+ engineers on AI-augmented development,
              built onboarding tools used across multiple departments, and created
              engineering standards that teams actually follow.
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
