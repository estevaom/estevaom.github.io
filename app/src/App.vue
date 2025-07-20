<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <SiteHeader />
        <main class="mdl-layout__content">
            <Resume />
            <a href="#top">
                <button
                    class="up-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                >
                    <i class="material-icons">keyboard_arrow_up</i>
                </button>
            </a>
        </main>
    </div>
</template>

<script setup>
import { onMounted, nextTick } from "vue";
import SiteHeader from "./components/SiteHeader.vue";
import Resume from "./components/Resume.vue";

onMounted(async () => {
    await nextTick();
    if (window.componentHandler) {
        window.componentHandler.upgradeAllRegistered();
    }
});
</script>

<style>
.mdl-layout__header-row {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
}

main.mdl-layout__content {
    display: block;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    padding: 0;
}

@media (min-width: 1400px) {
    .employment-card {
        width: calc(50% - 12px);
    }
}
</style>
