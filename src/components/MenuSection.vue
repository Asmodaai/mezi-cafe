<script setup>
import { t } from "../i18n.js";
import { computed, ref, nextTick } from "vue";
import { categories, items, selections } from "../data/menu";
import Photo from "./Photo.vue";
import Icon from "./Icon.vue";
const active = ref("oblibene");
const shown = computed(() => selections[active.value].map((id) => items[id]));
const details = ref(null);
const menuOpen = ref(false);
function changeWithKey(event, index) {
  let target;
  if (event.key === "ArrowRight") target = (index + 1) % categories.length;
  if (event.key === "ArrowLeft")
    target = (index - 1 + categories.length) % categories.length;
  if (event.key === "Home") target = 0;
  if (event.key === "End") target = categories.length - 1;
  if (target === undefined) return;
  event.preventDefault();
  active.value = categories[target].id;
  nextTick(() => document.getElementById(`tab-${active.value}`)?.focus());
}
function openMenu() {
  details.value.open = !details.value.open;
}
</script>

<template>
  <section
    id="nabidka"
    class="menu-section section-space"
    aria-labelledby="menu-title"
  >
    <div class="section-heading wrap" data-reveal>
      <div>
        <p class="eyebrow"><span class="tiny-line"></span> {{ t("U nás na stole") }}</p>
        <h2 id="menu-title">{{ t("Malé radosti.") }}<br /><em>{{ t("Velká chuť.") }}</em></h2>
      </div>
      <p class="section-intro"> {{ t("První doušek. Ještě teplý croissant.") }}<br />{{ t("A pak už jen: „Dáme si ještě?“") }} </p>
    </div>
    <div class="wrap">
      <div class="menu-toolbar">
        <div class="menu-tabs" role="tablist" :aria-label="t(&quot;Kategorie nabídky&quot;)">
          <button
            v-for="(category, i) in categories"
            :id="`tab-${category.id}`"
            :key="category.id"
            role="tab"
            :aria-selected="active === category.id"
            :tabindex="active === category.id ? 0 : -1"
            aria-controls="menu-panel"
            @click="active = category.id"
            @keydown="changeWithKey($event, i)"
          >
            {{ category.label }}
          </button>
        </div>
        <span class="menu-season">{{ t("S láskou k obyčejným dnům") }}</span>
      </div>
      <div
        id="menu-panel"
        class="menu-grid"
        role="tabpanel"
        :aria-labelledby="`tab-${active}`"
        tabindex="0"
      >
        <article
          v-for="(item, i) in shown"
          :key="`${active}-${item.name}`"
          class="menu-card"
        >
          <div class="menu-card-image">
            <Photo
              :name="item.image"
              :alt="item.alt"
              sizes="(max-width: 640px) 100vw, 33vw"
              :style="{ objectPosition: item.position || '50% 55%' }"
            /><span class="photo-tag">{{ item.tag }}</span
            ><span class="image-number" aria-hidden="true">0{{ i + 1 }}</span>
          </div>
          <div class="menu-card-title">
            <h3>{{ item.name }}</h3>
            <span>{{ item.price }} <small>{{ t("Kč") }}</small></span>
          </div>
          <p>{{ item.note }}</p>
        </article>
      </div>
      <div class="menu-bottom">
        <p>{{ t("Něco podle nálady. Něco podle sezóny.") }}</p>
        <button
          class="text-link"
          aria-controls="full-menu"
          :aria-expanded="menuOpen"
          @click="openMenu"
        > {{ t("Prohlédnout celý lístek") }} <Icon name="plus" />
        </button>
      </div>
      <details
        ref="details"
        id="full-menu"
        class="full-menu"
        @toggle="menuOpen = $event.target.open"
      >
        <summary>{{ t("Celý ukázkový lístek") }} <Icon name="plus" /></summary>
        <div class="full-menu-content">
          <div>
            <h3>{{ t("Káva & nápoje") }}</h3>
            <dl>
              <div>
                <dt>Espresso <small>{{ t("bez alergenů") }}</small></dt>
                <dd>{{ t("59 Kč") }}</dd>
              </div>
              <div>
                <dt>Cappuccino <small>{{ t("alergen 7") }}</small></dt>
                <dd>{{ t("79 Kč") }}</dd>
              </div>
              <div>
                <dt>Flat white <small>{{ t("alergen 7") }}</small></dt>
                <dd>{{ t("89 Kč") }}</dd>
              </div>
              <div>
                <dt>{{ t("Ruční filtr") }} <small>{{ t("bez alergenů") }}</small></dt>
                <dd>{{ t("105 Kč") }}</dd>
              </div>
              <div>
                <dt>{{ t("Sypaný čaj") }} <small>{{ t("bez alergenů") }}</small></dt>
                <dd>{{ t("75 Kč") }}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3>{{ t("Něco dobrého") }}</h3>
            <dl>
              <div>
                <dt>{{ t("Máslový croissant") }} <small>{{ t("alergeny 1, 3, 7") }}</small></dt>
                <dd>{{ t("65 Kč") }}</dd>
              </div>
              <div>
                <dt>Cheesecake <small>{{ t("alergeny 1, 3, 7, 8") }}</small></dt>
                <dd>{{ t("115 Kč") }}</dd>
              </div>
              <div>
                <dt> {{ t("Malé ráno v MEZI") }} <small>{{ t("croissant + cappuccino · alergeny 1, 3, 7") }}</small>
                </dt>
                <dd>{{ t("135 Kč") }}</dd>
              </div>
            </dl>
            <p class="menu-legend"> {{ t("1 obiloviny s lepkem · 3 vejce · 7 mléko · 8 skořápkové plody") }} </p>
          </div>
        </div>
        <p class="demo-note"> {{ t("Ilustrativní nabídka a ceny pro fiktivní kavárnu. Alergeny jsou součástí ukázky, nejde o údaje skutečné provozovny.") }} </p>
      </details>
    </div>
  </section>
</template>
