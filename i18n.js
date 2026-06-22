/* ─────────────────────────────────────────────────────────────
   Zain · website i18n
   English ↔ Arabic switcher with localStorage persistence,
   RTL toggling, and Arabic-font swap. Translations are
   editorial, not literal — they aim to carry the tone of the
   app into natural Arabic.
   ───────────────────────────────────────────────────────────── */
(() => {
  'use strict';

  const STORAGE_KEY = 'zain.lang';
  const SUPPORTED = ['en', 'ar'];

  // ── Translations dictionary ─────────────────────────────────
  // Keys are namespaced by page section. Values are HTML
  // (so <em>, <br>, <strong> survive). Arabic versions
  // intentionally drop italics where they read poorly.
  const I18N = {
    ar: {
      /* ── shared chrome ───────────────────────────────── */
      'doc.title.home':        'زين — رفيقٌ يوميّ لحياةٍ تعيشها بنيّة',
      'doc.desc.home':         'زين بيتٌ للممارسات الصغيرة التي تتراكم لتصنع حياةً ذات معنى — عادات، قراءة، يوميّات، رياضة، ومجتمعٌ صادق. لا تطبيقاتٌ أخرى. تطبيقٌ واحد، عنك أنت.',

      'nav.app':               'التطبيق',
      'nav.habits':            'العادات',
      'nav.library':           'المكتبة',
      'nav.journal':           'اليوميّات',
      'nav.community':         'المجتمع',
      'nav.day':               'يومٌ مع زين',
      'nav.download':          'تحميل',
      'nav.brand_aria':        'زين — الصفحة الرئيسية',
      'nav.sections_aria':     'الأقسام',
      'nav.lang_toggle':       'English',
      'nav.lang_toggle_aria':  'التبديل إلى الإنجليزية',

      /* ── masthead dateline ───────────────────────────── */
      'masthead.dateline':     'المجلّد الأول · ربيع 2026 · إصدار المعاينة · <em>thezainapp.com</em>',

      /* ── hero ────────────────────────────────────────── */
      'hero.kicker':           'رفيقُك اليوميّ',
      'hero.title':            'صُمِّمَ لك. <br class="br-mobile" />بنيّةٍ خالصة.',
      'hero.lede':             'بيتٌ للممارسات الصغيرة التي تتراكم لتصنع حياةً ذات معنى — <strong>عاداتك</strong>، و<strong>قراءاتك</strong>، و<strong>يوميّاتك</strong>، و<strong>رياضتك</strong>، و<strong>مجتمعٌ</strong> يقف معك بصدق. لا تطبيقاتٌ أخرى. تطبيقٌ واحد، عنك أنت.',
      'hero.cta_download':     'تحميل التطبيق',
      'hero.cta_explore':      'تصفّح ما بداخله',
      'hero.meta':             'مجّاني الاستخدام · بلا إعلانات، بلا اشتراكات',
      'hero.alt':              'الشاشة الرئيسية لتطبيق زين في وضع الليل — عادات اليوم، والقراءة، ودعوةٌ هادئة للتأمّل.',

      /* ── pillars ─────────────────────────────────────── */
      'pillars.kicker':        'داخل التطبيق',
      'pillars.title':         'ستُّ غرفٍ مرتَّبة بعناية.<br /><em>رفيقٌ واحد.</em>',
      'pillars.lede':          'معظم التطبيقات تشدّك في عشرة اتجاهات. زين له ستٌّ فقط، اخترناها بعناية، كأقسامِ دفترٍ مرتَّب.',

      'pillars.habits.kicker': 'الشعيرة اليومية',
      'pillars.habits.title':  'العادات',
      'pillars.habits.body':   'سلاسلُ لا تُعاتبك. وقوائمُ تَسنُد الأيّام التي تحتاج إلى سند.',

      'pillars.lib.kicker':    'المكتبة',
      'pillars.lib.title':     'القراءة',
      'pillars.lib.body':      'رفٌّ لكلّ كتابٍ مرّ بين يديك، ومعه الملاحظات والمقاطع التي تودّ تذكّرها.',

      'pillars.jrn.kicker':    'اليوميّات',
      'pillars.jrn.title':     'المذكّرات',
      'pillars.jrn.body':      'امتنان، تأمّل، قوائم، رسائل. مكانٌ أرفقُ من ورقةٍ فارغة.',

      'pillars.com.kicker':    'المُلتقى',
      'pillars.com.title':     'المجتمع',
      'pillars.com.body':      'صفحةٌ هادئة لمن تثق بهم — نوادي قراءة، تحدّيات عادات، انتصاراتٌ صغيرة.',

      'pillars.fit.kicker':    'السجلّ الرياضي',
      'pillars.fit.title':     'الرياضة',
      'pillars.fit.body':      'مَشيُك، تمارينك، أرقامك الشخصية — مِلفُّ جسدٍ تُبقيه في حركة.',

      'pillars.ins.kicker':    'السجلّ',
      'pillars.ins.title':     'تأمّلات',
      'pillars.ins.body':      'قراءاتٌ أسبوعية من بياناتك أنت. أنماطٌ تستطيع الاستفادة منها فعلاً.',

      'pillars.read_more':     'اقرأ المزيد ←',

      /* ── habits feature ──────────────────────────────── */
      'feat.habits.kicker':    'زاوية الشعيرة اليومية',
      'feat.habits.title':     'ابنِ عادةً <em>تَدومُ فعلاً.</em>',
      'feat.habits.lede':      'متتبّعُ العادات يجب ألّا يُشعرك بالذنب يوم تتعثّر. بَنينا زين حول سلاسلَ تستحقّها أنت، وقوائمَ تَسنُدك حين يصعب اليوم.',
      'feat.habits.li1':       'عاداتٌ يومية وأسبوعية وقوائم — كلٌّ بإيقاعها.',
      'feat.habits.li2':       'تقاويمُ سلاسل تحتفي بك، ولا تُعاتبك.',
      'feat.habits.li3':       'تحدّياتٌ مع الأصدقاء — شيءٌ صغير، نفعله معاً.',
      'feat.habits.li4':       'تذكيراتٌ لطيفة — بلا إلحاحٍ، بلا ضجيج.',
      'feat.habits.alt':       'تحدّي عادةٍ في مجتمع زين — يمكنك خوضه وحدك أو دعوة صديق.',

      /* ── library feature ─────────────────────────────── */
      'feat.lib.kicker':       'طاولة المكتبة',
      'feat.lib.title':        'اقرأ ما يهمّ. <em>واحفظ ما قرأت.</em>',
      'feat.lib.lede':         'رفٌّ لكلّ كتابٍ أنت في منتصفه. ومكانٌ للمقاطع والأفكار التي قد تَفلتُ منك لولاه. ونوادي قراءة مع من تودّ القراءة معهم فعلاً.',
      'feat.lib.li1':          'تتبّع ما تقرأه الآن، وما أنهيته، وما تنوي قراءته.',
      'feat.lib.li2':          'اقتباساتٌ وملاحظات، محفوظةٌ مع كلّ كتاب.',
      'feat.lib.li3':          'أهدافُ قراءةٍ بلا ضغطِ ترتيبٍ أو منافسة.',
      'feat.lib.li4':          'نوادي قراءةٍ خاصّة — صغيرة، حميمة، حقيقية.',
      'feat.lib.alt':          'غرفة القراءة — 54 كتاباً، قائمة الجاري قراءته، ومجموعاتٌ منتقاة.',

      /* ── journal feature ─────────────────────────────── */
      'feat.jrn.kicker':       'اليوميّات',
      'feat.jrn.title':        'مكانٌ أرفقُ <em>من ورقةٍ فارغة.</em>',
      'feat.jrn.lede':         'امتنانٌ في الصباحات التي تحتاج إليه. وتأمّلٌ حين يطلبُ اليوم منك المزيد. قوائم، ورسائل، وملاحظاتٌ صغيرة تصبح، حين تُعاد قراءتها لاحقاً، حياةً كاملة.',
      'feat.jrn.li1':          'ستّةُ أنواعٍ من التدوين، لكلٍّ مزاجُه ولونُه.',
      'feat.jrn.li2':          'يعمل دون إنترنت — اكتب في الطائرة، في نُزهة، في أيّ مكان.',
      'feat.jrn.li3':          'قابلٌ للبحث، خاصّ، ملكٌ لك.',
      'feat.jrn.li4':          'محفِّزاتٌ اختيارية، بلا إلزام.',
      'feat.jrn.alt':          'يوميّاتك هذا الأسبوع — مقاطعٌ حُفِظت على مدى الأيّام، مصفوفةٌ بهدوء.',

      /* ── community feature ───────────────────────────── */
      'feat.com.kicker':       'المُلتقى',
      'feat.com.title':        'مجتمعٌ <em>في صفّك.</em>',
      'feat.com.lede':         'مجتمعٌ صفحتُه الأولى نوادي قراءةٍ، وتحدّياتُ عادات، وانتصاراتٌ صغيرة. لا أعدادَ متابعين معروضة. لا غضب. ولا تمريرٌ لا ينتهي صُمِّم ليؤذيك.',
      'feat.com.li1':          'منشوراتٌ تحتفي بالسلاسل والكتب والتأمّلات.',
      'feat.com.li2':          'نوادي قراءةٍ بملاحظاتٍ ونقاشاتٍ مشتركة.',
      'feat.com.li3':          'تحدّياتُ عاداتٍ مع أقرب الناس إليك.',
      'feat.com.li4':          'صفحةٌ تستطيع إغلاقها دون أن تفتقدها.',
      'feat.com.alt':          'صفحة المجتمع — جَريُ صديق، عشرة كيلومترات أُنجزت، وتحيّاتٌ ممّن يهتمّون.',

      /* ── fitness feature ─────────────────────────────── */
      'feat.fit.kicker':       'السجلّ الرياضي',
      'feat.fit.title':        'مِلفٌّ هادئ <em>لجسدٍ في حركة.</em>',
      'feat.fit.lede':         'خطوات، ومَشي، وتمارين، وأرقامٌ شخصية — تُحفَظ كما يحفظُها سجلٌّ رياضي صباحي. ورقٌ ناصع. وذهبٌ يُمنَحُ للأرقامِ التي تستحقّه.',
      'feat.fit.li1':          'مزامنةٌ مع Apple Health وGarmin — تضبطها مرّةً وتنسى.',
      'feat.fit.li2':          'أرقامُك الشخصية — يُحتفى بها بذَهبِ الفوز.',
      'feat.fit.li3':          'ملخّصاتٌ يومية وأسبوعية وشهرية.',
      'feat.fit.li4':          'تحدّياتٌ رياضية مع الأصدقاء، لا مع الغرباء.',
      'feat.fit.alt':          'لوحة الرياضة — آخر اثني عشر أسبوعاً، دفتر الأرقام، والأرقام الشخصية المُستحقَّة.',

      /* ── day in zain ─────────────────────────────────── */
      'day.kicker':            'يومٌ مع زين',
      'day.title':             'كيف <em>يلتئمُ اليوم.</em>',
      'day.lede':              'الرفيقُ لا يُجدي إلّا إذا توافق مع إيقاع يومك. هكذا يفعل رفيقُنا عادةً.',

      'day.t1.title':          'طقسُ الصباح',
      'day.t1.body':           'ثلاثُ عاداتٍ تهمّك، تُسجَّل بهدوء. وملاحظةُ امتنانٍ إن كان اليوم يستدعيها.',

      'day.t2.title':          'فصلٌ قبل العمل',
      'day.t2.body':           'عشرُ صفحات. اقتباس. فكرةٌ عابرة، تُحفَظ مع الكتاب.',

      'day.t3.title':          'مَشيٌ، مُسجَّل',
      'day.t3.body':           'تتكفّلُ بها Apple Health. لا حاجة إلى المتابعة — السجلُّ الرياضي يحفظُ كلّ شيء.',

      'day.t4.title':          'ملاحظةٌ إلى نفسك',
      'day.t4.body':           'تأمّلٌ قصير. امتنان. قائمةٌ بما أعطاكَ إيّاه اليوم.',

      'day.t5.title':          'خِتامٌ هادئ',
      'day.t5.body':           'ثلاثُ عاداتٍ تمّت. وصفحةٌ سَبَقَت من الكتاب. وغداً صار أرفقَ قليلاً.',

      /* ── pull quote ──────────────────────────────────── */
      'pq.body':               'جرّبتُ كلّ تطبيقات العادات. هذا أوّلُ تطبيقٍ شعرتُ أنّه <em>في صفّي،</em> لا يُحاسبني عليّ.',
      'pq.cite':               '— قارئٌ من لندن',

      /* ── download ────────────────────────────────────── */
      'dl.kicker':             'التطبيق',
      'dl.title':              'متوفّرٌ الآن <em>على iPhone وAndroid.</em>',
      'dl.lede':               'مجّاني الاستخدام. بلا إعلاناتٍ ولا اشتراكات — التطبيقُ كاملاً، بكلّ ميزاته، من أوّل فتحة.',
      'dl.appstore':           'تحميله من App Store',
      'dl.playstore':          'الحصول عليه من Google Play',
      'dl.b1':                 'لا حاجة إلى حسابٍ لمجرّد التصفّح.',
      'dl.b2':                 'يعمل دون إنترنت. يوميّاتُك تكتبها في الطائرة.',
      'dl.b3':                 'بلا إعلانات. أبداً. انتباهُك ليس سلعةً تُباع.',

      /* ── updates / waitlist ──────────────────────────── */
      'up.kicker':             'النشرة',
      'up.title':              'رسالةٌ قصيرة، <em>بين الحينِ والآخر.</em>',
      'up.lede':               'تحديثاتٌ عن التطبيق، تأمّلاتٌ بين الحين والآخر، وقائمةُ قراءاتٍ موسمية. بلا إزعاج. تستطيعُ المغادرةَ متى شئت.',
      'up.placeholder':        'you@thezainapp.com',
      'up.submit':             'الاشتراك',
      'up.success':            'سُجِّلَ اسمُك. سنكتبُ إليك حين يكونُ لدينا ما يستحقّ القول.',
      'up.fine':               'بريدٌ واحد. وإلغاءٌ بلمسةٍ واحدة.',
      'up.email_label':        'بريدك الإلكتروني',

      /* ── footer ──────────────────────────────────────── */
      'ft.tagline':            'رفيقٌ يوميّ لحياةٍ تعيشُها بنيّة.',
      'ft.app':                'التطبيق',
      'ft.inside':             'ما بداخله',
      'ft.day':                'يومٌ مع زين',
      'ft.download':           'تحميل',
      'ft.support':            'الدعم',
      'ft.help':               'مركز المساعدة',
      'ft.delete':             'حذف الحساب',
      'ft.legal':              'الشؤون القانونية',
      'ft.privacy':            'الخصوصية',
      'ft.terms':              'الشروط',
      'ft.colophon':           'زين · المجلّد الأول · صُنع بعناية في 2026 · بحروف Georgia وInter وAmiri · مطبوعٌ على الشبكة.',
      'ft.footer_aria':        'تذييل الصفحة',

      /* ── sticky CTA ──────────────────────────────────── */
      'sticky.copy':           'زين · رفيقُك اليوميّ',
      'sticky.download':       'تحميل',

      /* ── support page ────────────────────────────────── */
      'doc.title.support':     'الدعم ومركز المساعدة - تطبيق زين',
      'sup.title':             'المساعدة والدعم',
      'sup.subtitle':          'نحن هنا لنساعدك على العيش بنيّة.',
      'sup.quick.title':       'روابطُ سريعة',
      'sup.quick.lede':        'انتقل إلى ما تحتاجه:',
      'sup.quick.faq':         'الأسئلة الشائعة',
      'sup.quick.contact':     'تواصل معنا',
      'sup.quick.delete':      'حذف الحساب',
      'sup.faq.title':         'الأسئلة الشائعة',
      'sup.contact.title':     'تواصل معنا',

      /* ── privacy page ────────────────────────────────── */
      'doc.title.privacy':     'سياسة الخصوصية - تطبيق زين',
      'priv.title':            'سياسة الخصوصية',
      'priv.subtitle':         'خصوصيتُك تهمّنا. هذا ما نجمعه، ولِمَ، وكيف نحميه.',

      /* ── terms page ──────────────────────────────────── */
      'doc.title.terms':       'شروط الخدمة - تطبيق زين',
      'tos.title':             'شروط الخدمة',
      'tos.subtitle':          'القواعد البسيطة التي تحكم استخدامك لزين.',

      /* ── delete account page ─────────────────────────── */
      'doc.title.delete':      'حذف الحساب - تطبيق زين',
      'del.title':             'حذف حسابك',
      'del.subtitle':          'نحن نحترم حقّك في المغادرة. هكذا تحذف حسابك وبياناتك.',

      /* ── 404 page ────────────────────────────────────── */
      'doc.title.404':         '404 - الصفحة غير موجودة | زين',
      'nf.title':              'الصفحة غير موجودة',
      'nf.subtitle':           'الصفحة التي تبحث عنها لا وجود لها. ربّما انتقلت، أو حُذفت، أو لم تكن هنا أصلاً.',
      'nf.home':               'العودة إلى الصفحة الرئيسية',

      /* ── legacy navbar (used on support/privacy/terms/delete/404) ── */
      'navx.features':         'المميّزات',
      'navx.pricing':          'الأسعار',
      'navx.support':          'الدعم',
      'navx.download':         'حمّل التطبيق',
      'navx.logo_alt':         'شعار زين',
      'navx.menu':             'القائمة',

      /* ── legacy footer ──────────────────────────────── */
      'ftx.tagline':           'عِشْ بِنيّة.<br>كلُّ عادة. كلُّ تأمّل. كلُّ هدف.',
      'ftx.product':           'المنتج',
      'ftx.features':          'المميّزات',
      'ftx.pricing':           'الأسعار',
      'ftx.download':          'تحميل',
      'ftx.support':           'الدعم',
      'ftx.help':              'مركز المساعدة',
      'ftx.contact':           'تواصل معنا',
      'ftx.delete':            'حذف الحساب',
      'ftx.legal':             'الشؤون القانونية',
      'ftx.privacy':           'سياسة الخصوصية',
      'ftx.terms':             'شروط الخدمة',
      'ftx.copyright':         '© 2026 تطبيق زين. جميع الحقوق محفوظة.',

      /* ── legal pages — shared notice + meta ─────────── */
      'legal.updated_prefix':  'آخر تحديث:',
      'legal.ar_notice':       'هذه النسخة العربية ترجمةٌ لغوية تُسهّل القراءة. النصُّ الإنجليزي هو المرجعُ القانوني الرسمي.',

      /* ── support page sections (deeper) ─────────────── */
      'sup.faq.q1':            'كيف أبدأ مع زين؟',
      'sup.contact.lede':      'لم تجد إجابتك؟ راسلنا — نردّ عادةً خلال يوم عمل.',

      /* ── delete account page ─────────────────────────── */
      'del.intro':             'إن كنتَ ترغب في مغادرة زين، فهذه هي الخطوات. سنحذف بياناتك من خوادمنا خلال 30 يوماً.',

      /* ── deep-link / "open in app" landing page ─────── */
      'open.tagline':          'عِشْ بِنيّة',
      'open.default_msg':      'شخصٌ ما شاركك شيئاً',
      'open.default_detail':   'افتح تطبيق زين لتراه، أو حمّله إن لم يكن عندك.',
      'open.open_btn':         'افتح في زين',
      'open.divider':          'أو حمّل التطبيق',
    },
  };

  // ── Apply language ──────────────────────────────────────────
  function applyLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body && document.body.classList.toggle('lang-ar', lang === 'ar');

    // innerHTML translations
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!el.hasAttribute('data-i18n-en')) {
        el.setAttribute('data-i18n-en', el.innerHTML);
      }
      if (lang === 'ar' && I18N.ar[key] !== undefined) {
        el.innerHTML = I18N.ar[key];
      } else {
        el.innerHTML = el.getAttribute('data-i18n-en');
      }
    });

    // image src swap by language: data-i18n-src="ar:assets/screenshots/ar/home.jpg"
    // Drop multiple pairs comma-separated if more locales are added later.
    // Falls back to the original src when no entry exists for the current lang.
    document.querySelectorAll('[data-i18n-src]').forEach((el) => {
      if (!el.hasAttribute('data-i18n-en-src')) {
        el.setAttribute('data-i18n-en-src', el.getAttribute('src') || '');
      }
      const map = {};
      el.getAttribute('data-i18n-src').split(',').forEach((pair) => {
        const [code, path] = pair.split(':').map((s) => s.trim());
        if (code && path) map[code] = path;
      });
      const next = map[lang] || el.getAttribute('data-i18n-en-src');
      if (el.getAttribute('src') !== next) {
        el.setAttribute('src', next);
      }
    });

    // attribute translations: data-i18n-attr="attr:key,attr:key"
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (!attr || !key) return;
        const origAttr = `data-i18n-en-${attr}`;
        if (!el.hasAttribute(origAttr)) {
          el.setAttribute(origAttr, el.getAttribute(attr) || '');
        }
        if (lang === 'ar' && I18N.ar[key] !== undefined) {
          el.setAttribute(attr, I18N.ar[key]);
        } else {
          el.setAttribute(attr, el.getAttribute(origAttr));
        }
      });
    });

    // document <title>
    const titleEl = document.querySelector('title[data-i18n-title]');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n-title');
      if (!titleEl.hasAttribute('data-i18n-en')) {
        titleEl.setAttribute('data-i18n-en', titleEl.textContent);
      }
      titleEl.textContent =
        lang === 'ar' && I18N.ar[key] !== undefined
          ? I18N.ar[key]
          : titleEl.getAttribute('data-i18n-en');
    }

    // meta description
    const descEl = document.querySelector('meta[name="description"][data-i18n-content]');
    if (descEl) {
      const key = descEl.getAttribute('data-i18n-content');
      if (!descEl.hasAttribute('data-i18n-en')) {
        descEl.setAttribute('data-i18n-en', descEl.getAttribute('content') || '');
      }
      descEl.setAttribute(
        'content',
        lang === 'ar' && I18N.ar[key] !== undefined
          ? I18N.ar[key]
          : descEl.getAttribute('data-i18n-en')
      );
    }

    // toggle button label — show the *other* language
    document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
      btn.textContent = lang === 'ar' ? 'English' : 'العربية';
      btn.setAttribute(
        'aria-label',
        lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'
      );
      btn.setAttribute('lang', lang === 'ar' ? 'en' : 'ar');
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) { /* noop */ }
  }

  function detectLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) { /* noop */ }
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('ar')) return 'ar';
    return 'en';
  }

  // Expose
  window.ZainI18N = { apply: applyLanguage, detect: detectLang };

  // Auto-init when the DOM is ready
  function init() {
    const lang = detectLang();
    applyLanguage(lang);

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang-toggle]');
      if (!btn) return;
      e.preventDefault();
      const current = document.documentElement.lang === 'ar' ? 'ar' : 'en';
      applyLanguage(current === 'ar' ? 'en' : 'ar');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
