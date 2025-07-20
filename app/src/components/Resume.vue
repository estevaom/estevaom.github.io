<template>
    <div class="resume-container">
        <p v-if="loading">Loading...</p>
        <div v-else>
            <h1>Resume Content</h1>
            <p>
                Total Technologies:
                {{ apiData?.profileData?.totalTechnologies }}
            </p>
            <p>Total Employment: {{ apiData?.profileData?.totalEmployment }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const apiData = ref(null);
const loading = ref(true);

onMounted(async () => {
    try {
        const response = await fetch("/dist/api/responses.json");
        apiData.value = await response.json();
    } catch (error) {
        console.error("Failed to load API data:", error);
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.resume-container {
    padding: 20px;
}
</style>
