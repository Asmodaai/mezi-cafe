<script setup>
import { t } from "./i18n.js";
import { ref, onMounted, onUnmounted } from "vue";
import SiteHeader from "./components/SiteHeader.vue";
import MenuSection from "./components/MenuSection.vue";
import GallerySection from "./components/GallerySection.vue";
import ReservationModal from "./components/ReservationModal.vue";
import Photo from "./components/Photo.vue";
import Icon from "./components/Icon.vue";
const reservation = ref(null);
const reserve = () => reservation.value?.open();
let observer;
onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    el.classList.add("will-reveal");
    observer.observe(el);
  });
});
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <SiteHeader @reserve="reserve" />
  <main id="obsah">
    <section id="uvod" class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">
          <Icon class="small-star" name="sun" /> {{ t("Káva & malé radosti") }} </p>
        <h1 id="hero-title">{{ t("Na chvíli") }}<br /><em>{{ t("jen tak.") }}</em></h1>
        <p class="hero-description"> {{ t("Výběrová káva, něco dobrého a místo,") }}<br class="desktop-break" /> {{ t("kde se nikam nemusí.") }} </p>
        <a class="button button-cream" href="#nabidka"
          >{{ t("Ochutnat MEZI") }} <Icon name="diagonal"
        /></a>
        <div class="hero-bottom">
          <span class="hero-dot"></span
          ><span>{{ t("V dobré společnosti. I sami se sebou.") }}</span>
        </div>
      </div>
      <div class="hero-visual">
        <Photo
          name="cafe-interior"
          :alt="t(&quot;Sluncem zalitý interiér kavárny s dřevěnými oblouky, židlemi a útulnými stolky&quot;)"
          eager
          sizes="(max-width: 700px) 100vw, 58vw"
          :width="1920"
          :height="1280"
        />
        <div class="hero-photo-note">
          <span>{{ t("Svět venku chvíli počká.") }}</span
          ><a href="#pribeh" :aria-label="t(&quot;Objevit příběh kavárny&quot;)"><Icon /></a>
        </div>
        <div class="coffee-seal" aria-hidden="true">
          <span>{{ t("PRO CHVÍLE") }}</span><Icon name="cup" /><span>{{ t("MEZI TÍM VŠÍM") }}</span>
        </div>
      </div>
    </section>
    <div
      class="ticker"
      :aria-label="t(&quot;Výběrová káva, pozdní snídaně, něco sladkého, dobrá společnost&quot;)"
    >
      <span>{{ t("Výběrová káva") }}</span><Icon name="sun" /><span>{{ t("Pozdní snídaně") }}</span
      ><Icon name="sun" /><span>{{ t("Něco sladkého") }}</span><Icon name="sun" /><span
        >{{ t("Dobrá společnost") }}</span
      >
    </div>
    <section
      id="pribeh"
      class="story-section wrap section-space"
      aria-labelledby="story-title"
    >
      <div class="story-photo" data-reveal>
        <Photo
          name="coffee-moment"
          :alt="t(&quot;Hřejivý šálek kávy s latte art v dlaních&quot;)"
          :width="1200"
          :height="1800"
          sizes="(max-width: 700px) 80vw, 32vw"
        /><span class="photo-side-label">{{ t("MALÉ RADOSTI JSOU VELKÁ VĚC") }}</span>
        <div class="story-photo-note">{{ t("Tak akorát") }}<br /><em>{{ t("pro vás.") }}</em></div>
      </div>
      <div class="story-copy" data-reveal>
        <p class="eyebrow">
          <span class="tiny-line"></span> {{ t("Těší nás, jsme MEZI") }} </p>
        <h2 id="story-title"> {{ t("Mezi povinnostmi.") }}<br />{{ t("Mezi přáteli.") }}<br /><em>{{ t("Mezi svými.") }}</em>
        </h2>
        <p> {{ t("Jsou místa, kam si jdete dát kávu. A pak jsou místa, kde si k ní přisedne i dobrý pocit. Přesně takové je MEZI.") }} </p>
        <p> {{ t("Vůně čerstvě namleté kávy, světlo na dřevěném stole a něco malého na zub. Žádné velké plány. Jen dobrá chvíle, kterou si chcete zopakovat.") }} </p>
        <a class="text-link" href="#atmosfera"
          >{{ t("Udělejte si u nás pohodlí") }} <Icon name="diagonal"
        /></a>
      </div>
    </section>
    <MenuSection />
    <section class="craft-section" aria-labelledby="craft-title">
      <div class="craft-image">
        <Photo
          name="pour-over"
          :alt="t(&quot;Barista pomalu nalévá vodu z konvice do keramického kávového dripperu&quot;)"
          sizes="(max-width: 700px) 100vw, 55vw"
        />
      </div>
      <div class="craft-copy">
        <p class="eyebrow">{{ t("Na detailech záleží") }}</p>
        <h2 id="craft-title"> {{ t("Dobrá káva.") }}<br />{{ t("Bez velkých") }}<br /><em>{{ t("řečí.") }}</em>
        </h2>
        <p> {{ t("Poctivě připravená, s chutí, která vás baví. Klidně se ptejte. Rádi vám pomůžeme najít tu vaši.") }} </p>
        <div class="craft-signature">
          <Icon name="cup" /><span
            >{{ t("Od prvního namletí") }}<br />{{ t("po poslední doušek.") }}</span
          >
        </div>
      </div>
    </section>
    <GallerySection />
    <section class="reasons-section wrap" aria-labelledby="reasons-title">
      <div class="reasons-intro">
        <p class="eyebrow">{{ t("Je vám tu dobře") }}</p>
        <h2 id="reasons-title">{{ t("A o to") }}<br /><em>{{ t("tu jde.") }}</em></h2>
      </div>
      <div class="reason">
        <span class="reason-index">01 /</span>
        <h3>{{ t("S chutí a péčí") }}</h3>
        <p> {{ t("Káva, které věnujeme pozornost. A jednoduché věci, které spolu chutnají.") }} </p>
      </div>
      <div class="reason">
        <span class="reason-index">02 /</span>
        <h3>{{ t("Po svém") }}</h3>
        <p> {{ t("Na rychlé espresso u baru i na dlouhé dopoledne. Rytmus si vybíráte vy.") }} </p>
      </div>
      <div class="reason">
        <span class="reason-index">03 /</span>
        <h3>{{ t("V dobré společnosti") }}</h3>
        <p> {{ t("Rande, knížka, přátelé. U společného stolu i ve vlastním malém světě.") }} </p>
      </div>
    </section>
    <section
      id="navstivte-nas"
      class="visit-section"
      aria-labelledby="visit-title"
    >
      <div class="visit-info">
        <p class="eyebrow">
          <span class="tiny-line"></span> {{ t("Zastavte se na chvíli") }} </p>
        <h2 id="visit-title">{{ t("Váš stůl") }}<br /><em>{{ t("už tu chybí.") }}</em></h2>
        <p>{{ t("Jedna káva může být začátek") }}<br />{{ t("docela hezkého dne.") }}</p>
        <div class="visit-details">
          <div>
            <h3><Icon name="sun" /> {{ t("Kdy se potkáme") }}</h3>
            <dl class="opening-hours">
              <div>
                <dt>{{ t("Pondělí — pátek") }}</dt>
                <dd>8:00 — 19:00</dd>
              </div>
              <div>
                <dt>{{ t("Sobota — neděle") }}</dt>
                <dd>9:00 — 17:00</dd>
              </div>
            </dl>
            <span class="detail-note">{{ t("Snídaňová nabídka do 11:30") }}</span>
          </div>
          <div>
            <h3><Icon name="pin" /> {{ t("Kde je naše MEZI") }}</h3>
            <p>{{ t("Ostrava · v rytmu sousedství") }}</p>
            <span class="detail-note"
              >{{ t("Lokalita konceptu. Skutečnou adresu") }}<br />{{ t("tahle fiktivní kavárna zatím nemá.") }}</span
            >
          </div>
        </div>
        <button class="button button-olive" @click="reserve"> {{ t("Dáme si kávu? Rezervovat stůl") }} <Icon name="diagonal" />
        </button>
        <p class="visit-demo">{{ t("Ukázková rezervace · bez odesílání údajů") }}</p>
      </div>
      <div class="visit-photo">
        <Photo
          name="cafe-corner"
          :alt="t(&quot;Kavárenský stolek u okna a zelených rostlin&quot;)"
          :width="1200"
          :height="1680"
          sizes="(max-width: 700px) 100vw, 42vw"
        /><span class="visit-photo-label">{{ t("Tady. Teď. Spolu.") }}</span>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="footer-top wrap">
      <a class="footer-brand" href="#uvod" :aria-label="t(&quot;MEZI — zpět na úvod&quot;)"
        >mezi<span>.</span></a
      >
      <p>{{ t("Káva. Lidé.") }}<br />{{ t("Chvíle mezi tím.") }}</p>
      <a class="back-top text-link" href="#uvod"
        >{{ t("Zpátky nahoru") }} <Icon name="diagonal"
      /></a>
    </div>
    <div class="footer-bottom wrap">
      <span
        >© {{ new Date().getFullYear() }} {{ t("MEZI · Fiktivní portfolio projekt") }}</span
      ><span>Concept project by <strong>VERBA</strong></span
      ><span>{{ t("Fotografie: Unsplash & Pexels") }}</span>
    </div>
    <p class="footer-disclaimer wrap"> {{ t("MEZI je autorský koncept studia VERBA, nikoli skutečná provozovna. Nabídka, ceny a otevírací doba jsou ilustrativní. Fotografie zachycují atmosféru konceptu.") }} </p>
  </footer>
  <ReservationModal ref="reservation" />
</template>
