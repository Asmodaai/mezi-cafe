<script setup>
import LanguageSwitch from "./LanguageSwitch.vue";
import { t } from "../i18n.js";
import { ref, onMounted, onUnmounted } from "vue";
import Icon from "./Icon.vue";
const emit = defineEmits(["reserve"]);
const isOpen = ref(false);
const toggle = ref(null);
const links = [
  { href: "#pribeh", label: t("O MEZI") },
  { href: "#nabidka", label: t("Naše nabídka") },
  { href: "#atmosfera", label: t("Atmosféra") },
  { href: "#navstivte-nas", label: t("Kudy k nám") },
];
function escape(event) {
  if (event.key === "Escape" && isOpen.value) {
    isOpen.value = false;
    toggle.value?.focus();
  }
}
function reserve() {
  isOpen.value = false;
  emit("reserve");
}
const media = typeof window !== "undefined" ? window.matchMedia("(min-width: 901px)") : null;
function resize(event) {
  if (event.matches) isOpen.value = false;
}
onMounted(() => {
  document.addEventListener("keydown", escape);
  media.addEventListener("change", resize);
});
onUnmounted(() => {
  document.removeEventListener("keydown", escape);
  media.removeEventListener("change", resize);
});
</script>

<template>
  <a class="skip-link" href="#obsah">{{ t("Přejít na obsah") }}</a>
  <header class="site-header">
    <a
      class="brand"
      href="#uvod"
      :aria-label="t(&quot;MEZI — úvod&quot;)"
      @click="isOpen = false"
      >mezi<span class="brand-dot">.</span
      ><span class="brand-caption">{{ t("káva & malé radosti") }}</span></a
    >
    <nav class="desktop-nav" :aria-label="t(&quot;Hlavní navigace&quot;)">
      <a v-for="link in links" :key="link.href" :href="link.href">{{
        link.label
      }}</a>
    <LanguageSwitch />
      </nav>
    <button class="button button-outline header-reserve" @click="reserve"> {{ t("Rezervovat stůl") }} <Icon name="diagonal" />
    </button>
    <button
      ref="toggle"
      class="menu-toggle"
      :aria-expanded="isOpen"
      aria-controls="mobile-navigation"
      :aria-label="isOpen ? t(&quot;Zavřít menu&quot;) : t(&quot;Otevřít menu&quot;)"
      @click="isOpen = !isOpen"
    >
      <span>{{ isOpen ? t("Zavřít") : "Menu" }}</span
      ><span class="menu-lines" :class="{ active: isOpen }"
        ><i></i><i></i
      ></span>
    </button>
    <nav
      v-if="isOpen"
      id="mobile-navigation"
      class="mobile-nav"
      :aria-label="t(&quot;Mobilní navigace&quot;)"
    >
      <a
        v-for="(link, i) in links"
        :key="link.href"
        :href="link.href"
        @click="isOpen = false"
        ><span>0{{ i + 1 }}</span
        >{{ link.label }}<Icon name="diagonal"
      /></a>
      <button class="button button-olive" @click="reserve"> {{ t("Rezervovat stůl") }} <Icon name="diagonal" />
      </button>
      <p>{{ t("Káva. Lidé. Chvíle mezi tím.") }}</p>
    <LanguageSwitch />
      </nav>
  </header>
</template>
