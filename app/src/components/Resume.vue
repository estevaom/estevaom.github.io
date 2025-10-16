<template>
    <span id="top"></span>
    <p v-if="loading">Loading...</p>
    <div v-else-if="error">Error loading data: {{ error }}</div>
    <div v-else class="mdl-grid">
        <div
            class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp"
            id="about-me"
        >
            <AboutMe :profileData="apiData.profileData" />
        </div>

        <div
            class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp"
            id="achievements"
            v-if="apiData.achievements && apiData.achievements.length"
        >
            <AchievementsSection :achievements="apiData.achievements" />
        </div>

        <div
            class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp"
            id="employment"
        >
            <div class="mdl-card__title">
                <i class="material-icons">work</i>
                <h2 class="mdl-card__title-text">Employment</h2>
            </div>
            <div class="mdl-card__supporting-text mdl-cell--12-col">
                <Employment
                    v-for="job in apiData.employmentWithTechnologies"
                    :key="job.name"
                    :name="job.name"
                    :title="job.title"
                    :dates="job.dates"
                    :location="job.location"
                    :remote="job.remote"
                    :url="job.url"
                    :description="job.description"
                    :technologies="job.technologies"
                    class="mdl-cell mdl-cell--12-col"
                />
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a
                    v-for="job in apiData.employmentWithTechnologies"
                    :key="job.name + '-link'"
                    :href="job.url"
                    target="_blank"
                    class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                >
                    {{ job.name }}
                </a>
            </div>
        </div>

        <div
            class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp"
            id="projects"
            v-if="apiData.projects && apiData.projects.length"
        >
            <ProjectsSection :projects="apiData.projects" :technologies="apiData.allTechnologies" />
        </div>

        <div
            class="mdl-cell mdl-cell--6-col mdl-card mdl-shadow--4dp"
            id="technologies"
        >
            <div class="mdl-card__title">
                <i class="material-icons">laptop_mac</i>
                <h2 class="mdl-card__title-text">Technologies</h2>
            </div>
            <div class="mdl-card__supporting-text mdl-cell--12-col items-list">
                <Technologies
                    :technologiesByCategory="apiData.technologiesByCategory"
                />
            </div>
        </div>

        <div class="mdl-cell mdl-cell--6-col" id="grid">
            <div
                class="mdl-card mdl-shadow--4dp mdl-cell--12-col"
                id="objectives"
            >
                <div class="mdl-card__title">
                    <i class="material-icons">done</i>
                    <h2 class="mdl-card__title-text">Objectives</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    <p>
                        Developing and maintaining web apps using Ruby on Rails
                        and other technologies.<br />
                        Being challenged to find solutions to hard problems.<br />
                        Working with other talented and skilled people.
                    </p>
                </div>
            </div>

            <div
                class="mdl-card mdl-shadow--4dp mdl-cell--12-col"
                id="education"
            >
                <Education />
            </div>

            <div class="mdl-card mdl-shadow--4dp mdl-cell--12-col" id="contact">
                <Contact />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import Employment from "./Employment.vue";
import Technologies from "./Technologies.vue";
import AboutMe from "./AboutMe.vue";
import Education from "./Education.vue";
import Contact from "./Contact.vue";
import ProjectsSection from "./ProjectsSection.vue";
import AchievementsSection from "./AchievementsSection.vue";

const apiData = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const response = await fetch("/dist/api/responses.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        apiData.value = await response.json();
    } catch (err) {
        console.error("Failed to load API data:", err);
        error.value = err.message;
    } finally {
        loading.value = false;
        await nextTick();
        if (window.componentHandler) {
            window.componentHandler.upgradeAllRegistered();
        }
    }
});
</script>

<style scoped></style>
