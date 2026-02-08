import React from 'react';
import { Instagram, Twitter, Mail, ExternalLink } from 'lucide-react';

import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="py-20 border-t border-white/10 relative z-10 px-6 max-w-[1600px] mx-auto text-white">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
            <div>
                <h2 className="font-display font-black text-4xl mb-6">WBBT<br />RECORDS</h2>
                <div className="flex gap-4">
                    <a href="https://instagram.com" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"><Instagram size={18} /></a>
                    <a href="https://twitter.com" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"><Twitter size={18} /></a>
                    <a href="mailto:support@wbbt.net" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"><Mail size={18} /></a>
                </div>
            </div>
            <div className="flex flex-wrap gap-12 md:gap-20">
                <div>
                    <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Explore</h4>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><Link to="/artists" className="hover:text-purple-400 transition-colors">Artists</Link></li>
                        <li><Link to="/releases" className="hover:text-purple-400 transition-colors">Releases</Link></li>
                        <li><Link to="/blog" className="hover:text-purple-400 transition-colors">News</Link></li>
                        <li><Link to="/services" className="hover:text-purple-400 transition-colors">Services</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Label</h4>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                        <li><Link to="/submit" className="hover:text-purple-400 transition-colors">Submit Demo</Link></li>
                        <li><a href="mailto:contact@wbbt.net" className="hover:text-purple-400 transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Jobs</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/10 text-xs text-gray-500 uppercase tracking-widest">
            <p>&copy; 2026 WBBT Records. All rights reserved.</p>
            <div className="flex gap-6 md:gap-8">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
        </div>
    </footer>
);

export default Footer;
