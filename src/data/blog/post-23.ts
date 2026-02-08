import { BlogPost } from '../../types';

export const post23: BlogPost = {
    "id": 23,
    "title": "Finding Your Visual Identity: Branding for Musicians",
    "slug": "artist-branding-visual-identity-guide",
    "category": "Music Marketing",
    "date": "Feb 6, 2026",
    "author": "Burak",
    "image": "/images/blog/blog-23.webp",
    "metaDesc": "People hear with their eyes. Learn the 'Three Color Rule', why Typography matters more than logo, and how to create a Visual Universe.",
    "content": `
        <div class="blog-content">
            <div class="bg-gradient-to-br from-fuchsia-900/50 to-pink-900/50 border border-fuchsia-500/30 rounded-3xl p-10 mb-12 shadow-2xl shadow-fuchsia-900/20">
                 <h3 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span class="text-4xl">🎨</span> Key Takeaways
                </h3>
                <ul class="space-y-4 text-gray-200 text-lg">
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.8)]"></div>
                        <span><strong>The 3-Color Rule:</strong> Pick a palette. Stick to it. Coca-Cola owns Red. Spotify owns Green. Own your color.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.8)]"></div>
                        <span><strong>Fonts have a Voice:</strong> A Metal font on a Pop song confuses the brain. Match the typography to the sonic texture.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.8)]"></div>
                        <span><strong>The Uniform:</strong> Wear the same silhouette in every photo. Be a cartoon character. Be recognizable.</span>
                    </li>
                </ul>
            </div>

            <p class="lead text-xl md:text-3xl font-light leading-relaxed text-gray-300 mb-12">
                People hear with their eyes. Before they press play, they judge your artwork, your font, your clothes. 
                If the visual doesn't match the sonic vibe, they scroll past. 
                In 2026, "Aesthetic" is not an afterthought; it is the <strong>Hook</strong>.
            </p>

            <hr class="border-white/10 my-16" />

            <h2 class="text-4xl font-black text-white mt-20 mb-8">1. The "Visual Universe" Concept</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Don't just make a logo. Create a universe. 
                Look at **Tyler, The Creator**. You know exactly what a "Tyler" video looks like (Pastels, Wes Anderson vibe, weirdness). 
                You need rules.
            </p>

            <div class="bg-gray-800 p-8 rounded-3xl border border-gray-700 mb-12">
                <h5 class="text-white font-bold text-xl mb-6">Example Brand Guide: "Neon Noir" Artist</h5>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Palette -->
                    <div class="space-y-2">
                        <div class="text-gray-400 text-xs uppercase font-bold">Palette</div>
                        <div class="flex gap-2">
                            <div class="w-12 h-12 bg-black rounded border border-gray-600"></div>
                            <div class="w-12 h-12 bg-fuchsia-600 rounded shadow-[0_0_10px_rgba(192,38,211,0.8)]"></div>
                            <div class="w-12 h-12 bg-cyan-400 rounded shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                        </div>
                        <p class="text-gray-500 text-xs mt-2">Black, Cyber-Pink, Electric Blue.</p>
                    </div>

                    <!-- Texture -->
                     <div class="space-y-2">
                        <div class="text-gray-400 text-xs uppercase font-bold">Textures</div>
                        <div class="w-full h-12 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-gray-700 rounded opacity-50"></div>
                        <p class="text-gray-500 text-xs mt-2">Film Grain, VHS Glitch, Rain.</p>
                    </div>

                    <!-- Typography -->
                     <div class="space-y-2">
                        <div class="text-gray-400 text-xs uppercase font-bold">Typography</div>
                        <div class="text-fuchsia-400 font-mono text-xl">MONOSPACE</div>
                        <p class="text-gray-500 text-xs mt-2">Computer Terminal, Hacker style.</p>
                    </div>
                </div>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">2. Moodboards (Pinterest)</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Photographers cannot read your mind. They need references. 
                Before you book a shoot, create a <strong>Visual Bible</strong>.
                <br><br>
                <strong>Bad Direction:</strong> "Make me look cool."
                <br><strong>Good Direction:</strong> "High contrast, blue lighting, shot on 35mm film, referencing Blade Runner 2049."
            </p>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">3. The Psychology of Fonts</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Your font is your voice. Don't use Helvetica just because it's default.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                 <div class="bg-gray-800 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <div class="text-3xl text-white font-serif italic mb-1">Serif Fonts</div>
                        <div class="text-xs text-gray-400">Times New Roman, Garamond</div>
                    </div>
                    <div class="bg-black/30 px-3 py-1 rounded text-xs text-gray-300">Vibe: Classic, Indie, Soft</div>
                </div>

                 <div class="bg-gray-800 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <div class="text-3xl text-white font-black uppercase mb-1" style="font-family: 'Impact', sans-serif;">Bold Sans</div>
                        <div class="text-xs text-gray-400">Impact, Futura Bold</div>
                    </div>
                    <div class="bg-black/30 px-3 py-1 rounded text-xs text-gray-300">Vibe: Loud, Rap, Rock</div>
                </div>
                 <div class="bg-gray-800 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <div class="text-3xl text-white font-mono mb-1">Terminal</div>
                        <div class="text-xs text-gray-400">Courier, JetBrains Mono</div>
                    </div>
                    <div class="bg-black/30 px-3 py-1 rounded text-xs text-gray-300">Vibe: Techno, Sci-Fi</div>
                </div>
                 <div class="bg-gray-800 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                         <div class="text-3xl text-white mb-1" style="font-family: 'Brush Script MT', cursive;">Handwritten</div>
                        <div class="text-xs text-gray-400">Signature, Marker</div>
                    </div>
                    <div class="bg-black/30 px-3 py-1 rounded text-xs text-gray-300">Vibe: Punk, DIY, Personal</div>
                </div>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">4. The "Uniform"</h2>
            <p class="text-gray-300 mb-12 leading-relaxed text-lg">
                Steve Jobs wore a turtleneck. Slash wears a top hat. Weeknd wore a red suit.
                <br><strong>Pick ONE item</strong> that is yours. 
                Wear it in every photo, every video, every show for a year. 
                It makes you a recognizable <strong>Character</strong>, not just a person.
            </p>
        </div>
    `,
};
