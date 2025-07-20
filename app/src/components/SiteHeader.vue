<template>
    <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
            <span class="mdl-layout__title">Estevão de Abreu Machado</span>
            <div class="mdl-layout-spacer"></div>
            <nav class="mdl-navigation mdl-layout--large-screen-only">
                <a
                    v-for="link in navigationLinks"
                    :key="link.url"
                    class="mdl-navigation__link"
                    :href="link.url"
                >
                    {{ link.title }}
                </a>
                <button
                    class="theme-toggle mdl-button mdl-js-button mdl-button--icon"
                    @click="toggleTheme"
                >
                    <i class="material-icons">{{ currentThemeIcon }}</i>
                </button>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const navigationLinks = [
    { title: "About Me", url: "#about" },
    { title: "Employment", url: "#employment" },
    { title: "Technologies", url: "#technologies" },
    { title: "Objectives", url: "#objectives" },
    { title: "Education", url: "#education" },
    { title: "Contact", url: "#contact" },
];

const themes = [
    { id: "light", icon: "brightness_7", label: "Light" },
    { id: "dark", icon: "brightness_3", label: "Dark" },
    { id: "starry-night", icon: "nights_stay", label: "Starry Night" },
];

const currentTheme = ref("light");

const currentThemeIcon = computed(() => {
    const theme = themes.find((t) => t.id === currentTheme.value);
    return theme?.icon || "brightness_7";
});

onMounted(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    currentTheme.value = savedTheme;
    applyTheme(savedTheme);
});

function toggleTheme() {
    const currentIndex = themes.findIndex((t) => t.id === currentTheme.value);
    const nextIndex = (currentIndex + 1) % themes.length;
    const previousTheme = currentTheme.value;
    currentTheme.value = themes[nextIndex].id;

    localStorage.setItem("theme", currentTheme.value);
    applyTheme(currentTheme.value);
}

function applyTheme(theme) {
    document.body.classList.remove(
        "light-theme",
        "dark-theme",
        "starry-night-theme",
    );
    document.body.classList.add(`${theme}-theme`);

    let themeLink = document.getElementById("theme-css");
    if (!themeLink) {
        themeLink = document.createElement("link");
        themeLink.id = "theme-css";
        themeLink.rel = "stylesheet";
        document.head.appendChild(themeLink);
    }
    themeLink.href = `/themes/${theme}-theme.css`;
}
</script>
