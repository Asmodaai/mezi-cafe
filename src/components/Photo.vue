<script setup>
defineProps({
  name: { type: String, required: true },
  alt: { type: String, required: true },
  eager: Boolean,
  sizes: { type: String, default: "(max-width: 700px) 100vw, 50vw" },
  width: { type: Number, default: 1200 },
  height: { type: Number, default: 800 },
});
const base = import.meta.env.BASE_URL;
</script>

<template>
  <img
    :src="`${base}assets/images/${name}.webp`"
    :srcset="`${base}assets/images/${name}-small.webp 800w, ${base}assets/images/${name}.webp ${name === 'cafe-interior' ? 1920 : 1200}w`"
    :sizes="sizes"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : 'auto'"
    decoding="async"
  />
</template>
