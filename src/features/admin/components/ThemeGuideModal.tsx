import { Modal } from '@/shared/components/Modal';
import { useState } from 'react';
import { Tenant } from '@/types';

interface ThemeGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    previewTenant?: Tenant | null;
}

export function ThemeGuideModal({ isOpen, onClose, previewTenant }: ThemeGuideModalProps) {
    const [activeTab, setActiveTab] = useState<'guide' | 'variables'>('guide');

    const t = previewTenant || {
        bride_name: 'Fiona',
        groom_name: 'Galang',
        wedding_date: new Date().toISOString()
    } as any;

    const formatDate = (dateString?: string | null) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const variables = [
        { tag: '{{bride_name}}', desc: 'Nama Wanita', value: t.bride_name },
        { tag: '{{groom_name}}', desc: 'Nama Pria', value: t.groom_name },
        { tag: '{{wedding_date}}', desc: 'Tgl Resepsi (Format Lokal)', value: formatDate(t.wedding_date) },
        { tag: '{{tanggal_akad}}', desc: 'Tgl Akad', value: formatDate(t.wedding_date) },
        { tag: '{{jam_akad}}', desc: 'Jam Akad', value: '08:00 - Selesai' },
        { tag: '{{jam_resepsi}}', desc: 'Jam Resepsi', value: '11:00 - Selesai' },
        { tag: '{{nama_lokasi_akad}}', desc: 'Nama Lokasi Akad', value: 'Masjid Agung' },
        { tag: '{{keterangan_lokasi_akad}}', desc: 'Keterangan Lokasi Akad', value: 'Jl. Merdeka No. 1' },
        { tag: '{{akad_map}}', desc: 'URL Google Maps Akad', value: 'https://maps.google.com/...' },
        { tag: '{{nama_lokasi_resepsi}}', desc: 'Nama Lokasi Resepsi', value: 'Gedung Serbaguna' },
        { tag: '{{keterangan_lokasi_resepsi}}', desc: 'Keterangan Lokasi Resepsi', value: 'Jl. Sudirman No. 2' },
        { tag: '{{resepsi_map}}', desc: 'URL Google Maps Resepsi', value: 'https://maps.google.com/...' },
        { tag: '{{nama_bapak_laki_laki}}', desc: 'Nama Ayah Mempelai Pria', value: 'Bpk. Ahmad' },
        { tag: '{{nama_ibu_laki_laki}}', desc: 'Nama Ibu Mempelai Pria', value: 'Ibu Siti' },
        { tag: '{{nama_bapak_perempuan}}', desc: 'Nama Ayah Mempelai Wanita', value: 'Bpk. Budi' },
        { tag: '{{nama_ibu_perempuan}}', desc: 'Nama Ibu Mempelai Wanita', value: 'Ibu Ani' },
        { tag: '{{ig_laki_laki}}', desc: 'Akun IG Mempelai Pria', value: '@ahmad_groom' },
        { tag: '{{ig_perempuan}}', desc: 'Akun IG Mempelai Wanita', value: '@ani_bride' },
        { tag: '{{guest_name}}', desc: 'Nama Tamu Undangan', value: 'Bpk. Ridwan (Contoh)' },
        { tag: '{{kalimat_pembuka}}', desc: 'Kalimat Pembuka', value: 'Dengan memohon rahmat...' },
        { tag: '{{kalimat_penutup}}', desc: 'Kalimat Penutup', value: 'Merupakan suatu kehormatan...' },
        { tag: '{{quote}}', desc: 'Quote (Custom 1)', value: 'Dan di antara tanda-tanda...' },
        { tag: '{{bank_1}}', desc: 'Nama Bank 1', value: 'BCA' },
        { tag: '{{rek_1}}', desc: 'No Rekening 1', value: '1234567890' },
        { tag: '{{nama_rek_1}}', desc: 'Nama Pemilik Rekening 1', value: t.groom_name },
        { tag: '{{bank_2}}', desc: 'Nama Bank 2', value: 'Mandiri' },
        { tag: '{{rek_2}}', desc: 'No Rekening 2', value: '0987654321' },
        { tag: '{{nama_rek_2}}', desc: 'Nama Pemilik Rekening 2', value: t.bride_name },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Panduan Membuat Tema Web"
            size="xl"
        >
            <div className="flex border-b border-gray-200 dark:border-gray-700 mt-2 mb-4">
                <button
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'guide' ? 'border-gold-500 text-gold-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('guide')}
                >
                    📚 Panduan Dasar
                </button>
                <button
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'variables' ? 'border-gold-500 text-gold-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('variables')}
                >
                    🏷️ Variabel Tema (Live)
                </button>
            </div>

            <div className="py-2 space-y-6 text-sm text-gray-700 dark:text-gray-300 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">

                {activeTab === 'guide' ? (
                    <>
                        <section>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <span className="text-gold-600">✨</span> Konsep Dasar
                            </h3>
                            <p className="leading-relaxed">
                                Sistem ini menggunakan struktur <strong>Reactive HTML Template</strong>. Anda bebas menulis kode HTML standar, CSS, dan Javascript murni di kolom yang disediakan.
                                Saat halaman undangan dimuat, sistem akan otomatis melakukan <strong>inject</strong> variabel dinamis (seperti nama pengantin) ke dalam tag HTML Anda.
                            </p>
                        </section>

                        <hr className="border-gray-200 dark:border-gray-700" />

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <span className="text-blue-500">📚</span> Library Bawaan (Auto Inject)
                            </h3>
                            <p className="mb-3">
                                Anda tidak perlu menginstal library UI. Sistem secara otomatis menyertakan library versi stabil berikut pada halaman undangan publik (Halaman Admin tidak terpengaruh):
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>UIkit (v3.21.0)</strong>: Framework UI yang ringan dan modular. Semua class `uk-*` bebas digunakan.</li>
                                <li><strong>Bootstrap (v5.3.3)</strong>: Framework standar industri. Class Grid (`row`, `col`), buttons, dan utilities 100% didukung.</li>
                                <li><strong>Tailwind CSS</strong>: Project ini menggunakan Tailwind bawaan, sehingga utilitas text/bg warna juga dirender.</li>
                                <li><strong>RemixIcon (v4.2.0)</strong>: Ratusan ikon premium gratis. Contoh: <code>&lt;i class="ri-heart-fill"&gt;&lt;/i&gt;</code></li>
                                <li><strong>FontAwesome 6</strong>: Tersedia via UIkit Icons.</li>
                            </ul>
                        </section>

                        <hr className="border-gray-200 dark:border-gray-700" />

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <span className="text-purple-600">⚡</span> Sistem Interaksi Event Khusus
                            </h3>
                            <p className="mb-4">
                                Karena UI undangan ini harus berinteraksi dengan Sistem React (untuk membuka Modal Kehadiran, RSVP, menyetel Musik Background), Anda WAJIB memberikan <strong>ID Elemen</strong> tertentu pada tombol desain HTML Anda agar dikenali sistem:
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-4">
                                <div>
                                    <strong className="text-red-600 dark:text-red-400">1. Membuka Undangan & Memutar Musik</strong><br />
                                    Berikan <code>id="btn-open-invitation"</code> pada tombol utama di halaman Cover.<br />
                                    Contoh: <code>&lt;button id="btn-open-invitation" class="uk-button"&gt;Buka Undangan&lt;/button&gt;</code><br />
                                    <span className="text-xs text-gray-500">Saat diklik oleh tamu, sistem akan otomatis menghilangkan layer cover dan memutar musik background.</span>
                                </div>
                                <div>
                                    <strong className="text-red-600 dark:text-red-400">2. Membuka Tiket QR Code Tamu</strong><br />
                                    Berikan <code>id="btn-show-qr"</code> pada tombol untuk menampilkan QR Check-in.<br />
                                    Contoh: <code>&lt;button id="btn-show-qr" class="btn btn-outline-light"&gt;Tampilkan QR&lt;/button&gt;</code><br />
                                    <span className="text-xs text-gray-500">Sistem akan otomatis membuka popup Modal QR yang telah di-generate secara live.</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <span className="text-orange-500">📜</span> Penggunaan Javascript
                            </h3>
                            <p className="mb-3">
                                Tulis <em>vanilla</em> Javascript pada tab "JS Code". Script ini akan di-<i>wrap</i> dan di-eksekusi setelah DOM selesai meload HTML dan CSS template Anda. Code JS dijamin berjalan secara asinkron tanpa merusak backend situs ini.
                            </p>
                            <p className="bg-gray-900 text-green-400 font-mono text-xs p-3 rounded-lg">
                                // Contoh Animasi scroll <br />
                                UIkit.scroll('.wedding-navbar'); <br />
                                console.log("Tema siap!");
                            </p>
                        </section>
                    </>
                ) : (
                    <section>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            Berikut adalah daftar variabel (*Tag*) yang dapat Anda gunakan di dalam HTML Code. Tabel di bawah ini juga menampilkan contoh nilai yang di-*inject* secara langsung dari data riil penyewa (*tenant*) saat ini.
                        </p>
                        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold border-b dark:border-gray-700">Tag Variabel</th>
                                        <th className="px-4 py-3 font-semibold border-b dark:border-gray-700">Deskripsi</th>
                                        <th className="px-4 py-3 font-semibold border-b dark:border-gray-700">Contoh Render (Live)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {variables.map((v, i) => (
                                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400 text-xs font-semibold">{v.tag}</td>
                                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{v.desc}</td>
                                            <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium truncate max-w-[200px]" title={v.value}>{v.value || <span className="text-gray-300 italic">Kosong</span>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button onClick={onClose} className="px-5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg transition-colors font-medium">
                    Tutup Panduan
                </button>
            </div>
        </Modal>
    );
}
