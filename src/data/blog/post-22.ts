import { BlogPost } from '../../types';

export const post22: BlogPost = {
    "id": 22,
    "title": "Mastering 101: LUFS, True Peak, and Streaming Standards",
    "slug": "mastering-lufs-streaming-loudness-guide",
    "category": "Music Production",
    "date": "Feb 6, 2026",
    "author": "Burak",
    "image": "/images/blog/blog-22.webp",
    "metaDesc": "Stop mastering to -14 LUFS. It makes your music quiet. Learn the real competitive loudness targets (-9 LUFS) and why True Peak matters more than loudness.",
    "content": `
        <div class="blog-content">
            <div class="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 rounded-3xl p-10 mb-12 shadow-2xl shadow-cyan-900/20">
                 <h3 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span class="text-4xl">🎚️</span> Key Takeaways
                </h3>
                <ul class="space-y-4 text-gray-200 text-lg">
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                        <span><strong>Ignore -14 LUFS:</strong> If you master to -14, you will sound quiet in a playlist. Aim for -9 to -6 LUFS.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                        <span><strong>True Peak is King:</strong> Set your ceiling to -1.0 dB to prevent "Encoding Distortion" on Spotify.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                        <span><strong>Mono Check:</strong> 50% of listeners (phones/clubs) are in mono. If your synth disappears, your mix fails.</span>
                    </li>
                </ul>
            </div>

            <p class="lead text-xl md:text-3xl font-light leading-relaxed text-gray-300 mb-12">
                "How loud should my master be?" The answer in 2026 is unexpected. 
                Spotify tells you to master to -14 LUFS. <strong>Do not listen to them.</strong> 
                If you do, your Trap banger will sound like a whisper next to Skrillex. 
                Here is the real-world guide to competitive loudness.
            </p>

            <hr class="border-white/10 my-16" />

            <h2 class="text-4xl font-black text-white mt-20 mb-8">1. The -14 LUFS Myth</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Spotify normalizes audio. This means they turn loud songs down. 
                However, a dense, compressed song turned down sounds <strong>bigger</strong> than a dynamic song turned up.
            </p>

            <div class="flex flex-col md:flex-row gap-8 mb-12">
                <!-- Weak Master -->
                <div class="bg-gray-800 flex-1 p-6 rounded-3xl border border-gray-700">
                    <div class="h-32 flex items-center justify-center mb-4 relative">
                         <div class="w-1 bg-green-500 h-[40%] mx-auto absolute left-10"></div>
                         <div class="w-1 bg-green-500 h-[90%] mx-auto absolute left-20"></div> <!-- Transient -->
                         <div class="w-1 bg-green-500 h-[40%] mx-auto absolute left-30"></div>
                         <div class="w-full border-t border-dashed border-gray-500 absolute top-10 text-xs text-gray-500">Spotify Ceiling</div>
                    </div>
                    <h5 class="text-gray-400 font-bold mb-2">Mastered at -14 LUFS</h5>
                    <p class="text-red-400 text-sm">
                        Result: "Spiky." The drums are loud, but the body of the song is quiet. Minimal impact.
                    </p>
                </div>

                <!-- Strong Master -->
                <div class="bg-gray-800 flex-1 p-6 rounded-3xl border border-cyan-500/50 shadow-lg shadow-cyan-900/20">
                    <div class="h-32 flex items-center justify-center mb-4 relative">
                        <div class="w-full bg-cyan-500/20 h-[80%] rounded"></div> <!-- The Brick -->
                         <div class="w-full border-t border-dashed border-gray-500 absolute top-10 text-xs text-gray-500">Spotify Ceiling</div>
                    </div>
                    <h5 class="text-cyan-400 font-bold mb-2">Mastered at -8 LUFS</h5>
                    <p class="text-green-400 text-sm">
                        Result: "Dense." When turned down, the body of the song stays thick. High energy. Competitive.
                    </p>
                </div>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">2. True Peak: The Invisible Killer</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                When Spotify converts your high-quality WAV to a lower-quality OGG file for streaming, it adds noise (artifacts). 
                If your master hits 0.0 dB, this noise pushes it to +1.0 dB. 
                <strong>Result:</strong> Digital Clipping (Distortion).
            </p>

            <div class="bg-red-900/10 border border-red-500/20 p-8 rounded-3xl mb-12">
                <h4 class="text-white font-bold text-xl mb-4">The Solution: -1.0 dB Ceiling</h4>
                <p class="text-gray-300">
                    Set your Limiter's "Ceiling" or "Output" to <strong>-1.0 dB</strong>. 
                </p>
                <div class="mt-4 bg-black/40 p-4 rounded-xl font-mono text-cyan-300">
                    Target: -8 LUFS<br>
                    True Peak: -1.0 dB<br>
                    Format: 44.1kHz / 24bit (or 16bit)
                </div>
                <p class="text-gray-400 text-sm mt-4">
                    This leaves "Headroom" for the conversion process. Your song will sound cleaner on cheap earbuds.
                </p>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">3. The Low End Trick (Clipping)</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Bass eats up all your headroom. If your Kick is too loud, your Limiter chokes. 
                <br><br>
                <strong>The Secret:</strong> Use a **Soft Clipper** on the Kick Drum *before* it hits the master. 
                Slice off the top 2dB of the Kick transient. 
                You won't hear the difference, but you gain 2dB of loudness for the rest of the mix.
            </p>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">4. Check in Mono</h2>
            <p class="text-gray-300 mb-12 leading-relaxed text-lg">
                Use a plugin like **Ozone Imager** to check your "Correlation." 
                If it dips into the negative (-1), your bass/synths are "Out of Phase." 
                When played in a Club (Mono system) or on a Phone (Single speaker), those sounds will vanish. 
                Always fix phase issues in the mix, not the master.
            </p>
        </div>
    `,
};
