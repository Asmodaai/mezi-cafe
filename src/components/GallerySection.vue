<script setup>
import { t } from "../i18n.js";
import { ref, onUnmounted } from "vue";
import Photo from "./Photo.vue";
import Icon from "./Icon.vue";
import { trapDialogFocus } from "../utils/focus";
const photos = [
  {
    name: "cafe-interior",
    alt: t("Teplý dřevěný interiér kavárny s velkými oblouky a denním světlem"),
    caption: t("Světlo, dřevo a váš oblíbený stůl."),
    author: "Aurela Redenica / Unsplash",
  },
  {
    name: "cafe-corner",
    alt: t("Klidný kout kavárny s rostlinami, dřevěnými židlemi a obrazy"),
    caption: t("Místo na pár dalších stránek."),
    author: "Kris Tian / Unsplash",
  },
  {
    name: "pour-over",
    alt: t("Detail ruční přípravy filtrované kávy na dřevěném baru"),
    caption: t("Na dobré věci si čas najdeme."),
    author: "Michael Burrows / Pexels",
  },
];
const dialog = ref(null);
const current = ref(0);
let opener;
function open(index) {
  opener = document.activeElement;
  current.value = index;
  dialog.value.showModal();
  document.body.classList.add("modal-open");
}
function close() {
  dialog.value.close();
}
function cleanup() {
  document.body.classList.remove("modal-open");
  opener?.focus();
}
function step(direction) {
  current.value = (current.value + direction + photos.length) % photos.length;
}
function keys(event) {
  trapDialogFocus(event);
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    step(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    step(1);
  }
}
onUnmounted(() => document.body.classList.remove("modal-open"));
</script>

<template>
  <section
    id="atmosfera"
    class="gallery-section section-space"
    aria-labelledby="gallery-title"
  >
    <div class="section-heading wrap" data-reveal>
      <div>
        <p class="eyebrow">
          <span class="tiny-line"></span> {{ t("Nahlédněte dovnitř") }} </p>
        <h2 id="gallery-title">{{ t("Vezměte si") }}<br /><em>{{ t("svůj čas.") }}</em></h2>
      </div>
      <div class="gallery-side">
        <p> {{ t("U okna s knížkou. U stolu s někým blízkým.") }}<br />{{ t("Nebo jen tak. Tady je místo i na to.") }} </p>
        <span class="gallery-hint"
          ><Icon name="plus" /> {{ t("Fotografie si můžete prohlédnout zblízka") }}</span
        >
      </div>
    </div>
    <div class="gallery-grid wrap">
      <button
        v-for="(photo, i) in photos"
        :key="photo.name"
        class="gallery-photo"
        :class="`gallery-photo-${i}`"
        :aria-label="`${t(&quot;Zvětšit fotografii:&quot;)} ${photo.caption}`"
        @click="open(i)"
      >
        <Photo
          :name="photo.name"
          :alt="photo.alt"
          :sizes="
            i === 0
              ? '(max-width: 700px) 100vw, 60vw'
              : '(max-width: 700px) 50vw, 35vw'
          "
        /><span class="gallery-photo-caption"
          ><span>{{ photo.caption }}</span
          ><span class="zoom-icon"><Icon name="plus" /></span
        ></span>
      </button>
    </div>
    <div class="gallery-foot wrap">
      <span>{{ t("Každý kout má svůj příběh.") }}</span
      ><span>{{ t("Atmosféra konceptu MEZI / ilustrační fotografie") }}</span>
    </div>
  </section>
  <dialog
    ref="dialog"
    class="lightbox"
    :aria-label="t(&quot;Galerie atmosféry&quot;)"
    @close="cleanup"
    @keydown="keys"
    @click="$event.target === dialog && close()"
  >
    <button
      class="icon-button lightbox-close"
      :aria-label="t(&quot;Zavřít galerii&quot;)"
      @click="close"
    >
      <Icon name="close" />
    </button>
    <figure>
      <Photo
        :key="photos[current].name"
        :name="photos[current].name"
        :alt="photos[current].alt"
        eager
        sizes="90vw"
      />
      <figcaption>
        <span
          >{{ photos[current].caption
          }}<small>{{ photos[current].author }}</small></span
        ><span>{{ current + 1 }} / {{ photos.length }}</span>
      </figcaption>
    </figure>
    <div class="lightbox-controls">
      <button
        class="icon-button"
        :aria-label="t(&quot;Předchozí fotografie&quot;)"
        @click="step(-1)"
      >
        <Icon class="rotate-arrow" /></button
      ><span aria-live="polite"
        >{{ t("Fotografie") }} {{ current + 1 }} {{ t("ze") }} {{ photos.length }}</span
      ><button
        class="icon-button"
        :aria-label="t(&quot;Další fotografie&quot;)"
        @click="step(1)"
      >
        <Icon />
      </button>
    </div>
  </dialog>
</template>
