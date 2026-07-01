import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export const COLOR_STOPS = [
  { name: "Obsidian", hex: "#0a0a0a", sheen: "#1a1a1a", light: "#f5c976", vignette: 0.7 },
  { name: "Navy", hex: "#0f1e3d", sheen: "#1a2f5a", light: "#7ea8ff", vignette: 0.55 },
  { name: "Maroon", hex: "#3d0f18", sheen: "#5a1a26", light: "#ff8b6b", vignette: 0.6 },
  { name: "Emerald", hex: "#0a3d2a", sheen: "#0e5c40", light: "#7cf0b0", vignette: 0.55 },
  { name: "Ivory", hex: "#e8ddc7", sheen: "#f2ebd8", light: "#ffe8bf", vignette: 0.35 },
] as const;

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return m;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function Blazer({
  scrollY,
  activeColorIdx,
}: {
  scrollY: React.MutableRefObject<number>;
  activeColorIdx: number | null;
}) {
  const group = useRef<THREE.Group>(null);
  const bodyMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const lapelMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const tween = useRef({ color: new THREE.Color(COLOR_STOPS[0].hex), sheen: new THREE.Color(COLOR_STOPS[0].sheen) });

  const torsoGeom = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.1, 1.4); s.lineTo(-1.25, 0.4); s.lineTo(-1.15, -1.6);
    s.lineTo(-0.15, -1.7); s.lineTo(-0.05, -0.2); s.lineTo(-0.55, 1.2);
    s.lineTo(0, 1.45); s.lineTo(0.55, 1.2); s.lineTo(0.05, -0.2);
    s.lineTo(0.15, -1.7); s.lineTo(1.15, -1.6); s.lineTo(1.25, 0.4);
    s.lineTo(1.1, 1.4); s.lineTo(0.6, 1.55); s.lineTo(-0.6, 1.55);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.5, bevelEnabled: true, bevelSegments: 4,
      bevelSize: 0.06, bevelThickness: 0.06, curveSegments: 12,
    });
    g.center(); g.computeVertexNormals();
    return g;
  }, []);

  const lapelGeom = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0); s.lineTo(0.55, 1.4); s.lineTo(0.05, 1.55); s.lineTo(-0.05, -0.05); s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 3 });
  }, []);

  // GSAP-driven color transitions when the active color changes (filter)
  useEffect(() => {
    if (activeColorIdx === null) return;
    const target = COLOR_STOPS[activeColorIdx];
    const tc = new THREE.Color(target.hex);
    const ts = new THREE.Color(target.sheen);
    gsap.to(tween.current.color, {
      r: tc.r, g: tc.g, b: tc.b, duration: 1.2, ease: "power3.inOut",
    });
    gsap.to(tween.current.sheen, {
      r: ts.r, g: ts.g, b: ts.b, duration: 1.2, ease: "power3.inOut",
    });
  }, [activeColorIdx]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = scrollY.current;
    const targetRot = p * Math.PI * 2 + state.clock.elapsedTime * 0.15;
    group.current.rotation.y += (targetRot - group.current.rotation.y) * Math.min(1, delta * 4);
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.03;

    // If no active filter: scroll-driven morph. Otherwise: GSAP tween owns color.
    if (activeColorIdx === null) {
      const seg = p * (COLOR_STOPS.length - 1);
      const i = Math.floor(seg);
      const t = seg - i;
      const a = COLOR_STOPS[Math.min(i, COLOR_STOPS.length - 1)];
      const b = COLOR_STOPS[Math.min(i + 1, COLOR_STOPS.length - 1)];
      tween.current.color.copy(new THREE.Color(a.hex)).lerp(new THREE.Color(b.hex), t);
      tween.current.sheen.copy(new THREE.Color(a.sheen)).lerp(new THREE.Color(b.sheen), t);
    }

    if (bodyMat.current) {
      bodyMat.current.color.copy(tween.current.color);
      bodyMat.current.sheenColor.copy(tween.current.sheen);
    }
    if (lapelMat.current) lapelMat.current.color.copy(tween.current.color);
  });

  return (
    <group ref={group} position={[0, 0.1, 0]}>
      <mesh geometry={torsoGeom} castShadow receiveShadow>
        <meshPhysicalMaterial
          ref={bodyMat} color={COLOR_STOPS[0].hex}
          roughness={0.55} metalness={0.05} sheen={1}
          sheenRoughness={0.35} sheenColor={COLOR_STOPS[0].sheen}
          clearcoat={0.25} clearcoatRoughness={0.6}
        />
      </mesh>
      <mesh geometry={lapelGeom} position={[0.02, -0.1, 0.28]}>
        <meshPhysicalMaterial ref={lapelMat} color={COLOR_STOPS[0].hex} roughness={0.25} metalness={0.1} clearcoat={0.8} clearcoatRoughness={0.2} sheen={1} sheenColor="#ffffff" />
      </mesh>
      <mesh geometry={lapelGeom} position={[-0.02, -0.1, 0.28]} scale={[-1, 1, 1]}>
        <meshPhysicalMaterial color={COLOR_STOPS[0].hex} roughness={0.25} metalness={0.1} clearcoat={0.8} clearcoatRoughness={0.2} sheen={1} sheenColor="#ffffff" />
      </mesh>
      {[-1.35, 1.35].map((x, k) => (
        <mesh key={k} position={[x, -0.4, 0]} rotation={[0, 0, x < 0 ? 0.12 : -0.12]} castShadow>
          <cylinderGeometry args={[0.3, 0.28, 2.4, 20]} />
          <meshPhysicalMaterial color={COLOR_STOPS[0].hex} roughness={0.55} sheen={1} sheenColor={COLOR_STOPS[0].sheen} clearcoat={0.2} />
        </mesh>
      ))}
      {[0.2, -0.2, -0.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0.34]}>
          <cylinderGeometry args={[0.045, 0.045, 0.02, 20]} />
          <meshStandardMaterial color="#d4a944" metalness={1} roughness={0.25} emissive="#3a2a10" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function DynamicLights({ activeColorIdx }: { activeColorIdx: number | null }) {
  const key = useRef<THREE.SpotLight>(null);
  const rim = useRef<THREE.SpotLight>(null);
  const lightColor = useRef(new THREE.Color(COLOR_STOPS[0].light));

  useEffect(() => {
    if (!key.current) return;
    key.current.shadow.mapSize.set(1024, 1024);
    key.current.shadow.bias = -0.0001;
    key.current.shadow.normalBias = 0.02;
    key.current.shadow.radius = 2;
    key.current.shadow.camera.near = 1;
    key.current.shadow.camera.far = 30;
    key.current.shadow.camera.updateProjectionMatrix();
  }, []);

  useEffect(() => {
    if (activeColorIdx === null) return;
    const target = new THREE.Color(COLOR_STOPS[activeColorIdx].light);
    gsap.to(lightColor.current, {
      r: target.r, g: target.g, b: target.b,
      duration: 1.2, ease: "power3.inOut",
    });
  }, [activeColorIdx]);

  useFrame(({ clock }) => {
    if (key.current) {
      key.current.intensity = 40 + Math.sin(clock.elapsedTime * 1.2) * 4;
      key.current.color.copy(lightColor.current);
    }
    if (rim.current) rim.current.color.copy(lightColor.current);
  });

  return (
    <>
      <spotLight ref={key} position={[0, 6, 4]} angle={0.5} penumbra={0.9} intensity={40} color="#f5c976" castShadow />
      <spotLight ref={rim} position={[-5, 2, 3]} angle={0.6} penumbra={1} intensity={8} color="#f0b060" />
      <spotLight position={[5, 2, 3]} angle={0.6} penumbra={1} intensity={8} color="#c98a3a" />
      <ambientLight intensity={0.12} />
    </>
  );
}

function Particles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = Math.random() * 6 - 3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i) + delta * (0.05 + (i % 5) * 0.02);
      pos.setY(i, y > 3 ? -3 : y);
    }
    pos.needsUpdate = true;
    points.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#f5c976" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function CameraDolly({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const p = scrollY.current;
    const targetZ = 6 - Math.min(p * 3, 2.8);
    const targetY = 0.3 - p * 0.4;
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 3);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 3);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function BlazerScene({ activeColorIdx }: { activeColorIdx?: number | null }) {
  const scrollY = useRef(0);
  const progress = useScrollProgress();
  scrollY.current = progress;
  const isMobile = useIsMobile();
  const active = activeColorIdx ?? null;
  const vignetteRef = useRef<HTMLDivElement>(null);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => setIsLowPower(window.innerWidth < 1024 || navigator.hardwareConcurrency <= 4 || mq.matches);
    check();
    mq.addEventListener?.("change", check);
    window.addEventListener("resize", check, { passive: true });
    return () => {
      mq.removeEventListener?.("change", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // GSAP vignette when active color changes
  useEffect(() => {
    if (!vignetteRef.current) return;
    const idx = active ?? Math.min(COLOR_STOPS.length - 1, Math.round(progress * (COLOR_STOPS.length - 1)));
    const v = COLOR_STOPS[idx].vignette;
    gsap.to(vignetteRef.current, { opacity: v, duration: 1.0, ease: "power2.out" });
  }, [active, progress]);

  const displayedIdx = active ?? Math.min(
    COLOR_STOPS.length - 1,
    Math.round(progress * (COLOR_STOPS.length - 1)),
  );

  if (isLowPower) {
    return <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(245,201,118,0.16),_transparent_55%),linear-gradient(135deg,_#050505_0%,_#0e1118_100%)]" />;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        shadows={!isMobile}
        camera={{ position: [0, 0.3, 6], fov: 32 }}
        dpr={isMobile ? [1, 1.1] : [1, 1.35]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: isMobile ? "default" : "high-performance" }}
        performance={{ min: 0.2 }}
        frameloop="always"
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 6, 14]} />
        <DynamicLights activeColorIdx={active} />
        <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
          <Blazer scrollY={scrollY} activeColorIdx={active} />
        </Float>
        <Particles count={isMobile ? 16 : 36} />
        {!isMobile && (
          <ContactShadows position={[0, -1.9, 0]} opacity={0.6} scale={8} blur={2.5} far={4} color="#000" />
        )}
        <Environment preset="studio" environmentIntensity={0.35} />
        <CameraDolly scrollY={scrollY} />
      </Canvas>

      <div ref={vignetteRef} className="pointer-events-none absolute inset-0 bg-vignette" style={{ opacity: 0.6 }} />

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Fabric</div>
        <div className="mt-1 font-display text-2xl text-gold-gradient transition-all duration-500">
          {COLOR_STOPS[displayedIdx].name}
        </div>
      </div>
    </div>
  );
}
