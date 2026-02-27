import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Users, FileCheck, Headphones, ArrowRight, ChevronDown, Shield, MapPin, Clock, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

interface JobPosition {
    id: string;
    title: string;
    department: string;
    icon: React.ElementType;
    overview: string;
    responsibilities: string[];
    qualifications: string[];
    salary: string;
    positions?: number;
    note?: string;
    formLink: string;
}

const jobs: JobPosition[] = [
    {
        id: 'artist-relations',
        title: 'Artist Relations Manager',
        department: 'Artist & Label Relations',
        icon: Users,
        overview: 'Acts as the primary bridge between WBBT Records and our roster of independent artists. Responsible for managing the ticketing system, addressing artist inquiries, and maintaining the label\'s professional and supportive tone.',
        responsibilities: [
            'Manage and resolve artist support tickets (royalty inquiries, takedown processes, onboarding)',
            'Translate legal and operational jargon into clear, artist-friendly communication',
            'Act as the first line of defense in crisis communication with artists',
        ],
        qualifications: [
            'Exceptional written and verbal communication skills',
            'High emotional intelligence and empathy, paired with corporate boundary-setting',
            'Basic understanding of music copyright law and DSP distribution mechanics',
        ],
        salary: '£28,000 – £35,000',
        formLink: 'https://makeform.ai/f/RK2IEaeR',
    },
    {
        id: 'metadata-coordinator',
        title: 'Release & Metadata Coordinator',
        department: 'Catalog Operations',
        icon: FileCheck,
        overview: 'The operational heart of the catalog. This role ensures that every asset entering the WBBT supply chain is flawlessly formatted according to strict DSP metadata standards before global delivery.',
        responsibilities: [
            'Accurately input and audit ISRC/UPC codes, songwriter splits, and publishing data',
            'Review cover art and audio formats to ensure DSP compliance',
            'Manage the release pipeline to prevent mapping errors or catalog takedowns',
        ],
        qualifications: [
            'Hyper-detail-oriented and highly organized',
            'Proficient in database management, Excel, and ideally B2B distribution platforms (e.g. AudioSalad)',
            'Deep knowledge of standard music industry metadata guidelines',
        ],
        salary: '£35,000 – £45,000',
        formLink: 'https://makeform.ai/f/PWdiEvJb',
    },
    {
        id: 'audio-qa',
        title: 'Audio QA & Compliance Specialist',
        department: 'Quality Assurance',
        icon: Headphones,
        overview: 'The gatekeepers of the WBBT Records catalog. These specialists act as the legal and quality shield, rigorously reviewing all submitted audio files to prevent copyright infringement, AI fraud, and low-quality audio from reaching DSPs.',
        responsibilities: [
            'Inspect WAV files for clipping, distortion, silence, or formatting issues',
            'Utilize frequency scanning tools to detect unauthorized AI generation or uncleared samples',
            'Verify correct application of Explicit tags and flag high-risk Toxic Stems',
        ],
        qualifications: [
            'Background in Audio Engineering or Music Production with a highly trained ear',
            'Understanding of audio fingerprinting and the ability to identify AI artifacts',
            'Fast, meticulous, and capable of processing a high volume of tracks daily',
        ],
        salary: '£32,000 – £40,000',
        positions: 2,
        note: 'All hires are required to sign a strict NDA given access to unreleased catalogs and proprietary label technologies.',
        formLink: 'https://makeform.ai/f/f8ECnwdr',
    },
];

const Careers = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    return (
        <>
            <SEO
                title="Careers at WBBT Records | Join the Team — Open Positions"
                description="Join WBBT Records — a UK-based independent record label. We're hiring for Artist Relations, Metadata Coordination, and Audio QA roles. Competitive salary, additional promotions, and a mission-driven team."
                keywords="WBBT Records Careers, Music Industry Jobs, Record Label Jobs UK, Artist Relations Manager, Metadata Coordinator, Audio QA Specialist, Music Jobs London"
            />

            <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-purple-500/30 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5" />
                        We're Hiring
                    </div>

                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter">
                        Build the Future<br />of Music
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Join a fast-growing independent label redefining how music reaches the world. Competitive annual salaries, additional performance promotions, and more.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-purple-500" />
                            Remote / London, UK
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-purple-500" />
                            Full-Time
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-purple-500" />
                            NDA Required
                        </div>
                    </div>
                </motion.div>

                {/* Perks Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                    {[
                        { label: 'Annual Salary', value: 'Competitive' },
                        { label: 'Bonus Promotions', value: 'Performance-Based' },
                        { label: 'Work Style', value: 'Hybrid / Remote' },
                        { label: 'Industry', value: 'Music & Tech' },
                    ].map((perk) => (
                        <div key={perk.label} className="p-5 border border-white/10 rounded-2xl bg-white/[0.03] text-center hover:border-purple-500/30 transition-colors">
                            <p className="text-white font-bold text-sm">{perk.value}</p>
                            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{perk.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-10"
                >
                    <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-2">Open Positions</h2>
                    <div className="h-1 w-16 bg-purple-600 rounded-full" />
                </motion.div>

                {/* Job Cards */}
                <div className="flex flex-col gap-4">
                    {jobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 * index + 0.5 }}
                        >
                            <div
                                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${expandedId === job.id
                                    ? 'border-purple-500/40 bg-gradient-to-br from-purple-900/20 to-transparent shadow-[0_0_40px_rgba(168,85,247,0.08)]'
                                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                                    }`}
                            >
                                {/* Collapsed Header */}
                                <button
                                    onClick={() => toggle(job.id)}
                                    className="w-full p-6 md:p-8 flex items-center justify-between text-left cursor-pointer"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${expandedId === job.id ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-white/5 border border-white/10'}`}>
                                            <job.icon className={`w-5 h-5 ${expandedId === job.id ? 'text-purple-400' : 'text-gray-500'}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-lg md:text-xl font-bold text-white">
                                                {job.title}
                                                {job.positions && job.positions > 1 && (
                                                    <span className="ml-3 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase rounded-full border border-blue-500/20">
                                                        {job.positions} Positions
                                                    </span>
                                                )}
                                            </h3>
                                            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{job.department}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="hidden md:block text-sm font-semibold text-gray-400">{job.salary} /yr</span>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expandedId === job.id ? 'rotate-180 text-purple-400' : ''}`} />
                                    </div>
                                </button>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {expandedId === job.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/5">
                                                {/* Overview */}
                                                <p className="text-gray-300 leading-relaxed mb-8 text-sm md:text-base">{job.overview}</p>

                                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                                    {/* Responsibilities */}
                                                    <div>
                                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Key Responsibilities</h4>
                                                        <ul className="space-y-3">
                                                            {job.responsibilities.map((item, i) => (
                                                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Qualifications */}
                                                    <div>
                                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">What We're Looking For</h4>
                                                        <ul className="space-y-3">
                                                            {job.qualifications.map((item, i) => (
                                                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Salary + NDA Note */}
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5 mb-6">
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Annual Gross Salary</p>
                                                        <p className="text-white font-bold text-lg">{job.salary} <span className="text-gray-500 text-sm font-normal">+ performance promotions</span></p>
                                                    </div>
                                                    <a
                                                        href={job.formLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 group"
                                                    >
                                                        Apply Now
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </a>
                                                </div>

                                                {job.note && (
                                                    <p className="text-xs text-gray-600 italic flex items-center gap-2">
                                                        <Shield className="w-3.5 h-3.5 text-yellow-600" />
                                                        {job.note}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-20 text-center"
                >
                    <div className="p-10 md:p-14 border border-white/10 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
                        <h3 className="font-display text-2xl md:text-3xl font-black text-white mb-4 relative z-10">
                            Don't See Your Role?
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto mb-6 relative z-10">
                            We're always looking for exceptional talent. Send us your CV and tell us how you can contribute to WBBT Records.
                        </p>
                        <a
                            href="mailto:support@wbbt.net"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider text-sm rounded-full hover:bg-white hover:text-black transition-all duration-300 relative z-10"
                        >
                            Get in Touch
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Careers;
