import { BlogPost } from '../../types';

export const post15: BlogPost = {
    "id": 15,
    "title": "Electronic Press Kits (EPK) in 2026: The \"Live Link\" Revolution",
    "slug": "how-to-make-an-epk-2025",
    "category": "Music Business",
    "date": "Feb 6, 2026",
    "author": "Burak",
    "image": "/images/blog/blog-15.webp",
    "metaDesc": "PDFs are dead. Promoters view EPKs on their phones. Learn how to build a high-conversion 'Live Link' EPK using Notion or a website. Tech Rider essentials included.",
    "content": `
        <div class="blog-content">
            <div class="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border border-indigo-500/30 rounded-3xl p-10 mb-12 shadow-2xl shadow-indigo-900/20">
                 <h3 class="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span class="text-4xl">📄</span> Key Takeaways (The Booker's Checklist)
                </h3>
                <ul class="space-y-4 text-gray-200 text-lg">
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
                        <span><strong>PDFs are Dead:</strong> Nobody downloads 20MB attachments. They are security risks and unreadable on mobile. Use a URL (Notion/Web).</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
                        <span><strong>The 5-Second Test:</strong> A promoter must see your Photo, Genre, and Click 'Play' within 5 seconds. If they have to scroll, you lost the gig.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
                        <span><strong>One-Click Assets:</strong> High-Res Logos and Tech Riders must be downloadable instantly. Don't make them email you for logos.</span>
                    </li>
                </ul>
            </div>

            <p class="lead text-xl md:text-3xl font-light leading-relaxed text-gray-300 mb-12">
                It is 2026. If you send a promoter a Googe Drive folder titled "Press Kit," they will not open it.
                If you send a PDF, they will not read it.
                <br><br>
                Promoters live on their phones. They are checking your email while standing in line for a drink or backstage at a festival. 
                Your EPK is your resume. If it is unprofessional, they assume your live show is unprofessional.
                Here is how to build a <strong>Live Link EPK</strong> that gets you booked.
            </p>

            <div class="my-12 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">1. The Anatomy of a Perfect 'One-Page' EPK</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Keep it simple. It is a tool, not an art project. It needs to function like a high-performance landing page.
            </p>

            <div class="bg-gray-900 border border-gray-800 rounded-3xl p-8 mb-12 relative overflow-hidden shadow-2xl">
                 <!-- Browser Mockup -->
                <div class="w-full bg-gray-800 rounded-t-xl h-10 flex items-center gap-2 px-4 border-b border-gray-700">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    <div class="mx-auto bg-gray-900 px-6 py-1 rounded-full text-xs text-gray-500 font-mono tracking-wide">wbbt.net/press/burak</div>
                </div>
                
                <div class="bg-[#0a0a0a] p-8 space-y-8">
                    <!-- Hero Section -->
                    <div class="flex flex-col md:flex-row gap-8 items-center border-b border-gray-800 pb-8">
                        <div class="w-32 h-32 bg-indigo-900 rounded-full flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(79,70,229,0.3)]">📸</div>
                        <div class="text-center md:text-left">
                            <h1 class="text-3xl font-black text-white mb-2">BURAK</h1>
                            <div class="h-6 w-full md:w-64 bg-gray-800 rounded mb-2 flex items-center px-2 text-xs text-gray-400">GENRE: Dark Synthwave / Industrial</div>
                            <div class="text-sm text-gray-400">Based in Berlin, Germany</div>
                        </div>
                        <div class="ml-auto bg-white text-black px-8 py-3 rounded-full font-bold text-sm tracking-wide cursor-pointer hover:scale-105 transition-transform">BOOK NOW</div>
                    </div>

                    <!-- Music Player -->
                    <div class="space-y-2">
                        <div class="text-gray-500 text-xs uppercase font-bold tracking-widest">Latest Release</div>
                        <div class="w-full h-20 bg-gray-800 rounded-xl flex items-center px-6 gap-6 border border-gray-700 hover:border-indigo-500 transition-colors">
                            <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">▶</div>
                            <div class="flex-1">
                                <div class="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                                    <div class="h-full w-1/3 bg-white"></div>
                                </div>
                                <div class="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>Night Drive.wav</span>
                                    <span>3:45</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Essential Assets Grid -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-gray-800 p-6 rounded-xl text-center border border-gray-700 hover:border-white transition-colors cursor-pointer group">
                             <div class="text-2xl mb-2 group-hover:-translate-y-1 transition-transform">⬇</div>
                             <div class="text-xs font-bold text-gray-300">Download Hi-Res Photos</div>
                        </div>
                         <div class="bg-gray-800 p-6 rounded-xl text-center border border-gray-700 hover:border-white transition-colors cursor-pointer group">
                             <div class="text-2xl mb-2 group-hover:-translate-y-1 transition-transform">📄</div>
                             <div class="text-xs font-bold text-gray-300">Download Tech Rider</div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">2. The Tech Rider (Preventing Disasters)</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                The sound engineer is your best friend or your worst enemy. 
                A clear Tech Rider prevents the "We don't have that cable" conversation 5 minutes before your set.
            </p>

            <div class="bg-gray-800 p-6 rounded-2xl border-l-4 border-yellow-500">
                <h5 class="text-white font-bold mb-4">Essential Tech Rider Items:</h5>
                <ul class="list-disc list-inside text-gray-300 space-y-2 text-sm">
                    <li><strong>Input List:</strong> "2x XLR Stereo Out from Interface", "1x Vocal Mic (Shure SM58)".</li>
                    <li><strong>Table Space:</strong> "Need 2 meters x 1 meter clear table space for synthesizers."</li>
                    <li><strong>Power:</strong> "3x Power Sockets (Europlug) at table height."</li>
                    <li><strong>Monitoring:</strong> "1x Booth Monitor Speaker (Left Side)."</li>
                </ul>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">3. What to DELETE</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Your bio is not your autobiography. Cut the fat.
            </p>
            <ul class="space-y-4">
                <li class="bg-gray-800 p-4 rounded-xl flex items-center gap-4 border border-gray-700">
                    <span class="text-red-500 font-bold text-xl">×</span>
                    <span class="text-gray-300"><strong>Childhood Stories:</strong> "I started playing piano at age 5." Nobody cares.</span>
                </li>
                 <li class="bg-gray-800 p-4 rounded-xl flex items-center gap-4 border border-gray-700">
                    <span class="text-red-500 font-bold text-xl">×</span>
                    <span class="text-gray-300"><strong>Ancient Press:</strong> If the review is from 2018, delete it. It looks like you haven't done anything since.</span>
                </li>
                 <li class="bg-gray-800 p-4 rounded-xl flex items-center gap-4 border border-gray-700">
                    <span class="text-red-500 font-bold text-xl">×</span>
                    <span class="text-gray-300"><strong>Generic Quotes:</strong> "Unique sound" means nothing. Use specific praise like "The Chemical Brothers of 2026."</span>
                </li>
            </ul>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">4. Download Links: Dropbox vs Drive</h2>
            <p class="text-gray-300 mb-12 leading-relaxed text-lg">
                <strong>Google Drive</strong> permissions are a nightmare. "Access Denied" kills bookings.
                <br>
                <strong>WeTransfer</strong> links expire in 7 days. If a journalist opens it 8 days later, file not found.
                <br><br>
                <strong>The Winner:</strong> <strong>Dropbox</strong>. It has the best preview player, permissions are straightforward, and links don't expire.
            </p>
        </div>
    `,
};
