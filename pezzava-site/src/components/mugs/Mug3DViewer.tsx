"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw, Sparkles, Layers, ShieldCheck, ShoppingBag } from "lucide-react";

export type MugTextureType = "sanganeri" | "bluepottery" | "mandala" | "goldrim" | "custom";

interface Mug3DViewerProps {
  initialTexture?: MugTextureType;
  showCustomizer?: boolean;
}

export default function Mug3DViewer({
  initialTexture = "sanganeri",
  showCustomizer = true,
}: Mug3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTexture, setActiveTexture] = useState<MugTextureType>(initialTexture);
  const [mugBaseColor, setMugBaseColor] = useState<string>("#FFFFFF");
  const [customText, setCustomText] = useState<string>("Pezzava Jaipur");
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const mugMeshRef = useRef<THREE.Group | null>(null);
  const ceramicMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const textureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureMapRef = useRef<THREE.CanvasTexture | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Function to procedurally draw luxury Jaipur artisanal patterns onto canvas texture
  const drawPatternToCanvas = (
    type: MugTextureType,
    baseColor: string,
    text: string
  ): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    // Background base
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (type === "sanganeri") {
      // Sanganeri Floral Blockprint in Indigo and Terracotta
      ctx.fillStyle = baseColor === "#FFFFFF" ? "#1A2E40" : "#EAE4D9";
      
      // Decorative borders
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.fillRect(x, 15, 20, 4);
        ctx.fillRect(x, canvas.height - 25, 20, 4);
      }

      // Floral blockprint motifs
      const rows = 4;
      const cols = 8;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = 70 + c * 120;
          const cy = 70 + r * 100;

          // Petals
          ctx.beginPath();
          ctx.arc(cx, cy, 14, 0, Math.PI * 2);
          ctx.fillStyle = (r + c) % 2 === 0 ? "#8D3828" : "#223E56"; // Terracotta & Indigo
          ctx.fill();

          // Center pistil
          ctx.beginPath();
          ctx.arc(cx, cy, 6, 0, Math.PI * 2);
          ctx.fillStyle = "#C9A84C"; // Gold
          ctx.fill();

          // Leaf spurs
          ctx.strokeStyle = "#5C631C";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(cx - 15, cy + 15);
          ctx.quadraticCurveTo(cx, cy + 28, cx + 15, cy + 15);
          ctx.stroke();
        }
      }
    } else if (type === "bluepottery") {
      // Persian Cobalt & Turquoise Floral Symmetry
      ctx.fillStyle = "#0A2540"; // Deep cobalt
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Turquoise geometric diamond lattice
      ctx.strokeStyle = "#00A896";
      ctx.lineWidth = 4;
      const step = 80;
      for (let x = 0; x < canvas.width; x += step) {
        for (let y = 0; y < canvas.height; y += step) {
          ctx.strokeRect(x + 10, y + 10, 60, 60);

          ctx.beginPath();
          ctx.arc(x + 40, y + 40, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#F5F2EB";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x + 40, y + 40, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#E76F51";
          ctx.fill();
        }
      }
    } else if (type === "mandala") {
      // Intricate Terracotta Sacred Mandala
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.strokeStyle = "#B3541E";
      ctx.lineWidth = 3;

      for (let radius = 30; radius <= 180; radius += 25) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        const petCount = radius / 5;
        for (let a = 0; a < Math.PI * 2; a += (Math.PI * 2) / petCount) {
          const px = cx + Math.cos(a) * radius;
          const py = cy + Math.sin(a) * radius;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#C9A84C";
          ctx.fill();
        }
      }
    } else if (type === "goldrim") {
      // Minimalist Luxury 24K Gold Line & Botanical Branch
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 24K Gold Top & Bottom Lustrous Rims
      ctx.fillStyle = "#DFB76C";
      ctx.fillRect(0, 0, canvas.width, 24);
      ctx.fillRect(0, canvas.height - 18, canvas.width, 18);

      // Delicate gold botanical sprig in center
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.strokeStyle = "#C9A84C";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx - 140, cy + 60);
      ctx.bezierCurveTo(cx - 50, cy - 80, cx + 50, cy + 80, cx + 140, cy - 60);
      ctx.stroke();

      for (let i = -100; i <= 100; i += 30) {
        ctx.beginPath();
        ctx.ellipse(cx + i, cy - i * 0.3, 16, 7, Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = "#DFB76C";
        ctx.fill();
      }
    } else if (type === "custom") {
      // Custom Studio Design
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Elegant framed badge
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.strokeStyle = "#5C631C";
      ctx.lineWidth = 3;
      ctx.strokeRect(cx - 180, cy - 100, 360, 200);
      ctx.strokeRect(cx - 170, cy - 90, 340, 180);

      // Sublimation studio insignia
      ctx.fillStyle = "#C9A84C";
      ctx.beginPath();
      ctx.arc(cx, cy - 40, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    // Centered Typography Brand Imprint
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 + 50;

    ctx.font = "bold 32px 'Noto Serif', serif";
    ctx.textAlign = "center";
    ctx.fillStyle = type === "bluepottery" ? "#FFFFFF" : baseColor === "#FFFFFF" ? "#1A1C1A" : "#FFFFFF";
    ctx.fillText(text.toUpperCase(), cx, cy);

    ctx.font = "14px 'Manrope', sans-serif";
    ctx.letterSpacing = "6px";
    ctx.fillStyle = "#C9A84C";
    ctx.fillText("PEZZAVA • ARTISANAL JAIPUR", cx, cy + 30);

    return canvas;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.2);
    camera.lookAt(0, 0, 0);

    // 3. Renderer Setup with antialiasing and tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ea, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdde8ff, 1.0);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    // 5. Build Mug Group
    const mugGroup = new THREE.Group();
    mugMeshRef.current = mugGroup;
    scene.add(mugGroup);

    // Initial procedural texture
    const initialCanvas = drawPatternToCanvas(activeTexture, mugBaseColor, customText);
    textureCanvasRef.current = initialCanvas;
    const texture = new THREE.CanvasTexture(initialCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    textureMapRef.current = texture;

    // Vitrified Glossy Ceramic Material
    const ceramicMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.15,
      metalness: 0.05,
      color: new THREE.Color(mugBaseColor),
    });
    ceramicMaterialRef.current = ceramicMat;

    // Pure White Inner Glaze Material
    const innerGlazeMat = new THREE.MeshStandardMaterial({
      color: 0xfdfdfd,
      roughness: 0.1,
      metalness: 0.02,
    });

    // Handle Material
    const handleMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(mugBaseColor),
      roughness: 0.18,
      metalness: 0.05,
    });

    // 5a. Mug Outer Body
    const mugHeight = 2.2;
    const outerRadius = 0.95;
    const innerRadius = 0.86;
    const bodySegments = 64;

    const outerGeo = new THREE.CylinderGeometry(outerRadius, outerRadius * 0.95, mugHeight, bodySegments, 1, true);
    const outerMesh = new THREE.Mesh(outerGeo, ceramicMat);
    mugGroup.add(outerMesh);

    // 5b. Mug Inner Hollow
    const innerGeo = new THREE.CylinderGeometry(innerRadius, innerRadius * 0.94, mugHeight - 0.1, bodySegments, 1, true);
    const innerMesh = new THREE.Mesh(innerGeo, innerGlazeMat);
    innerMesh.position.y = 0.05;
    mugGroup.add(innerMesh);

    // 5c. Mug Top Rounded Lip / Rim
    const rimGeo = new THREE.RingGeometry(innerRadius, outerRadius, bodySegments);
    rimGeo.rotateX(-Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeo, ceramicMat);
    rimMesh.position.y = mugHeight / 2;
    mugGroup.add(rimMesh);

    // 5d. Mug Base Bottom Cap
    const baseGeo = new THREE.CircleGeometry(outerRadius * 0.95, bodySegments);
    baseGeo.rotateX(Math.PI / 2);
    const baseMesh = new THREE.Mesh(baseGeo, innerGlazeMat);
    baseMesh.position.y = -mugHeight / 2;
    mugGroup.add(baseMesh);

    // 5e. Mug Ergonomic C-Handle
    const handleCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(outerRadius * 0.85, 0.65, 0),
      new THREE.Vector3(outerRadius * 1.9, 0.75, 0),
      new THREE.Vector3(outerRadius * 1.9, -0.75, 0),
      new THREE.Vector3(outerRadius * 0.82, -0.65, 0)
    );
    const handleGeo = new THREE.TubeGeometry(handleCurve, 40, 0.11, 16, false);
    const handleMesh = new THREE.Mesh(handleGeo, handleMat);
    mugGroup.add(handleMesh);

    // Gentle starting tilt
    mugGroup.rotation.x = 0.15;
    mugGroup.rotation.y = -0.6;

    // 6. Interaction Controls (Mouse & Touch Drag Rotation)
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !mugMeshRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      mugMeshRef.current.rotation.y += deltaX * 0.008;
      mugMeshRef.current.rotation.x = Math.max(
        -0.4,
        Math.min(0.4, mugMeshRef.current.rotation.x + deltaY * 0.005)
      );

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !mugMeshRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      mugMeshRef.current.rotation.y += deltaX * 0.008;
      mugMeshRef.current.rotation.x = Math.max(
        -0.4,
        Math.min(0.4, mugMeshRef.current.rotation.x + deltaY * 0.005)
      );

      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // 7. Render Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation when not dragging
      if (isRotating && !isDraggingRef.current && mugMeshRef.current) {
        mugMeshRef.current.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
    };
  }, []);

  // Update texture & color whenever user changes options
  useEffect(() => {
    if (!ceramicMaterialRef.current) return;

    const newCanvas = drawPatternToCanvas(activeTexture, mugBaseColor, customText);
    textureCanvasRef.current = newCanvas;

    if (textureMapRef.current) {
      textureMapRef.current.image = newCanvas;
      textureMapRef.current.needsUpdate = true;
    }

    ceramicMaterialRef.current.color = new THREE.Color(mugBaseColor);
    ceramicMaterialRef.current.needsUpdate = true;
  }, [activeTexture, mugBaseColor, customText]);

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#F5F2EB]/80 to-[#FAF8F5] border border-stone-200/80 shadow-xl overflow-hidden p-6 md:p-8">
      {/* Top Header / Mode Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 z-10 relative">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="font-manrope text-xs font-bold tracking-[0.25em] text-primary uppercase">
            Interactive 3D Ceramic Studio
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-3 py-1.5 rounded-full text-xs font-manrope font-semibold transition-all flex items-center gap-1.5 ${
              isRotating
                ? "bg-primary text-white shadow-sm"
                : "bg-stone-200 text-stone-700 hover:bg-stone-300"
            }`}
            title="Toggle 360 Auto-Rotation"
          >
            <RotateCcw size={12} className={isRotating ? "animate-spin" : ""} />
            {isRotating ? "Auto-Rotate: ON" : "Auto-Rotate: OFF"}
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[400px] md:h-[480px] cursor-grab active:cursor-grabbing relative flex items-center justify-center select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle Watermark Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none text-center">
          <span className="text-[11px] font-manrope font-semibold uppercase tracking-widest text-stone-400 bg-white/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm border border-stone-200">
            Drag 360° to inspect ceramic glaze & print finish
          </span>
        </div>
      </div>

      {/* Customizer Controls Bar */}
      {showCustomizer && (
        <div className="mt-6 pt-6 border-t border-stone-200/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Pattern Presets */}
          <div className="md:col-span-6 flex flex-col gap-2">
            <label className="text-xs font-manrope font-bold uppercase tracking-wider text-stone-600">
              Select Artisan Pattern
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[
                { id: "sanganeri", label: "Sanganeri" },
                { id: "bluepottery", label: "Blue Pottery" },
                { id: "mandala", label: "Mandala" },
                { id: "goldrim", label: "Gold Rim" },
                { id: "custom", label: "Custom Name" },
              ].map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => setActiveTexture(pattern.id as MugTextureType)}
                  className={`px-3 py-2 rounded-lg text-xs font-manrope font-bold transition-all text-center border ${
                    activeTexture === pattern.id
                      ? "bg-primary text-white border-primary shadow-md scale-102"
                      : "bg-white text-stone-700 border-stone-200 hover:border-primary/50"
                  }`}
                >
                  {pattern.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Switcher */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <label className="text-xs font-manrope font-bold uppercase tracking-wider text-stone-600">
              Ceramic Glaze Color
            </label>
            <div className="flex items-center gap-3">
              {[
                { color: "#FFFFFF", title: "Pearl White" },
                { color: "#F5ECE1", title: "Terracotta Cream" },
                { color: "#1D3557", title: "Royal Indigo" },
                { color: "#2B2D42", title: "Obsidian Charcoal" },
              ].map((swatch) => (
                <button
                  key={swatch.color}
                  onClick={() => setMugBaseColor(swatch.color)}
                  style={{ backgroundColor: swatch.color }}
                  title={swatch.title}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${
                    mugBaseColor === swatch.color ? "border-primary ring-2 ring-primary/30" : "border-stone-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Custom Text Inscription */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <label className="text-xs font-manrope font-bold uppercase tracking-wider text-stone-600">
              Personalized Inscription
            </label>
            <input
              type="text"
              value={customText}
              maxLength={24}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. Rahul, Jaipur Chai"
              className="w-full bg-white border border-stone-200 px-3 py-2 rounded-lg text-xs font-manrope font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
            />
          </div>
        </div>
      )}
    </div>
  );
}
