import { BlogPost } from '../../types';

export const post27: BlogPost = {
    "id": 27,
    "title": "Mixing for Earbuds: The 2026 Standard",
    "slug": "mixing-music-for-airpods-iphone-speakers",
    "category": "Music Production",
    "date": "Feb 6, 2026",
    "author": "Burak",
    "image": "/images/blog/blog-27.webp",
    "metaDesc": "90% of your fans use AirPods. Learn the 'Upper Bass' saturation trick, the Mono Compatibility rule, and how to mix a vocal that cuts through a phone speaker.",
    "content": `
        <div class="blog-content">
            <div class="bg-gradient-to-br from-cyan-900/50 to-sky-900/50 border border-cyan-500/30 rounded-3xl p-10 mb-12 shadow-2xl shadow-cyan-900/20">
                 <h3 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span class="text-4xl">🎧</span> Key Takeaways
                </h3>
                <ul class="space-y-4 text-gray-200 text-lg">
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                        <span><strong>The Device Reality:</strong> Mix for the device they possess (iPhone), not the device you wish they had (Genelecs).</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                        <span><strong>The 808 Problem:</strong> Sub-bass is invisible on phones. Use Saturation to make it "Exist" in the mids.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                        <span><strong>Mono is Mandatory:</strong> Bluetooth speakers are Mono. Clubs are Mono. If your mix fails in Mono, it fails everywhere.</span>
                    </li>
                </ul>
            </div>

            <p class="lead text-xl md:text-3xl font-light leading-relaxed text-gray-300 mb-12">
                You spend $10,000 on studio monitors to hear every detail. 
                Your fan spends $100 on AirPods to listen on the bus. 
                If your mix relies on sub-bass and wide stereo imaging to sound good, <strong>your mix is broken</strong>.
                In 2026, "Translation" is the only metric that matters. Here is how to mix for the masses.
            </p>

            <hr class="border-white/10 my-16" />

            <h2 class="text-4xl font-black text-white mt-20 mb-8">1. The "Frequency Blindness" Chart</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                You need to understand what a phone speaker physically CANNOT replicate.
            </p>

            <div class="relative w-full h-64 bg-gray-900 rounded-3xl border border-gray-700 mb-12 overflow-hidden">
                <!-- Chart Simulation -->
                <div class="absolute bottom-0 text-xs text-gray-500 left-4">20Hz</div>
                <div class="absolute bottom-0 text-xs text-gray-500 left-1/4">100Hz</div>
                <div class="absolute bottom-0 text-xs text-gray-500 left-1/2">1kHz</div>
                <div class="absolute bottom-0 text-xs text-gray-500 right-4">20kHz</div>

                <!-- Invisible Zone -->
                <div class="absolute top-0 bottom-8 left-0 w-1/4 bg-red-900/20 border-r border-red-500/30 flex items-center justify-center">
                    <span class="text-red-500 font-bold -rotate-90">Invisible Zone (<100Hz)</span>
                </div>
                
                <!-- Magic Zone -->
                <div class="absolute top-0 bottom-8 left-1/4 w-1/2 bg-green-900/10 border-r border-green-500/30 flex items-center justify-center">
                    <span class="text-green-500 font-bold">The "Money" Zone (Mids)</span>
                </div>

                <!-- Harsh Zone -->
                <div class="absolute top-0 bottom-8 right-0 w-1/4 bg-yellow-900/10 flex items-center justify-center">
                     <span class="text-yellow-500 font-bold -rotate-90">Harshness (AirPods Boost)</span>
                </div>
            </div>
            
            <p class="text-gray-400 text-sm italic text-center mb-12">
                If your essential elements (Kick, Bass) only live in the red zone, they will disappear on a phone.
            </p>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">2. The "Phantom 808" Trick</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                How do Trap producers make 808s bang on an iPhone? 
                It's Psychoacoustics. The "Missing Fundamental" Effect.
                <br><br>
                <strong>The Technique:</strong>
                <br>1. Duplicate your 808 track.
                <br>2. High-pass the duplicate at 200Hz.
                <br>3. Add aggressive Distortion (Decapitator / Saturn).
                <br>4. Blend it in lightly.
                <br><br>
                The brain hears the 200Hz harmonics and "fills in" the missing 40Hz fundamental. It sounds deep, even when it isn't.
            </p>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">3. Vocal Sibilance & Ear Fatigue</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                AirPods naturally boost high frequencies to make phone calls clearer.
                This means your 6kHz "S" sounds stick out like knives.
            </p>

            <div class="bg-gray-800 p-8 rounded-3xl border-l-8 border-yellow-500 mb-12">
                <h5 class="text-white font-bold text-xl mb-4">The Double De-Esser Rule</h5>
                <p class="text-gray-300">
                    A single De-Esser isn't enough. Use two.
                    <br><br>
                    <strong>De-Esser 1 (Broad):</strong> Reduces the overall brightness of the vocal slightly.
                    <br><strong>De-Esser 2 (Surgical):</strong> Notches out the specific 6kHz-7kHz whistle.
                    <br><br>
                    Test: If you can listen to your song at full volume on AirPods for 30 minutes without a headache, it passes.
                </p>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">4. Reverb is the Enemy</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                On small speakers, Reverb is just "Mud." It blurs the transient.
                <br><strong>2026 Trend:</strong> Dry, In-Your-Face Vocals.
                <br>Use **Slapback Delays** (1/16th note) instead of massive Halls. It gives depth without washing out the clarity.
            </p>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">5. The "Phone Test" Procedure</h2>
            <p class="text-gray-300 mb-12 leading-relaxed text-lg">
                Bounce your mix. Airdrop it to your phone. 
                <br>1. Put phone face down on a table (simulates worst-case scenario).
                <br>2. Walk to the other room.
                <br><br>
                Can you still hear the Groove? Can you still hear the Lyrics? 
                If yes, it's a hit. If no, back to the DAW.
            </p>
        </div>
    `,
};
