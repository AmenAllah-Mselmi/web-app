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
            dashboard: 'Dashboard',
            home: 'Home',
            about: 'About Us',
            contact: 'Contact',
            settings: 'Settings',
            language_label: 'Language / اللغة'
        },
        hero: {
            title: 'PhishShield AI',
            h1: 'Advanced AI Defense Against Phishing',
            subtitle: 'PhishShield uses behavioral AI to stop social engineering before it starts. Join the first community-driven immune system for Tunisia\'s digital frontier.',
            cta_scan: 'Scan URL Now',
            cta_quiz: 'Take Personality Test',
            stats_users: 'Protected Users',
            stats_threats: 'Threats Blocked'
        },
        features: {
            title: 'Future-Proof Defense',
            subtitle: 'Our triple-layer engine combines psychology, community data, and heuristic AI.',
            f1_title: 'Psychological Firewall',
            f1_desc: 'Most hacks aren\'t code, they\'re social engineering. We profile your personal vulnerability not just your firewall.',
            f2_title: 'Live Community Radar',
            f2_desc: 'See attacks happening in Tunisia in real-time. If one person is targeted, the whole community is immunized instantly.',
            f3_title: 'Zero-Day Detection',
            f3_desc: 'Our heuristic engine doesn\'t just check blacklists. It analyzes intent, urgency loops, and brand impersonation logic.'
        },
        cta_banner: {
            title: 'Ready to secure your digital life?',
            subtitle: 'Join thousands of users in Tunisia who are staying one step ahead of scammers.',
            btn: 'Get Protected Now'
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
            signin_link: "Sign In",
            logout: "Sign Out",
            email_placeholder: "name@example.com",
            password_placeholder: "••••••••",
            username_placeholder: "Your unique codename"
        },
        scan: {
            title: 'AI Threat Scanner',
            subtitle: 'Analyze URLs and texts with our heuristic engine.',
            placeholder: 'Paste suspicious URL or text here...',
            analyze_btn: 'Analyze Threat',
            scanning: 'Scanning...',
            safe: 'Safe',
            suspicious: 'Suspicious',
            high_risk: 'High Risk',
            result_title: 'Analysis Result',
            threat_type: 'Threat Type',
            no_threats: 'No obvious threats detected.'
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
            training_focus: 'Training Focus',
            vulnerability_score: 'Vulnerability Score',
            risk: 'Risk',
            simulation_desc: 'We will simulate this attack on you within 7 days to test your immunity.',
            start_learning: 'Start Learning',
            questions: [
                { id: 1, text: "You receive an email from 'HR Dept' saying your payroll is suspended unless you update info immediately.", trait: "Authority", options: [{ text: "Update immediately to avoid issues.", score: 10 }, { text: "Check the sender's email address closely.", score: 3 }, { text: "Call HR directly to verify.", score: 0 }] },
                { id: 2, text: "A police officer calls saying you have unpaid fines and must pay now to avoid arrest.", trait: "Authority", options: [{ text: "Panic and pay to stay out of jail.", score: 10 }, { text: "Ask for a badge number and callback number.", score: 4 }, { text: "Hang up, it's a common scam.", score: 0 }] },
                { id: 3, text: "Your boss emails from a personal address asking you to buy gift cards for a client urgently.", trait: "Authority", options: [{ text: "Do it quickly to impress the boss.", score: 10 }, { text: "Reply asking why they are using a personal email.", score: 5 }, { text: "Verify via Slack or phone call.", score: 0 }] },
                { id: 4, text: "A browser popup says 'VIRUS DETECTED! Call Microsoft Support immediately.'", trait: "Fear", options: [{ text: "Call the number right away!", score: 10 }, { text: "Download the 'antivirus' they suggest.", score: 8 }, { text: "Close the browser tab/force quit.", score: 0 }] },
                { id: 5, text: "You get a text: 'Your bank account has been compromised. Click to freeze.'", trait: "Fear", options: [{ text: "Click the link immediately to save my money.", score: 10 }, { text: "Log in via the official bank app instead.", score: 0 }, { text: "Ignore it.", score: 5 }] },
                { id: 6, text: "An email threatens to release embarrassing photos of you unless you pay Bitcoin.", trait: "Fear", options: [{ text: "Pay the ransom just in case.", score: 10 }, { text: "Reply asking for proof.", score: 5 }, { text: "Mark as spam and ignore (Sextortion scam).", score: 0 }] },
                { id: 7, text: "You find a USB drive labeled 'Executive Salaries 2025' in the parking lot.", trait: "Curiosity", options: [{ text: "Plug it in to see the files.", score: 10 }, { text: "Plug it in but scan for viruses first.", score: 7 }, { text: "Hand it to IT security/Police.", score: 0 }] },
                { id: 8, text: "A friend sends a vague link: 'OMG is this you?? hahaha'", trait: "Curiosity", options: [{ text: "Click it immediately to see.", score: 10 }, { text: "Ask 'What is this?' first.", score: 3 }, { text: "Delete it.", score: 0 }] },
                { id: 9, text: "An ad offers 'Leaked Game of Thrones Scripts - Download PDF'.", trait: "Curiosity", options: [{ text: "Download it!", score: 10 }, { text: "Search Google to see if leaks are real.", score: 4 }, { text: "Ignore, likely malware.", score: 0 }] },
                { id: 10, text: "You see a limited-time offer: '90% OFF iPhone 15 - Next 5 Minutes Only!'", trait: "Impulsiveness", options: [{ text: "Buy it now before it's gone!", score: 10 }, { text: "Check the site reviews quickly.", score: 4 }, { text: "Too good to be true, ignore.", score: 0 }] },
                { id: 11, text: "You're typing a password and a 'Software Update' popup appears.", trait: "Impulsiveness", options: [{ text: "Click 'Update' to get it over with.", score: 10 }, { text: "Click 'Remind me later'.", score: 5 }, { text: "Verify the update source manually.", score: 0 }] },
                { id: 12, text: "A QR code on a parking meter says 'Scan to Pay' (sticker looks new).", trait: "Impulsiveness", options: [{ text: "Scan and pay quickly.", score: 10 }, { text: "Check if the sticker is covering the original.", score: 2 }, { text: "Use the official app or cash.", score: 0 }] },
                { id: 13, text: "A charity emails asking for donations for a recent disaster.", trait: "Trust", options: [{ text: "Donate via the link provided.", score: 10 }, { text: "Go to the official charity website manually.", score: 0 }, { text: "Assume it's a scam.", score: 2 }] },
                { id: 14, text: "Someone on LinkedIn offers you a high-paying job with no interview.", trait: "Trust", options: [{ text: "Accept and send my details!", score: 10 }, { text: "Engage conversation to learn more.", score: 6 }, { text: "Report profile as fake.", score: 0 }] },
                { id: 15, text: "A 'Microsoft Tech' calls saying they detected an error on your PC.", trait: "Trust", options: [{ text: "Follow their instructions to fix it.", score: 10 }, { text: "Ask for their employee ID.", score: 6 }, { text: "Hang up. Microsoft doesn't call you.", score: 0 }] }
            ],
            results: {
                Authority: { archetype: "The Obedient Executive", description: "You have a high respect for hierarchy, making you vulnerable to CEO Fraud and fake government/police demands.", simulation: "Fake CEO 'Urgent Wire Transfer' Request", trainingFocus: "Verifying Authority Channels" },
                Fear: { archetype: "The Anxious Defender", description: "Scammers can easily panic you into making mistakes with 'Account Suspended' or 'Virus Detected' alerts.", simulation: "Ransomware Countdown Timer Simulation", trainingFocus: "Emotional Regulation in Cybersecurity" },
                Curiosity: { archetype: "The Curious Clicker", description: "Your desire to know makes you click on 'Leaked Docs' or 'Mystery Links' without checking the source.", simulation: "Malicious 'Salary Spreadsheet' USB Drop", trainingFocus: "Safe Browsing & File Handling" },
                Impulsiveness: { archetype: "The Speed Racer", description: "You act before you think. Urgency-based scams (Limited Time Offers) are your kryptonite.", simulation: "Fake '90% Off' Flash Sale Landing Page", trainingFocus: "Slow Down: The 10-Second Rule" },
                Trust: { archetype: "The Benevolent Believer", description: "You assume the best in people. Scammers exploit your kindness with charity fraud and fake job offers.", simulation: "Fake GoFundMe/Charity Campaign", trainingFocus: "Zero Trust Mindset" },
                average: { archetype: "The Occasional Skeptic", description: "You catch most scams but can be tricked when distracted or tired.", simulation: "Subtle 'Password Expiry' Notification", trainingFocus: "Identifying Contextual Phishing" },
                safe: { archetype: "The Cyber Sentinel", description: "You are highly vigilant and verify sources naturally. Keep it up!", simulation: "Advanced Spear Phishing (CEO Fraud)", trainingFocus: "Deepfakes & AI Voice Cloning" }
            }
        },
        map: {
            title: 'Live Threat Map',
            report_btn: 'Report Threat',
            expert_mode: 'Expert Mode',
            expert_on: 'Expert Mode: ON',
            expert_off: 'Expert Mode: OFF',
            active_threats: 'Active Threats',
            verified: 'Community Verified',
            top_target: 'Top Target Today',
            form_type: 'Threat Type',
            form_desc: 'Description',
            form_loc: 'Location',
            form_submit: 'Submit Report',
            use_location: 'Use My Location',
            report_new: 'Report New Threat',
            threat_type_sms: 'SMS Phishing',
            threat_type_email: 'Email Scam',
            threat_type_url: 'Malicious URL',
            threat_type_qr: 'Fake QR Code',
            desc_placeholder: 'Describe the attack...',
            location_set: 'Location set',
            submitting: 'Submitting...',
            success: 'Threat reported successfully!',
            error: 'Error reporting threat',
            expert_queue: 'Expert Verification Queue',
            unverified: 'UNVERIFIED REPORT',
            verify: 'Verify',
            dismiss: 'Dismiss'
        },
        forum: {
            title: 'Cybersecurity Expert Forum',
            subtitle: 'Discuss trends, verify threats, and share intel.',
            newPost: 'New Discussion',
            verified_threat: 'Verified Threat',
            expert: 'Expert',
            no_discussions: 'No discussions yet. Be the first to start one!',
            db_error: 'Database Connection Failed',
            db_error_desc: 'Missing Supabase configuration. Please check your .env.local file.',
            comment: 'Comment',
            back: 'Back to Forum',
            create: 'Create New Discussion',
            title_label: 'Title',
            category_label: 'Category',
            content_label: 'Content',
            placeholder_title: 'e.g., Suspicious SMS from Unknown Number',
            placeholder_content: 'Describe your issue or share your thoughts...',
            publish: 'Publish Post',
            posting: 'Posting...',
            categories: {
                general: 'General Discussion',
                report: 'Phishing Report',
                question: 'Question',
                story: 'Success Story'
            }
        },
        dashboard: {
            welcome: 'Welcome back,',
            security_overview: 'Here is your PhishShield security overview.',
            risk_score: 'Risk Score',
            recent_scans: 'Recent Scans',
            community_rep: 'Community Rep',
            academy_xp: 'Academy XP',
            recent_activity: 'Recent Activity',
            quick_actions: 'Quick Actions',
            new_scan: 'New Scan',
            continue_learning: 'Continue Learning',
            activity_module: 'Completed Module',
            activity_url: 'Scanned suspicious URL',
            activity_forum: 'Posted in Forum',
            safe_status: 'You are safe',
            risk_status: 'Action Required',
            total_scans: 'Total Scans',
            alerts: 'Active Alerts',
            community_alerts: 'Community Alerts'
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
            total_xp: 'Total XP Earned',
            review_module: 'Review Module',
            start_learning: 'Start Learning',
            locked: 'Locked',
            coming_soon: 'Coming soon in the next update.',
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
        },
        settings: {
            title: 'Settings Console',
            tab_profile: 'Profile',
            tab_security: 'Security',
            tab_notifications: 'Notifications',
            tab_api: 'API Keys',
            api_control: 'API Control',
            restricted: 'This terminal is currently restricted.',
            save: 'Save Settings',
            saving: 'Saving...',
            success: 'Profile updated successfully!'
        },
        about: {
            title: 'Protecting Tunisia\'s Digital Frontier',
            p1: 'PhishShield was born from a simple observation: traditional antivirus software isn\'t enough to stop social engineering. In a world where hackers hack people, not just computers, we need a defense that understands human psychology.',
            p2: 'Our mission is to create a herd immunity against cyber threats in Tunisia. By combining AI-driven detection with community-verified reporting, we turn every user into a sensor for the entire network.',
            v1_title: 'Proactive Defense',
            v1_desc: 'We stop threats before they happen by analyzing patterns, not just file signatures.',
            v2_title: 'Community Power',
            v2_desc: 'A threat detected by one is blocked for all. Our community is our strongest firewall.',
            v3_title: 'Precision AI',
            v3_desc: 'Our models are trained on local Tunisian dialects and context to spot localized scams.'
        },
        contact: {
            title: 'Get in Touch',
            subtitle: 'Have a security concern or want to partner with us? We\'re here to help.',
            email_title: 'Email Us',
            chat_title: 'Live Chat',
            chat_desc: 'Available in App',
            hq_title: 'Visit HQ',
            hq_desc: 'CyberPark, Tunis',
            field_name: 'Name',
            field_email: 'Email',
            field_message: 'Message',
            send_btn: 'Send Message',
            sending: 'Sending...',
            sent_title: 'Message Sent!',
            sent_desc: 'Our team will get back to you shortly.',
            send_another: 'Send another message'
        },
        footer: {
            rights: 'All rights reserved.',
            desc: 'Behavioral & Real-Time Phishing Defense'
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
            dashboard: 'لوحة التحكم',
            home: 'الرئيسية',
            about: 'من نحن',
            contact: 'اتصل بنا',
            settings: 'الإعدادات',
            language_label: 'اللغة / Language'
        },
        hero: {
            title: 'فيش-شيلد الذكي',
            h1: 'دفاع متطور بالذكاء الاصطناعي ضد الاحتيال',
            subtitle: 'يستخدم فيش-شيلد الذكاء الاصطناعي السلوكي لوقف الهندسة الاجتماعية قبل أن تبدأ. انضم إلى أول نظام مناعي مجتمعي للحدود الرقمية لتونس.',
            cta_scan: 'افحص رابط الآن',
            cta_quiz: 'ابدأ اختبار الشخصية',
            stats_users: 'مستخدم محمي',
            stats_threats: 'تهديد تم حظره'
        },
        features: {
            title: 'دفاع مستقبلي',
            subtitle: 'محركنا ثلاثي الطبقات يجمع بين علم النفس وبيانات المجتمع والذكاء الاصطناعي الاستدلالي.',
            f1_title: 'جدار حماية نفسي',
            f1_desc: 'معظم الهجمات ليست برمجية، بل هندسة اجتماعية. نقوم بتحليل قابليتك الشخصية للاختراق وليس فقط جدار الحماية الخاص بك.',
            f2_title: 'رادار المجتمع المباشر',
            f2_desc: 'شاهد الهجمات التي تحدث في تونس في الوقت الفعلي. إذا تم استهداف شخص واحد، فسيتم تحصين المجتمع بأكمله على الفور.',
            f3_title: 'كشف ثغرات اليوم الصفر',
            f3_desc: 'محركنا لا يتحقق فقط من القوائم السوداء، بل يحلل النوايا وحلقات الاستعجال ومنطق انتحال العلامات التجارية.'
        },
        cta_banner: {
            title: 'هل أنت جاهز لتأمين حياتك الرقمية؟',
            subtitle: 'انضم إلى آلاف المستخدمين في تونس الذين يبقون دائماً متقدمين على المحتالين بخطوة.',
            btn: 'احصل على الحماية الآن'
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
            signin_link: "تسجيل الدخول",
            logout: "تسجيل الخروج",
            email_placeholder: "name@example.com",
            password_placeholder: "••••••••",
            username_placeholder: "اسمك المشفر الفريد"
        },
        scan: {
            title: 'فاحص التهديدات الذكي',
            subtitle: 'حلل الروابط والنصوص باستخدام محرك الكشف الخاص بنا.',
            placeholder: 'الصق الرابط أو النص المشبوه هنا...',
            analyze_btn: 'تحليل التهديد',
            scanning: 'جاري الفحص...',
            safe: 'آمن',
            suspicious: 'مشبوه',
            high_risk: 'خطر جداً',
            result_title: 'نتيجة التحليل',
            threat_type: 'نوع التهديد',
            no_threats: 'لم يتم اكتشاف تهديدات واضحة.'
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
            training_focus: 'تركيز التدريب',
            vulnerability_score: 'مستوى القابلية للاختراق',
            risk: 'خطر',
            simulation_desc: 'سنقوم بمحاكاة هذا الهجوم عليك في غضون 7 أيام لاختبار مناعتك.',
            start_learning: 'ابدأ التعلم',
            questions: [
                { id: 1, text: "تلقيت بريدًا إلكترونيًا من 'قسم الموارد البشرية' يقول إن راتبك موقوف ما لم تقم بتحديث بياناتك فورًا.", trait: "Authority", options: [{ text: "التحديث فورًا لتجنب المشاكل.", score: 10 }, { text: "التحقق من عنوان بريد المرسل بدقة.", score: 3 }, { text: "الاتصال بالموارد البشرية مباشرة للتأكد.", score: 0 }] },
                { id: 2, text: "يتصل بك ضابط شرطة قائلاً إن لديك غرامات غير مدفوعة ويجب عليك الدفع الآن لتجنب الاعتقال.", trait: "Authority", options: [{ text: "الارتباك والدفع لتجنب السجن.", score: 10 }, { text: "طلب رقم الشارة ورقم للاتصال لاحقاً.", score: 4 }, { text: "إنهاء المكالمة، هذا احتيال شائع.", score: 0 }] },
                { id: 3, text: "يرسل مديرك بريدًا إلكترونيًا من عنوانه الشخصي يطلب منك شراء بطاقات هدايا لعميل بشكل عاجل.", trait: "Authority", options: [{ text: "فعل ذلك بسرعة لإثارة إعجاب المدير.", score: 10 }, { text: "الرد بالسؤال عن سبب استخدام بريد شخصي.", score: 5 }, { text: "التحقق عبر سلاك أو مكالمة هاتفية.", score: 0 }] },
                { id: 4, text: "تظهر نافذة منبثقة في المتصفح تقول 'تم اكتشاف فيروس! اتصل بدعم مايكروسوفت فورًا'.", trait: "Fear", options: [{ text: "الاتصال بالرقم على الفور!", score: 10 }, { text: "تحميل 'برنامج الحماية' الذي يقترحونه.", score: 8 }, { text: "إغلاق نافذة المتصفح.", score: 0 }] },
                { id: 5, text: "تصلك رسالة نصية: 'تم اختراق حسابك البنكي. انقر هنا لتجميده'.", trait: "Fear", options: [{ text: "النقر على الرابط فورًا لإنقاذ أموالي.", score: 10 }, { text: "تسجيل الدخول عبر تطبيق البنك الرسمي بدلاً من ذلك.", score: 0 }, { text: "تجاهلها.", score: 5 }] },
                { id: 6, text: "يهددك بريد إلكتروني بنشر صور مخجلة لك ما لم تدفع مبلغاً بعملة البيتكوين.", trait: "Fear", options: [{ text: "دفع الفدية من باب الاحتياط.", score: 10 }, { text: "الرد بطلب دليل.", score: 5 }, { text: "التبليغ كبريد مزعج وتجاهله.", score: 0 }] },
                { id: 7, text: "وجدت مفتاح USB في موقف السيارات مكتوب عليه 'رواتب التنفيذيين 2025'.", trait: "Curiosity", options: [{ text: "توصيله بجهازي لرؤية الملفات.", score: 10 }, { text: "توصيله ولكن بعد فحصه من الفيروسات.", score: 7 }, { text: "تسليمه لأمن المعلومات أو الشرطة.", score: 0 }] },
                { id: 8, text: "يرسل لك صديق رابطاً غامضاً: 'يا إلهي هل هذا أنت؟؟ ههههه'.", trait: "Curiosity", options: [{ text: "النقر فوراً لرؤية ما في الرابط.", score: 10 }, { text: "السؤال 'ما هذا؟' أولاً.", score: 3 }, { text: "حذف الرسالة.", score: 0 }] },
                { id: 9, text: "إعلان يقدم 'تسريبات مسلسل صراع العروش - تحميل PDF'.", trait: "Curiosity", options: [{ text: "تحميل الملف!", score: 10 }, { text: "البحث في جوجل للتأكد من وجود تسريبات.", score: 4 }, { text: "التجاهل، غالباً ما تكون برمجيات خبيثة.", score: 0 }] },
                { id: 10, text: "ترى عرضاً محدود الوقت: 'خصم 90% على آيفون 15 - لفترة 5 دقائق فقط!'.", trait: "Impulsiveness", options: [{ text: "الشراء الآن قبل نفاد الكمية!", score: 10 }, { text: "التحقق من تقييمات الموقع بسرعة.", score: 4 }, { text: "العرض أجمل من أن يكون حقيقياً، تجاهله.", score: 0 }] },
                { id: 11, text: "بينما تكتب كلمة مرور، تظهر نافذة منبثقة 'تحديث البرنامج'.", trait: "Impulsiveness", options: [{ text: "النقر على 'تحديث' للانتهاء من الأمر.", score: 10 }, { text: "النقر على 'ذكرني لاحقاً'.", score: 5 }, { text: "التحقق من مصدر التحديث يدوياً.", score: 0 }] },
                { id: 12, text: "رمز QR على عداد مواقف السيارات يقول 'امسح للدفع' (الملصق يبدو جديداً).", trait: "Impulsiveness", options: [{ text: "المسح والدفع بسرعة.", score: 10 }, { text: "التحقق مما إذا كان الملصق يغطي ملصقاً أصلياً.", score: 2 }, { text: "استخدام التطبيق الرسمي أو النقد.", score: 0 }] },
                { id: 13, text: "يرسل لك بريد لجمع تبرعات لجمعية خيرية بعد كارثة طبيعية حديثة.", trait: "Trust", options: [{ text: "التبرع عبر الرابط المقدم.", score: 10 }, { text: "الذهاب للموقع الرسمي للجمعية يدوياً.", score: 0 }, { text: "افتراض أنه احتيال.", score: 2 }] },
                { id: 14, text: "يعرض عليك شخص على لينكد إن وظيفة براتب عالٍ بدون مقابلة.", trait: "Trust", options: [{ text: "القبول وإرسال بياناتي!", score: 10 }, { text: "بدء محادثة لمعرفة المزيد.", score: 6 }, { text: "التبليغ عن الملف الشخصي كمزيف.", score: 0 }] },
                { id: 15, text: "يتصل 'تقني من مايكروسوفت' قائلاً إنهم اكتشفوا خطأ في جهازك.", trait: "Trust", options: [{ text: "اتباع تعليماتهم لإصلاحه.", score: 10 }, { text: "طلب رقم تعريف الموظف الخاص بهم.", score: 6 }, { text: "إنهاء المكالمة. مايكروسوفت لا تتصل بك.", score: 0 }] }
            ],
            results: {
                Authority: { archetype: "المسؤول المطيع", description: "لديك احترام عالٍ للتسلسل الهرمي، مما يجعلك عرضة للاحتيال باسم المدير التنفيذي أو طلبات الحكومة/الشرطة المزيفة.", simulation: "طلب 'تحويل بنكي عاجل' مزيف من المدير", trainingFocus: "التحقق من قنوات السلطة" },
                Fear: { archetype: "المدافع القلق", description: "يمكن للمحتالين إصابتك بالذعر بسهولة لارتكاب أخطاء عبر تنبيهات 'الحساب معلق' أو 'تم اكتشاف فيروس'.", simulation: "محاكاة عد تنازلي لبرنامج فدية", trainingFocus: "التنظيم العاطفي في الأمن السيبراني" },
                Curiosity: { archetype: "الناقر الفضولي", description: "رغبتك في المعرفة تدفعك للنقر على 'وثائق مسربة' أو 'روابط غامضة' دون التحقق من المصدر.", simulation: "رمي USB خبيث مكتوب عليه 'رواتب الموظفين'", trainingFocus: "التصفح الآمن والتعامل مع الملفات" },
                Impulsiveness: { archetype: "متسابق السرعة", description: "تتصرف قبل أن تفكر. الإعلانات التي تعتمد على الاستعجال (عروض محدودة الوقت) هي نقطة ضعفك.", simulation: "صفحة وهمية لعرض 'خصم 90%' صاعق", trainingFocus: "تمهل: قاعدة الـ 10 ثوانٍ" },
                Trust: { archetype: "المؤمن اللطيف", description: "تفترض الأفضل في الناس. يستغل المحتالون طيبتك عبر الاحتيال باسم الجمعيات الخيرية وعروض العمل المزيفة.", simulation: "حملة تبرعات وهمية", trainingFocus: "عقلية عدم الثقة المطلقة (Zero Trust)" },
                average: { archetype: "المشكك أحياناً", description: "تكتشف معظم عمليات الاحتيال ولكن يمكن خداعك عندما تكون مشتتاً أو متعباً.", simulation: "تنبيه خفي بانتهاء صلاحية كلمة المرور", trainingFocus: "تحديد التصيد السياقي" },
                safe: { archetype: "الحارس السيبراني", description: "أنت يقظ جداً وتتحقق من المصادر بشكل طبيعي. استمر في ذلك!", simulation: "تصيد متطور مستهدف (احتيال المدير)", trainingFocus: "التزييف العميق واستنتاج الصوت بالذكاء الاصطناعي" }
            }
        },
        map: {
            title: 'خريطة التهديدات الحية',
            report_btn: 'بلغ عن تهديد',
            expert_mode: 'وضع الخبراء',
            expert_on: 'وضع الخبراء: مفعل',
            expert_off: 'وضع الخبراء: معطل',
            active_threats: 'تهديدات نشطة',
            verified: 'مؤكد من المجتمع',
            top_target: 'الهدف الأول اليوم',
            form_type: 'نوع التهديد',
            form_desc: 'الوصف',
            form_loc: 'الموقع',
            form_submit: 'إرسال البلاغ',
            use_location: 'استخدم موقعي',
            report_new: 'إبلاغ عن تهديد جديد',
            threat_type_sms: 'رسائل تصيد قصيرة',
            threat_type_email: 'بريد احتيالي',
            threat_type_url: 'رابط خبيث',
            threat_type_qr: 'رمز QR مزيف',
            desc_placeholder: 'صف الهجوم...',
            location_set: 'تم تحديد الموقع',
            submitting: 'جاري الإرسال...',
            success: 'تم الإبلاغ عن التهديد بنجاح!',
            error: 'خطأ في الإبلاغ عن التهديد',
            expert_queue: 'طابور تحقق الخبراء',
            unverified: 'بلاغ غير مؤكد',
            verify: 'تأكيد',
            dismiss: 'تجاهل'
        },
        forum: {
            title: 'منتدى خبراء الأمن السيبراني',
            subtitle: 'ناقش الاتجاهات، تحقق من التهديدات، وشارك المعلومات.',
            newPost: 'موضوع جديد',
            verified_threat: 'تهديد مؤكد',
            expert: 'خبير',
            no_discussions: 'لا توجد مناقشات بعد. كن أول من يبدأ واحدة!',
            db_error: 'فشل الاتصال بقاعدة البيانات',
            db_error_desc: 'تكوين Supabase مفقود. يرجى التحقق من ملف .env.local الخاص بك.',
            comment: 'تعليق',
            back: 'العودة للمنتدى',
            create: 'إنشاء مناقشة جديدة',
            title_label: 'العنوان',
            category_label: 'الفئة',
            content_label: 'المحتوى',
            placeholder_title: 'مثلاً: رسالة نصية مشبوهة من رقم مجهول',
            placeholder_content: 'صف مشكلتك أو شارك أفكارك...',
            publish: 'نشر الموضوع',
            posting: 'جاري النشر...',
            categories: {
                general: 'مناقشة عامة',
                report: 'تقرير تصيد',
                question: 'سؤال',
                story: 'قصة نجاح'
            }
        },
        dashboard: {
            welcome: 'مرحبًا بعودتك،',
            security_overview: 'إليك نظرة عامة على أمن PhishShield الخاص بك.',
            risk_score: 'مستوى الخطر',
            recent_scans: 'فحوصات حديثة',
            community_rep: 'سمعة المجتمع',
            academy_xp: 'نقاط الأكاديمية',
            recent_activity: 'نشاطات حديثة',
            quick_actions: 'إجراءات سريعة',
            new_scan: 'فحص جديد',
            continue_learning: 'مواصلة التعلم',
            activity_module: 'أكملت وحدة تعليمية',
            activity_url: 'فحصت رابطاً مشبوهاً',
            activity_forum: 'نشرت في المنتدى',
            safe_status: 'أنت في أمان',
            risk_status: 'مطلوب إجراء',
            total_scans: 'إجمالي الفحوصات',
            alerts: 'تنبيهات نشطة',
            community_alerts: 'تنبيهات المجتمع'
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
            total_xp: 'إجمالي النقاط المكتسبة',
            review_module: 'مراجعة الوحدة',
            start_learning: 'ابدأ التعلم',
            locked: 'مغلق',
            coming_soon: 'قادم قريباً في التحديث القادم.',
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
        },
        settings: {
            title: 'وحدة التحكم في الإعدادات',
            tab_profile: 'الملف الشخصي',
            tab_security: 'الأمان',
            tab_notifications: 'التنبيهات',
            tab_api: 'مفاتيح API',
            api_control: 'التحكم في API',
            restricted: 'هذه المحطة مقيدة حالياً.',
            save: 'حفظ الإعدادات',
            saving: 'جاري الحفظ...',
            success: 'تم تحديث الملف الشخصي بنجاح!'
        },
        about: {
            title: 'حماية الحدود الرقمية لتونس',
            p1: 'وُلد PhishShield من ملاحظة بسيطة: برامج مكافحة الفيروسات التقليدية ليست كافية لوقف الهندسة الاجتماعية. في عالم يخترق فيه الهاكرز الناس، وليس فقط أجهزة الكمبيوتر، نحتاج إلى دفاع يفهم علم النفس البشري.',
            p2: 'مهمتنا هي خلق مناعة جماعية ضد التهديدات السيبرانية في تونس. من خلال الجمع بين الكشف القائم على الذكاء الاصطناعي والتقارير المؤكدة من المجتمع، نحول كل مستخدم إلى مستشعر للشبكة بأكملها.',
            v1_title: 'دفاع استباقي',
            v1_desc: 'نوقف التهديدات قبل حدوثها من خلال تحليل الأنماط، وليس فقط تواقيع الملفات.',
            v2_title: 'قوة المجتمع',
            v2_desc: 'التهديد الذي يكتشفه شخص واحد يتم حظره للجميع. مجتمعنا هو أقوى جدار حماية لدينا.',
            v3_title: 'ذكاء اصطناعي دقيق',
            v3_desc: 'تم تدريب نماذجنا على اللهجات التونسية والسياق المحلي لاكتشاف عمليات الاحتيال المحلية.'
        },
        contact: {
            title: 'اتصل بنا',
            subtitle: 'لديك استفسار أمني أو تريد الشراكة معنا؟ نحن هنا للمساعدة.',
            email_title: 'راسلنا عبر البريد',
            chat_title: 'دردشة مباشرة',
            chat_desc: 'متوفر في التطبيق',
            hq_title: 'زيارة المقر',
            hq_desc: 'القطب التكنولوجي، تونس',
            field_name: 'الاسم',
            field_email: 'البريد الإلكتروني',
            field_message: 'الرسالة',
            send_btn: 'إرسال الرسالة',
            sending: 'جاري الإرسال...',
            sent_title: 'تم إرسال الرسالة!',
            sent_desc: 'سيعاود فريقنا الاتصال بك قريباً.',
            send_another: 'إرسال رسالة أخرى'
        },
        footer: {
            rights: 'جميع الحقوق محفوظة.',
            desc: 'دفاع سلوكي ولحظي ضد الاحتيال'
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
            dashboard: 'Tableau',
            home: 'Accueil',
            about: 'Chkoun na7na',
            contact: 'Contact',
            settings: 'Réglages',
            language_label: 'اللغة / Langue'
        },
        hero: {
            title: 'PhishShield AI',
            h1: 'Ahsen Difé3 mta3 AI dod el Scam',
            subtitle: 'PhishShield yasta3mel AI bech ywa9ef el scam 9bal ma yabdé. Od5ol ma3na fi awel system mta3 difé3 tounsi.',
            cta_scan: 'Thabet lien houni',
            cta_quiz: 'A3mel Test el sifa mte3ek',
            stats_users: 'Met-haniyin',
            stats_threats: 'Scams t-na7aw'
        },
        features: {
            title: 'Difé3 mta3 el mosta9bel',
            subtitle: 'System mte3na fih 3 layers: psychology, community w AI s-7i7.',
            f1_title: 'Difé3 Nefsi',
            f1_desc: 'Akther el scams ya3mlouhom 3al la3bed mouch 3al code. Na7na nchoufou enti win t-na7em tetghdar mouch el pc mte3ek.',
            f2_title: 'Radar mta3 el Houma',
            f2_desc: 'Chouf el scams elli sayrin fi tounes tawa tawa. Ken wa7ed yetghdar, nes lkol yet-bal9ou fard wa9t.',
            f3_title: 'Thabét el Nawa-ya',
            f3_desc: 'System mte3na mouch dima ythabet fi les listes, yzid ychouf el niyya w kifah y7ebou i-zrbouk bech teghlat.'
        },
        cta_banner: {
            title: 'Ready bech t-hanni 7yetek el digital?',
            subtitle: 'Od5ol m3a el l-ef mta3 el twensa elli herbin bel scams b-5otwa.',
            btn: 'Behi, Hen-ni rou7ek tawa'
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
            signin_link: "Connecti",
            logout: "Okherré",
            email_placeholder: "name@example.com",
            password_placeholder: "••••••••",
            username_placeholder: "Surnom mte3ek"
        },
        scan: {
            title: 'Scaneur mta3 Scam',
            subtitle: 'Chouf lien wala message s7i7 wala lé.',
            placeholder: 'Hot lien wala text houni...',
            analyze_btn: 'Thabet',
            scanning: 'Ythabet...',
            safe: 'Jawou Behi',
            suspicious: 'Chak kbir',
            high_risk: 'Rod belek!',
            result_title: 'Résultat',
            threat_type: 'Naw3 scam',
            no_threats: 'Mafama hata khtar.'
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
            training_focus: 'Lezem tet3alem',
            vulnerability_score: 'Score Khtar',
            risk: 'Khtar',
            simulation_desc: 'Bech njarbou na3mloulek scam fi 7 ayem bech nchoufou fe6en wala lé.',
            start_learning: 'Abda t3alam',
            questions: [
                { id: 1, text: "Jek email mel 'HR' y9ollek elli flousek t-bloquet ken mat-rakach l-info mte3ek tawa.", trait: "Authority", options: [{ text: "Nglég w n-rakachha tawa tawa.", score: 10 }, { text: "Nthabet fel email mta3 el sayed elli b3athli.", score: 3 }, { text: "Nkalem el HR bech nthabet s7i7 wala lé.", score: 0 }] },
                { id: 2, text: "Kalmek boulece y9ollek 3andek khtyeya mouch khalsa w lezem tokholsek tawa wala tet-chad.", trait: "Authority", options: [{ text: "Nefja3 w nkhales bech ma net-chadech.", score: 10 }, { text: "Nas-lou 3al matricule mte3ou w nemrou nkalmou 3lih.", score: 4 }, { text: "Nsaker el tel, scam mta3 dima.", score: 0 }] },
                { id: 3, text: "Chef mte3ek b3athlek email men nemrouh el khass yseb fik wala ytolb mennek t-ichri cards mta3 flous.", trait: "Authority", options: [{ text: "Na3malhom fisa3 bech nefrah bih.", score: 10 }, { text: "Nas-lou 3léch yasta3mel fi email berrani.", score: 5 }, { text: "Nkalmou wala nab3athlou fi Slack.", score: 0 }] },
                { id: 4, text: "Tla3lek message fel pc y9ollek 'VIRUS! kalem Microsoft tawa'.", trait: "Fear", options: [{ text: "Nkalem el nemrou fisa3!", score: 10 }, { text: "N-telechargi el antivirus elli 9alou 3lih.", score: 8 }, { text: "Nsaker el pc wala el browser.", score: 0 }] },
                { id: 5, text: "Jek message: 'Compte mte3ek t-pirata. Click houni bech t-sakrou'.", trait: "Fear", options: [{ text: "N-cliqui fisa3 bech n-mani flousi.", score: 10 }, { text: "N-connecti mel app el shiha mta3 el banka.", score: 0 }, { text: "Tafi edhaw.", score: 5 }] },
                { id: 6, text: "Jek email y-heded fik b-tsawer h-chouma ken mat-khalesch bel Bitcoin.", trait: "Fear", options: [{ text: "Nkhales w raski marfou3.", score: 10 }, { text: "Nas-lou ya3tini preuve.", score: 5 }, { text: "N-marquih spam w n-tafi edhaw.", score: 0 }] },
                { id: 7, text: "L9it USB fha 'Salarariet 2025' fel parking.", trait: "Curiosity", options: [{ text: "N-rakebha nchouf chfha.", score: 10 }, { text: "N-rakebha ama n-scanniha 9bal.", score: 7 }, { text: "Na3tiha lel securité wala lel IT.", score: 0 }] },
                { id: 8, text: "Sahbek b3athlek 'Ya latif hedha enti?? hhhhh' w m3ah lien.", trait: "Curiosity", options: [{ text: "N-cliqui fisa3 nchouf chfama.", score: 10 }, { text: "Nas-lou 'chfama houni?' 9bal.", score: 3 }, { text: "Nfas-khou.", score: 0 }] },
                { id: 9, text: "Pub t9ollek 'Scripts mta3 Game of Thrones masrou9a - downloadi houni'.", trait: "Curiosity", options: [{ text: "Downloadi!", score: 10 }, { text: "N-lwaj fi Google ken s7i7 el leaks.", score: 4 }, { text: "Tafi edhaw, bayna virus.", score: 0 }] },
                { id: 10, text: "Choft promo: '90% OFF 3al iPhone 15 - mazalou 5 d9aya9!'.", trait: "Impulsiveness", options: [{ text: "Nechrih tawa 9bal ma ywafa!", score: 10 }, { text: "Nthabet fel site fisa3.", score: 4 }, { text: "Khdha b-rachya, tafi edhaw.", score: 0 }] },
                { id: 11, text: "Enti t-iktib fi mot de passe w tla3tlek popup 'Software Update'.", trait: "Impulsiveness", options: [{ text: "N-cliqui update bech n-rta7.", score: 10 }, { text: "N9ollek 'Mba3ed'.", score: 5 }, { text: "Nthabet el source y-daou-ya.", score: 0 }] },
                { id: 12, text: "QR code fel parking y9ollek 'Scan bech tkhales' (el sticker jdid).", trait: "Impulsiveness", options: [{ text: "N-scanni w nkhales fisa3.", score: 10 }, { text: "Nchouf ken el sticker f-fou9 l-9dim.", score: 2 }, { text: "Nasta3mel el app el shiha.", score: 0 }] },
                { id: 13, text: "Email mta3 jam3iya t-tob fi t-barrou3at ba3d catastrophe.", trait: "Trust", options: [{ text: "N-tabara3 bel lien elli jeni.", score: 10 }, { text: "Nemchi lel site s7i7 mta3 el jam3iya.", score: 0 }, { text: "N9ollek hedha scam.", score: 2 }] },
                { id: 14, text: "Wahed fi LinkedIn ya3tik khidma b-chahriya 9wiya men ghir interview.", trait: "Trust", options: [{ text: "Na9bel w nab3ath l-info mte3ek!", score: 10 }, { text: "Nahki m3ah bech nefhem akther.", score: 6 }, { text: "N-signali el profil k-falsou.", score: 0 }] },
                { id: 15, text: "Nnemrou mel Microsoft ykalmek y9ollek l9ina mochkla fel pc mte3ek.", trait: "Trust", options: [{ text: "Na3mel elli y9ollek 3lih.", score: 10 }, { text: "Nas-lou 3al ID mte3ou.", score: 6 }, { text: "Nsaker el tel. Microsoft matkalem 7ad.", score: 0 }] }
            ],
            results: {
                Authority: { archetype: "El Chef el Moti3", description: "Enti t-9ader el kbar, hédha i-khallik vulnerable lel CEO Fraud w scams mta3 el 7akem.", simulation: "Email mta3 'Virement 3ajel' mel Chef", trainingFocus: "Thabet fel source mta3 el kbar" },
                Fear: { archetype: "el Khawaf el 7ami", description: "El scammers i-najmou i-faj3ouk b 'Compte msaker' wala 'Virus' bech tghlat.", simulation: "Simulation mta3 Ransomware fha wa9t", trainingFocus: "Rakzen rouhek fel khtar" },
                Curiosity: { archetype: "el Nagguer el Fadhouli", description: "T-7eb ta3ref kol chay, hedha i-khallik t-cliqui 3al 'Docs masrou9a' men ghir ma t-thabet.", simulation: "L9iyan USB fha 'Chahryet el 3bed'", trainingFocus: "Thabet 9bal ma t-cliqui" },
                Impulsiveness: { archetype: "Saba9 el jil", description: "Ta3mel 9bal ma tkhamem. El promos mta3 'Fisa3 fisa3' homa mochkeltek.", simulation: "Site fake fih '90% OFF' tawa tawa", trainingFocus: "T-rizin: 9a3det el 10 thwani" },
                Trust: { archetype: "el Niyya el Tayeb", description: "T-9ol el nes lkol nthaf. El scammers i-ghelbouk bel jam3iyet w khdem el fake.", simulation: "Jam3iya fake t-lim fel flous", trainingFocus: "Mindset 'Ma t-thi9 fi 7ad'" },
                average: { archetype: "el Chakak mara mara", description: "T-fi9 b-akther el scams ama i-najmou i-ghaltouk kenek t-3eb.", simulation: "Message mta3 'MDP wfa'", trainingFocus: "Thabet fel details el sghira" },
                safe: { archetype: "el 3ases el Cyber", description: "Enti fe6en b-rcha w t-thabet s7i7. Kamel hakka!", simulation: "Spear Phishing 9wi", trainingFocus: "Deepfakes w AI mta3 el sot" }
            }
        },
        map: {
            title: 'Winou Scam?',
            report_btn: 'Signalé mochkla',
            expert_mode: 'Mode Expert',
            expert_on: 'Expert Mode: ON',
            expert_off: 'Expert Mode: OFF',
            active_threats: 'Machekel',
            verified: 'Mconfirmé',
            top_target: 'Akther 7aja tpiratat',
            form_type: 'Naw3 scam',
            form_desc: 'Faserlna',
            form_loc: 'Blassa',
            form_submit: 'Ab3ath',
            use_location: 'Houni',
            report_new: 'Signalé Scam Jdid',
            threat_type_sms: 'SMS Scam',
            threat_type_email: 'Email Scam',
            threat_type_url: 'Lien Khayeb',
            threat_type_qr: 'QR Code Fake',
            desc_placeholder: 'Faser chsar...',
            location_set: 'Blassa mrigla',
            submitting: 'Yab3ath...',
            success: 'Tba3thet, ya3tik essa7a!',
            error: 'Mochkla fel ba3than',
            expert_queue: 'Blast el Experts',
            unverified: 'Méch confirmée',
            verify: 'Confirmé',
            dismiss: 'Na7i'
        },
        forum: {
            title: 'Coin Experts',
            subtitle: 'Ahki 3al jdid, chouf les scams, w partagi l’info.',
            newPost: 'Sujet Jdid',
            verified_threat: 'Scam Mconfirmé',
            expert: 'Expert',
            no_discussions: 'Mafama hata discussion tawa. Abda enti!',
            db_error: 'Mochkla fel connect mta3 base de données',
            db_error_desc: 'Supabase mouch mrégl. Thabet fel .env.local mte3ek.',
            comment: 'Commentaire',
            back: 'Erjaa lel Forum',
            create: 'Abda Discussion Jdida',
            title_label: 'Sujet',
            category_label: 'Catégorie',
            content_label: 'Klem',
            placeholder_title: 'Mathalan: SMS bizarre mel post...',
            placeholder_content: 'Faserlna chsar wala a3tina rayek...',
            publish: 'Ab3ath',
            posting: 'Yab3ath...',
            categories: {
                general: 'Discussion 3adeya',
                report: 'Rapport Scam',
                question: 'Sou2el',
                story: '7keya s7i7a'
            }
        },
        dashboard: {
            welcome: 'Ahla bik،',
            security_overview: 'Hatha el résumé mta3 el protection mte3ek.',
            risk_score: 'Score Risk mte3ek',
            recent_scans: 'Akher Scans',
            community_rep: 'Reputation',
            academy_xp: 'XP Academy',
            recent_activity: 'Akher chamel',
            quick_actions: 'Fisa3 fisa3',
            new_scan: 'Scan Jdid',
            continue_learning: 'Kamel e3lem',
            activity_module: 'Kamalt module',
            activity_url: 'Scannit URL khayba',
            activity_forum: '7atit klem fel Forum',
            safe_status: 'Omourek Hneya',
            risk_status: 'Rod belek',
            total_scans: 'Total Scans',
            alerts: 'Alertes',
            community_alerts: 'Alertes Jomhour'
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
            total_xp: 'XP mta3ek',
            review_module: '3awed chouf',
            start_learning: 'Abda t3alam',
            locked: 'Msaker',
            coming_soon: 'Mazel ki jdid, taw iji.',
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
        },
        settings: {
            title: 'Réglages',
            tab_profile: 'Profile',
            tab_security: 'Sécurité',
            tab_notifications: 'Notifications',
            tab_api: 'Clés API',
            api_control: 'Contrôle API',
            restricted: 'Blast el API msakra tawa.',
            save: 'Sajel',
            saving: 'Sajel...',
            success: 'Profile mrigel!'
        },
        about: {
            title: 'N7amiw el digital fi Tounes',
            p1: 'PhishShield tkhla9 men fekra basita: les antivirus el 3adiyin mouch kafiyin bech ywa9fou el social engineering. Fi 3alam win el hackers yakhtr9ou el 3bed, mouch ken el pcwet, lezemna defa3 yfhem el psychology.',
            p2: 'El mouhimma mte3na hya nkhl9ou mna3a jma3iya dhod el cyber threats fi Tounes. Bel combine mta3 AI w les rapports mta3 el jomhour, nradou kol user sensor lel network lkol.',
            v1_title: 'Defa3 proactive',
            v1_desc: 'Nwa9fou el khtar 9bal ma ysir bel analyse mta3 les patterns.',
            v2_title: '9owet el jomhour',
            v2_desc: 'Khtar yafi9 bih wehed, yetbloka 3al nes lkol. El jomhour mte3na hwa a9way wall defa3.',
            v3_title: 'AI mta3na',
            v3_desc: 'AI mte3na t3allem mellehjet el tounsiya bech yafi9 bel scams mte3na.'
        },
        contact: {
            title: 'Ahki m3ana',
            subtitle: '3andek ay khtar wala t7eb takhdem m3ana? Na7na houni bech n3awnouk.',
            email_title: 'Ab3ath Email',
            chat_title: 'Live Chat',
            chat_desc: 'Mawjoud fel App',
            hq_title: 'Zourna',
            hq_desc: 'CyberPark, Tunis',
            field_name: 'Esmek',
            field_email: 'Email',
            field_message: 'Message',
            send_btn: 'Ab3ath',
            sending: 'Yab3ath...',
            sent_title: 'Tba3thet!',
            sent_desc: 'Taw nkalmouek fi a9rab wa9t.',
            send_another: 'Ab3ath message akher'
        },
        footer: {
            rights: 'Nes lkol reserved.',
            desc: 'Behavioral & Real-Time Phishing Defense'
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
    const [lang, setLangState] = useState<Language>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('phishshield-lang') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ar' || savedLang === 'tn')) {
            setLangState(savedLang);
        }
        setMounted(true);
    }, []);

    const setLang = (l: Language) => {
        setLangState(l);
        localStorage.setItem('phishshield-lang', l);
    };

    const t = translations[lang];
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    if (!mounted) return null;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
            <div dir={dir} className={lang === 'ar' ? 'font-arabic' : ''}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
