import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';

const ManagerSettings = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('auth_token');

    const [email, setEmail] = useState(user.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!currentPassword) {
            setError('Current password is required to save changes.');
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://portfolio-lrul.onrender.com/api/user/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email,
                    current_password: currentPassword,
                    new_password: newPassword || undefined
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle Laravel validation errors or our custom current password error
                const errorMsg = data.errors 
                    ? Object.values(data.errors).flat().join(' ') 
                    : data.message || 'Failed to update settings.';
                throw new Error(errorMsg);
            }

            // Update local storage user data
            localStorage.setItem('user', JSON.stringify(data.user));
            
            setSuccess('Manager profile updated successfully.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl">
            <div className="mb-10">
                <h2 className="text-sm font-black text-emerald-950 uppercase tracking-widest mb-1">Manager Profile</h2>
                <p className="text-xs font-bold text-emerald-800/40 uppercase tracking-wider">Update Credentials & Security</p>
            </div>

            {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl flex items-center gap-3">
                    <AlertCircle size={20} />
                    <span className="text-xs font-bold tracking-widest uppercase">{error}</span>
                </motion.div>
            )}

            {success && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl flex items-center gap-3">
                    <CheckCircle2 size={20} />
                    <span className="text-xs font-bold tracking-widest uppercase">{success}</span>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="bg-white border border-emerald-900/10 rounded-3xl p-8 shadow-sm">
                
                {/* Email Section */}
                <div className="mb-8">
                    <h3 className="text-xs font-black text-emerald-950 uppercase tracking-widest mb-4 pb-2 border-b border-emerald-900/5">Contact Info</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-emerald-800/60 uppercase tracking-widest mb-2">Manager Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-emerald-50/50 border border-emerald-900/10 rounded-xl p-4 text-sm font-medium text-emerald-950 focus:outline-none focus:border-emerald-500 transition-colors"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="mb-8">
                    <h3 className="text-xs font-black text-emerald-950 uppercase tracking-widest mb-4 pb-2 border-b border-emerald-900/5">Security (Authorization Required)</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-emerald-800/60 uppercase tracking-widest mb-2">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full bg-emerald-50/50 border border-emerald-900/10 rounded-xl p-4 text-sm font-medium text-emerald-950 focus:outline-none focus:border-emerald-500 transition-colors"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-emerald-800/60 uppercase tracking-widest mb-2">New Password (Optional)</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-emerald-50/50 border border-emerald-900/10 rounded-xl p-4 text-sm font-medium text-emerald-950 focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="Leave blank to keep current"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-emerald-800/60 uppercase tracking-widest mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-emerald-50/50 border border-emerald-900/10 rounded-xl p-4 text-sm font-medium text-emerald-950 focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="Confirm if changing"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-emerald-900/5">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-emerald-900 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50"
                    >
                        {isLoading ? 'Processing...' : (
                            <>
                                <Save size={16} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManagerSettings;
