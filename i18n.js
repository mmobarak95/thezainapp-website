/* ─────────────────────────────────────────────────────────────
   Zain · website i18n
   English is the page itself; Arabic and Turkish are dictionaries
   over it. Arabic is softened Modern Standard — never a dialect,
   genderless (nominal sentences, no imperatives, no second-person
   present verbs), no hype, no exclamation marks, Western digits.
   The switch changes the copy only: the phones keep the English
   screens, because those are real recordings of the app.
   Brand names (App Store, Google Play) are not translated.
   ───────────────────────────────────────────────────────────── */
(() => {
  'use strict';

  const STORAGE_KEY = 'zain.lang';
  const SUPPORTED = ['en', 'ar', 'tr'];
  const RTL = ['ar'];

  const I18N = {

    /* ══ العربية ══════════════════════════════════════════════ */
    ar: {
      /* ── document ────────────────────────────────────── */
      'doc.title':          'زين — خطة تتغيّر معك',
      'doc.desc':           'هدفك بكلماتك أنت. يحوّله زين إلى خطة أسبوعاً بأسبوع، ويضعه في تقويمك إلى جانب عاداتك، ثم يعدّل الخطة كل أسبوع وفق ما تحقّق فعلاً. أمّا الهدف فيبقى كما هو.',
      'a11y.skip':          'الانتقال إلى المحتوى',

      /* ── masthead ────────────────────────────────────── */
      'nav.what':           'ما يفعله',
      'nav.week':           'أسبوعك',
      'nav.download':       'التحميل',
      'nav.get':            'تحميل زين',
      'nav.brand_aria':     'زين',
      'nav.sections_aria':  'الأقسام',
      'nav.lang_aria':      'اللغة',

      /* ── hero ────────────────────────────────────────── */
      'hero.eyebrow':       'عادات · يوميّات · كتب · تدريب',
      'hero.title':         'وضع الخطة لم يكن يوماً هو الجزء الصعب.',
      'hero.title2':        'زين يصنع خطة تتغيّر معك.',
      'hero.body':          'هدفك بكلماتك أنت. يحوّله زين إلى خطة أسبوعاً بأسبوع، ويضعه في تقويمك إلى جانب عاداتك، ثم يعدّل الخطة كل أسبوع وفق ما تحقّق فعلاً. أمّا الهدف فيبقى كما هو.',
      'hero.note':          'البداية مجّانية. ذكاء زين يفتح للجميع في 15 سبتمبر.',
      'hero.clip_alt':      'هدف يُكتب في زين بكلمات بسيطة.',

      /* ── the bad week ────────────────────────────────── */
      'bad.eyebrow':        'اثنا عشر أسبوعاً، نقطة لكل يوم',
      'bad.title':          'كل خطة وضعتُها كانت تبدو هكذا.',
      'bad.body':           'الأسبوع الأول سهل. الأسبوع الثاني في معظمه. ثم أسبوع سيّئ واحد، ولا شيء بعده. نضع الخطة في يوم جيّد، والحياة لا تتألف من أيام جيّدة وحدها. حين تداعى أسبوعي، طلبت الخطة الشيء نفسه على أي حال. فتوقّفت، كما يتوقّف الجميع.',

      /* ── what Zain does with a week ──────────────────── */
      'week.eyebrow':       'ما يفعله زين بأسبوعك',
      'week.s1.title':      'تدخل الخطة في أيامك.',
      'week.s1.body':       'يضع زين هدفك في تقويمك، إلى جانب عاداتك. كل يوم يعرض الخطوة الصغيرة التالية، والغاية منها. وبمجرد إتمامها، يعرف زين.',
      'week.s1.clip_alt':   'الشاشة الرئيسية، وفيها جلسة اليوم إلى جانب عادات اليوم، ثم إتمامها.',
      'week.s2.title':      'يعرف زين أسبوعك كما جرى فعلاً.',
      'week.s2.body':       'لا الركضات المخطّطة، بل التي تمّت بالفعل. كل يوم اثنين تنتظر الملاحظة في شاشتك الرئيسية، وتقول رأيها بكلمات واضحة.',
      'week.s2.clip_alt':   'قراءة للأسبوع: الجلسات المنجزة، والتي فاتت، وملاحظة المدرّب عنها.',
      'week.s3.title':      'يعدّل زين الخطة، والهدف يبقى في مساره.',
      'week.s3.body':       'حين يتبدّل الأسبوع يوم الثلاثاء، يكفي إخبار زين بما يجري، بكلماتك أنت. ويتغيّر تقويمك وفق الخطة المعدّلة.',
      'week.s3.clip_alt':   'سطر مكتوب إلى المدرّب، ثم الرد الذي يظهر بالأسبوع المعدّل.',

      /* ── the foundation ──────────────────────────────── */
      'found.title':        'مكان واحد، وتقويم يتكيّف مع حياتك.',
      'found.body':         'عاداتك ويوميّاتك وكتبك وتدريبك في تطبيق واحد. تلك هي الصفحة التي تقرأها الخطة، لترى صورتك كاملة لا الهدف وحده.',
      'found.c1.label':     'العادات والتدريب',
      'found.c1.line':      'عادات اليوم وجلسة اليوم في قائمة واحدة.',
      'found.c1.alt':       'عادات اليوم وجلسة التدريب في قائمة واحدة.',
      'found.c2.label':     'اليوميّات',
      'found.c2.line':      'تدوين اليوم، والعودة إليه لاحقاً.',
      'found.c2.alt':       'اليوميّات، وفيها ما كُتب هذا الأسبوع.',
      'found.c3.label':     'الكتب',
      'found.c3.line':      'الكتاب الحالي، وموضع القراءة، والسطور المحفوظة.',
      'found.c3.alt':       'الكتاب قيد القراءة، والرفّ خلفه.',
      'found.c4.label':     'المجتمع',
      'found.c4.line':      'أشخاص يعملون على أسابيعهم، كل بإيقاعه.',
      'found.c4.alt':       'تدفّق المجتمع أثناء التمرير.',

      /* ── why not just a chatbot ──────────────────────── */
      'why.eyebrow':        'ولماذا لا تكفي نافذة محادثة؟',
      'why.title':          'نافذة المحادثة تستطيع كتابة خطة. <span class="ox">لكنها لا ترى أسبوعك.</span>',
      'why.c1.title':       'زين معك خلال أسبوعك',
      'why.c1.body':        'لا حاجة إلى شرح ما جرى. العادات المُنجزة، والركضات التي سجّلتها الساعة، وتلك التي فاتت. زين يعرفها سلفاً، فلا شيء يحتاج إلى كتابته.',
      'why.c1.alt':         'قراءة المدرّب للأسبوع، والجلسات التي احتسبها.',
      'why.c2.title':       'زين هو من يأتي إليك',
      'why.c2.body':        'صباح الاثنين تنتظر الملاحظة في الشاشة الرئيسية. وإذا فاتت جلستان من الخطة في أسبوع واحد، يساعد زين في إعادة ترتيب الأسبوع للعودة إلى المسار.',
      'why.c2.alt':         'الشاشة الرئيسية، وملاحظة الخطة تنتظر بين عادات اليوم.',
      'why.c3.title':       'والهدف يبقى في مساره',
      'why.c3.body':        'يُعيد ترتيب الأسبوع بالقدر الذي يلزم. الهدف يتكيّف مع مجرى حياتك، فيبقى في متناولك دائماً.',
      'why.c3.alt':         'شاشة الخطة، وفيها جلسات هذا الأسبوع.',

      /* ── where this is, what stays yours ─────────────── */
      'where.a.title':      'أين نحن الآن',
      'where.a.l1':         'إطلاق هادئ في يونيو بين الأصدقاء والعائلة.',
      'where.a.l2':         'ذكاء زين يفتح للجميع في 15 سبتمبر.',
      'where.a.l3':         'الإنجليزية والعربية والتركية، والاتجاه من اليمين إلى اليسار أولاً، ولغات أخرى تتبع.',
      'where.b.title':      'ما يبقى لك وحدك',
      'where.b.l1':         'لا إعلانات.',
      'where.b.l2':         'اختيار من يرى كل ملاحظة يعود إليك.',
      'where.b.l3':         'والملاحظات الخاصة بك وحدك لا يقرأها المدرّب.',

      /* ── close and download ──────────────────────────── */
      'close.g1':           'كل خطة سابقة',
      'close.g2':           'الخطة الحالية · الأسبوع التاسع',
      'close.title':        'أسبوع سيّئ واحد كان ينهي الخطة. <span class="ox">مع زين، تتغيّر الخطة ويستمر المسير.</span>',
      'close.note':         'البداية مجّانية.',
      'letter.title':       'رسالة قصيرة، بين الحين والآخر.',
      'letter.label':       'بريدك الإلكتروني',
      'letter.submit':      'الاشتراك',
      'letter.note':        'أخبار المنتج بين وقت وآخر. وإلغاء الاشتراك متاح في أي وقت.',
      'letter.ok':          'الاشتراك مسجّل. وسنكتب حين يكون هناك ما يستحق القول.',

      /* ── footer ──────────────────────────────────────── */
      'ft.line':            'زين يصنع خطة تتغيّر معك.',
      'ft.nav_aria':        'تذييل الصفحة',
      'ft.support':         'الدعم',
      'ft.delete':          'حذف الحساب',
      'ft.privacy':         'الخصوصية',
      'ft.terms':           'الشروط',
      'ft.made':            'صُنع بعناية في 2026',

      /* ── secondary pages (unchanged copy, carried over) ─ */
      'doc.title.support': 'الدعم ومركز المساعدة - تطبيق زين',
      'sup.title': 'المساعدة والدعم',
      'sup.subtitle': 'نحن هنا لنساعدك على العيش بنيّة.',
      'sup.quick.title': 'روابطُ سريعة',
      'sup.quick.lede': 'الانتقال إلى ما يلزم:',
      'sup.quick.faq': 'الأسئلة الشائعة',
      'sup.quick.contact': 'تواصل معنا',
      'sup.quick.delete': 'حذف الحساب',
      'sup.faq.title': 'الأسئلة الشائعة',
      'sup.contact.title': 'تواصل معنا',
      'doc.title.privacy': 'سياسة الخصوصية - تطبيق زين',
      'priv.title': 'سياسة الخصوصية',
      'priv.subtitle': 'خصوصيتُك تهمّنا. هذا ما نجمعه، ولِمَ، وكيف نحميه.',
      'doc.title.terms': 'شروط الخدمة - تطبيق زين',
      'tos.title': 'شروط الخدمة',
      'tos.subtitle': 'القواعد البسيطة التي تحكم استخدامك لزين.',
      'doc.title.delete': 'حذف الحساب - تطبيق زين',
      'del.title': 'حذف حسابك',
      'del.subtitle': 'نحن نحترم حقّك في المغادرة. هكذا تحذف حسابك وبياناتك.',
      'doc.title.404': '404 - الصفحة غير موجودة | زين',
      'nf.title': 'الصفحة غير موجودة',
      'nf.subtitle': 'الصفحة المطلوبة غير موجودة. ربّما انتقلت، أو حُذفت، أو لم تكن هنا أصلاً.',
      'nf.home': 'العودة إلى الصفحة الرئيسية',
      'legal.updated_prefix': 'آخر تحديث:',
      'legal.ar_notice': 'هذه النسخة العربية ترجمةٌ لغوية تُسهّل القراءة. النصُّ الإنجليزي هو المرجعُ القانوني الرسمي.',
      'sup.faq.q1': 'كيف أبدأ مع زين؟',
      'sup.contact.lede': 'لم تكن الإجابة هنا؟ المراسلة متاحة، والرد عادةً خلال يوم عمل.',
      'del.intro': 'عند الرغبة في مغادرة زين، هذه هي الخطوات. وسنحذف بياناتك من خوادمنا خلال 30 يوماً.',
      'open.tagline': 'عِشْ بِنيّة',
      'open.default_msg': 'شخصٌ ما شاركك شيئاً',
      'open.default_detail': 'فتح تطبيق زين لعرضه، أو تحميله عند عدم توفّره.',
      'open.open_btn': 'الفتح في زين',
      'open.divider': 'أو تحميل التطبيق',
    },

    /* ══ Türkçe ═══════════════════════════════════════════════ */
    tr: {
      /* ── document ────────────────────────────────────── */
      'doc.title':          'Zain — seninle birlikte değişen bir plan',
      'doc.desc':           'Neye çalıştığını kendi kelimelerinle söyle. Zain bunu haftadan haftaya bir plana çevirir, alışkanlıklarının yanına takvimine koyar ve her hafta gerçekte yaptıklarına göre değiştirir. Hedefi değil.',
      'a11y.skip':          'İçeriğe geç',

      /* ── masthead ────────────────────────────────────── */
      'nav.what':           'Ne yapar',
      'nav.week':           'Senin haftan',
      'nav.download':       'İndir',
      'nav.get':            'Zain’i edin',
      'nav.brand_aria':     'Zain',
      'nav.sections_aria':  'Bölümler',
      'nav.lang_aria':      'Dil',

      /* ── hero ────────────────────────────────────────── */
      'hero.eyebrow':       'Alışkanlıklar · Günlük · Kitaplar · Antrenman',
      'hero.title':         'Planı yapmak hiçbir zaman zor kısım değildi.',
      'hero.title2':        'Zain, seninle birlikte değişen bir plan yapar.',
      'hero.body':          'Neye çalıştığını kendi kelimelerinle söyle. Zain bunu haftadan haftaya bir plana çevirir, alışkanlıklarının yanına takvimine koyar ve her hafta gerçekte yaptıklarına göre değiştirir. Hedefi değil.',
      'hero.note':          'Başlaması ücretsiz. Zain zekâsı 15 Eylül’de herkese açılıyor.',
      'hero.clip_alt':      'Bir hedefin Zain’e sade kelimelerle yazılışı.',

      /* ── the bad week ────────────────────────────────── */
      'bad.eyebrow':        'On iki hafta, günde bir nokta',
      'bad.title':          'Yaptığım her plan böyle görünürdü.',
      'bad.body':           'Birinci hafta kolay. İkinci hafta çoğunlukla. Sonra kötü bir hafta ve ardından hiçbir şey. Plan iyi bir günde yazılır, hayatın ise yalnızca iyi günleri yoktur. Haftam dağıldığında plan yine aynı şeyi istedi. Ben de herkesin yaptığı gibi bıraktım.',

      /* ── what Zain does with a week ──────────────────── */
      'week.eyebrow':       'Zain bir haftayla ne yapar',
      'week.s1.title':      'Günlerine yerleşir.',
      'week.s1.body':       'Zain hedefini alışkanlıklarının yanına, takvimine koyar. Her gün bir sonraki küçük adımı ve neye yaradığını gösterir. İşaretlediğinde Zain bilir.',
      'week.s1.clip_alt':   'Ana ekran: bugünün seansı günün alışkanlıklarının yanında, sonra işaretleniyor.',
      'week.s2.title':      'Gerçekte nasıl bir hafta geçirdiğini bilir.',
      'week.s2.body':       'Planladığın koşuları değil, yaptıklarını. Her pazartesi not ana ekranında bekler ve ne düşündüğünü açık sözlerle söyler.',
      'week.s2.clip_alt':   'Haftanın okunuşu: yapılan seanslar, kaçırılanlar ve koçun bununla ilgili notu.',
      'week.s3.title':      'Planı uyarlar, hedef yine yolunda.',
      'week.s3.body':       'Hafta bir salı günü değiştiğinde, neler olduğunu kendi kelimelerinle Zain’e anlat. Takvimin, güncellenen planınla birlikte yenilenir.',
      'week.s3.clip_alt':   'Koça yazılan bir satır ve değişen haftayla gelen yanıt.',

      /* ── the foundation ──────────────────────────────── */
      'found.title':        'Tek bir yer ve hayatına uyum sağlayan bir takvim.',
      'found.body':         'Alışkanlıkların, günlüğün, kitapların ve antrenmanın tek bir uygulamada. Planın okuduğu sayfa budur; böylece yalnızca hedefi değil, senin bütününü görür.',
      'found.c1.label':     'Alışkanlıklar &amp; antrenman',
      'found.c1.line':      'Bugünün alışkanlıkları ve bugünün seansı, tek listede.',
      'found.c1.alt':       'Günün alışkanlıkları ve bugünün antrenman seansı tek listede.',
      'found.c2.label':     'Günlük',
      'found.c2.line':      'Günü yaz, sonra dönüp oku.',
      'found.c2.alt':       'Günlük, bu hafta yazılan kayıtlarla.',
      'found.c3.label':     'Kitaplar',
      'found.c3.line':      'Ne okuduğun, nerede olduğun ve sakladığın satırlar.',
      'found.c3.alt':       'Okunan kitap ve arkasındaki raf.',
      'found.c4.label':     'Topluluk',
      'found.c4.line':      'Kendi haftaları üzerinde, kendi temposunda çalışan insanlar.',
      'found.c4.alt':       'Topluluk akışı, kaydırılıyor.',

      /* ── why not just a chatbot ──────────────────────── */
      'why.eyebrow':        'Neden sadece bir sohbet penceresi değil?',
      'why.title':          'Bir sohbet penceresi plan yazabilir. <span class="ox">Ama haftanı göremez.</span>',
      'why.c1.title':       'Zain hafta boyunca yanında',
      'why.c1.body':        'Ne olduğunu anlatmak zorunda değilsin. İşaretlediğin alışkanlıklar, saatinin yakaladığı koşular, atladıkların. Zain zaten biliyor; hiçbirini yazman gerekmiyor.',
      'why.c1.alt':         'Koçun haftayı okuyuşu ve saydığı seanslar.',
      'why.c2.title':       'O sana gelir',
      'why.c2.body':        'Pazartesi sabahı not ana ekranında bekliyor olur. Bir haftada planından iki seans kaçırırsan, Zain haftayı yeniden planlamana yardım eder ve yola geri dönersin.',
      'why.c2.alt':         'Ana ekran; günün alışkanlıkları arasında planın notu bekliyor.',
      'why.c3.title':       'Ve hedef yine yolunda',
      'why.c3.body':        'Haftayı gerektiği kadar yeniden düzenler. Hedef, hayatının gidişine uyum sağlar; böylece hep erişilebilir kalır.',
      'why.c3.alt':         'Plan ekranı, bu haftanın seansları.',

      /* ── where this is, what stays yours ─────────────── */
      'where.a.title':      'Şu an neredeyiz',
      'where.a.l1':         'Haziran’da arkadaşlara ve aileye sessiz bir açılış.',
      'where.a.l2':         'Zain zekâsı 15 Eylül’de herkese açılıyor.',
      'where.a.l3':         'İngilizce, Arapça ve Türkçe; önce sağdan sola, ardından daha fazlası.',
      'where.b.title':      'Sana ait kalanlar',
      'where.b.l1':         'Reklam yok.',
      'where.b.l2':         'Her notu kimin göreceğini sen seçersin.',
      'where.b.l3':         'Yalnızca kendin için yazdıklarını koç asla okumaz.',

      /* ── close and download ──────────────────────────── */
      'close.g1':           'Önceki her plan',
      'close.g2':           'Şu an sürdürdüğüm · dokuzuncu hafta',
      'close.title':        'Kötü bir hafta eskiden planı bitirirdi. <span class="ox">Zain ile plan değişir, sen devam edersin.</span>',
      'close.note':         'Başlaması ücretsiz.',
      'letter.title':       'Arada bir, kısa bir mektup.',
      'letter.label':       'E-posta adresin',
      'letter.submit':      'Kaydol',
      'letter.note':        'Ara sıra ürün haberleri. İstediğin zaman ayrılabilirsin.',
      'letter.ok':          'Listedesin. Söylemeye değer bir şey olduğunda yazacağız.',

      /* ── footer ──────────────────────────────────────── */
      'ft.line':            'Zain, seninle birlikte değişen bir plan yapar.',
      'ft.nav_aria':        'Alt bilgi',
      'ft.support':         'Destek',
      'ft.delete':          'Hesabı sil',
      'ft.privacy':         'Gizlilik',
      'ft.terms':           'Koşullar',
      'ft.made':            '2026’da özenle yapıldı',
    },
  };

  /* ── apply ────────────────────────────────────────────────── */

  function dict(lang) {
    return I18N[lang] || {};
  }

  function applyLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    const t = dict(lang);
    const html = document.documentElement;

    html.lang = lang;
    html.dir = RTL.includes(lang) ? 'rtl' : 'ltr';
    if (document.body) {
      document.body.classList.toggle('lang-ar', lang === 'ar');
      document.body.classList.toggle('lang-tr', lang === 'tr');
    }

    // innerHTML translations (values may carry <span>, <br>, <em>)
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (!node.hasAttribute('data-i18n-en')) {
        node.setAttribute('data-i18n-en', node.innerHTML);
      }
      node.innerHTML = t[key] !== undefined ? t[key] : node.getAttribute('data-i18n-en');
    });

    // attribute translations: data-i18n-attr="attr:key,attr:key"
    document.querySelectorAll('[data-i18n-attr]').forEach((node) => {
      node.getAttribute('data-i18n-attr').split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (!attr || !key) return;
        const orig = `data-i18n-en-${attr}`;
        if (!node.hasAttribute(orig)) {
          node.setAttribute(orig, node.getAttribute(attr) || '');
        }
        node.setAttribute(attr, t[key] !== undefined ? t[key] : node.getAttribute(orig));
      });
    });

    // <title>
    const titleEl = document.querySelector('title[data-i18n-title]');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n-title');
      if (!titleEl.hasAttribute('data-i18n-en')) {
        titleEl.setAttribute('data-i18n-en', titleEl.textContent);
      }
      titleEl.textContent = t[key] !== undefined ? t[key] : titleEl.getAttribute('data-i18n-en');
    }

    // <meta name="description">
    const descEl = document.querySelector('meta[data-i18n-content]');
    if (descEl) {
      const key = descEl.getAttribute('data-i18n-content');
      if (!descEl.hasAttribute('data-i18n-en')) {
        descEl.setAttribute('data-i18n-en', descEl.getAttribute('content') || '');
      }
      descEl.setAttribute('content', t[key] !== undefined ? t[key] : descEl.getAttribute('data-i18n-en'));
    }

    // the switch states which language is on
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.setAttribute('aria-current', btn.dataset.lang === lang ? 'true' : 'false');
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* noop */ }

    // anything drawn in script rather than written in the page — the dot
    // grids' week labels — redraws on this
    document.dispatchEvent(new CustomEvent('zain:lang', { detail: { lang } }));
  }

  /* ── pick ─────────────────────────────────────────────────── */

  function detectLang() {
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (q && SUPPORTED.includes(q)) return q;
    } catch (_) { /* noop */ }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) { /* noop */ }
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('ar')) return 'ar';
    if (nav.startsWith('tr')) return 'tr';
    return 'en';
  }

  window.ZainI18N = { apply: applyLanguage, detect: detectLang, dict: I18N };

  function init() {
    applyLanguage(detectLang());
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang]');
      if (!btn) return;
      e.preventDefault();
      applyLanguage(btn.dataset.lang);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
