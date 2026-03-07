import { BlogPost } from '../../types';

export const post105: BlogPost = {
    "id": 105,
    "title": "How Distributors Send Songs to Spotify: Inside the SFTP, XML, and DDEX Pipeline",
    "slug": "distributor-music-delivery-sftp-xml-ddex-pipeline-secrets",
    "category": "Technology",
    "date": "Mar 7, 2026",
    "author": "Burak Can Öğüt",
    "image": "/images/blog/blog-105.png",
    "metaDesc": "How exactly does a record label or distributor deliver your song to Spotify and Apple Music? Discover the unseen technical secrets of SFTP servers, DDEX standards, and XML metadata ingestion.",
    "tags": "music distribution tech, ddex standard, spotify xml sftp, distrokid backend infrastructure, song metadata delivery, start a record label, spotify ingestion pipeline",
    "content": `
        <div class="blog-content">
            <div class="bg-gray-900/40 p-10 mb-12 border-l-4 border-cyan-500">
                 <h3 class="text-3xl font-black text-white mb-6 flex items-center gap-3">
                    <span class="text-4xl">⚙️</span> The Giant Machine Behind the "Upload" Button
                </h3>
                 <p class="text-gray-300 leading-relaxed text-lg">
                    When you log into a distribution platform (like DistroKid, TuneCore, or our elite system at <strong>WBBT Records</strong>) and click "Release Song," there is absolutely zero human intervention behind the scenes. No one is manually emailing an MP3 to a Spotify executive. The modern music industry is a hyper-automated, massive <strong class="text-cyan-400">Server-SFTP-XML Network.</strong> 
                    In this technical deep dive, we'll explore exactly how your localized audio file gets transformed into a global data matrix.
                 </p>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">The Universal Language: DDEX (Digital Data Exchange)</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                "Digital Service Providers" (DSPs) like Spotify, Apple Music, and Amazon Music receive hundreds of thousands of tracks every single day from thousands of different distributors. If every distributor sent their data in a different format, the system would instantly collapse. To prevent this, the industry relies on a global standard called <strong class="text-white">DDEX</strong>.
            </p>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                When you type in your track title, genre, compositor, and ISRC code into a web form, our backend software takes those simple text inputs and compiles them into a massive, standardized <strong>XML code file</strong> (specifically, the DDEX ERN - Electronic Release Notification format). This XML file is the only language Spotify's ingestion algorithms understand.
            </p>

            <div class="mockup-code bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 mb-12 font-mono text-sm overflow-x-auto text-green-400 shadow-2xl">
                <p class="text-gray-500 text-xs mb-4">// Simplified DDEX XML Example</p>
                <pre><code>&lt;Release&gt;
   &lt;ReleaseId&gt;
      &lt;ISRC&gt;UKWBB2600001&lt;/ISRC&gt;
   &lt;/ReleaseId&gt;
   &lt;Title&gt;Maybe Now&lt;/Title&gt;
   &lt;DisplayArtistName&gt;HUGOLA&lt;/DisplayArtistName&gt;
   &lt;CLine&gt;2026 WBBT Recording Limited&lt;/CLine&gt;
   &lt;Genre&gt;
      &lt;GenreText&gt;Electronic Dance Music&lt;/GenreText&gt;
   &lt;/Genre&gt;
&lt;/Release&gt;</code></pre>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">The "3-File Packaging" Rule</h2>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                For a Release to successfully pass through a DSP's automated Quality Control (QC) bot, the distributor must package precisely three core assets into a single delivery folder:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div class="bg-black/30 p-8 rounded-2xl border-t-2 border-blue-500 hover:bg-black/50 transition-colors">
                    <h5 class="text-white font-bold text-xl mb-3">1. The Metadata (XML)</h5>
                    <p class="text-sm text-gray-400 leading-relaxed">The brain of the release. Contains the ISRC codes, UPC barcodes, explicit content flags, territory rights, and payout royalty splits. Without this, the audio is invisible.</p>
                </div>
                 <div class="bg-black/30 p-8 rounded-2xl border-t-2 border-purple-500 hover:bg-black/50 transition-colors">
                    <h5 class="text-white font-bold text-xl mb-3">2. The Audio (WAV/FLAC)</h5>
                    <p class="text-sm text-gray-400 leading-relaxed">The physical sonic asset. High-end distributors will automatically encode uploaded lossless masters into the strict 16-bit/44.1kHz standards or Apple Digital Masters compliance.</p>
                </div>
                 <div class="bg-black/30 p-8 rounded-2xl border-t-2 border-pink-500 hover:bg-black/50 transition-colors">
                    <h5 class="text-white font-bold text-xl mb-3">3. The Artwork (JPG)</h5>
                    <p class="text-sm text-gray-400 leading-relaxed">The visual asset. It must be strictly 3000x3000px and in the RGB color space. If a distributor sends a CMYK color profile image, Apple Music will instantly bounce the package as a QC Failure.</p>
                </div>
            </div>

            <h2 class="text-4xl font-black text-white mt-20 mb-8">The Delivery Pipeline: SFTP Transmission</h2>
            
            <img src="/images/blog/minimal_diagram_sftp.png" alt="SFTP XML Data Transfer Pipeline Diagram" class="w-full rounded-2xl mb-8 border border-white/10 shadow-2xl" />

            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Once the package is compiled, the files must be securely transferred. Major record labels and top-tier distributors possess private, encrypted connections to Spotify and Apple's colossal <strong class="text-yellow-400">SFTP (Secure File Transfer Protocol)</strong> data buckets.
            </p>
            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                Here is the sequence: The distributor's system connects to Spotify's ingestion host via SSH keys. The packaged release is fired through fiber-optic networks into Spotify's "Ingestion Drop Zone". Within milliseconds, Spotify's servers unpack the folder, parse the XML, cross-reference the ISRC database to prevent duplicates, store the audio on their Content Delivery Network (CDN), and finally, fire an automated ACK (Acknowledgment) message back to the distributor's server:
            </p>
            
            <div class="bg-black p-4 rounded-xl border border-gray-800 my-8">
               <span class="text-green-400 font-mono text-sm tracking-widest break-all">>> INGEST_SUCCESS: URI_SPOTIFY_TRACK_0192348_COMPLETE</span>
            </div>

            <p class="text-gray-300 mb-8 leading-relaxed text-lg">
                If the XML has a typo, or the cover art is blurry, Spotify's server replies with an <span class="text-red-400 font-mono">INGEST_FAILED</span> log, and the distributor's support team is notified to fix it.
            </p>

            <div class="mt-20 p-12 bg-[#050505] rounded-3xl border border-gray-800 text-center relative overflow-hidden">
                <h3 class="text-3xl font-black text-white mb-6 relative z-10">Flawless Distribution Infrastructure</h3>
                <p class="text-lg text-gray-400 mb-8 max-w-3xl mx-auto relative z-10 leading-relaxed">
                    At WBBT Records, our backend infrastructure is built to flawlessly compile DDEX XMLs and stream your uncompressed audio directly into DSP clusters globally. We ensure 100% Delivery Success, eliminating the stress of platform rejections. Because we know the code.
                </p>
            </div>
            
        </div>
    `,
};
