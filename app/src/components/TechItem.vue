<template>
    <a v-if="url" :href="url" target="_blank">
        <span class="mdl-chip">
            <span class="mdl-chip__text">{{ name }}</span>
        </span>
    </a>
    <span v-else class="mdl-chip">
        <span class="mdl-chip__text">{{ name }}</span>
    </span>
</template>

<script setup>
defineProps({
    handler: String,
    name: String,
    url: String,
});
</script>

<style scoped>
.mdl-chip {
    margin-right: 4px;
    margin-bottom: 4px;
}
</style>
