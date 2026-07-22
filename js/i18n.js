const translations = {
    tr: {
        "nav_home": "Ana Sayfa",
        "nav_services": "Hizmetler",
        "nav_about": "Hakkımızda",
        "nav_faq": "SSS",
        "nav_contact": "İletişim",
        "hero_badge": "3D Tasarım Stüdyosu",
        "hero_title_1": "Geleceği Tasarlıyoruz,",
        "hero_title_2": "Gerçeğe Dönüştürüyoruz.",
        "hero_subtitle": "Profesyonel 3D görselleştirme ve modelleme stüdyosu.",
        "hero_cta": "Bize Ulaşın",
        "services_title": "Hizmetlerimiz",
        "srv_1_title": "3D Prototipleme ve Baskı",
        "srv_1_desc": "Fikirlerinizi fiziksel dünyaya taşıyoruz. Hassas 3D baskı ve hızlı prototipleme.",
        "srv_2_title": "Ürün Modelleme",
        "srv_2_desc": "E-ticaret ve sunumlar için endüstriyel kalitede gerçekçi 3D ürün tasarımları.",
        "srv_3_title": "Mimari Görselleştirme",
        "srv_3_desc": "İç ve dış mekan projeleriniz için fotogerçekçi 3D mimari renderlar.",
        "srv_4_title": "3D Animasyon / Sanat",
        "srv_4_desc": "Markanızı öne çıkaracak dinamik 3D animasyonlar ve yaratıcı görsel sanatlar.",
        "about_title": "Vizyonumuz",
        "about_p1": "SwallowLab olarak dijital hayal gücü ile fiziksel gerçeklik arasındaki çizgiyi kaldırıyoruz.",
        "about_p2": "Geleceğin teknolojilerini günümüze taşıyarak, müşterilerimize yenilikçi ve sınırları zorlayan 3D çözümler sunmayı misyon edindik. Tasarım, mühendislik ve sanatın kesişim noktasında, fikirlerinizi somut projelere dönüştürüyoruz.",
        "faq_title": "Sıkça Sorulan Sorular",
        "faq_1_q": "Süreçlerimiz nasıl işliyor?",
        "faq_1_a": "Öncelikle projenizin detaylarını ve ihtiyaçlarınızı dinliyoruz. Ardından konsept tasarımı, modelleme, render ve revizyon aşamalarından geçerek size kusursuz bir sonuç teslim ediyoruz.",
        "faq_2_q": "Fiyatlandırma politikanız nedir?",
        "faq_2_a": "Fiyatlandırmamız projenin karmaşıklığına, render sayısına ve animasyon sürelerine göre proje bazlı olarak belirlenmektedir. Bizimle iletişime geçerek hızlı bir teklif alabilirsiniz.",
        "faq_3_q": "Ortalama teslimat süreleriniz ne kadar?",
        "faq_3_a": "Basit ürün modellemeleri 2-3 iş günü sürerken, kapsamlı mimari görselleştirme veya animasyon projeleri projenin büyüklüğüne göre 1 ila 3 hafta arasında teslim edilmektedir.",
        "contact_title": "İletişime Geçin",
        "form_name": "Adınız Soyadınız",
        "form_email": "E-Posta Adresiniz",
        "form_subject": "Konu",
        "form_message": "Mesajınız",
        "form_submit": "Mesaj Gönder",
        "contact_email_title": "E-Posta",
        "contact_phone_title": "Telefon",
        "footer_rights": "Tüm hakları saklıdır."
    },
    en: {
        "nav_home": "Home",
        "nav_services": "Services",
        "nav_about": "About Us",
        "nav_faq": "FAQ",
        "nav_contact": "Contact",
        "hero_badge": "3D Design Studio",
        "hero_title_1": "Designing the Future,",
        "hero_title_2": "Making it Reality.",
        "hero_subtitle": "Professional 3D visualization and modeling studio.",
        "hero_cta": "Contact Us",
        "services_title": "Our Services",
        "srv_1_title": "3D Prototyping & Printing",
        "srv_1_desc": "Bringing your ideas to the physical world with precision 3D printing and rapid prototyping.",
        "srv_2_title": "Product Modeling",
        "srv_2_desc": "Industry-grade realistic 3D product designs for e-commerce and presentations.",
        "srv_3_title": "Architectural Viz",
        "srv_3_desc": "Photorealistic 3D architectural renders for your interior and exterior projects.",
        "srv_4_title": "3D Animation / Art",
        "srv_4_desc": "Dynamic 3D animations and creative visual arts to make your brand stand out.",
        "about_title": "Our Vision",
        "about_p1": "At SwallowLab, we blur the line between digital imagination and physical reality.",
        "about_p2": "Our mission is to bring the technologies of the future to the present by offering innovative and boundary-pushing 3D solutions. At the intersection of design, engineering, and art, we turn your ideas into concrete projects.",
        "faq_title": "Frequently Asked Questions",
        "faq_1_q": "How does our process work?",
        "faq_1_a": "First, we listen to your project details and needs. Then we go through concept design, modeling, rendering, and revision stages to deliver a flawless result.",
        "faq_2_q": "What is your pricing policy?",
        "faq_2_a": "Our pricing is project-based, depending on complexity, number of renders, and animation durations. Contact us for a quick quote.",
        "faq_3_q": "What are your average delivery times?",
        "faq_3_a": "Simple product models take 2-3 business days, while comprehensive architectural visualization or animation projects are delivered in 1 to 3 weeks depending on scale.",
        "contact_title": "Get in Touch",
        "form_name": "Full Name",
        "form_email": "Email Address",
        "form_subject": "Subject",
        "form_message": "Your Message",
        "form_submit": "Send Message",
        "contact_email_title": "Email",
        "contact_phone_title": "Phone",
        "footer_rights": "All rights reserved."
    }
};

let currentLang = 'tr';

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if(el.type === 'submit' || el.type === 'button') {
                    el.value = translations[lang][key];
                } else {
                    el.placeholder = translations[lang][key];
                }
            } else {
                // If the key is for hero title, it needs special handling for gradient span
                if (key === 'hero_title_1') {
                    const span = el.querySelector('span.gradient-text');
                    const spanHTML = span ? span.outerHTML : `<span class="gradient-text">${translations[lang]['hero_title_2']}</span>`;
                    el.innerHTML = `${translations[lang][key]} <br>${spanHTML}`;
                } else if (key === 'hero_title_2') {
                     // handled by hero_title_1
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setLanguage(e.target.getAttribute('data-lang'));
        });
    });
    // Set initial
    setLanguage(currentLang);
});
