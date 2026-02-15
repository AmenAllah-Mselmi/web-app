"use client";

import { motion } from "framer-motion";
import { Shield, Bell, Key, Save, Loader2 } from "lucide-react";

export function ProfileForm({ profile, setProfile, onSave, saving, originalProfile }: any) {
    const hasChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile);

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>

            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">Username</label>
                    <input
                        type="text"
                        value={profile?.username || ""}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        className="bg-black/40 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-neon-blue transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">Avatar URL</label>
                    <input
                        type="text"
                        value={profile?.avatar_url || ""}
                        onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                        className="bg-black/40 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-neon-blue transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">Defense Archetype</label>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-neon-purple font-bold">
                        {profile?.vulnerability_type || "Unassessed"}
                    </div>
                    <p className="text-xs text-gray-500">Take the behavioral quiz to update your archetype.</p>
                </div>

                <button
                    onClick={onSave}
                    disabled={saving || !hasChanges}
                    className="flex items-center justify-center gap-2 bg-neon-blue text-black font-bold py-3 px-6 rounded-lg hover:bg-white transition-all disabled:opacity-50 mt-4"
                >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Changes
                </button>
            </div>
        </motion.div>
    );
}

export function SecuritySettings() {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Password Update</h3>
                <p className="text-sm text-gray-400 mb-4">Change your password frequently to stay secure.</p>
                <button className="border border-neon-blue text-neon-blue px-4 py-2 rounded-lg hover:bg-neon-blue hover:text-black transition-all">
                    Send Password Reset Email
                </button>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account.</p>
                <button disabled className="bg-gray-700 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed">
                    Coming Soon
                </button>
            </div>
        </motion.div>
    );
}

export function NotificationSettings() {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center py-12 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <h2 className="text-xl font-bold mb-2">Notification Preferences</h2>
            <p>System alerts are currently sent to your primary email by default.</p>
        </motion.div>
    );
}
