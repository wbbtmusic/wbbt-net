import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const InteractiveLiquid = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Organic floating motion (no gravity)
        const floatX = Math.sin(time * 0.3) * 0.5;
        const floatY = Math.cos(time * 0.4) * 0.5;
        const floatZ = Math.sin(time * 0.2) * 0.2;

        // Smoothly interpolate current position to float
        meshRef.current.position.x = floatX;
        meshRef.current.position.y = floatY;
        meshRef.current.position.z = -3 + floatZ;

        // Rotation adds to the liquid feel
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;

        // Dynamic material update (optional pulsing)
        if (materialRef.current) {
            materialRef.current.distort = 0.5 + Math.sin(time) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -3]} scale={1.8}>
            <sphereGeometry args={[1, 128, 128]} />
            <MeshDistortMaterial
                ref={materialRef}
                color="#111111" // Dark metallic
                attach="material"
                distort={0.55}
                speed={2.5}
                roughness={0.1}
                metalness={1.0}
            />
        </mesh>
    );
};

export const MorphingParticleText = ({ entered, setEntered }: { entered: boolean, setEntered: (v: boolean) => void }) => {
    const pointsRef = useRef<THREE.Points>(null);
    const [particles, setParticles] = useState<Float32Array | null>(null);
    const [targetPositions, setTargetPositions] = useState<Float32Array[] | null>(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [prevWordIndex, setPrevWordIndex] = useState(0);
    const [transitionProgress, setTransitionProgress] = useState(0);

    const words = useMemo(() => ["WBBT", "RECORDS", "FUTURE", "MUSIC"], []);

    useEffect(() => {
        const initParticles = async () => {
            await document.fonts.ready;

            const generatePointsForText = (text: string) => {
                const canvas = document.createElement('canvas');
                canvas.width = 2048;
                canvas.height = 1024;
                const ctx = canvas.getContext('2d');
                if (!ctx) return new Float32Array(0);

                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = 'white';
                // Adjust font size based on text length to keep it readable
                const fontSize = text.length > 5 ? 200 : 300;
                ctx.font = `900 ${fontSize}px "Outfit", sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(text, canvas.width / 2, canvas.height / 2);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                const points = [];

                const gap = 6; // Optimized for performance (60FPS target)
                for (let y = 0; y < canvas.height; y += gap) {
                    for (let x = 0; x < canvas.width; x += gap) {
                        const index = (y * canvas.width + x) * 4;
                        if (data[index] > 100) {
                            // Add slight randomness to x/y to prevent perfect grid (irregular look)
                            const jitterX = (Math.random() - 0.5) * 0.04;
                            const jitterY = (Math.random() - 0.5) * 0.04;
                            const jitterZ = (Math.random() - 0.5) * 0.1;

                            const px = (x - canvas.width / 2) * 0.012 + jitterX;
                            const py = -(y - canvas.height / 2) * 0.012 + jitterY;
                            points.push(px, py, jitterZ);
                        }
                    }
                }
                return new Float32Array(points);
            };

            const allWordPoints = words.map(word => generatePointsForText(word));

            // Find max length
            let maxLength = 0;
            allWordPoints.forEach(arr => {
                if (arr.length > maxLength) maxLength = arr.length;
            });

            // Normalize all arrays to maxLength
            const normalizedPoints = allWordPoints.map(arr => {
                if (arr.length === maxLength) return arr;
                const newArr = new Float32Array(maxLength);
                newArr.set(arr);
                // Fill the rest with random points from the existing set
                for (let i = arr.length; i < maxLength; i++) {
                    newArr[i] = arr[i % arr.length];
                }
                return newArr;
            });

            setParticles(new Float32Array(maxLength));
            setTargetPositions(normalizedPoints);
        };

        initParticles();
    }, [words]);

    // Animation cycle loop
    useEffect(() => {
        if (!entered && targetPositions) {
            const interval = setInterval(() => {
                setPrevWordIndex(prev => (prev + 1) % words.length);
                setCurrentWordIndex(prev => (prev + 1) % words.length);
                setTransitionProgress(0);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [entered, targetPositions, words.length]);

    useFrame((state, delta) => {
        if (!pointsRef.current || !particles || !targetPositions) return;

        // Transition progress - snap quicker for clearer text
        if (!entered && transitionProgress < 1) {
            // Cubic easing for sharper transitions
            const speed = 1.2;
            setTransitionProgress(prev => Math.min(prev + delta * speed, 1));
        }

        const currentPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const fromPositions = targetPositions[prevWordIndex === 0 && transitionProgress === 0 ? words.length - 1 : (currentWordIndex - 1 + words.length) % words.length];
        const toPositions = targetPositions[currentWordIndex];

        for (let i = 0; i < particles.length; i += 3) {
            // Interpolate
            // Easing function for morphing
            const t = transitionProgress < 0.5 ? 2 * transitionProgress * transitionProgress : -1 + (4 - 2 * transitionProgress) * transitionProgress;

            const targetX = THREE.MathUtils.lerp(fromPositions[i], toPositions[i], t);
            const targetY = THREE.MathUtils.lerp(fromPositions[i + 1], toPositions[i + 1], t);
            const targetZ = THREE.MathUtils.lerp(fromPositions[i + 2], toPositions[i + 2], t);

            if (entered) {
                // EXPLOSION EFFECT
                // Calculate vector from center
                const angle = Math.atan2(currentPositions[i + 1], currentPositions[i]);

                // Violent outward force
                const explosionForce = 1.5;
                currentPositions[i] += Math.cos(angle) * explosionForce * (1 + Math.random()) * delta * 10;
                currentPositions[i + 1] += Math.sin(angle) * explosionForce * (1 + Math.random()) * delta * 10;
                currentPositions[i + 2] += (Math.random() - 0.5) * explosionForce * delta * 10;
            } else {
                // Standard Float + Morph
                const time = state.clock.elapsedTime;
                const noiseScale = 0.02;
                const noiseX = Math.sin(time * 0.5 + currentPositions[i + 1]) * noiseScale;
                const noiseY = Math.cos(time * 0.3 + currentPositions[i]) * noiseScale;

                // Snappier lerp to target
                const morphSpeed = 0.1;
                // Add force to target position. The lerp will naturally pull particle to the "pushed" location
                // and return it when force is 0.
                currentPositions[i] += (targetX + noiseX - currentPositions[i]) * morphSpeed;
                currentPositions[i + 1] += (targetY + noiseY - currentPositions[i + 1]) * morphSpeed;
                currentPositions[i + 2] += (targetZ - currentPositions[i + 2]) * morphSpeed;
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    if (!particles) return null;

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.022}
                color="#ffffff"
                sizeAttenuation={true}
                transparent
                opacity={entered ? 0 : 1}
                blending={THREE.NormalBlending}
                depthWrite={false}
            />
        </points>
    );
};

export const InteractiveStars = () => {
    const count = 1500; // Reduced for performance
    const mesh = useRef<THREE.Points>(null);
    const scrollOffset = useRef(0);

    // Generate random positions
    const [positions] = useState(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        return pos;
    });

    // Lightweight scroll listener
    useEffect(() => {
        const handleScroll = () => {
            scrollOffset.current = window.scrollY * 0.002;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;
        const time = state.clock.getElapsedTime();
        // Simple rotation + scroll offset (no per-particle updates)
        mesh.current.rotation.y = time * 0.03;
        mesh.current.rotation.x = Math.sin(time * 0.02) * 0.1;
        mesh.current.position.y = -scrollOffset.current;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#ffffff"
                sizeAttenuation={true}
                depthWrite={false}
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export const HeroParticleText = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const [particles, setParticles] = useState<Float32Array | null>(null);
    const [targetPositions, setTargetPositions] = useState<Float32Array[] | null>(null);
    const currentWordRef = useRef(0);
    const transitionRef = useRef(0);
    const lastSwitchRef = useRef(0);
    const mouseRef = useRef({ x: 0, y: 0 });
    const explosionsRef = useRef<{ x: number; y: number; time: number }[]>([]);
    const canvasContainerRef = useRef<HTMLElement | null>(null);

    const words = useMemo(() => ["THE", "WBBT"], []);

    // Mouse tracking with canvas-relative positioning
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Find the hero canvas container
            const heroContainer = document.querySelector('.hero-particle-container');
            if (!heroContainer) {
                mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
                mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
                return;
            }

            const rect = heroContainer.getBoundingClientRect();
            // Calculate mouse position relative to container
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            // Convert to normalized device coordinates (-1 to 1)
            mouseRef.current.x = (relX / rect.width) * 2 - 1;
            mouseRef.current.y = -(relY / rect.height) * 2 + 1;
        };

        const handleClick = (e: MouseEvent) => {
            const heroContainer = document.querySelector('.hero-particle-container');
            if (!heroContainer) return;

            const rect = heroContainer.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                // Add explosion at mouse position
                explosionsRef.current.push({
                    x: mouseRef.current.x * 8,
                    y: mouseRef.current.y * 4,
                    time: Date.now()
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(() => {
        const initParticles = async () => {
            await document.fonts.ready;

            const generatePointsForText = (text: string) => {
                const canvas = document.createElement('canvas');
                canvas.width = 1024;
                canvas.height = 512;
                const ctx = canvas.getContext('2d');
                if (!ctx) return new Float32Array(0);

                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = 'white';
                const fontSize = text.length > 3 ? 280 : 320;
                ctx.font = `900 ${fontSize}px "Outfit", sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(text, canvas.width / 2, canvas.height / 2);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                const points = [];

                const gap = 3;
                for (let y = 0; y < canvas.height; y += gap) {
                    for (let x = 0; x < canvas.width; x += gap) {
                        const index = (y * canvas.width + x) * 4;
                        if (data[index] > 100) {
                            const jitterX = (Math.random() - 0.5) * 0.02;
                            const jitterY = (Math.random() - 0.5) * 0.02;
                            const jitterZ = (Math.random() - 0.5) * 0.05;

                            const px = (x - canvas.width / 2) * 0.015 + jitterX;
                            const py = -(y - canvas.height / 2) * 0.015 + jitterY;
                            points.push(px, py, jitterZ);
                        }
                    }
                }
                return new Float32Array(points);
            };

            const allWordPoints = words.map(word => generatePointsForText(word));

            let maxLength = 0;
            allWordPoints.forEach(arr => {
                if (arr.length > maxLength) maxLength = arr.length;
            });

            const normalizedPoints = allWordPoints.map(arr => {
                if (arr.length === maxLength) return arr;
                const newArr = new Float32Array(maxLength);
                newArr.set(arr);
                for (let i = arr.length; i < maxLength; i++) {
                    newArr[i] = arr[i % arr.length];
                }
                return newArr;
            });

            setParticles(new Float32Array(maxLength));
            setTargetPositions(normalizedPoints);
        };

        initParticles();
    }, [words]);

    useFrame((state, delta) => {
        if (!pointsRef.current || !particles || !targetPositions) return;

        const time = state.clock.elapsedTime;

        // Switch words every 2.5 seconds
        if (time - lastSwitchRef.current > 2.5) {
            lastSwitchRef.current = time;
            currentWordRef.current = (currentWordRef.current + 1) % words.length;
            transitionRef.current = 0;
        }

        transitionRef.current = Math.min(transitionRef.current + delta * 1.5, 1);

        const currentPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const toPositions = targetPositions[currentWordRef.current];

        // Mouse position in 3D space (scaled)
        const mouseX3D = mouseRef.current.x * 8;
        const mouseY3D = mouseRef.current.y * 4;

        for (let i = 0; i < particles.length; i += 3) {
            const targetX = toPositions[i] || 0;
            const targetY = toPositions[i + 1] || 0;
            const targetZ = toPositions[i + 2] || 0;

            // Calculate distance from mouse
            const dx = currentPositions[i] - mouseX3D;
            const dy = currentPositions[i + 1] - mouseY3D;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Bullet/repulsion effect - particles push away from mouse
            const repulsionRadius = 2.5;
            let repelX = 0;
            let repelY = 0;
            let repelZ = 0;

            if (dist < repulsionRadius && dist > 0.01) {
                const force = (1 - dist / repulsionRadius) * 2.0; // Increased force
                repelX = (dx / dist) * force;
                repelY = (dy / dist) * force;
                repelZ = (Math.random() - 0.5) * force * 0.5;
            }

            // Explosion effect
            let explodeX = 0;
            let explodeY = 0;
            let explodeZ = 0;

            // Filter out old explosions
            explosionsRef.current = explosionsRef.current.filter(e => Date.now() - e.time < 1000);

            explosionsRef.current.forEach(explosion => {
                const exDx = currentPositions[i] - explosion.x;
                const exDy = currentPositions[i + 1] - explosion.y;
                const exDist = Math.sqrt(exDx * exDx + exDy * exDy);
                const explosionRadius = 4.0;

                if (exDist < explosionRadius && exDist > 0.01) {
                    const timeSinceExplosion = (Date.now() - explosion.time) / 1000; // 0 to 1
                    const shockwavePos = timeSinceExplosion * 3.0; // Shockwave expands
                    const waveWidth = 0.5;

                    // Shockwave ring effect
                    if (Math.abs(exDist - shockwavePos) < waveWidth) {
                        const intensity = (1 - timeSinceExplosion) * 5.0; // Fade out
                        explodeX += (exDx / exDist) * intensity;
                        explodeY += (exDy / exDist) * intensity;
                        explodeZ += (Math.random() - 0.5) * intensity;
                    }
                }
            });

            const noiseScale = 0.015;
            const noiseX = Math.sin(time * 0.5 + currentPositions[i + 1] * 2) * noiseScale;
            const noiseY = Math.cos(time * 0.3 + currentPositions[i] * 2) * noiseScale;

            const morphSpeed = 0.08;
            currentPositions[i] += (targetX + noiseX + repelX + explodeX - currentPositions[i]) * morphSpeed;
            currentPositions[i + 1] += (targetY + noiseY + repelY + explodeY - currentPositions[i + 1]) * morphSpeed;
            currentPositions[i + 2] += (targetZ + repelZ + explodeZ - currentPositions[i + 2]) * morphSpeed;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    if (!particles) return null;

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#a855f7"
                sizeAttenuation={true}
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};
