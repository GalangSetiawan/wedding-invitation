import { useEffect, useState } from 'react';
import { invitationContentApi } from '@/core/api/endpoints';
import { PageLoader } from '@/shared/components/Loading';
import type { InvitationContent } from '@/types';
import toast from 'react-hot-toast';
import {
    HiOutlineMap,
    HiOutlineUserGroup,
    HiOutlineShare,
    HiOutlineHeart,
    HiOutlineCreditCard,
    HiOutlineChatAlt2,
    HiOutlineSave
} from 'react-icons/hi';

export function InvitationContentPage() {
    const [content, setContent] = useState<Partial<InvitationContent> | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await invitationContentApi.getContent();
            if (response.success && response.data) {
                setContent(response.data);
            } else {
                // Initialize with default empty values if backend returns null
                setContent({
                    flag_lokasi_akad_dan_resepsi_berbeda: false,
                    akad_map: '',
                    resepsi_map: '',
                    flag_tampilkan_nama_orang_tua: true,
                    nama_bapak_laki_laki: '',
                    nama_ibu_laki_laki: '',
                    nama_bapak_perempuan: '',
                    nama_ibu_perempuan: '',
                    flag_tampilkan_sosial_media_mempelai: false,
                    account_media_sosial_laki_laki: '',
                    account_media_sosial_perempuan: '',
                    flag_pakai_timeline_kisah: false,
                    timeline_kisah: '',
                    tampilkan_amplop_online: true,
                    nama_bank_1: '',
                    nama_rekening_bank_1: '',
                    nomor_rekening_bank_1: '',
                    nama_bank_2: '',
                    nama_rekening_bank_2: '',
                    nomor_rekening_bank_2: '',
                    custom_kalimat_1: '',
                    custom_kalimat_2: '',
                    custom_kalimat_3: '',
                    custom_kalimat_4: '',
                });
            }
        } catch {
            toast.error('Failed to load invitation content settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!content) return;
        setSaving(true);
        try {
            const response = await invitationContentApi.updateContent(content);
            if (response.success) {
                toast.success('Settings saved successfully');
                setContent(response.data);
            } else {
                toast.error('Failed to save settings');
            }
        } catch {
            toast.error('An error occurred while saving');
        } finally {
            setSaving(false);
        }
    };

    const updateField = (field: keyof InvitationContent, value: any) => {
        setContent(prev => prev ? { ...prev, [field]: value } : null);
    };

    // Safe boolean parsing since DB might return 'TRUE' or boolean true
    const getBool = (val: any) => String(val).toLowerCase() === 'true';

    if (loading || !content) return <PageLoader />;

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-white">Invitation Content Settings</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure exactly what to show on your digital invitation</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary flex items-center justify-center gap-2 px-6"
                >
                    {saving ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <HiOutlineSave className="w-5 h-5" />
                    )}
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ================= LOCATION SETTINGS ================= */}
                <div className="card space-y-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                            <HiOutlineMap className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Location Maps</h2>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-gray-100 dark:border-gray-800">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded text-gold-500 focus:ring-gold-500 dark:bg-gray-900 dark:border-gray-700"
                            checked={getBool(content.flag_lokasi_akad_dan_resepsi_berbeda)}
                            onChange={(e) => updateField('flag_lokasi_akad_dan_resepsi_berbeda', e.target.checked)}
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Akad and Resepsi are at different locations</span>
                    </label>

                    <div className="space-y-3 pt-2">
                        <div>
                            <label className="label-field">{getBool(content.flag_lokasi_akad_dan_resepsi_berbeda) ? 'Akad Google Maps Link' : 'Event Google Maps Link'}</label>
                            <input
                                type="text"
                                value={content.akad_map || ''}
                                onChange={(e) => updateField('akad_map', e.target.value)}
                                className="input-field"
                                placeholder="https://maps.app.goo.gl/..."
                            />
                        </div>
                        {getBool(content.flag_lokasi_akad_dan_resepsi_berbeda) && (
                            <div className="animate-fade-in">
                                <label className="label-field">Resepsi Google Maps Link</label>
                                <input
                                    type="text"
                                    value={content.resepsi_map || ''}
                                    onChange={(e) => updateField('resepsi_map', e.target.value)}
                                    className="input-field"
                                    placeholder="https://maps.app.goo.gl/..."
                                />
                            </div>
                        )}
                    </div>
                </div>


                {/* ================= PARENTS SETTINGS ================= */}
                <div className="card space-y-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600">
                            <HiOutlineUserGroup className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Parents Information</h2>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-gray-100 dark:border-gray-800">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded text-gold-500 focus:ring-gold-500 dark:bg-gray-900 dark:border-gray-700"
                            checked={getBool(content.flag_tampilkan_nama_orang_tua)}
                            onChange={(e) => updateField('flag_tampilkan_nama_orang_tua', e.target.checked)}
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show parents' names on invitation</span>
                    </label>

                    {getBool(content.flag_tampilkan_nama_orang_tua) && (
                        <div className="grid grid-cols-2 gap-4 pt-2 animate-fade-in">
                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-1 dark:border-gray-700">Groom's Parents</p>
                                <div>
                                    <label className="label-field">Father Name</label>
                                    <input type="text" value={content.nama_bapak_laki_laki || ''} onChange={(e) => updateField('nama_bapak_laki_laki', e.target.value)} className="input-field text-sm" />
                                </div>
                                <div>
                                    <label className="label-field">Mother Name</label>
                                    <input type="text" value={content.nama_ibu_laki_laki || ''} onChange={(e) => updateField('nama_ibu_laki_laki', e.target.value)} className="input-field text-sm" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-1 dark:border-gray-700">Bride's Parents</p>
                                <div>
                                    <label className="label-field">Father Name</label>
                                    <input type="text" value={content.nama_bapak_perempuan || ''} onChange={(e) => updateField('nama_bapak_perempuan', e.target.value)} className="input-field text-sm" />
                                </div>
                                <div>
                                    <label className="label-field">Mother Name</label>
                                    <input type="text" value={content.nama_ibu_perempuan || ''} onChange={(e) => updateField('nama_ibu_perempuan', e.target.value)} className="input-field text-sm" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* ================= SOCIAL MEDIA ================= */}
                <div className="card space-y-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                        <div className="p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-pink-600">
                            <HiOutlineShare className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Social Media Links</h2>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-gray-100 dark:border-gray-800">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded text-gold-500 focus:ring-gold-500 dark:bg-gray-900 dark:border-gray-700"
                            checked={getBool(content.flag_tampilkan_sosial_media_mempelai)}
                            onChange={(e) => updateField('flag_tampilkan_sosial_media_mempelai', e.target.checked)}
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show social media accounts</span>
                    </label>

                    {getBool(content.flag_tampilkan_sosial_media_mempelai) && (
                        <div className="space-y-3 pt-2 animate-fade-in">
                            <div>
                                <label className="label-field">Groom's Instagram (e.g. @username)</label>
                                <input
                                    type="text"
                                    value={content.account_media_sosial_laki_laki || ''}
                                    onChange={(e) => updateField('account_media_sosial_laki_laki', e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="label-field">Bride's Instagram (e.g. @username)</label>
                                <input
                                    type="text"
                                    value={content.account_media_sosial_perempuan || ''}
                                    onChange={(e) => updateField('account_media_sosial_perempuan', e.target.value)}
                                    className="input-field"
                                />
                            </div>
                        </div>
                    )}
                </div>


                {/* ================= LOVE STORY ================= */}
                <div className="card space-y-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500">
                            <HiOutlineHeart className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Love Story Timeline</h2>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-gray-100 dark:border-gray-800">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded text-gold-500 focus:ring-gold-500 dark:bg-gray-900 dark:border-gray-700"
                            checked={getBool(content.flag_pakai_timeline_kisah)}
                            onChange={(e) => updateField('flag_pakai_timeline_kisah', e.target.checked)}
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Include your love story timeline</span>
                    </label>

                    {getBool(content.flag_pakai_timeline_kisah) && (
                        <div className="pt-2 animate-fade-in">
                            <label className="label-field">Story Text</label>
                            <textarea
                                value={content.timeline_kisah || ''}
                                onChange={(e) => updateField('timeline_kisah', e.target.value)}
                                className="input-field min-h-[120px] resize-y"
                                placeholder="Share how you met, your first date, and the proposal..."
                            />
                        </div>
                    )}
                </div>


                {/* ================= DIGITAL ENVELOPES ================= */}
                <div className="card space-y-4 shadow-sm border border-gray-100 dark:border-gray-800 md:col-span-2">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                        <div className="p-2 bg-gold-50 dark:bg-gold-900/20 rounded-lg text-gold-600">
                            <HiOutlineCreditCard className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Digital Envelopes (Gifts)</h2>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-gray-100 dark:border-gray-800 w-fit">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded text-gold-500 focus:ring-gold-500 dark:bg-gray-900 dark:border-gray-700"
                            checked={getBool(content.tampilkan_amplop_online)}
                            onChange={(e) => updateField('tampilkan_amplop_online', e.target.checked)}
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable digital envelopes (Show bank accounts)</span>
                    </label>

                    {getBool(content.tampilkan_amplop_online) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 animate-fade-in">
                            {/* Bank 1 */}
                            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20 space-y-3">
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bank Account 1</p>
                                <div>
                                    <label className="label-field">Bank Name (e.g. BCA, Mandiri)</label>
                                    <input type="text" value={content.nama_bank_1 || ''} onChange={(e) => updateField('nama_bank_1', e.target.value)} className="input-field" />
                                </div>
                                <div>
                                    <label className="label-field">Account Name</label>
                                    <input type="text" value={content.nama_rekening_bank_1 || ''} onChange={(e) => updateField('nama_rekening_bank_1', e.target.value)} className="input-field" />
                                </div>
                                <div>
                                    <label className="label-field">Account Number</label>
                                    <input type="text" value={content.nomor_rekening_bank_1 || ''} onChange={(e) => updateField('nomor_rekening_bank_1', e.target.value)} className="input-field font-mono" />
                                </div>
                            </div>

                            {/* Bank 2 */}
                            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20 space-y-3">
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bank Account 2 <span className="text-gray-400 font-normal">(Optional)</span></p>
                                <div>
                                    <label className="label-field">Bank Name</label>
                                    <input type="text" value={content.nama_bank_2 || ''} onChange={(e) => updateField('nama_bank_2', e.target.value)} className="input-field" />
                                </div>
                                <div>
                                    <label className="label-field">Account Name</label>
                                    <input type="text" value={content.nama_rekening_bank_2 || ''} onChange={(e) => updateField('nama_rekening_bank_2', e.target.value)} className="input-field" />
                                </div>
                                <div>
                                    <label className="label-field">Account Number</label>
                                    <input type="text" value={content.nomor_rekening_bank_2 || ''} onChange={(e) => updateField('nomor_rekening_bank_2', e.target.value)} className="input-field font-mono" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* ================= CUSTOM TEXTS ================= */}
                <div className="card space-y-4 shadow-sm border border-gray-100 dark:border-gray-800 md:col-span-2">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600">
                            <HiOutlineChatAlt2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Custom Texts</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                            <label className="label-field">Opening Quote (Custom Text 1)</label>
                            <textarea
                                value={content.custom_kalimat_1 || ''}
                                onChange={(e) => updateField('custom_kalimat_1', e.target.value)}
                                className="input-field min-h-[80px]"
                                placeholder="e.g. And of His signs is that He created for you from yourselves mates..."
                            />
                        </div>
                        <div>
                            <label className="label-field">Welcome Text (Custom Text 2)</label>
                            <textarea
                                value={content.custom_kalimat_2 || ''}
                                onChange={(e) => updateField('custom_kalimat_2', e.target.value)}
                                className="input-field min-h-[80px]"
                                placeholder="e.g. It is a joy and privilege to invite you to share in our special day..."
                            />
                        </div>
                        <div>
                            <label className="label-field">Protocol / Health Text (Custom Text 3)</label>
                            <textarea
                                value={content.custom_kalimat_3 || ''}
                                onChange={(e) => updateField('custom_kalimat_3', e.target.value)}
                                className="input-field min-h-[80px]"
                                placeholder="e.g. Please follow health protocols during the event..."
                            />
                        </div>
                        <div>
                            <label className="label-field">Closing Text (Custom Text 4)</label>
                            <textarea
                                value={content.custom_kalimat_4 || ''}
                                onChange={(e) => updateField('custom_kalimat_4', e.target.value)}
                                className="input-field min-h-[80px]"
                                placeholder="e.g. Your presence is the best gift for us."
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
