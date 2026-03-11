import { BlogPost } from '../../types';

export const post107: BlogPost = {
    id: 107,
    title: "Psychoacoustics & Mobile Mixing: The Science of the 'Missing Fundamental'",
    slug: "psychoacoustics-mobile-mixing-science-missing-fundamental",
    category: "Mixing & Mastering",
    date: "March 11, 2026",
    author: "Burak",
    image: "/images/blog/mobile-mixing-psychoacoustics-guide.png",
    metaDesc: "Master the psychoacoustic phenomenon of the 'Missing Fundamental' and Tartini tones to make your 40Hz sub-bass audible on 150Hz smartphone speakers. A technical masterclass.",
    content: `
        <div class="blog-content font-sans text-gray-200">
            <!-- Hero Hook -->
            <div class="relative overflow-hidden rounded-[2rem] bg-[#0a0f12] border border-cyan-900/50 p-8 md:p-12 mb-14 shadow-2xl">
                <div class="absolute right-0 bottom-0 opacity-10">
                    <svg width="400" height="400" viewBox="0 0 100 100" class="animate-pulse">
                        <circle cx="50" cy="50" r="40" stroke="cyan" stroke-width="2" fill="none" opacity="0.5"/>
                        <circle cx="50" cy="50" r="30" stroke="orange" stroke-width="2" fill="none" opacity="0.8"/>
                        <circle cx="50" cy="50" r="20" stroke="white" stroke-width="2" fill="none"/>
                    </svg>
                </div>
                
                <h3 class="relative z-10 text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                    Can You Hear The Silence?
                    <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-cyan-400">The Physics of Mobile Mixing</span>
                </h3>
                <p class="relative z-10 text-lg md:text-xl font-light text-gray-300 leading-relaxed max-w-3xl">
                    In 2026, over 90% of your audience's first impression of your track will be through a 2-inch smartphone speaker or AirPods on a noisy subway. A standard iPhone speaker physically cannot reproduce frequencies below <b>150Hz</b>. Yet, when you listen to Travis Scott or Skrillex on a phone, the 808s and subs feel <i>massive</i>. How? The answer lies not in EQ, but in neurobiology: <strong>Psychoacoustics</strong>.
                </p>
                <div class="relative z-10 mt-8 flex gap-4">
                    <span class="px-5 py-2 rounded-xl bg-orange-500/10 border border-orange-500/40 text-orange-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(249,115,22,0.2)]">Mixing</span>
                    <span class="px-5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)]">Psychoacoustics</span>
                </div>
            </div>

            <!-- Deep Historical & Scientific Context -->
            <h2 class="text-4xl font-extrabold text-white mb-8">1. Tartini Tones and the "Missing Fundamental"</h2>
            <div class="grid lg:grid-cols-5 gap-10 mb-14">
                <div class="lg:col-span-3">
                    <p class="text-lg text-gray-300 font-light leading-relaxed mb-6">
                        To understand how to mix bass for devices that have no bass, we must look to an 18th-century Italian violinist named <strong>Giuseppe Tartini</strong>. In 1714, Tartini discovered that if he played two specific, loud, and high-pitched notes simultaneously on his violin, he could hear a <i>third</i>, much lower "phantom" note buzzing below them in the room. This phenomenon became known as <b>Tartini Tones</b> or Combination Tones.
                    </p>
                    <p class="text-lg text-gray-300 font-light leading-relaxed mb-6">
                        What Tartini discovered was a flaw (or feature) in the human auditory cortex and the basilar membrane of the inner ear. When the brain hears a series of harmonic overtones (e.g., 200Hz, 300Hz, 400Hz), it mathematically deduces that these are harmonics of a <strong>100Hz fundamental</strong>. Even if the 100Hz fundamental is completely removed (or physically impossible for a phone speaker to play), the brain acts as an autocorrect mechanism. <b>Your brain synthesizes the missing bass note inside your head.</b>
                    </p>
                </div>
                <!-- Scientific Diagram Simulation -->
                <div class="lg:col-span-2 bg-gradient-to-t from-[#111] to-[#1a1a1a] rounded-3xl border border-gray-800 p-8 flex flex-col justify-center relative shadow-xl overflow-hidden group">
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div class="text-xs uppercase text-cyan-500 font-bold tracking-[0.2em] mb-4">Acoustic Illusion</div>
                    
                    <div class="flex items-end gap-2 h-32 w-full mb-6 border-b border-gray-700 pb-2">
                        <!-- Fundamental (Missing) -->
                        <div class="w-1/4 flex flex-col items-center">
                            <div class="w-full h-[20%] bg-red-900/30 border-2 border-dashed border-red-500/50 rounded-t-sm relative">
                                <span class="absolute -top-6 w-full text-center text-red-500/50 text-xs font-mono">100Hz</span>
                                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 text-xl font-bold">X</span>
                            </div>
                            <span class="text-[10px] text-gray-500 mt-2 text-center uppercase">Cut by Speaker</span>
                        </div>
                        
                        <!-- First Harmonic -->
                        <div class="w-1/4 flex flex-col items-center">
                            <div class="w-full h-[60%] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] rounded-t-sm relative">
                                <span class="absolute -top-6 w-full text-center text-cyan-400 text-xs font-mono">200Hz</span>
                            </div>
                        </div>

                        <!-- Second Harmonic -->
                        <div class="w-1/4 flex flex-col items-center">
                            <div class="w-full h-[40%] bg-cyan-600 shadow-[0_0_10px_rgba(6,182,212,0.4)] rounded-t-sm relative">
                                <span class="absolute -top-6 w-full text-center text-cyan-500 text-xs font-mono">300Hz</span>
                            </div>
                        </div>

                        <!-- Third Harmonic -->
                        <div class="w-1/4 flex flex-col items-center">
                            <div class="w-full h-[25%] bg-cyan-800 rounded-t-sm relative">
                                <span class="absolute -top-6 w-full text-center text-cyan-700 text-xs font-mono">400Hz</span>
                            </div>
                        </div>
                    </div>
                    <p class="text-sm font-light text-gray-400">Because 200/300/400Hz are present, the brain <i class="text-white">hallucinates</i> the missing 100Hz <b>Phantom Fundamental</b>.</p>
                </div>
            </div>

            <!-- The Technical Solution -->
            <div class="w-full h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent my-16"></div>

            <h2 class="text-4xl font-extrabold text-white mb-8">2. Harmonic Excitation: The Modern Solution</h2>
            <p class="text-xl mb-10 text-gray-400 font-light">
                If you boost 40Hz with an EQ, you are just adding mud and eating up headroom on large systems, while changing absolutely nothing on a phone. The professional method is <strong>Parallel Harmonic Saturation</strong>.
            </p>

            <div class="space-y-6 mb-16">
                <!-- Step 1 -->
                <div class="bg-black/30 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-orange-500/50 transition-colors duration-300">
                    <h4 class="text-2xl font-bold text-orange-400 mb-3 flex items-center gap-3">
                        <span class="bg-orange-500/20 text-orange-500 w-8 h-8 flex justify-center items-center rounded-lg text-sm">01</span>
                        Identify the Fundamental
                    </h4>
                    <p class="text-gray-300 leading-relaxed text-[15px]">
                        Find the root note of your 808 or sub-bass. Let's say it's an E1 (approx. 41Hz). An iPhone speaker rolls off severely below 150Hz. Boosting 41Hz via EQ is a waste of digital zeros.
                    </p>
                </div>

                <!-- Step 2 -->
                <div class="bg-black/30 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-orange-500/50 transition-colors duration-300 mx-auto w-[95%]">
                    <h4 class="text-2xl font-bold text-orange-400 mb-3 flex items-center gap-3">
                        <span class="bg-orange-500/20 text-orange-500 w-8 h-8 flex justify-center items-center rounded-lg text-sm">02</span>
                        Generate Overtones (Saturation)
                    </h4>
                    <p class="text-gray-300 leading-relaxed text-[15px]">
                        Send the bass to a parallel return track. Apply a heavy saturation or harmonic exciter plugin (like FabFilter Saturn 2, Waves MaxxBass, or Soundtoys Decapitator). This algorithmically generates multiples of the 41Hz signal: 82Hz (1st harmonic), 123Hz (2nd), 164Hz (3rd), 205Hz (4th).
                    </p>
                </div>

                <!-- Step 3 -->
                <div class="bg-black/30 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-orange-500/50 transition-colors duration-300 mx-auto w-[90%]">
                    <h4 class="text-2xl font-bold text-orange-400 mb-3 flex items-center gap-3">
                        <span class="bg-orange-500/20 text-orange-500 w-8 h-8 flex justify-center items-center rounded-lg text-sm">03</span>
                        Bandpass & Blend
                    </h4>
                    <p class="text-gray-300 leading-relaxed text-[15px]">
                        Place an EQ on the parallel track after the saturator. Place a high-pass filter at 150Hz and a low-pass at 400Hz. This isolates <b>only</b> the upper harmonics (164Hz, 205Hz, 246Hz). Blend this parallel track in subtly with your clean 41Hz original signal. 
                        <br><br>
                        <b>The Result:</b> On massive club subwoofers, the clean 41Hz fundamental shakes the floor. On an iPhone, the speaker plays the 164Hz to 246Hz harmonics you generated, and the listener's brain hallucinates the 41Hz sub.
                    </p>
                </div>
            </div>

            <!-- Soft Clipping and Loudness War -->
            <div class="bg-gradient-to-tr from-[#160b00] to-[#0f191f] border border-[#3e2815] rounded-3xl p-10 mb-12 relative overflow-hidden">
                <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-orange-500/20 blur-[120px] rounded-full pointer-events-none"></div>
                
                <h3 class="text-3xl font-black text-white mb-6">3. Clippers vs Limiters: The War on Transients</h3>
                <p class="text-gray-300 mb-6 leading-relaxed">
                    Why do professional modern mixes sound incredibly loud but not squashed? The secret of 2026 is that the master buss true-peak limiter is doing almost <i>no work</i>. The heavy lifting is done in the mixing stage using <strong>Hard and Soft Clippers</strong>.
                </p>
                <p class="text-gray-400 mb-8 max-w-4xl text-sm italic">
                    A limiter looks ahead and turns the volume down (compression) when a peak hits, changing the groove and "pumping" the mix. A clipper simply chops off the waveform instantly, replacing the peak physical volume with harmonic distortion. Because phone speakers are terrible at reproducing sudden transient volume spikes, clipping the transients of your drums replacing them with density translates vastly better to small speakers.
                </p>
                
                <div class="bg-black/50 p-6 rounded-xl border-l-4 border-cyan-500 mt-6">
                    <h4 class="text-white font-bold mb-2">The Golden Rule for 808s:</h4>
                    <p class="text-orange-300 text-sm">Never limit an 808. Soft-clip it. You will gain 3-5dB of perceived loudness while technically keeping the peak level identical.</p>
                </div>
            </div>

            <div class="bg-[#0f1115] border border-white/5 p-8 rounded-xl mt-12 mb-6">
                <p class="text-gray-200">
                    At <b>WBBT Records</b>, our mastering engineers employ state-of-the-art psychoacoustic processing to assure your masters translate perfectly from Festival Arrays to Apple Watch speakers. If you want your unreleased track analyzed by our team, <a href="/submit" class="font-bold text-orange-400 underline hover:text-orange-300">submit your demo today</a>.
                </p>
            </div>
        </div>
    `,
};
