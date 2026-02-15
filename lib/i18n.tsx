"use client";

import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'tn';

const translations = {
    en: {
        nav: {
            scanner: 'Scanner',
            quiz: 'Personality Test',
            map: 'Heat Radar',
            forum: 'Expert Forum',
            login: 'Sign In',
            register: 'Sign Up',
            learn: 'Learn',
            dashboard: 'Dashboard'
        },
        hero: {
            title: 'PhishShield AI',
            subtitle: 'Behavioral & Real-Time Defense',
            cta_scan: 'Scan URL Now',
            cta_quiz: 'Take Personality Test',
            stats_users: 'Protected Users',
            stats_threats: 'Threats Blocked'
        },
        auth: {
            welcome: 'Welcome Back',
            join: 'Join PhishShield',
            signin_desc: 'Sign in to access your threat dashboard',
            signup_desc: 'Activate your behavioral defense system',
            email: 'Email',
            password: 'Password',
            username: 'Username',
            login_btn: 'Sign In',
            register_btn: 'Initialize Account',
            no_account: "Don't have an account?",
            have_account: "Already have access?",
            create_access: "Create Access",
            signin_link: "Sign In"
        },
        scan: {
            title: 'AI Threat Scanner',
            subtitle: 'Analyze URLs and texts with our heuristic engine.',
            placeholder: 'Paste suspicious URL or text here...',
            analyze_btn: 'Analyze Threat',
            scanning: 'Scanning...',
            safe: 'Safe',
            suspicious: 'Suspicious',
            high_risk: 'High Risk'
        },
        quiz: {
            title: 'Vulnerability Profiler',
            subtitle: 'Discover your psychological weak points.',
            question: 'Question',
            check: 'Check',
            retake: 'Retake Analysis',
            trait: 'Trait',
            analysis_complete: 'Analysis Complete',
            recommended_sim: 'Recommended Simulation',
            training_focus: 'Training Focus'
        },
        map: {
            title: 'Live Threat Map',
            report_btn: 'Report Threat',
            expert_mode: 'Expert Mode',
            active_threats: 'Active Threats',
            verified: 'Community Verified',
            top_target: 'Top Target Today',
            form_type: 'Threat Type',
            form_desc: 'Description',
            form_loc: 'Location',
            form_submit: 'Submit Report',
            use_location: 'Use My Location'
        },
        forum: {
            title: 'Cybersecurity Expert Forum',
            subtitle: 'Discuss trends, verify threats, and share intel.',
            newPost: 'New Discussion',
            verified_threat: 'Verified Threat',
            expert: 'Expert'
        },
        dashboard: {
            welcome: 'Welcome back,',
            risk_score: 'Current Risk Score',
            scans: 'Total Scans',
            alerts: 'Active Alerts',
            recent_scans: 'Recent Scans',
            community_alerts: 'Community Alerts',
            safe_status: 'You are safe',
            risk_status: 'Action Required'
        },
        chat: {
            greeting: "Hi! I'm your PhishShield Sentinel. Not sure if a message is real? Paste it here.",
            placeholder: "Paste text or ask a question...",
            thinking: "Analyzing...",
            threat_detected: "THREAT DETECTED"
        },
        learn: {
            title: 'Security Academy',
            subtitle: 'Master the art of defense.',
            claim_cert: 'Claim Certificate',
            modules: {
                phishing_101: 'Phishing 101',
                social_eng: 'Social Engineering',
                device_sec: 'Device Security'
            },
            status: {
                completed: 'Completed',
                in_progress: 'In Progress',
                locked: 'Locked'
            }
        }
    },
    ar: {
        nav: {
            scanner: 'فاحص التهديدات',
            quiz: 'اختبار الشخصية',
            map: 'رادار الخطر',
            forum: 'منتدى الخبراء',
            login: 'دخول',
            register: 'تسجيل',
            learn: 'تعلم',
            dashboard: 'لوحة التحكم'
        },
        hero: {
            title: 'فيش-شيلد الذكي',
            subtitle: 'دفاع سلوكي ولحظي ضد الاحتيال',
            cta_scan: 'افحص رابط الآن',
            cta_quiz: 'ابدأ اختبار الشخصية',
            stats_users: 'مستخدم محمي',
            stats_threats: 'تهديد تم حظره'
        },
        auth: {
            welcome: 'مرحبًا بك',
            join: 'انضم إلى فيش-شيلد',
            signin_desc: 'سجل الدخول للوصول إلى لوحة التحكم',
            signup_desc: 'فعل نظام الدفاع السلوكي الخاص بك',
            email: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            username: 'اسم المستخدم',
            login_btn: 'دخول',
            register_btn: 'إنشاء حساب',
            no_account: "ليس لديك حساب؟",
            have_account: "لديك حساب بالفعل؟",
            create_access: "إنشاء حساب",
            signin_link: "تسجيل الدخول"
        },
        scan: {
            title: 'فاحص التهديدات الذكي',
            subtitle: 'حلل الروابط والنصوص باستخدام محرك الكشف الخاص بنا.',
            placeholder: 'الصق الرابط أو النص المشبوه هنا...',
            analyze_btn: 'تحليل التهديد',
            scanning: 'جاري الفحص...',
            safe: 'آمن',
            suspicious: 'مشبوه',
            high_risk: 'خطر جداً'
        },
        quiz: {
            title: 'محلل نقاط الضعف',
            subtitle: 'اكتشف نقاط ضعفك النفسية.',
            question: 'سؤال',
            check: 'فحص',
            retake: 'إعادة الاختبار',
            trait: 'السمة',
            analysis_complete: 'اكتمل التحليل',
            recommended_sim: 'المحاكاة المقترحة',
            training_focus: 'تركيز التدريب'
        },
        map: {
            title: 'خريطة التهديدات الحية',
            report_btn: 'بلغ عن تهديد',
            expert_mode: 'وضع الخبراء',
            active_threats: 'تهديدات نشطة',
            verified: 'مؤكد من المجتمع',
            top_target: 'الهدف الأول اليوم',
            form_type: 'نوع التهديد',
            form_desc: 'الوصف',
            form_loc: 'الموقع',
            form_submit: 'إرسال البلاغ',
            use_location: 'استخدم موقعي'
        },
        forum: {
            title: 'منتدى خبراء الأمن السيبراني',
            subtitle: 'ناقش الاتجاهات، تحقق من التهديدات، وشارك المعلومات.',
            newPost: 'موضوع جديد',
            verified_threat: 'تهديد مؤكد',
            expert: 'خبير'
        },
        dashboard: {
            welcome: 'مرحبًا بعودتك،',
            risk_score: 'مستوى الخطر الحالي',
            scans: 'إجمالي الفحوصات',
            alerts: 'تنبيهات نشطة',
            recent_scans: 'فحوصات حديثة',
            community_alerts: 'تنبيهات المجتمع',
            safe_status: 'أنت في أمان',
            risk_status: 'يتطلب إجراء'
        },
        chat: {
            greeting: "مرحبا! أنا حارسك الذكي. لست متأكدًا من رسالة؟ الصقها هنا.",
            placeholder: "الصق النص أو اسأل سؤالاً...",
            thinking: "جاري التحليل...",
            threat_detected: "تم كشف تهديد"
        },
        learn: {
            title: 'أكاديمية الحماية',
            subtitle: 'احترف فن الدفاع الرقمي.',
            claim_cert: 'استلم الشهادة',
            modules: {
                phishing_101: 'أساسيات التصيد',
                social_eng: 'الهندسة الاجتماعية',
                device_sec: 'أمن الأجهزة'
            },
            status: {
                completed: 'مكتمل',
                in_progress: 'قيد التقدم',
                locked: 'مغلق'
            }
        }
    },
    tn: {
        nav: {
            scanner: 'Scani Lien',
            quiz: 'Test Chakhsya',
            map: 'Winou Scam?',
            forum: 'Coin Experts',
            login: 'Connecti',
            register: '9ayed',
            learn: 'Ta3alem',
            dashboard: 'Tableau'
        },
        hero: {
            title: 'PhishShield AI',
            subtitle: 'Radare mta3 Scam w Phishing',
            cta_scan: 'Scani Taw',
            cta_quiz: 'Abda Test',
            stats_users: 'Compte 7aminah',
            stats_threats: 'Scam Bloqué'
        },
        auth: {
            welcome: 'Ahla bik',
            join: 'Marhbe bik m3ana',
            signin_desc: 'Connecti bech tchouf dashboard mte3ek',
            signup_desc: 'Fa3el systeme protection mte3ek',
            email: 'Email',
            password: 'Mot de passe',
            username: 'Esmek',
            login_btn: 'Adkhel',
            register_btn: 'Sajel',
            no_account: "Ma3andekch compte?",
            have_account: "3andek compte?",
            create_access: "A3mel Compte",
            signin_link: "Connecti"
        },
        scan: {
            title: 'Scaneur mta3 Scam',
            subtitle: 'Chouf lien wala message s7i7 wala lé.',
            placeholder: 'Hot lien wala text houni...',
            analyze_btn: 'Thabet',
            scanning: 'Ythabet...',
            safe: 'Jawou Behi',
            suspicious: 'Chak kbir',
            high_risk: 'Rod belek!'
        },
        quiz: {
            title: 'Test Vulnerabilité',
            subtitle: 'Chouf rouhek win dh3if bedhabt.',
            question: 'Sou2el',
            check: 'Check',
            retake: '3awed Test',
            trait: 'Sifa',
            analysis_complete: 'Kamalna',
            recommended_sim: 'Test Jay',
            training_focus: 'Lezem tet3alem'
        },
        map: {
            title: 'Winou Scam?',
            report_btn: 'Signalé mochkla',
            expert_mode: 'Mode Expert',
            active_threats: 'Machekel',
            verified: 'Mconfirmé',
            top_target: 'Akther 7aja tpiratat',
            form_type: 'Naw3 scam',
            form_desc: 'Faserlna',
            form_loc: 'Blassa',
            form_submit: 'Ab3ath',
            use_location: 'Houni'
        },
        forum: {
            title: 'Coin Experts',
            subtitle: 'Ahki 3al jdid, chouf les scams, w partagi l’info.',
            newPost: 'Sujet Jdid',
            verified_threat: 'Scam Mconfirmé',
            expert: 'Expert'
        },
        dashboard: {
            welcome: 'Ahla bik,',
            risk_score: 'Score Risk mte3ek',
            scans: 'Total Scans',
            alerts: 'Alertes',
            recent_scans: 'Akher Scans',
            community_alerts: 'Alertes Jomhour',
            safe_status: 'Omourek Hneya',
            risk_status: 'Rod belek'
        },
        chat: {
            greeting: "Ahla! Ana l'assistant mte3ek. Ab3athli message kenek chek fih.",
            placeholder: "Hot message houni...",
            thinking: "Nkhamem...",
            threat_detected: "FAMA KHTAR"
        },
        learn: {
            title: 'Academy',
            subtitle: 'Wali m3alem fel securité.',
            claim_cert: 'Khoudh Certif',
            modules: {
                phishing_101: 'Phishing 101',
                social_eng: 'Social Engineering',
                device_sec: 'Securité PC/Tel'
            },
            status: {
                completed: 'Kamaltou',
                in_progress: 'En Cours',
                locked: 'Msaker'
            }
        }
    }
};

const LanguageContext = createContext<{
    lang: Language;
    setLang: (l: Language) => void;
    t: typeof translations['en'];
    dir: 'ltr' | 'rtl';
}>({
    lang: 'en',
    setLang: () => { },
    t: translations.en,
    dir: 'ltr'
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>('en');

    const t = translations[lang];
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
            <div dir={dir} className={lang === 'ar' ? 'font-arabic' : ''}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
