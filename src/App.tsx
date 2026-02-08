import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import ScrollToTop from './components/ScrollToTop';
import GrainOverlay from './components/GrainOverlay';
import CursorFollower from './components/CursorFollower';
import SmoothScroll from './components/SmoothScroll';
import { InteractiveLiquid, MorphingParticleText, InteractiveStars } from './components/ThreeBackground';
// Pages
import HomePage from './pages/Home';
import ArtistsPage from './pages/Artists';
import ReleasesPage from './pages/Releases';
import BlogPage from './pages/Blog';
// Admin panel removed - site is now fully static
import ArtistDetail from './pages/ArtistDetail';
import AboutPage from './pages/About';
import BlogDetail from './pages/BlogDetail';
import SubmitPage from './pages/Submit';
import ServicesPage from './pages/Services';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

const App = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    // Intro sadece ana sayfada gösterilecek, diğer sayfalara doğrudan girildiğinde atlanacak
    const [entered, setEntered] = React.useState(!isHomePage);

    // Sayfa değiştiğinde intro durumunu güncelle
    useEffect(() => {
        if (!isHomePage) {
            setEntered(true);
        }
    }, [isHomePage]);

    return (
        <div className="bg-[#050505] min-h-screen text-white selection:bg-purple-500/30">
            <SEO />
            <ScrollToTop />
            <GrainOverlay />
            <CursorFollower />
            <SmoothScroll />

            {/* 3D Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
                    <color attach="background" args={['#050505']} />
                    <fog attach="fog" args={['#050505', 5, 15]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
                    <InteractiveStars />
                    <InteractiveLiquid />
                    <MorphingParticleText entered={entered} setEntered={setEntered} />
                </Canvas>
            </div>

            {/* Intro Overlay - Sadece ana sayfada göster */}
            <AnimatePresence>
                {!entered && isHomePage && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer"
                        onClick={() => setEntered(true)}
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 animate-pulse mt-[40vh]"
                        >
                            Click to Enter
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {entered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="relative z-10 scroll-content"
                    >
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/artists" element={<ArtistsPage />} />
                            <Route path="/artists/:id" element={<ArtistDetail />} />
                            <Route path="/releases" element={<ReleasesPage />} />
                            <Route path="/submit" element={<SubmitPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:category/:slug" element={<BlogDetail />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms" element={<TermsOfService />} />
                            <Route path="*" element={<HomePage />} />
                        </Routes>
                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
