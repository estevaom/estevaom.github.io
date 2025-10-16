<template>
    <div class="mdl-card inner-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <i class="material-icons">star</i>
            <h3 class="mdl-card__title-text">{{ formattedTitle }}</h3>
            <span v-if="dates" class="employment-dates mdl-chip">
                <span class="mdl-chip__text">{{ dates }}</span>
            </span>
        </div>
        <div
            class="mdl-card__supporting-text mdl-cell--12-col"
            v-if="description && description.length"
        >
            <ul>
                <li v-for="(desc, index) in description" :key="index">
                    {{ desc }}
                </li>
            </ul>
        </div>
        <div class="footer" v-if="technologies && technologies.length">
            <TechItem
                v-for="tech in technologies"
                :key="tech.handler"
                :handler="tech.handler"
                :name="tech.name"
                :url="tech.url"
            />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import TechItem from "./TechItem.vue";

const props = defineProps({
    name: String,
    title: String,
    dates: String,
    location: String,
    remote: Boolean,
    url: String,
    description: Array,
    technologies: Array,
});

const formattedTitle = computed(() => {
    let result = props.title;
    if (props.name) {
        result += ` @ ${props.name}`;
    }
    if (props.location) {
        result += ` ~ ${props.location}`;
        if (props.remote) {
            result += " (remote)";
        }
    }
    return result;
});
</script>

<style scoped>
.mdl-card__title {
    position: relative;
}

.employment-dates {
    position: absolute;
    right: 24px;
    top: 30%;
    transform: translateY(-50%);
}

@media (max-width: 768px) {
    .mdl-card__title {
        flex-wrap: wrap;
    }

    .employment-dates {
        position: relative;
        right: auto;
        top: auto;
        transform: none;
        margin-top: 8px;
    }
}
</style>
