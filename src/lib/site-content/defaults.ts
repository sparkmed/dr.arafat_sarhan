import type { SiteContent } from './types'

/**
 * The content the site shipped with, seeded from the original hardcoded
 * components and translation files. Convex rows override these per section;
 * anything never saved in the CMS still renders from here.
 */
export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    enabled: true,
    title1: { en: 'Your Perfect Smile', ar: 'ابتسامتك المثالية' },
    title2: { en: 'Starts Here', ar: 'تبدأ هنا' },
    doctorName: { en: 'Dr. Arafat Sarhan', ar: 'د. عرفات سرحان' },
    paragraph1: {
      en: 'is a leading dental expert with over 25 years of experience in aesthetic and implant dentistry. Having completed advanced studies at',
      ar: 'من أبرز أطباء الأسنان بخبرة تزيد عن 25 عاماً في مجال تجميل وزراعة الأسنان. يجمع بين الدقة العلمية والاهتمام الإنساني بالمرضى وقد أكمل دراسات متقدمة في',
    },
    university: {
      en: 'New York University (NYU),',
      ar: 'جامعة نيويورك (NYU).',
    },
    paragraph1After: {
      en: ' he combines academic precision with compassionate care.',
      ar: '',
    },
    quote: {
      en: 'We focus on achieving the best aesthetic results using the latest global technologies, ensuring a safe and comfortable experience for the entire family.',
      ar: 'نركز على تحقيق أفضل النتائج باستخدام أحدث التقنيات العالمية، مع ضمان تجربة آمنة ومريحة لجميع أفراد العائلة.',
    },
    paragraph2: {
      en: 'His clinics offer full dental services for the entire family, aiming to maintain oral health and provide patients with a healthy, beautiful smile that lasts for years.',
      ar: 'تقدم عياداته جميع خدمات طب الأسنان لكافة أفراد العائلة، مع الحرص على الحفاظ على صحة الفم وتوفير ابتسامة صحية وجميلة تدوم لسنوات.',
    },
    badge: {
      en: '25+ Years of Clinical Excellence',
      ar: 'أكثر من 25 عاماً من الخبرة الطبية',
    },
    primaryCta: { en: 'Book Appointment', ar: 'احجز موعد' },
    secondaryCta: { en: 'View Services', ar: 'عرض الخدمات' },
    image: 'https://www.sparkmedagency.com/IMG_0131.JPEG',
  },

  showcase: {
    enabled: true,
    images: [
      {
        id: 'showcase-1',
        url: 'https://www.sparkmedagency.com/Dashboard.jpg',
        alt: 'iPhone screen content',
      },
      {
        id: 'showcase-2',
        url: 'https://www.sparkmedagency.com/our-services.jpg',
        alt: 'iPhone screen content',
      },
      {
        id: 'showcase-3',
        url: 'https://www.sparkmedagency.com/drarafatintro.jpg',
        alt: 'iPhone screen content',
      },
    ],
  },

  services: {
    enabled: true,
    title: { en: 'Our Services', ar: 'الخدمات' },
    subtitle: {
      en: 'Experience world-class dental care powered by modern technology and clinical expertise.',
      ar: 'أفضل تجربة سنية بأحدث التقنيات العالمية',
    },
    items: [
      {
        id: 'general-dentistry',
        image: 'https://www.sparkmedagency.com/IMG_5262.JPG%20(1).jpeg',
        title: { en: 'General Dentistry', ar: 'طب الأسنان العام' },
        details: {
          en: 'We offer a comprehensive range of general dental treatments to maintain the health of teeth and gums, including routine check-ups, cavity treatments, root canal therapies, and overall oral health care.',
          ar: 'نقدم مجموعة متكاملة من علاجات الأسنان للحفاظ على صحة الأسنان واللثة، بما يشمل الفحوصات الدورية، علاج التسوس، علاجات العصب، والحفاظ على صحة الفم.',
        },
      },
      {
        id: 'dental-implants',
        image: 'https://www.sparkmedagency.com/IMG_5260.JPG.jpeg',
        title: { en: 'Dental Implants', ar: 'زراعة الأسنان' },
        details: {
          en: 'The most advanced solution for replacing missing teeth. Dr. Arafat utilizes premium Swiss Straumann systems and 3D computer-guided technology for maximum precision, reduced surgical time, and faster patient recovery.',
          ar: 'الحل الأكثر تطوراً لتعويض الأسنان المفقودة. يعتمد د. عرفات على أنظمة Straumann السويسرية والزراعة المحوسبة ثلاثية الأبعاد لضمان أعلى مستويات الدقة، تقليل وقت الجراحة، وتسريع فترة التعافي.',
        },
      },
      {
        id: 'cosmetic-dentistry',
        image: 'https://www.sparkmedagency.com/IMG_5265.JPG%20(2).jpeg',
        title: { en: 'Cosmetic Dentistry', ar: 'تجميل الأسنان' },
        details: {
          en: 'We provide a range of cosmetic treatments to enhance the appearance of your smile and achieve more balanced, beautiful teeth, including veneers to cover imperfections and gaps, Zirconia crowns to restore damaged teeth naturally, and E.max restorations for bright, strong front teeth with exceptional aesthetics.',
          ar: 'نقدم مجموعة من العلاجات التجميلية لتحسين مظهر الابتسامة وجعل الأسنان أكثر تناسقاً وجمالاً، بما في ذلك الفينير لتغطية العيوب والفراغات، وتيجان الزيركون لتعويض الأسنان المتضررة بمظهر طبيعي، وتركيبات إيماكس عالية الجمالية للابتسامات الأمامية المشرقة والقوية.',
        },
      },
      {
        id: 'orthodontics',
        image: 'https://www.sparkmedagency.com/IMG_5276.JPG.jpeg',
        title: { en: 'Orthodontics', ar: 'تقويم الأسنان' },
        details: {
          en: 'Orthodontic treatments help correct misaligned teeth and bite issues, improving oral health and creating a more attractive and harmonious smile.',
          ar: 'يساعد تقويم الأسنان على تصحيح اصطفاف الأسنان وتنظيم العضة، مما يحسن من صحة الفم ويمنح ابتسامة أكثر تناسقاً وجمالاً.',
        },
      },
      {
        id: 'pediatric-dentistry',
        image: 'https://www.sparkmedagency.com/IMG_5271.JPG.jpeg',
        title: { en: 'Pediatric Dentistry', ar: 'طب أسنان الأطفال' },
        details: {
          en: 'The clinic provides gentle and specialized care for children in a comfortable environment, helping them overcome fear of dental treatments. Laughing gas (nitrous oxide) is also available to help children relax during procedures.',
          ar: 'نوفّر عناية خاصة للأطفال ضمن بيئة مريحة تساعدهم على التخلص من الخوف من علاج الأسنان، كما يتوفر الغاز الضاحك لمساعدة الأطفال على الاسترخاء أثناء العلاج.',
        },
      },
      {
        id: 'gbt-cleaning',
        image: 'https://www.sparkmedagency.com/IMG_5268.JPG.jpeg',
        title: {
          en: 'Professional Teeth Cleaning – GBT',
          ar: 'تنظيف الأسنان بتقنية GBT',
        },
        details: {
          en: 'We offer professional teeth cleaning using Guided Biofilm Therapy (GBT), one of the latest techniques worldwide for removing plaque and stains accurately and gently on teeth and gums.',
          ar: 'تنظيف الأسنان باستخدام تقنية Guided Biofilm Therapy (GBT)، وهي من أحدث التقنيات في العالم لإزالة البلاك والتصبغات بطريقة دقيقة ولطيفة على الأسنان واللثة.',
        },
      },
      {
        id: 'flash-whitening',
        image: 'https://www.sparkmedagency.com/IMG_5266.JPG%20(3).jpeg',
        title: {
          en: 'Teeth Whitening – Flash System',
          ar: 'تبييض الأسنان بجهاز Flash',
        },
        details: {
          en: 'Teeth whitening is performed using the Flash system, a modern device that safely and effectively brightens teeth, giving the smile a noticeable and radiant result in a short time.',
          ar: 'تبييض الأسنان يتم باستخدام جهاز فلاش الحديث، الذي يبيض الأسنان بأمان وفعالية، ويمنح ابتسامتك لمعاناً وحيوية.',
        },
      },
      {
        id: 'oral-surgery',
        image: 'https://www.sparkmedagency.com/IMG_5278.JPG.jpeg',
        title: {
          en: 'Oral & Maxillofacial Surgery',
          ar: 'جراحة الفم والفكين',
        },
        details: {
          en: 'Expert surgical treatments for the mouth, teeth, and jawbone, including complex tooth extractions and advanced dental procedures to ensure functional and structural health.',
          ar: 'تشمل الإجراءات الجراحية المتعلقة بالفم والأسنان وعظام الفك، مثل خلع الأسنان الجراحية وبعض العلاجات المتقدمة.',
        },
      },
      {
        id: 'general-anesthesia',
        image: 'https://www.sparkmedagency.com/IMG_5272.JPG.jpeg',
        title: {
          en: 'Dental Treatment Under General Anesthesia',
          ar: 'علاج الأسنان تحت التخدير العام',
        },
        details: {
          en: 'For patients with severe dental anxiety or those requiring multiple complex treatments, procedures can be performed under general anesthesia in a hospital, allowing treatments to be completed comfortably and safely in a single session.',
          ar: 'في بعض الحالات التي تعاني من خوف شديد من علاج الأسنان أو تحتاج إلى عدة إجراءات علاجية معقدة، يمكن إجراء العلاج تحت التخدير العام داخل المستشفى، مما يسمح بإتمام العلاجات بشكل مريح وآمن خلال جلسة واحدة.',
        },
      },
    ],
  },

  beforeAfter: {
    enabled: true,
    title: { en: 'Before & After', ar: 'قبل وبعد' },
    description: {
      en: 'Our results combine precision, beauty, safety, and lasting effect.',
      ar: 'نتائجنا تجمع بين الدقة والجمالية والأمان والديمومه.',
    },
    beforeLabel: { en: 'Before', ar: 'قبل' },
    afterLabel: { en: 'After', ar: 'بعد' },
    cases: [
      {
        id: 'case-1',
        before: 'https://www.sparkmedagency.com/before_1.jpg',
        after: 'https://www.sparkmedagency.com/after_1.jpg',
      },
      {
        id: 'case-2',
        before: 'https://www.sparkmedagency.com/Impalnt_before.jpg',
        after: 'https://www.sparkmedagency.com/Implant_Afterjpg.jpg',
      },
      {
        id: 'case-3',
        before: 'https://www.sparkmedagency.com/Implant_before_1jpg.jpg',
        after: 'https://www.sparkmedagency.com/implant_after_1.jpg',
      },
    ],
  },

  vibes: {
    enabled: true,
    title: { en: 'Our Vibes', ar: 'يومياتنا' },
    description: {
      en: 'Moments that reflect our values: dedication to patients, precision in practice, and a commitment to global advancement.',
      ar: 'لحظات تعكس قيمنا: اهتمام حقيقي بمراجعينا، دقة في العمل، والتزام بمواكبة التطور العالمي في طب الأسنان',
    },
    instruction: {
      en: 'Drag the photos to explore our memories',
      ar: 'اسحب الصور لاستكشاف ذكرياتنا',
    },
    overlayPrefix: { en: 'All Your', ar: 'كل لحظاتنا ' },
    overlayHighlight: { en: 'Memories', ar: 'اليوميه' },
    images: [
      '9f2efc13-0555-4a6f-823f-7fc442c71aa6',
      '85f77785-2e5c-46d3-96ef-9f1f4d1b3b06',
      '3fcc0bed-ea89-43cb-aee1-71a403adca45',
      '4252a188-646e-48fa-b92d-6acf5d4f2267',
      '529779cd-7345-436b-b199-3a99c027c428',
      '55b7ee57-52a5-47aa-8e68-7a5cdafdb920',
      '6f9b4ad9-2692-4c72-a7cc-bb2600ade203',
      '81a2ab2d-dcb5-4afe-a5a6-d6ab1d0a78ad',
      'a47a25e5-b517-40e4-94ec-3e585ea6b24b',
      'af73ef5d-ed12-4f01-9c4e-7f545d371d19',
      'd9bbe98a-c7e9-46fe-be5c-ab5cda2aef83',
      'e8c16b4b-fb9c-46fc-8220-5771d3106e19',
      'ee6adc4a-e055-44f2-9627-53511f11bb25',
    ].map((name) => ({
      id: name,
      url: `https://www.sparkmedagency.com/${name}.jpg`,
    })),
  },

  // Placeholder roster — replace the names, photos, and bios in /admin.
  team: {
    enabled: true,
    badge: { en: 'Meet the team', ar: 'تعرّف على الفريق' },
    title: {
      en: 'The hands behind every smile',
      ar: 'الأيادي خلف كل ابتسامة',
    },
    description: {
      en: 'A specialist for every treatment, working together on one plan for each patient.',
      ar: 'اختصاصي لكل علاج، يعملون معاً على خطة واحدة لكل مريض.',
    },
    footerText: {
      en: 'Every member of the team keeps training abroad, so the care you get here matches the latest global standards.',
      ar: 'يواصل كل عضو في الفريق تدريبه في الخارج، ليبقى العلاج الذي تتلقاه هنا مواكباً لأحدث المعايير العالمية.',
    },
    members: [
      {
        id: 'member-1',
        name: { en: 'Dr. Arafat Sarhan', ar: 'د. عرفات سرحان' },
        photo: 'https://www.sparkmedagency.com/IMG_0131.JPEG',
        speciality: {
          en: 'Implantology & Cosmetic Dentistry',
          ar: 'زراعة وتجميل الأسنان',
        },
        experience: { en: '25+ years', ar: 'أكثر من 25 عاماً' },
        description: {
          en: 'Founder of the clinic. Trained at New York University, and works with Swiss Straumann systems and 3D guided implant surgery.',
          ar: 'مؤسس العيادة. تدرّب في جامعة نيويورك، ويعمل بأنظمة Straumann السويسرية والزراعة المحوسبة ثلاثية الأبعاد.',
        },
      },
      {
        id: 'member-2',
        name: { en: 'Dr. Layla Haddad', ar: 'د. ليلى حداد' },
        photo:
          'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop',
        speciality: { en: 'Orthodontics', ar: 'تقويم الأسنان' },
        experience: { en: '12+ years', ar: 'أكثر من 12 عاماً' },
        description: {
          en: 'Handles fixed braces and clear aligners for teenagers and adults, with a focus on shorter treatment plans.',
          ar: 'تتولى التقويم الثابت والشفاف للمراهقين والبالغين، مع التركيز على خطط علاج أقصر.',
        },
      },
      {
        id: 'member-3',
        name: { en: 'Dr. Omar Khalil', ar: 'د. عمر خليل' },
        photo:
          'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
        speciality: {
          en: 'Oral & Maxillofacial Surgery',
          ar: 'جراحة الفم والفكين',
        },
        experience: { en: '15+ years', ar: 'أكثر من 15 عاماً' },
        description: {
          en: 'Performs surgical extractions, bone grafting, and the complex cases that come before an implant.',
          ar: 'يجري الخلع الجراحي وترقيع العظم والحالات المعقدة التي تسبق الزراعة.',
        },
      },
      {
        id: 'member-4',
        name: { en: 'Dr. Nour Abu Zaid', ar: 'د. نور أبو زيد' },
        photo:
          'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
        speciality: { en: 'Pediatric Dentistry', ar: 'طب أسنان الأطفال' },
        experience: { en: '9+ years', ar: 'أكثر من 9 أعوام' },
        description: {
          en: 'Treats children in a calm, unhurried way, and is certified to work with nitrous oxide sedation.',
          ar: 'تعالج الأطفال بأسلوب هادئ ودون استعجال، ومعتمدة للعمل بالتخدير بالغاز الضاحك.',
        },
      },
      {
        id: 'member-5',
        name: { en: 'Dr. Yasmin Odeh', ar: 'د. ياسمين عودة' },
        photo:
          'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
        speciality: {
          en: 'Periodontics & GBT Hygiene',
          ar: 'أمراض اللثة وتنظيف GBT',
        },
        experience: { en: '7+ years', ar: 'أكثر من 7 أعوام' },
        description: {
          en: 'Leads gum treatment and Guided Biofilm Therapy cleaning sessions, plus the recall programme.',
          ar: 'تقود علاج اللثة وجلسات التنظيف بتقنية GBT، إضافة إلى برنامج المتابعة الدورية.',
        },
      },
    ],
  },

  findUs: {
    enabled: true,
    title: { en: 'Find Us', ar: 'معلومات التواصل' },
    description: {
      en: 'Visit us for a comfortable experience and a perfect smile.',
      ar: 'تفضل بزيارتنا لتجربة مريحة وابتسامة مثالية',
    },
    addReviewLabel: {
      en: 'Add a Review on Google',
      ar: 'أضف تقييمك على جوجل',
    },
    reviewUrl: 'https://g.page/r/CYtZyn5SYLSTEAI/review',
    locationTitle: { en: 'Our Location', ar: 'موقعنا' },
    address: {
      en: 'Ramallah, Al-Irsal St, Al-Israa Building, 2nd Floor',
      ar: 'رام الله، شارع الإرسال، عمارة الإسراء، الطابق الثاني',
    },
    callUsLabel: { en: 'Call Us', ar: 'اتصل بنا' },
    phone: '+970 597 55 99 22',
    hoursTitle: { en: 'Opening Hours', ar: 'ساعات الدوام' },
    hoursDetail: {
      en: 'Daily: 9:00 AM - 8:00 PM',
      ar: 'يومياً: 9:00 صباحاً - 8:00 مساءً',
    },
    closed: { en: 'Friday: Closed', ar: 'الجمعة: العطلة الأسبوعية' },
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3389.544766981881!2d35.2033!3d31.906!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU0JzIyLjIiTiAzNcKwMTInMTEuOSJF!5e0!3m2!1sen!2s!4v1711410000000!5m2!1sen!2s',
    mapUrl: 'https://share.google/WrOcvaHjPDGgmd3Tn',
    openMapLabel: { en: 'Open in Maps', ar: 'فتح الموقع في الخريطة' },
  },

  reviews: {
    enabled: true,
    badgeCount: '43+',
    badgeLabel: { en: 'Real Reviews', ar: 'مراجعة حقيقية' },
    title: { en: 'Reviews', ar: 'آراؤكم' },
    description: {
      en: 'We strive for excellence in every smile. Here is what our patients have to say about their journey with us.',
      ar: 'نسعى دائماً لتقديم أفضل تجربة علاجية، وهذه بعض تجارب مرضانا الذين وضعوا ثقتهم بنا.',
    },
    items: [
      {
        id: 'review-1',
        author: 'Murad Rateb',
        role: { en: 'Long-time Patient', ar: 'مراجع دائم' },
        body: {
          en: 'The most wonderful doctor and the best services. We have been with you for years and are proud of your superior expertise in the country. Something to truly be proud of.',
          ar: 'أروع دكتور وأفضل خدمات، بجد لنا سنين معكم ونفتخر بكم وبخبراتكم المتفوقة في البلد. شيء نفتخر به حقاً.',
        },
      },
      {
        id: 'review-2',
        author: 'Mohammad Safi',
        role: { en: 'Patient', ar: 'مراجع' },
        body: {
          en: 'A specialized, organized, comfortable, and clean center. My experience was with children; the center assigned a pediatric specialist, and the follow-up was excellent.',
          ar: 'مركز متخصص منظم، مريح ونظيف. كانت التجربة تخص الأطفال، وقام المركز بتخصيص دكتور متخصص لهم وكانت المتابعة ممتازة.',
        },
      },
      {
        id: 'review-3',
        author: 'Abu Ahmed',
        role: { en: 'Patient', ar: 'مراجع' },
        body: {
          en: 'The best experience and the most wonderful medical staff based on personal experience. An amazing clinic with highly professional work.',
          ar: 'أفضل تجربة وأروع طاقم طبي عن تجربة شخصية. عيادة أكثر من رائعة والشغل عندهم بمهنية عالية جداً.',
        },
      },
      {
        id: 'review-4',
        author: 'Reema Ara',
        role: { en: 'Patient', ar: 'مراجعة' },
        body: {
          en: 'Special thanks to Dr. Arafat, Dr. Israa Mansour, and the entire staff for their amazing service and expertise. My family and I only trust them.',
          ar: 'كل الشكر للدكتور عرفات والدكتورة إسراء منصور وكل الطاقم الذي يتميز بخدمته وخبرته. أنا وعائلتي نعتمد عليهم دائماً.',
        },
      },
      {
        id: 'review-5',
        author: 'Amaal Badaha',
        role: { en: 'Patient', ar: 'مراجعة' },
        body: {
          en: 'The center and the staff are more than wonderful, the work is perfect. I highly recommend them to everyone.',
          ar: 'المركز والطاقم أكثر من رائعين والشغل مثالي (Perfect)، أنصح الجميع بالتعامل معهم.',
        },
      },
      {
        id: 'review-6',
        author: 'Ameed Asmah',
        role: { en: 'Patient', ar: 'مراجع' },
        body: {
          en: 'Dr. Arafat Sarhan is a top-tier doctor and one of the best in Palestine. His style is sophisticated and comfortable; he is very professional and explains the case with clarity and transparency.',
          ar: 'الدكتور عرفات سرحان دكتور فخم جداً ومن أفضل الأطباء في فلسطين. أسلوبه راقي ومريح، مهني جداً ويشرح الحالة بكل وضوح وشفافية.',
        },
      },
    ],
  },

  footer: {
    enabled: true,
    logoLight:
      'https://marvelous-fish-345.convex.cloud/api/storage/bee39baa-a87f-4a8d-9ece-8ebd42041c24',
    logoDark:
      'https://marvelous-fish-345.convex.cloud/api/storage/9d521bf6-d1e5-4138-b9d2-abe3173c7b86',
    description: {
      en: 'The place where you get the best dental experience: precision, beauty, safety, and lasting results.',
      ar: 'المكان الذي ستحصل فيه على أفضل تجربة سنية',
    },
    contactTitle: { en: 'Contact Us', ar: 'تواصل معنا' },
    followTitle: { en: 'Follow Us', ar: 'تابعنا' },
    rights: { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
    phonePrimary: '+970597559922',
    phoneSecondary: '022989520',
    email: 'info@drarafatsarhan.com',
    address: {
      en: 'Ramallah, Al-Irsal St, Al-Israa Building',
      ar: 'رام الله، شارع الإرسال، عمارة الإسراء',
    },
    addressUrl:
      'https://maps.google.com/?cid=10643237726814099851&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ',
    instagramUrl: 'https://www.instagram.com/drarafatsarhan',
    facebookUrl: 'https://www.facebook.com/DrArafatSarhan',
  },
}
