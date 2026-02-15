"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Plus, ShieldCheck, MapPin, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full bg-glass-100 animate-pulse rounded-xl flex items-center justify-center">Loading Heat Radar...</div>
});

export default function MapPage() {
    const { t } = useLanguage();
    const [reportMode, setReportMode] = useState(false);
    const [expertMode, setExpertMode] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form state
    const [type, setType] = useState("SMS");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from('reports')
            .insert([
                {
                    user_id: user?.id,
                    type,
                    description,
                    lat: location?.lat || 36.8, // Default to Tunis if no location
                    lng: location?.lng || 10.1,
                    verified: false
                }
            ]);

        if (error) {
            alert("Error reporting threat: " + error.message);
        } else {
            alert("Threat reported successfully!");
            setReportMode(false);
            // Reset form
            setType("SMS");
            setDescription("");
            setLocation(null);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-full relative">
            <div className="absolute top-0 right-0 z-10 flex gap-2">
                <button
                    onClick={() => setExpertMode(!expertMode)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors border ${expertMode ? "bg-neon-purple/20 text-neon-purple border-neon-purple" : "bg-black/40 text-gray-400 border-gray-700"
                        }`}
                >
                    {expertMode ? t.map.expert_on : t.map.expert_off}
                </button>
                <button
                    onClick={() => setReportMode(true)}
                    className="bg-neon-red text-black font-bold px-4 py-2 rounded-lg hover:bg-white transition-colors flex items-center gap-2 shadow-neon-red"
                >
                    <Plus className="w-5 h-5" />
                    {t.map.report_btn}
                </button>
            </div>

            <h1 className="text-4xl font-bold mb-6 neon-text text-center">{t.hero.title} {t.nav.map}</h1>

            <div className="flex-grow glass-panel p-2 relative">
                <Map />

                {/* Report Modal */}
                {reportMode && (
                    <div className="absolute inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-glass-100 border border-glass-200 p-8 rounded-2xl w-full max-w-md relative">
                            <button
                                onClick={() => setReportMode(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <AlertTriangle className="text-neon-red" />
                                {t.map.report_new}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">{t.map.form_type}</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-2"
                                    >
                                        <option value="SMS">{t.map.threat_type_sms}</option>
                                        <option value="Email">{t.map.threat_type_email}</option>
                                        <option value="URL">{t.map.threat_type_url}</option>
                                        <option value="QR">{t.map.threat_type_qr}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">{t.map.form_desc}</label>
                                    <textarea
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 h-24"
                                        placeholder={t.map.desc_placeholder}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">{t.map.form_loc}</label>
                                    <button
                                        type="button"
                                        onClick={handleGetLocation}
                                        className={`w-full border rounded-lg p-2 flex items-center justify-center gap-2 transition-colors ${location ? "bg-neon-green/10 text-neon-green border-neon-green/50" : "bg-neon-blue/10 text-neon-blue border-neon-blue/50 hover:bg-neon-blue/20"
                                            }`}
                                    >
                                        <MapPin className="w-4 h-4" />
                                        {location ? `${t.map.location_set}: ${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}` : t.map.use_location}
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-neon-red text-black font-bold py-3 rounded-lg hover:bg-white transition-colors mt-4 disabled:opacity-50"
                                >
                                    {loading ? t.map.submitting : t.map.form_submit}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Expert Verification Panel (Mock) */}
            {expertMode && (
                <div className="mt-4 glass-panel p-4 border border-neon-purple/50">
                    <h3 className="text-neon-purple font-bold flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-5 h-5" /> {t.map.expert_queue}
                    </h3>
                    <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                        <span>{t.map.unverified}: "Fake STEG Bill" at 36.8, 10.1</span>
                        <div className="flex gap-2">
                            <button className="bg-neon-green/20 text-neon-green px-3 py-1 rounded text-xs border border-neon-green">{t.map.verify}</button>
                            <button className="bg-red-500/20 text-red-500 px-3 py-1 rounded text-xs border border-red-500">{t.map.dismiss}</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-panel p-4 text-center">
                    <h3 className="text-neon-red font-bold text-2xl">124</h3>
                    <p className="text-gray-400">{t.map.active_threats}</p>
                </div>
                <div className="glass-panel p-4 text-center">
                    <h3 className="text-neon-green font-bold text-2xl">98%</h3>
                    <p className="text-gray-400">{t.map.verified}</p>
                </div>
                <div className="glass-panel p-4 text-center">
                    <h3 className="text-neon-blue font-bold text-2xl">Tunisian Post</h3>
                    <p className="text-gray-400">{t.map.top_target}</p>
                </div>
            </div>
        </div>
    );
}
