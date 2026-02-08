import { BlogPost } from '../../types';

export const post46: BlogPost = {
    "id": 46,
    "title": "Acoustic Treatment 101: Why Egg Cartons Don't Work",
    "slug": "diy-acoustic-treatment-guide",
    "category": "Music Technology",
    "date": "Feb 6, 2026",
    "author": "Burak",
    "image": "/images/blog/blog-46.webp",
    "metaDesc": "Stop gluing foam to your walls. It is a fire hazard. Learn the difference between Soundproofing (Isolation) and Treatment (Absorption), and how to build Rockwool panels.",
    "content": `
        <div class="blog-content">
            <div class="bg-gradient-to-br from-zinc-900/50 to-gray-900/50 border border-zinc-500/30 rounded-3xl p-10 mb-12 shadow-2xl shadow-zinc-900/20">
                 <h3 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span class="text-4xl">🔇</span> Key Takeaways
                </h3>
                <ul class="space-y-4 text-gray-200 text-lg">
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-zinc-400 shadow-[0_0_10px_rgba(161,161,170,0.8)]"></div>
                        <span><strong>Foam is a Lie:</strong> Cheap Amazon foam only absorbs high frequencies. It leaves the mud (low-mids) untouched, making your room sound worse.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-zinc-400 shadow-[0_0_10px_rgba(161,161,170,0.8)]"></div>
                        <span><strong>Mass Law:</strong> To stop bass, you need density (Rockwool/Fiberglass). You cannot stop a 50Hz wave with a sponge.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-zinc-400 shadow-[0_0_10px_rgba(161,161,170,0.8)]"></div>
                        <span><strong>The Mirror Trick:</strong> Treat the "First Reflection Points" first.</span>
                    </li>
                </ul>
            </div>

            <p class="lead text-xl md:text-3xl font-light leading-relaxed text-gray-300 mb-12">
                Stop gluing foam to your walls. The gray jagged foam you bought on Amazon is not acoustic treatment; it is a fire hazard that makes your room sound dead and boomy. 
                Real acoustic treatment is about physics, specifically controlling the <em>velocity</em> of air particles. 
                This guide explains how to build a professional studio environment in a spare bedroom for under $300.
            </p>

            <hr class="border-white/10 my-16" />

            <h2 class="text-4xl font-black text-white mt-20 mb-8">1. Soundproofing vs. Treatment</h2>
            <div class="bg-gray-800 p-8 rounded-3xl border border-gray-700 mb-12">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h5 class="text-red-400 font-bold text-2xl mb-4">Soundproofing (Isolation)</h5>
                        <p class="text-gray-300 mb-4"><strong>Goal:</strong> Stop sound from leaving the room so neighbors don't call the police.</p>
                        <p class="text-gray-400 text-sm"><strong>Requirements:</strong> Mass (Concrete), Decoupling (Room-within-a-room). This costs $10,000+. You cannot do this with panels.</p>
                    </div>
                     <div class="border-l border-gray-600 pl-8">
                        <h5 class="text-green-400 font-bold text-2xl mb-4">Treatment (Absorption)</h5>
                        <p class="text-gray-300 mb-4"><strong>Goal:</strong> Stop sound from bouncing around <em>inside</em> the room so you can hear clearly.</p>
                        <p class="text-gray-400 text-sm"><strong>Requirements:</strong> Absorption (Fiberglass). This costs $300. This is our focus.</p>
                    </div>
                </div>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">2. The Physics of Rockwool</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                To stop a bass wave, you need Density. 
                <br>Cheap foam is too light. Bass waves pass right through it, hit the wall, and bounce back.
                <br><strong>The Solution:</strong> Rigid Fiberglass (Owens Corning 703) or Mineral Wool (Rockwool Safe'n'Sound).
                <br><br>
                <strong>How it works:</strong> As the sound wave pushes through the dense fibers, friction turns the kinetic energy into heat energy. The sound literally "burns up" inside the panel.
            </p>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">3. The Mirror Trick (Placement)</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Where do you put the panels? You treat the "First Reflection Points."
            </p>
            <div class="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-700">
                <ol class="list-decimal list-inside space-y-4 text-gray-300">
                    <li>Sit in your mixing chair.</li>
                    <li>Have a friend slide a mirror along the side wall at ear level.</li>
                    <li>When you see the speaker in the mirror, <strong>STOP</strong>.</li>
                    <li>That is where the sound hits the wall and bounces to your ear. It arrives 5ms later than the direct sound, causing "Comb Filtering" (Phase Cancellation).</li>
                    <li>Place a panel there. Do this for Left and Right walls.</li>
                </ol>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">4. Bass Traps (Corners)</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Low frequencies build up in corners. Go stand in the corner while playing music; it will be loud and boomy.
                <br><strong>The Fix:</strong> Straddle your panels across the 4 corners at a 45-degree angle.
                <br>This creates an "Air Gap" behind the panel. The bass wave goes through the panel, hits the wall, and goes through the panel <em>again</em> on the way out. Double absorption efficiency.
            </p>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">5. The Ceiling Cloud</h2>
            <p class="text-gray-300 mb-12 leading-relaxed text-lg">
                Don't forget the floor and ceiling. You probably have a rug, but the ceiling is a giant reflector.
                <br>Hang a lightweight panel above your head/desk. 
                This stops the floor-to-ceiling bounce and tightens up your stereo image drastically. 
                It is the single biggest upgrade you can make to a home studio.
            </p>
        </div>
    `,
};
