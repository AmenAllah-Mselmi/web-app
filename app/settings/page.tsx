"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User, Shield, Bell, Key, Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

import { ProfileForm, SecuritySettings, NotificationSettings } from "@/components/SettingsComponents";

export default function SettingsPage() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [originalProfile, setOriginalProfile] = useState<any>(null);

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                setProfile(data);
                setOriginalProfile(data);
            }
            setLoading(false);
        }
        loadProfile();
    }, []);

    const handleSaveProfile = async () => {
        setSaving(true);
        const { error } = await supabase
            .from('profiles')
            .update({
                username: profile.username,
                avatar_url: profile.avatar_url
            })
            .eq('id', profile.id);

        if (error) {
            alert("Error updating profile: " + error.message);
        } else {
            setOriginalProfile(profile);
            alert(t.settings.success);
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-neon-blue">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        );
    }

    const tabs = [
        { id: "profile", label: t.settings.tab_profile, icon: User },
        { id: "security", label: t.settings.tab_security, icon: Shield },
        { id: "notifications", label: t.settings.tab_notifications, icon: Bell },
        { id: "api", label: t.settings.tab_api, icon: Key },
    ];

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold mb-8 neon-text uppercase tracking-widest">{t.settings.title}</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                    ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/50 shadow-[0_0_15px_rgba(0,194,255,0.1)]"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1 glass-panel p-8 min-h-[500px]">
                    {activeTab === "profile" && (
                        <ProfileForm
                            profile={profile}
                            setProfile={setProfile}
                            onSave={handleSaveProfile}
                            saving={saving}
                            originalProfile={originalProfile}
                        />
                    )}

                    {activeTab === "security" && <SecuritySettings />}
                    {activeTab === "notifications" && <NotificationSettings />}

                    {activeTab === "api" && (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                            <Key className="w-12 h-12 mb-4 opacity-20" />
                            <h2 className="text-xl font-bold mb-2">{t.settings.api_control}</h2>
                            <p>{t.settings.restricted}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
