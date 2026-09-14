'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CreditCard, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardBilling() {
    const [buying, setBuying] = useState(false);
    const [error, setError] = useState('');
    const [credits, setCredits] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<number | ''>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchCredits = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: master } = await supabase
                    .from('masters')
                    .select('credits')
                    .or(`email.eq.${user.email},user_id.eq.${user.id}`)
                    .single();
                if (master) {
                    setCredits(Number(master.credits) || 0);
                }
            }
        };
        fetchCredits();
    }, [supabase]);

    const handleBuy = async (amount: number) => {
        try {
            setBuying(true);
            setError('');
            if (!amount || amount < 10) {
                setError('Der Mindestbetrag beträgt 10 €');
                setBuying(false);
                return;
            }
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount })
            });
            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Fehler beim Erstellen der Zahlung');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Zahlung fehlgeschlagen');
            setBuying(false);
        }
    };

    return (
        <div>
            <h1 className="font-heading text-[2.5rem] font-black uppercase mb-[8px] text-slate-900 dark:text-white leading-none">
                Abrechnung
            </h1>
            <p className="text-slate-500 dark:text-slate-300 text-[15px] mb-[32px]">
                Verwalten Sie Ihre Zahlungsmethoden und Rechnungen über Stripe Connect.
            </p>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 p-[16px] rounded-[12px] mb-[24px] flex items-center gap-[8px]">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-[14px] font-medium">{error}</span>
                </div>
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[24px] mb-[40px]">
                {/* Stripe Status */}
                <div className="bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[12px] p-[24px] flex flex-col min-h-[320px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-[12px] mb-[16px]">
                        <div className="w-[48px] h-[48px] rounded-full bg-[#635BFF]/10 dark:bg-[#635BFF]/20 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" className="dark:stroke-[#807bf6]">
                                <rect x="2" y="5" width="20" height="14" rx="2" />
                                <path d="M2 10h20" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-[16px] font-bold text-slate-900 dark:text-white m-0">Stripe Account</h3>
                            <div className="text-[13px] text-slate-500 dark:text-slate-300 flex items-center gap-[4px] mt-[2px]">
                                <span className="w-[8px] h-[8px] rounded-full bg-red-500"></span>
                                Nicht verbunden
                            </div>
                        </div>
                    </div>

                    <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-[1.5] mb-[20px] flex-1">
                        Um Leads auf Provisionsbasis zu erhalten, müssen Sie Ihr Bankkonto oder eine Kreditkarte über Stripe hinterlegen.
                        Es fallen nur Gebühren an, wenn Sie einen Auftrag erfolgreich abschließen.
                    </p>

                    <button className="btn-color-hover w-full bg-[#635BFF] dark:bg-[#5249ea] text-white border-none p-[12px] rounded-[8px] text-[14px] font-semibold cursor-pointer">
                        Mit Stripe verbinden
                    </button>
                </div>

                {/* Balance */}
                <div className="bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[12px] p-[24px] flex flex-col min-h-[320px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <h3 className="text-[16px] font-bold text-slate-900 dark:text-white mb-[16px]">Plattform-Guthaben</h3>
                    <div className="text-[28px] font-black text-slate-900 dark:text-white mb-[8px] leading-none">
                        {credits !== null ? credits.toFixed(2).replace('.', ',') : '0,00'} <span className="text-[16px] text-slate-400">€</span>
                    </div>
                    <p className="text-[13px] text-slate-500 dark:text-slate-300 mb-[24px] flex-1">
                        Alternativ können Sie Guthaben aufladen, um Leads zum Festpreis (CPL) zu kaufen, anstatt Provision zu zahlen.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-white dark:bg-[#161616] text-slate-900 dark:text-white border border-slate-300 dark:border-[#2a2a2a] p-[12px] rounded-[8px] text-[14px] font-semibold cursor-pointer flex items-center justify-center gap-[8px] hover:bg-slate-50 dark:hover:bg-[#222222] transition-colors duration-200"
                    >
                        <CreditCard className="w-4 h-4" />
                        Jetzt aufladen
                    </button>
                </div>
            </div>



            <h3 className="text-[18px] font-bold text-slate-900 dark:text-white mb-[16px]">Vergangene Rechnungen</h3>
            <div className="bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[12px] p-[32px] text-center text-slate-400 dark:text-slate-400 text-[14px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
                Sie haben noch keine Rechnungen erhalten.
            </div>

            {isModalOpen && (
                <>
                    <style>{`
                        @keyframes am-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
                        @keyframes am-card-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                    `}</style>
                    <div className="fixed inset-0 bg-black/60 z-[99999] animate-[am-backdrop-in_0.18s_ease_forwards] flex items-center justify-center p-[16px]" onClick={() => setIsModalOpen(false)}>
                        <div className="relative w-full max-w-[360px] animate-[am-card-in_0.22s_ease_forwards]" onClick={e => e.stopPropagation()}>
                            {/* Peeking Roach - Right Side */}
                            <img src="/pests/roach_runner.png" alt="Roach" className="absolute top-[40px] right-[-40px] w-[75px] h-auto rotate-[70deg] z-0" />

                            <div className="bg-white dark:bg-[#111111] w-full relative z-10 rounded-[16px] border-[2px] border-[#f0f0f0] dark:border-[#2a2a2a] shadow-[0_12px_48px_rgba(0,0,0,0.12)] p-[32px]">

                                <button onClick={() => setIsModalOpen(false)} className="absolute top-[12px] right-[12px] w-[28px] h-[28px] border border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#161616] rounded-full cursor-pointer flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#222222] transition-colors">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
                                </button>

                                <h2 className="text-[20px] font-black text-slate-900 dark:text-white mb-[6px] text-center font-heading uppercase">Guthaben aufladen</h2>
                                <p className="text-[13px] text-slate-500 dark:text-slate-300 mb-[24px] text-center">Geben Sie den gewünschten Betrag ein. Der Mindestbetrag ist 10 €.</p>
                                
                                <div className="relative mb-[20px]">
                                    <input 
                                        type="number" min="10" 
                                        value={customAmount} onChange={e => setCustomAmount(e.target.value === '' ? '' : Number(e.target.value))}
                                        className="w-full py-[12px] pr-[32px] pl-[16px] text-[14px] font-bold text-slate-900 dark:text-white border border-slate-400 dark:border-[#2a2a2a] rounded-[8px] outline-none transition-colors duration-200 bg-white dark:bg-[#161616] focus:border-slate-900 dark:focus:border-slate-500 focus:shadow-[0_0_0_3px_rgba(15,23,42,0.1)] dark:focus:shadow-none"
                                        placeholder="Betrag eingeben"
                                    />
                                    <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[14px] font-bold text-slate-400">€</span>
                                </div>

                                {error && <div className="text-red-500 text-[12px] mb-[12px] text-center">{error}</div>}

                                <div className="relative z-20">
                                    {/* Peeking Roach - Under Confirm Button (Left Side) */}
                                    <img src="/pests/roach_runner.png" alt="Roach" className="absolute bottom-[-15px] left-[-40px] w-[65px] h-auto -rotate-[120deg] z-0" />
                                    
                                    <button
                                        onClick={() => {
                                            if (customAmount && customAmount >= 10) handleBuy(Number(customAmount));
                                            else setError('Bitte geben Sie einen gültigen Betrag (min. 10 €) ein.');
                                        }}
                                        disabled={buying || !customAmount || customAmount < 10}
                                        className={`relative z-10 w-full text-white p-[12px] rounded-[8px] text-[14px] font-bold border-none transition-all duration-200 flex items-center justify-center gap-[8px] ${(buying || !customAmount || customAmount < 10) ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed' : 'bg-slate-900 dark:bg-[#161616] dark:border dark:border-[#2a2a2a] cursor-pointer hover:bg-slate-800 dark:hover:bg-[#222222]'}`}
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        {buying ? 'Lädt...' : 'Jetzt aufladen'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
