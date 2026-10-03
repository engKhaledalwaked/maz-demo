<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { t, tr, lang, toggleLang, img, wa, unified, branches, tracks, programs, reviews } from './data'

const scrolled = ref(false)
const menu = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
const links = ['programs', 'campus', 'branches', 'reviews']

const track = ref('all')
const list = computed(() => track.value === 'all' ? programs : programs.filter((p) => p.track === track.value))
const campus = ['computer-lab', 'lobby', 'workstation', 'lounge-corridor', 'hall-banners', 'entrance']

const f = reactive({ name: '', phone: '', program: 'ai', branch: 'ryd-m', mode: 0, note: '' })
const err = ref('')
const choose = (id) => { f.program = id; document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }) }
const send = () => {
  if (!f.name.trim() || !f.phone.trim()) { err.value = t.value.reg.required; return }
  err.value = ''
  const m = t.value.reg.msg
  const b = branches.find((x) => x.id === f.branch)
  const lines = [m.hello, `${m.name}: ${f.name.trim()}`, `${m.phone}: ${f.phone.trim()}`, `${m.program}: ${tr(programs.find((p) => p.id === f.program).t)}`, `${m.branch}: ${tr(b.t)}`, `${m.mode}: ${t.value.reg.modes[f.mode]}`, f.note.trim() ? `${m.note}: ${f.note.trim()}` : null].filter(Boolean)
  window.open(wa(b.wa, lines.join('\n')), '_blank', 'noopener')
}
const year = new Date().getFullYear()
</script>

<template>
  <!-- نسخة عرض: احذف هذا الشريط عند الإطلاق الرسمي -->
  <div class="demo-ribbon">{{ t.ribbon }}</div>

  <header class="nav" :class="{ scrolled }">
    <div class="container nav-in">
      <a href="#top" class="brand" @click="menu = false">
        <svg class="logo" viewBox="0 0 60 60" aria-hidden="true"><g transform="skewX(-18) translate(12 0)"><rect x="12" y="16" width="7" height="34" rx="1" /><rect x="23" y="12" width="7" height="30" rx="1" /><rect x="14" y="7" width="5" height="5" rx="1" /><rect x="34" y="38" width="7" height="7" rx="1" /></g></svg>
        <span class="bt"><b>{{ t.brand }}</b><small>{{ t.brandEn }}</small></span>
      </a>
      <nav class="links"><a v-for="l in links" :key="l" :href="`#${l}`">{{ t.nav[l] }}</a></nav>
      <div class="acts">
        <button type="button" class="lang" @click="toggleLang">{{ lang === 'ar' ? 'EN' : 'ع' }}</button>
        <a href="#register" class="btn btn-gold btn-sm hide-sm">{{ t.nav.register }}</a>
        <button type="button" class="burger" :aria-expanded="menu" aria-label="Menu" @click="menu = !menu"><i></i><i></i></button>
      </div>
    </div>
    <div v-if="menu" class="mobile-menu"><a v-for="l in links" :key="l" :href="`#${l}`" @click="menu = false">{{ t.nav[l] }}</a><a href="#register" class="btn btn-gold" @click="menu = false">{{ t.nav.register }}</a></div>
  </header>

  <main>
    <section class="hero" id="top">
      <div class="circuit" aria-hidden="true"></div>
      <div class="container hero-in">
        <div class="hero-copy">
          <p class="tag">{{ t.hero.tag }}</p>
          <h1><span>{{ t.hero.t1 }}</span><span class="gold">{{ t.hero.t2 }}</span></h1>
          <p class="lead">{{ t.hero.lead }}</p>
          <div class="ctas">
            <a class="btn btn-gold" href="#programs">{{ t.hero.cta1 }}</a>
            <a class="btn btn-line" :href="`tel:${unified.tel}`">{{ t.hero.cta2 }} <span dir="ltr">{{ unified.label }}</span></a>
          </div>
          <dl class="stats"><div v-for="s in t.hero.stats" :key="s.l"><dt>{{ s.n }}</dt><dd>{{ s.l }}</dd></div></dl>
        </div>
        <div class="hero-vis">
          <div class="screen">
            <div class="bar"><i></i><i></i><i></i><span>maz.training</span></div>
            <img :src="img('ai-hands.jpg')" alt="" fetchpriority="high" />
          </div>
          <img class="lab" :src="img('computer-lab.jpg')" alt="" />
          <div class="chip"><b>AI</b><small>{{ tr(programs[0].tag) }}</small></div>
        </div>
      </div>
    </section>

    <section class="section programs" id="programs">
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.programs.kicker }}</p><h2>{{ t.programs.title }}</h2></div>
        <div class="tabs" role="tablist">
          <button v-for="x in tracks" :key="x.id" type="button" role="tab" :aria-selected="track === x.id" :class="{ on: track === x.id }" @click="track = x.id">{{ tr(x.t) }}</button>
        </div>
        <TransitionGroup tag="div" name="list" class="prog-grid">
          <article v-for="p in list" :key="p.id" class="prog" :class="'p-' + p.id">
            <div class="pimg">
              <img v-if="p.img" :src="img(p.img)" alt="" loading="lazy" />
              <div v-else class="cscp" aria-hidden="true"><b>CSCP</b><small>From Zero To Certified</small></div>
              <span class="ptag">{{ tr(p.tag) }}</span>
            </div>
            <div class="pbody">
              <h3>{{ tr(p.t) }}</h3>
              <p>{{ tr(p.d) }}</p>
              <ul><li v-for="k in tr(p.k)" :key="k">{{ k }}</li></ul>
              <button type="button" class="pbtn" @click="choose(p.id)">{{ t.programs.details }} <span aria-hidden="true">→</span></button>
            </div>
          </article>
        </TransitionGroup>
        <p class="soon">{{ t.programs.soon }}</p>
      </div>
    </section>

    <section class="section campus" id="campus">
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.campus.kicker }}</p><h2>{{ t.campus.title }}</h2><p class="sub">{{ t.campus.p }}</p></div>
        <div class="camp-grid">
          <figure v-for="(c, i) in campus" :key="c" :class="'c' + i" v-reveal><img :src="img(c + '.jpg')" alt="" loading="lazy" /><figcaption>{{ t.campus.labels[c] }}</figcaption></figure>
        </div>
      </div>
    </section>

    <section class="section branches" id="branches">
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.branches.kicker }}</p><h2>{{ t.branches.title }}</h2><p class="sub">{{ t.branches.hours }}</p></div>
        <div class="br-grid">
          <article v-for="b in branches" :key="b.id" class="br" v-reveal>
            <span class="pin" aria-hidden="true">◆</span>
            <h3>{{ tr(b.t) }}</h3>
            <p>{{ tr(b.a) }}</p>
            <p v-if="b.r" class="r">★ {{ b.r }}</p>
            <a class="ph" :href="`tel:${b.phone}`" dir="ltr">{{ b.phone }}</a>
            <div class="br-acts">
              <a :href="wa(b.wa, t.reg.msg.hello)" target="_blank" rel="noopener" class="mini">{{ t.branches.wa }}</a>
              <a v-if="b.maps" :href="b.maps" target="_blank" rel="noopener" class="mini ghost">{{ t.branches.dir }}</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section reviews" id="reviews">
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.reviews.kicker }}</p><h2>{{ t.reviews.title }}</h2></div>
        <div class="rv-grid">
          <blockquote v-for="r in reviews" :key="r.n" class="rv" dir="rtl" v-reveal><span class="q">“</span><p>{{ r.q }}</p><footer>{{ r.n }} · ★★★★★</footer></blockquote>
        </div>
        <p class="soon">{{ t.reviews.note }}</p>
      </div>
    </section>

    <section class="section register" id="register">
      <div class="container reg-in">
        <div v-reveal><p class="kicker">{{ t.reg.kicker }}</p><h2>{{ t.reg.title }}</h2><p class="sub">{{ t.reg.sub }}</p>
          <img class="kafd" :src="img('kafd-poster.jpg')" alt="" loading="lazy" />
        </div>
        <form class="form" novalidate @submit.prevent="send" v-reveal>
          <div class="row">
            <label><span>{{ t.reg.name }}</span><input v-model="f.name" autocomplete="name" /></label>
            <label><span>{{ t.reg.phone }}</span><input v-model="f.phone" type="tel" dir="ltr" autocomplete="tel" /></label>
          </div>
          <div class="lbl"><span>{{ t.reg.program }}</span>
            <div class="opts"><button v-for="p in programs" :key="p.id" type="button" :class="{ on: f.program === p.id }" @click="f.program = p.id">{{ tr(p.t) }}</button></div>
          </div>
          <div class="row">
            <label><span>{{ t.reg.branch }}</span><select v-model="f.branch"><option v-for="b in branches" :key="b.id" :value="b.id">{{ tr(b.t) }}</option></select></label>
            <div class="lbl"><span>{{ t.reg.mode }}</span><div class="seg"><button v-for="(m, i) in t.reg.modes" :key="m" type="button" :class="{ on: f.mode === i }" @click="f.mode = i">{{ m }}</button></div></div>
          </div>
          <label><span>{{ t.reg.note }}</span><textarea v-model="f.note" rows="3"></textarea></label>
          <p v-if="err" class="err" role="alert">{{ err }}</p>
          <button class="btn btn-gold block" type="submit">{{ t.reg.send }}</button>
        </form>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container foot">
      <svg class="logo big" viewBox="0 0 60 60" aria-hidden="true"><g transform="skewX(-18) translate(12 0)"><rect x="12" y="16" width="7" height="34" rx="1" /><rect x="23" y="12" width="7" height="30" rx="1" /><rect x="14" y="7" width="5" height="5" rx="1" /><rect x="34" y="38" width="7" height="7" rx="1" /></g></svg>
      <b>{{ t.brand }}</b><span>{{ t.brandEn }}</span>
      <a :href="`tel:${unified.tel}`">{{ t.footer.unified }}: <span dir="ltr">{{ unified.label }}</span></a>
      <small>© {{ year }} {{ t.footer.rights }} · <em>{{ t.footer.demo }}</em></small>
    </div>
  </footer>
  <div class="sticky">
    <a :href="`tel:${unified.tel}`">{{ t.sticky.call }}</a>
    <a href="#register" class="main">{{ t.sticky.reg }}</a>
  </div>
</template>
