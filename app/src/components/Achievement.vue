<template>
    <div class="mdl-card inner-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <i class="material-icons">star</i>
            <h3 class="mdl-card__title-text">{{ title }}</h3>
        </div>
        <div class="mdl-card__supporting-text mdl-cell--12-col">
            <ul v-if="details && details.length">
                <li class="achievement-description">{{ description }}</li>
                <li v-for="(detail, index) in details" :key="index">
                    {{ detail }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    description: String,
    details: Array,
    impact: String,
    year: String
});

const formatImpact = (impact) => {
    const impactLabels = {
        'critical': 'Critical Impact',
        'high': 'High Impact',
        'transformative': 'Transformative',
        'foundational': 'Foundational'
    };
    return impactLabels[impact] || impact;
};
</script>

<style scoped>
.achievement-description {
    font-weight: 600;
    margin-bottom: 12px;
}
</style>