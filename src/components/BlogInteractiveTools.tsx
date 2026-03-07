import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Code, FileText, Database, Server, VolumeX, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogInteractiveToolsProps {
    postId: number;
}

// -------------------------------------------------------------
// Interactive Demo for Blog 104: 808 Saturation / Sub Bass
// -------------------------------------------------------------
const SaturationDemo = () => {
    const [drive, setDrive] = useState(0);

    return (
        <div className="bg-[#0a0a0a] border border-yellow-500/20 rounded-3xl p-8 my-12 shadow-[0_0_30px_rgba(234,179,8,0.05)]">
            <div className="flex items-center gap-3 mb-6">
                <Volume2 className="text-yellow-400" />
                <h3 className="text-2xl font-black text-white font-display">Interactive Demo: Harmonic Saturation</h3>
            </div>
            <p className="text-gray-400 text-sm mb-8">Increase the Drive to see how emphasizing upper harmonics tricks the brain into hearing sub-bass on small speakers.</p>

            <div className="bg-black/50 p-6 rounded-2xl border border-white/5 mb-8">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-gray-300 font-bold text-sm tracking-widest uppercase">Tube Drive Amount</span>
                    <span className="text-yellow-400 font-black text-xl">{drive}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={drive}
                    onChange={(e) => setDrive(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-900 rounded-full appearance-none flex items-center cursor-pointer border border-white/10 accent-yellow-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black rounded-xl p-4 border border-white/5 relative overflow-hidden">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest block mb-4">Fundamental (40Hz)</span>
                    <div className="h-16 flex items-center justify-center opacity-50">
                        {/* Fake sine wave */}
                        <div className="w-full h-1 bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.5)] glow-box-pulse"></div>
                    </div>
                </div>
                <div className="bg-black rounded-xl p-4 border border-white/5 relative overflow-hidden">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest block mb-4">Harmonics (200-800Hz)</span>
                    <div className="h-16 flex items-center justify-center gap-[2px]">
                        {/* Fake jagged waveform based on drive */}
                        {[...Array(30)].map((_, i) => {
                            const height = drive === 0 ? 2 : Math.min(100, Math.random() * drive + 5);
                            return (
                                <div key={i} style={{ height: `${height}%`, opacity: drive > 0 ? 1 : 0.2 }} className="w-full bg-yellow-500 rounded-full transition-all duration-100 ease-bounce"></div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {drive > 70 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-sm text-yellow-400 font-bold bg-yellow-400/10 p-4 border border-yellow-400/20 rounded-xl">
                    ⚠️ Phone speakers can now successfully reproduce the 808 by interpreting the saturated upper harmonics!
                </motion.div>
            )}
        </div>
    );
};

// -------------------------------------------------------------
// Interactive Demo for Blog 105: DDEX XML Generator
// -------------------------------------------------------------
const XMLGeneratorDemo = () => {
    const [title, setTitle] = useState("My Hit Song");
    const [artist, setArtist] = useState("DJ Cool");
    const [isrc, setISRC] = useState("USWBB2600001");

    return (
        <div className="bg-[#050510] border border-cyan-500/20 rounded-3xl p-8 my-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Server className="text-cyan-400" />
                <h3 className="text-2xl font-black text-white font-display">Interactive Demo: DDEX XML Compiler</h3>
            </div>
            <p className="text-gray-400 text-sm mb-8">Type into the distributor frontend below and watch the backend server compile it into Spotify's required XML language in real-time.</p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Frontend Mockup */}
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-6 flex items-center gap-2"><FileText size={14} /> Distributor Frontend</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-400 block mb-1">Track Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white text-sm focus:border-cyan-500 outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 block mb-1">Artist Name</label>
                            <input type="text" value={artist} onChange={e => setArtist(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white text-sm focus:border-cyan-500 outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 block mb-1">ISRC Code</label>
                            <input type="text" value={isrc} onChange={e => setISRC(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white text-sm font-mono focus:border-cyan-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Backend XML Output */}
                <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
                    <h4 className="text-xs text-green-500 font-bold uppercase tracking-widest mb-6 flex items-center gap-2"><Code size={14} /> Server XML Output (Live)</h4>
                    <pre className="text-xs text-green-400 font-mono overflow-x-auto">
                        {`<Release>
  <ReleaseId>
    <ISRC>${isrc}</ISRC>
  </ReleaseId>
  <ReferenceTitle>
    <TitleText>${title}</TitleText>
  </ReferenceTitle>
  <ResourceContributor>
    <PartyName>
      <FullName>${artist}</FullName>
    </PartyName>
    <ResourceContributorRole>MainArtist</ResourceContributorRole>
  </ResourceContributor>
  <CLine>
    <Year>2026</Year>
    <CLineText>WBBT Records</CLineText>
  </CLine>
</Release>`}
                    </pre>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-cyan-500 hover:text-black transition-colors">
                    <Database size={16} /> SFTP Deliver to Spotify
                </button>
            </div>
        </div>
    );
};


// -------------------------------------------------------------
// Interactive Demo for Blog 101: Link to Calculator
// -------------------------------------------------------------
const CalculatorPromo = () => {
    return (
        <div className="bg-gradient-to-r from-green-900/40 to-black border border-green-500/30 rounded-3xl p-10 my-12 text-center relative overflow-hidden">
            <DollarSign className="absolute -top-10 -right-10 text-green-500/10 w-64 h-64" />
            <h3 className="text-3xl font-black text-white mb-4 relative z-10">Stop Guessing Your Royalties</h3>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto relative z-10">Use our Global Spotify Royalty Calculator to see exact 2026 payout rates for Tier 1, Tier 2, and Emerging Markets.</p>
            <Link to="/spotify-royalty-calculator" className="inline-block relative z-10 bg-green-500 text-black font-black px-8 py-4 rounded-full uppercase tracking-wider text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                Launch Calculator Demo
            </Link>
        </div>
    )
}


const BlogInteractiveTools: React.FC<BlogInteractiveToolsProps> = ({ postId }) => {

    // Render specific tools based on the blog ID being viewed
    switch (postId) {
        case 101:
            return <CalculatorPromo />;
        case 104:
            return <SaturationDemo />;
        case 105:
            return <XMLGeneratorDemo />;
        default:
            return null; // Return null if this blog doesn't have an interactive demo
    }
};

export default BlogInteractiveTools;
