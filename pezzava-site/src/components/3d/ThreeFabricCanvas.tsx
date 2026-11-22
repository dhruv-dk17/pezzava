'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeFabricCanvasProps {
  className?: string;
}

export default function ThreeFabricCanvas({ className = '' }: ThreeFabricCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Responsive segments based on screen size
    const isMobile = width < 768;
    const segX = isMobile ? 28 : 56;
    const segY = isMobile ? 20 : 40;

    // Organic Woven Fabric Geometry (Plane)
    const geometry = new THREE.PlaneGeometry(12, 7.5, segX, segY);
    const count = geometry.attributes.position.count;
    
    // Store original vertices for harmonic displacement
    const originalPositions = new Float32Array(geometry.attributes.position.array);

    // Material: Tactile Jaipur woven cotton sheen
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf6f3ee),
      roughness: 0.72,
      metalness: 0.08,
      flatShading: false,
      side: THREE.DoubleSide,
      wireframe: false,
    });

    const fabricMesh = new THREE.Mesh(geometry, material);
    fabricMesh.rotation.x = -0.35;
    fabricMesh.position.y = -0.4;
    scene.add(fabricMesh);

    // Delicate Warm Lighting (Jaipur Golden Hour & Soft Daylight)
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    sunLight.position.set(5, 8, 4);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xccd8db, 0.8);
    fillLight.position.set(-6, -4, 3);
    scene.add(fillLight);

    // Mouse & Scroll reactive coordinates
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY;
      lastScrollY = currentScroll;
      scrollVelocity += Math.abs(delta) * 0.003;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Viewport Visibility Observer (pause when scrolled out of view)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Damped mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Damp scroll velocity
      scrollVelocity *= 0.92;

      // Subtle mesh rotation based on mouse
      fabricMesh.rotation.y = currentMouseX * 0.12;
      fabricMesh.rotation.x = -0.35 + currentMouseY * 0.08;

      // Vertex harmonic displacement (fluid breathing fabric waves)
      const positions = geometry.attributes.position;
      const posArray = positions.array as Float32Array;

      const waveSpeed = 0.85 + scrollVelocity * 4.0;
      const waveAmplitude = 0.45 + Math.min(scrollVelocity * 0.8, 0.4);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const u = originalPositions[i3];
        const v = originalPositions[i3 + 1];

        // Harmonic composite wave calculation
        const wave1 = Math.sin(u * 0.8 + time * waveSpeed) * Math.cos(v * 0.7 + time * 0.6);
        const wave2 = Math.sin(u * 1.6 - time * 0.5 + currentMouseX) * Math.sin(v * 1.4 + time * 0.4);
        const mouseRipple = Math.sin(Math.hypot(u - currentMouseX * 3, v - currentMouseY * 2) * 1.5 - time * 2) * 0.15;

        posArray[i3 + 2] = (wave1 * 0.7 + wave2 * 0.3 + mouseRipple) * waveAmplitude;
      }

      positions.needsUpdate = true;
      geometry.computeVertexNormals();

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
