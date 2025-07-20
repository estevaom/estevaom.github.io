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
import SiteHeader from "./components/SiteHeader.vue";
import Resume from "./components/Resume.vue";
</script>

<style></style>
