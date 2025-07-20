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
                    @click="handleNavClick($event, link.url)"
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

function handleNavClick(event, url) {
    if (url.startsWith("#")) {
        event.preventDefault();
        const targetId = url.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }
}

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
    themeLink.href = `/styles/themes/${theme}-theme.css`;

    // Handle starry night script
    const existingScript = document.getElementById("starry-night-script");
    if (theme === "starry-night" && !existingScript) {
        const script = document.createElement("script");
        script.id = "starry-night-script";
        script.src = "/styles/themes/starry-night-theme.js";
        document.head.appendChild(script);
    } else if (theme !== "starry-night" && existingScript) {
        existingScript.remove();
        // Clear any starry night elements
        const container = document.getElementById("starry-night-container");
        if (container) container.innerHTML = "";
    }
}
</script>

<style scoped>
.mdl-layout__header {
    background-color: black;
}

/* Center title on mobile */
@media (max-width: 1024px) {
    .mdl-layout__header-row {
        justify-content: center;
        align-items: center;
        padding: 0;
    }

    .mdl-layout__title {
        text-align: center;
        margin: auto;
        padding: 20px;
    }

    .mdl-layout-spacer {
        display: none;
    }

    .mdl-navigation {
        display: none;
    }
}
</style>
