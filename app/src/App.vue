<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <SiteHeader />
        <main class="mdl-layout__content">
            <Resume />
            <button
                :class="[
                    'up-button',
                    'mdl-button',
                    'mdl-js-button',
                    'mdl-button--fab',
                    'mdl-js-ripple-effect',
                    'mdl-button--colored',
                    { visible: showScrollButton },
                ]"
                @click="scrollToTop"
            >
                <i class="material-icons">keyboard_arrow_up</i>
            </button>
        </main>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick, ref } from "vue";
import SiteHeader from "./components/SiteHeader.vue";
import Resume from "./components/Resume.vue";

const showScrollButton = ref(false);

const handleScroll = () => {
    showScrollButton.value = window.pageYOffset > 300;
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

onMounted(async () => {
    await nextTick();
    if (window.componentHandler) {
        window.componentHandler.upgradeAllRegistered();
    }

    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
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
    padding: 0;
}

main.mdl-layout__content > * {
    max-width: 1400px;
    margin: 0 auto;
}

@media (min-width: 1400px) {
    .inner-card {
        width: calc(50% - 12px);
    }
}

.mdl-button.up-button {
    display: none;
    position: fixed;
    bottom: 0.5em;
    right: 0.5em;
    z-index: 1000;
}

.mdl-button.up-button.visible {
    display: block;
}
</style>
