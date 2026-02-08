import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, LayoutGroup } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const location = useLocation();
    const currentPage = location.pathname.substring(1) || 'home';

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const isHomeTop = currentPage === 'home' && !isScrolled;

    const navItems = [
        { id: 'home', label: 'Home', path: '/' },
        { id: 'artists', label: 'Artists', path: '/artists' },
        { id: 'releases', label: 'Releases', path: '/releases' },
        { id: 'services', label: 'Services', path: '/services' },
        { id: 'blog', label: 'Blog', path: '/blog' },
        { id: 'about', label: 'About', path: '/about' }
    ];

    // Close mobile menu on route change
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    React.useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <LayoutGroup>
            <nav className="fixed top-0 left-0 w-full z-40 p-4 md:p-6 flex items-center text-white mix-blend-difference overflow-hidden">
                {/* Logo Section */}
                <AnimatePresence mode="popLayout" initial={false}>
                    {!isHomeTop && (
                        <motion.div
                            key="logo"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="font-display font-black text-2xl md:text-3xl tracking-tighter cursor-pointer mr-auto hover:text-purple-500 transition-colors"
                        >
                            <Link to="/">WBBT</Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Menu */}
                <motion.div
                    layout="position"
                    className={`hidden md:flex gap-8 text-xs font-bold tracking-[0.2em] uppercase ${isHomeTop ? 'mx-auto' : 'ml-auto'}`}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    {navItems.map((item) => (
                        <Link key={item.id} to={item.path}>
                            <motion.button
                                className="hover:text-purple-400 transition-colors relative group py-2"
                                layout="position"
                            >
                                {item.label}
                                <span className={`absolute bottom-0 left-0 h-[1px] bg-purple-500 transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                            </motion.button>
                        </Link>
                    ))}
                    <Link to="/submit">
                        <motion.button
                            className="hover:text-purple-400 transition-colors relative group py-2"
                            layout="position"
                        >
                            SUBMIT DEMO
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-500 transition-all duration-300 group-hover:w-full" />
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden ml-auto p-2 hover:text-purple-400 transition-colors"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-30 flex flex-col items-center justify-center md:hidden"
                    >
                        <div className="flex flex-col items-center gap-6">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        to={item.path}
                                        className={`font-display text-3xl font-black tracking-tighter ${location.pathname === item.path ? 'text-purple-400' : 'text-white'} hover:text-purple-400 transition-colors`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: navItems.length * 0.05 }}
                                className="mt-4"
                            >
                                <Link
                                    to="/submit"
                                    className="px-6 py-3 bg-purple-600 text-white font-bold uppercase tracking-widest rounded-full text-sm hover:bg-purple-500 transition-colors"
                                >
                                    Submit Demo
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </LayoutGroup>
    );
};

export default Navbar;
