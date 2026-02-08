import { BlogPost } from '../../types';

export const post60: BlogPost = {
    "id": 60,
    "title": "DistroKid vs TuneCore vs Landr: The 2026 Hidden Fees Audit",
    "slug": "best-music-distributor-comparison-2026-fees-audit",
    "category": "Music Business",
    "date": "Feb 8, 2026",
    "author": "Burak",
    "image": "/images/blog/blog-60.svg",
    "metaDesc": "A forensic audit of Terms of Services. We compare Payment Thresholds, Withholding Tax implications, Regional DSP reach, and the 'Spotify Fraud' detection policies.",
    "content": `
        <div class="blog-content">
            <div class="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-3xl p-10 mb-12 shadow-2xl shadow-green-900/20">
                 <h3 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span class="text-4xl">📉</span> The "Fake Stream" Crisis
                </h3>
                <ul class="space-y-4 text-gray-200 text-lg">
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]"></div>
                        <span><strong>The $10 Penalty:</strong> <span class="text-red-300">Spotify now fines distributors $10</span> per song if it detects artificial streaming. DistroKid passes this fine directly to YOU.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
                        <span><strong>Fraud Detection:</strong> <span class="text-green-300">Landr</span> has the most lenient "Strike System". They warn you before banning. DistroKid bans first, asks questions later.</span>
                    </li>
                </ul>
            </div>

            <p class="lead text-xl md:text-3xl font-light leading-relaxed text-gray-300 mb-12">
                Choosing a distributor in 2026 isn't about "Who gets my music to Spotify?" (They all do).
                It's about "Who won't ban my account and steal my royalties when a bot playlist adds me by accident?"
                <br><br>
                We audited the ToS of the major players regarding <strong>Fraud Protection</strong>, <strong>Tax Treaties</strong>, and <strong>Regional Reach</strong>.
            </p>

            <div class="my-12 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">1. The "Spotify Fine" Policy Breakdown</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Since Spotify introduced the "Artificial Streaming Penalty" in 2024, artists are terrified. 
                If a random bot farm adds your song to a playlist, Spotify fines the distributor. 
                How does the distributor handle that fine?
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="bg-red-900/20 p-8 rounded-3xl border border-red-500/30">
                    <h5 class="text-red-400 font-bold text-xl mb-4">DistroKid (Zero Tolerance)</h5>
                    <p class="text-gray-300 text-sm mb-4">
                        DistroKid's policy is strict. If they receive a fraud notice:
                    </p>
                    <ul class="list-disc list-inside text-gray-400 text-sm space-y-2">
                        <li>They remove the song immediately.</li>
                        <li>They may withhold ALL royalties in your account.</li>
                        <li>They charge your credit card the $10 penalty fee per track.</li>
                        <li><strong>Verdict:</strong> Risky if you do aggressive playlist marketing.</li>
                    </ul>
                </div>

                 <div class="bg-blue-900/20 p-8 rounded-3xl border border-blue-500/30">
                    <h5 class="text-blue-400 font-bold text-xl mb-4">TuneCore / CD Baby (Investigation)</h5>
                    <p class="text-gray-300 text-sm mb-4">
                        They are "Legacy" companies with human support teams.
                    </p>
                     <ul class="list-disc list-inside text-gray-400 text-sm space-y-2">
                        <li>They typically send a warning email first.</li>
                        <li>They allow you to present evidence (e.g. ad campaign receipts).</li>
                        <li>They absorb the fine effectively in larger pool accounts.</li>
                        <li><strong>Verdict:</strong> Safer for established artists.</li>
                    </ul>
                </div>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">2. Detailed Fee Audit (The Hidden Spreadsheet)</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                We dug into the help centers to find the fees they don't advertise on the homepage.
            </p>

            <div class="overflow-x-auto bg-gray-900 rounded-2xl border border-gray-800 mb-12">
                <table class="w-full text-left text-gray-300 text-sm">
                    <thead>
                        <tr class="bg-black text-xs uppercase tracking-widest text-gray-500">
                            <th class="p-4">Fee Type</th>
                            <th class="p-4">DistroKid</th>
                            <th class="p-4">TuneCore</th>
                            <th class="p-4">CDBaby</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-800">
                        <tr>
                            <td class="p-4 font-bold text-white">Shazam / Siri</td>
                            <td class="p-4 text-red-400">$0.99 / yr / song</td>
                            <td class="p-4 text-green-400">Included</td>
                            <td class="p-4 text-green-400">Included</td>
                        </tr>
                        <tr>
                            <td class="p-4 font-bold text-white">Youtube Content ID</td>
                            <td class="p-4 text-red-400">$4.95/yr + 20%</td>
                            <td class="p-4 text-yellow-400">20% Split</td>
                            <td class="p-4 text-green-400">Included (9% Split)</td>
                        </tr>
                        <tr>
                            <td class="p-4 font-bold text-white">Store Maximizer</td>
                            <td class="p-4 text-red-400">$7.95 / yr</td>
                            <td class="p-4 text-green-400">Included (Auto)</td>
                            <td class="p-4 text-green-400">Included</td>
                        </tr>
                         <tr>
                            <td class="p-4 font-bold text-white">Payment Withdrawal</td>
                            <td class="p-4 text-red-400">Tipalti Fees (~$2-$5)</td>
                            <td class="p-4 text-yellow-400">Payoneer Fees (~$1.50)</td>
                            <td class="p-4 text-green-400">ACH (Free)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">3. Regional Strategy: Where do you live?</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Your location matters. Tax treaties define how much money the US Government keeps (Withholding Tax).
            </p>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="bg-gray-800 p-6 rounded-2xl">
                     <h5 class="font-bold text-white mb-2">If you live in a Treaty Country (UK, Germany, Turkey, Canada)</h5>
                     <p class="text-gray-400 text-sm">
                        You need a distributor that processes <strong>W-8BEN</strong> forms correctly. 
                        <strong>DistroKid</strong> is the best at this. Their interface connects to a digital tax wizard that lowers your withholding from 30% to ~0-10% in minutes. 
                        Smaller distributors often mess this up, leaving your money stuck in "Tax Limbo".
                     </p>
                </div>
                 <div class="bg-gray-800 p-6 rounded-2xl">
                     <h5 class="font-bold text-white mb-2">If you target Asia / China / India</h5>
                     <p class="text-gray-400 text-sm">
                        You need <strong>TuneCore</strong>. They are owned by Believe Digital. 
                        Believe has massive infrastructure in Asia. They get your music onto <strong>Tencent, NetEase, and Anghami</strong> faster and more reliably than US-centric DistroKid.
                     </p>
                </div>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">4. Final Recommendation 2026</h2>
            <div class="space-y-4">
                <div class="bg-green-900/20 border border-green-500/30 p-6 rounded-2xl flex gap-4 items-center">
                    <div class="text-3xl">🚀</div>
                    <div>
                        <h5 class="text-green-400 font-bold font-lg">The "TikTok Hustler"</h5>
                        <p class="text-gray-300 text-sm">Use <strong>DistroKid</strong>. You release a song every 2 weeks. You need speed. You don't care about upsell fees because volume is your game.</p>
                    </div>
                </div>
                 <div class="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl flex gap-4 items-center">
                    <div class="text-3xl">🎸</div>
                    <div>
                        <h5 class="text-blue-400 font-bold font-lg">The "Band / Songwriter"</h5>
                        <p class="text-gray-300 text-sm">Use <strong>TuneCore</strong>. You release an album once a year. You need Publishing Administration to collect your writer royalties. You want better customer support.</p>
                    </div>
                </div>
                 <div class="bg-gray-800 border border-gray-600 p-6 rounded-2xl flex gap-4 items-center">
                    <div class="text-3xl">👵</div>
                    <div>
                        <h5 class="text-gray-400 font-bold font-lg">The "Retired Rockstar"</h5>
                        <p class="text-gray-300 text-sm">Use <strong>CD Baby</strong>. You just want your old catalog to be online forever for your grandkids to hear. You don't want to pay a monthly bill.</p>
                    </div>
                </div>
            </div>

        </div>
    `,
};
