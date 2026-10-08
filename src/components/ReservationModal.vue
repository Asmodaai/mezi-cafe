<script setup>
import { onMounted } from "vue";
const interactive = ref(false);
onMounted(() => { interactive.value = true; });
import { t } from "../i18n.js";
import { computed, nextTick, ref, watch, onUnmounted } from "vue";
import Icon from "./Icon.vue";
import { trapDialogFocus } from "../utils/focus";
const dialog = ref(null);
const form = ref(null);
const sent = ref(false);
const date = ref("");
const time = ref("");
const success = ref(null);
let opener;
const minDate = ref("");
onMounted(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  minDate.value = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
});
const times = computed(() => {
  const day = date.value ? new Date(`${date.value}T12:00:00`).getDay() : 1;
  const weekend = day === 0 || day === 6;
  return Array.from(
    { length: weekend ? 15 : 21 },
    (_, i) =>
      `${String((weekend ? 9 : 8) + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`,
  );
});
watch(date, () => {
  if (!times.value.includes(time.value)) time.value = "";
});
function open() {
  opener = document.activeElement;
  sent.value = false;
  date.value = "";
  time.value = "";
  dialog.value.showModal();
  document.body.classList.add("modal-open");
}
function close() {
  dialog.value.close();
}
function cleanup() {
  form.value?.reset();
  date.value = "";
  time.value = "";
  document.body.classList.remove("modal-open");
  opener?.focus();
}
async function submit() {
  if (!form.value.checkValidity()) return;
  form.value.reset();
  date.value = "";
  time.value = "";
  sent.value = true;
  await nextTick();
  success.value?.focus();
}
onUnmounted(() => document.body.classList.remove("modal-open"));
defineExpose({ open });
</script>

<template>
  <dialog
    ref="dialog"
    class="reservation-dialog"
    aria-labelledby="reservation-title"
    @close="cleanup"
    @keydown="trapDialogFocus"
    @click="$event.target === dialog && close()"
  >
    <div class="reservation-inner">
      <button
        class="icon-button modal-close"
        :aria-label="t(&quot;Zavřít rezervaci&quot;)"
        @click="close"
      >
        <Icon name="close" />
      </button>
      <template v-if="!sent"
        ><p class="eyebrow">{{ t("Váš stůl. Vaše chvíle.") }}</p>
        <h2 id="reservation-title">{{ t("Potkáme se") }}<br /><em>{{ t("v MEZI.") }}</em></h2>
        <p class="reservation-notice"> {{ t("Toto je ukázka rezervace. Údaje se nikam neodesílají ani neukládají.") }} </p>
        <form :inert="!interactive" ref="form" @submit.prevent="submit">
          <div class="form-grid">
            <label
              >{{ t("Vaše jméno") }}<input
                name="name"
                type="text"
                :placeholder="t(&quot;Jak vám máme říkat?&quot;)"
                required
                maxlength="80"
                autocomplete="off" /></label
            ><label
              >{{ t("E-mail") }}<input
                name="email"
                type="email"
                :placeholder="t(&quot;vas@email.example&quot;)"
                required
                maxlength="150"
                autocomplete="off" /></label
            ><label
              >{{ t("Den návštěvy") }}<input
                v-model="date"
                name="date"
                type="date"
                :min="minDate"
                required
                :aria-describedby="'date-note'" /></label
            ><label
              >{{ t("Počet hostů") }}<select name="guests" required>
                <option value="1">{{ t("1 host") }}</option>
                <option value="2" selected>{{ t("2 hosté") }}</option>
                <option value="3">{{ t("3 hosté") }}</option>
                <option value="4">{{ t("4 hosté") }}</option>
                <option value="5">{{ t("5 hostů") }}</option>
                <option value="6">{{ t("6 hostů") }}</option>
              </select></label
            ><label class="field-full"
              >{{ t("V kolik hodin?") }}<select v-model="time" name="time" required>
                <option disabled value="">{{ t("Vyberte čas") }}</option>
                <option v-for="slot in times" :key="slot" :value="slot">
                  {{ slot }}
                </option>
              </select></label
            >
          </div>
          <p id="date-note" class="form-note"> {{ t("Ukázkové termíny od zítřka. Po–Pá 8–19 h, So–Ne 9–17 h.") }} </p>
          <button type="submit" class="button button-olive form-submit"> {{ t("Vyzkoušet rezervaci") }} <Icon name="diagonal" />
          </button>
          <p class="form-note">{{ t("Potvrzením nevzniká skutečná rezervace.") }}</p>
        </form>
      </template>
      <div
        v-else
        ref="success"
        class="reservation-success"
        tabindex="-1"
        role="status"
      >
        <span class="success-symbol"><Icon name="check" /></span>
        <p class="eyebrow">{{ t("Ukázka proběhla úspěšně") }}</p>
        <h2 id="reservation-title">{{ t("Takhle snadné") }}<br /><em>{{ t("to může být.") }}</em></h2>
        <p> {{ t("Toto je ukázkový formulář v demo projektu. Žádná data nebyla odeslána.") }} </p>
        <button class="button button-olive" @click="close"> {{ t("Zpátky na kávu") }} <Icon />
        </button>
      </div>
    </div>
  </dialog>
</template>
