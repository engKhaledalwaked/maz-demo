import { ref, computed, watchEffect } from 'vue'

const saved = (() => { try { return localStorage.getItem('maz-lang') } catch { return null } })()
export const lang = ref(saved === 'en' ? 'en' : 'ar')
watchEffect(() => {
  document.documentElement.lang = lang.value
  document.documentElement.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
  try { localStorage.setItem('maz-lang', lang.value) } catch {}
})
export const toggleLang = () => { lang.value = lang.value === 'ar' ? 'en' : 'ar' }
export const tr = (o) => (o && typeof o === 'object' ? o[lang.value] ?? o.ar : o)
export const img = (p) => `/img/${p}`
export const wa = (num, text) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`

// الأرقام الموحدة من خرائط Google، وأرقام الفروع من بوستر المعهد
export const unified = { tel: '+966920011779', label: '9200 11779' }
export const branches = [
  { id: 'ryd-m', wa: '966593203989', phone: '0593203989', t: { ar: 'الرياض — رجال', en: 'Riyadh — Men' }, a: { ar: 'شارع رفحاء، حي الملك سلمان', en: 'Rafha St., King Salman district' }, r: '4.3 (110)', maps: 'https://www.google.com/maps/search/?api=1&query=24.7368044,46.7078774' },
  { id: 'ryd-w', wa: '966595142046', phone: '920066147', t: { ar: 'الرياض — الفرع النسائي', en: 'Riyadh — Women' }, a: { ar: 'طريق أنس بن مالك، حي النرجس', en: 'Anas Ibn Malik Rd., An Narjis' }, r: '4.0 (81)', maps: 'https://www.google.com/maps/search/?api=1&query=24.8342453,46.67862' },
  { id: 'jed', wa: '966580949337', phone: '0580949337', t: { ar: 'جدة', en: 'Jeddah' }, a: { ar: 'جدة', en: 'Jeddah' }, r: '', maps: '' },
  { id: 'brd', wa: '966580641668', phone: '0580641668', t: { ar: 'بريدة', en: 'Buraydah' }, a: { ar: 'بريدة', en: 'Buraydah' }, r: '', maps: '' },
]

export const tracks = [
  { id: 'all', t: { ar: 'كل البرامج', en: 'All programs' } },
  { id: 'diploma', t: { ar: 'الدبلومات', en: 'Diplomas' } },
  { id: 'cert', t: { ar: 'الشهادات المهنية', en: 'Professional certs' } },
  { id: 'kids', t: { ar: 'الأطفال والناشئة', en: 'Kids & teens' } },
]

export const programs = [
  { id: 'ai', track: 'diploma', img: 'ai-hands.jpg', tag: { ar: 'دبلوم', en: 'Diploma' }, t: { ar: 'دبلوم الذكاء الاصطناعي', en: 'Artificial Intelligence Diploma' }, d: { ar: 'أساسيات الذكاء الاصطناعي وتعلّم الآلة وتطبيقاتها العملية، بإشراف مدربين متخصصين.', en: 'AI and machine-learning fundamentals and their practical applications, taught by specialist trainers.' }, k: { ar: ['تعلّم الآلة', 'تحليل البيانات', 'مشاريع تطبيقية'], en: ['Machine learning', 'Data analysis', 'Applied projects'] } },
  { id: 'cyber', track: 'diploma', img: 'cyber.jpg', tag: { ar: 'دبلوم', en: 'Diploma' }, t: { ar: 'دبلوم الأمن السيبراني', en: 'Cybersecurity Diploma' }, d: { ar: 'حماية الشبكات والأنظمة، اكتشاف الثغرات، والاستجابة للحوادث الأمنية.', en: 'Securing networks and systems, finding vulnerabilities and responding to incidents.' }, k: { ar: ['أمن الشبكات', 'الاختراق الأخلاقي', 'الاستجابة للحوادث'], en: ['Network security', 'Ethical hacking', 'Incident response'] } },
  { id: 'cscp', track: 'cert', img: null, tag: { ar: 'شهادة مهنية', en: 'Certification' }, t: { ar: 'التحضير لشهادة CSCP', en: 'CSCP Exam Preparation' }, d: { ar: 'من الصفر حتى الشهادة: جلسات فردية مباشرة، كتب CSCP، أسئلة تدريبية بالشرح، وخطة مذاكرة شخصية.', en: 'From zero to certified: 1-to-1 live sessions, CSCP study books, practice questions with explanations and a personal study plan.' }, k: { ar: ['جلسات 1:1 عبر Zoom', 'بنك أسئلة', 'خطة مذاكرة'], en: ['1:1 Zoom sessions', 'Question bank', 'Study plan'] } },
  { id: 'robot', track: 'kids', img: 'robot-kit.jpg', tag: { ar: 'للأطفال', en: 'Kids' }, t: { ar: 'الروبوت والبرمجة للصغار', en: 'Robotics & Coding for Kids' }, d: { ar: 'يبني الطفل روبوته بنفسه ويبرمجه — تعلّم بالمتعة والتجربة.', en: 'Kids build their own robot and program it — learning through play and experiment.' }, k: { ar: ['بناء روبوت', 'برمجة', 'تفكير منطقي'], en: ['Build a robot', 'Coding', 'Logical thinking'] } },
]

const dict = {
  ar: {
    ribbon: 'نسخة عرض تجريبية — مُعدّة لمعهد ماز العالي للتدريب',
    brand: 'معهد ماز العالي للتدريب', brandEn: 'MAZ HIGHER INSTITUTE OF TRAINING',
    nav: { programs: 'البرامج', campus: 'المعهد', branches: 'الفروع', reviews: 'آراء الخريجين', register: 'سجّل الآن' },
    hero: {
      tag: 'دبلومات وشهادات مهنية · الرياض · جدة · بريدة',
      t1: 'مهارات المستقبل', t2: 'تبدأ من هنا.',
      lead: 'دبلوم الذكاء الاصطناعي، الأمن السيبراني، التحضير للشهادات المهنية، وبرامج الروبوت للصغار — في قاعات مجهّزة وبمدربين متخصصين.',
      cta1: 'استعرض البرامج', cta2: 'اتصل بالرقم الموحد',
      stats: [{ n: '٤', l: 'فروع' }, { n: '+١٩٠', l: 'تقييم على Google' }, { n: '٤٫٣', l: 'تقييم فرع الرجال' }],
    },
    programs: { kicker: 'البرامج التدريبية', title: 'اختر مسارك', details: 'سجّل اهتمامك', soon: 'برامج أخرى تُضاف حسب خطة المعهد.' },
    campus: { kicker: 'المعهد', title: 'بيئة تدريب مجهّزة', p: 'معامل حاسب، قاعات تدريب، ومساحات انتظار مريحة — في فرعي الرياض للرجال والنساء.', labels: { 'computer-lab': 'معمل الحاسب', lobby: 'ردهة المعهد', 'lounge-corridor': 'ممر الفرع النسائي', 'hall-banners': 'قاعة الاستقبال', workstation: 'محطات التدريب', entrance: 'المدخل' } },
    branches: { kicker: 'الفروع', title: 'أقرب فرع لك', wa: 'واتساب الفرع', dir: 'الاتجاهات', hours: 'الأحد – الخميس · ٩:٠٠ ص – ٩:٠٠ م' },
    reviews: { kicker: 'آراء الخريجين', title: 'تجارب حقيقية', note: 'مقتطفات من مراجعات المعهد على خرائط Google.' },
    reg: {
      kicker: 'التسجيل', title: 'سجّل اهتمامك ونتواصل معك',
      sub: 'اختر البرنامج والفرع، ويفتح واتساب برسالة جاهزة لفريق القبول في الفرع.',
      name: 'الاسم', phone: 'الجوال', program: 'البرنامج', branch: 'الفرع', mode: 'طريقة الحضور', modes: ['حضوري', 'عن بُعد'], note: 'سؤال أو ملاحظة',
      send: 'أرسل عبر واتساب', required: 'الرجاء كتابة الاسم ورقم الجوال.',
      msg: { hello: 'السلام عليكم، أرغب بالتسجيل/الاستفسار في معهد ماز', name: 'الاسم', phone: 'الجوال', program: 'البرنامج', branch: 'الفرع', mode: 'الحضور', note: 'ملاحظة' },
    },
    footer: { rights: 'جميع الحقوق محفوظة', demo: 'نسخة عرض تجريبية', unified: 'الرقم الموحد' },
    sticky: { call: 'الرقم الموحد', reg: 'سجّل الآن' },
  },
  en: {
    ribbon: 'Demo preview — prepared for MAZ Higher Institute of Training',
    brand: 'MAZ Higher Institute of Training', brandEn: 'معهد ماز العالي للتدريب',
    nav: { programs: 'Programs', campus: 'Campus', branches: 'Branches', reviews: 'Alumni', register: 'Register' },
    hero: {
      tag: 'Diplomas & professional certs · Riyadh · Jeddah · Buraydah',
      t1: 'Future skills', t2: 'start here.',
      lead: 'AI Diploma, Cybersecurity, professional certification prep and robotics for kids — in equipped classrooms with specialist trainers.',
      cta1: 'Browse programs', cta2: 'Call the unified number',
      stats: [{ n: '4', l: 'branches' }, { n: '190+', l: 'Google reviews' }, { n: '4.3', l: 'men’s branch rating' }],
    },
    programs: { kicker: 'Training programs', title: 'Choose your track', details: 'Register interest', soon: 'More programs are added per the institute’s plan.' },
    campus: { kicker: 'Campus', title: 'An equipped training environment', p: 'Computer labs, training halls and comfortable waiting areas — in the Riyadh men’s and women’s branches.', labels: { 'computer-lab': 'Computer lab', lobby: 'Lobby', 'lounge-corridor': 'Women’s branch', 'hall-banners': 'Reception hall', workstation: 'Workstations', entrance: 'Entrance' } },
    branches: { kicker: 'Branches', title: 'Your nearest branch', wa: 'Branch WhatsApp', dir: 'Directions', hours: 'Sun – Thu · 9:00 AM – 9:00 PM' },
    reviews: { kicker: 'Alumni', title: 'Real experiences', note: 'Excerpts from the institute’s Google Maps reviews (in Arabic).' },
    reg: {
      kicker: 'Registration', title: 'Register your interest',
      sub: 'Pick the program and branch — WhatsApp opens with a ready message to that branch’s admissions team.',
      name: 'Name', phone: 'Mobile', program: 'Program', branch: 'Branch', mode: 'Attendance', modes: ['In person', 'Online'], note: 'Question or note',
      send: 'Send on WhatsApp', required: 'Please enter your name and mobile number.',
      msg: { hello: 'Hello, I would like to register / ask about MAZ Institute', name: 'Name', phone: 'Mobile', program: 'Program', branch: 'Branch', mode: 'Attendance', note: 'Note' },
    },
    footer: { rights: 'All rights reserved', demo: 'Demo preview', unified: 'Unified number' },
    sticky: { call: 'Unified no.', reg: 'Register' },
  },
}
export const t = computed(() => dict[lang.value])

export const reviews = [
  { n: 'Mousa', q: 'أشكر القائمين على المعهد، وأخص بالشكر الدكتور الطيب على شرحه وتعامله مع الطلبة والمتدربين في دبلوم الذكاء الاصطناعي.' },
  { n: 'Madf', q: 'استفدت كثير منهم وكانت أروع رحلة دراسية، والحمدلله تم التخرج، وبتعاون كبير من الإدارة حتى بعد التخرج.' },
  { n: 'Naif', q: 'ألف تحية للدكتور أبو حامد الطيب والدكتور راكان، ونعم فيه شرح وتعامل طيب وتعاون.' },
]
