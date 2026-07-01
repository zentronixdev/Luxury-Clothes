import { a as __toESM } from "../_runtime.mjs";
import { f as ExtrudeGeometry, j as Shape, s as Color } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { a as useFrame, c as require_jsx_runtime, i as Canvas, l as require_react, n as Environment, o as useThree, r as Float, t as ContactShadows } from "../_libs/@react-three/drei+[...].mjs";
import { t as gsapWithCSS } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BlazerScene-BofDQoGh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLOR_STOPS = [
	{
		name: "Obsidian",
		hex: "#0a0a0a",
		sheen: "#1a1a1a",
		light: "#f5c976",
		vignette: .7
	},
	{
		name: "Navy",
		hex: "#0f1e3d",
		sheen: "#1a2f5a",
		light: "#7ea8ff",
		vignette: .55
	},
	{
		name: "Maroon",
		hex: "#3d0f18",
		sheen: "#5a1a26",
		light: "#ff8b6b",
		vignette: .6
	},
	{
		name: "Emerald",
		hex: "#0a3d2a",
		sheen: "#0e5c40",
		light: "#7cf0b0",
		vignette: .55
	},
	{
		name: "Ivory",
		hex: "#e8ddc7",
		sheen: "#f2ebd8",
		light: "#ffe8bf",
		vignette: .35
	}
];
function useIsMobile() {
	const [m, setM] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const check = () => setM(window.innerWidth < 768);
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);
	return m;
}
function useScrollProgress() {
	const [p, setP] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
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
function Blazer({ scrollY, activeColorIdx }) {
	const group = (0, import_react.useRef)(null);
	const bodyMat = (0, import_react.useRef)(null);
	const lapelMat = (0, import_react.useRef)(null);
	const tween = (0, import_react.useRef)({
		color: new Color(COLOR_STOPS[0].hex),
		sheen: new Color(COLOR_STOPS[0].sheen)
	});
	const torsoGeom = (0, import_react.useMemo)(() => {
		const s = new Shape();
		s.moveTo(-1.1, 1.4);
		s.lineTo(-1.25, .4);
		s.lineTo(-1.15, -1.6);
		s.lineTo(-.15, -1.7);
		s.lineTo(-.05, -.2);
		s.lineTo(-.55, 1.2);
		s.lineTo(0, 1.45);
		s.lineTo(.55, 1.2);
		s.lineTo(.05, -.2);
		s.lineTo(.15, -1.7);
		s.lineTo(1.15, -1.6);
		s.lineTo(1.25, .4);
		s.lineTo(1.1, 1.4);
		s.lineTo(.6, 1.55);
		s.lineTo(-.6, 1.55);
		s.closePath();
		const g = new ExtrudeGeometry(s, {
			depth: .5,
			bevelEnabled: true,
			bevelSegments: 4,
			bevelSize: .06,
			bevelThickness: .06,
			curveSegments: 12
		});
		g.center();
		g.computeVertexNormals();
		return g;
	}, []);
	const lapelGeom = (0, import_react.useMemo)(() => {
		const s = new Shape();
		s.moveTo(0, 0);
		s.lineTo(.55, 1.4);
		s.lineTo(.05, 1.55);
		s.lineTo(-.05, -.05);
		s.closePath();
		return new ExtrudeGeometry(s, {
			depth: .08,
			bevelEnabled: true,
			bevelSize: .02,
			bevelThickness: .02,
			bevelSegments: 3
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (activeColorIdx === null) return;
		const target = COLOR_STOPS[activeColorIdx];
		const tc = new Color(target.hex);
		const ts = new Color(target.sheen);
		gsapWithCSS.to(tween.current.color, {
			r: tc.r,
			g: tc.g,
			b: tc.b,
			duration: 1.2,
			ease: "power3.inOut"
		});
		gsapWithCSS.to(tween.current.sheen, {
			r: ts.r,
			g: ts.g,
			b: ts.b,
			duration: 1.2,
			ease: "power3.inOut"
		});
	}, [activeColorIdx]);
	useFrame((state, delta) => {
		if (!group.current) return;
		const p = scrollY.current;
		const targetRot = p * Math.PI * 2 + state.clock.elapsedTime * .15;
		group.current.rotation.y += (targetRot - group.current.rotation.y) * Math.min(1, delta * 4);
		group.current.rotation.x = Math.sin(state.clock.elapsedTime * .5) * .03;
		if (activeColorIdx === null) {
			const seg = p * (COLOR_STOPS.length - 1);
			const i = Math.floor(seg);
			const t = seg - i;
			const a = COLOR_STOPS[Math.min(i, COLOR_STOPS.length - 1)];
			const b = COLOR_STOPS[Math.min(i + 1, COLOR_STOPS.length - 1)];
			tween.current.color.copy(new Color(a.hex)).lerp(new Color(b.hex), t);
			tween.current.sheen.copy(new Color(a.sheen)).lerp(new Color(b.sheen), t);
		}
		if (bodyMat.current) {
			bodyMat.current.color.copy(tween.current.color);
			bodyMat.current.sheenColor.copy(tween.current.sheen);
		}
		if (lapelMat.current) lapelMat.current.color.copy(tween.current.color);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		position: [
			0,
			.1,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: torsoGeom,
				castShadow: true,
				receiveShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					ref: bodyMat,
					color: COLOR_STOPS[0].hex,
					roughness: .55,
					metalness: .05,
					sheen: 1,
					sheenRoughness: .35,
					sheenColor: COLOR_STOPS[0].sheen,
					clearcoat: .25,
					clearcoatRoughness: .6
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: lapelGeom,
				position: [
					.02,
					-.1,
					.28
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					ref: lapelMat,
					color: COLOR_STOPS[0].hex,
					roughness: .25,
					metalness: .1,
					clearcoat: .8,
					clearcoatRoughness: .2,
					sheen: 1,
					sheenColor: "#ffffff"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: lapelGeom,
				position: [
					-.02,
					-.1,
					.28
				],
				scale: [
					-1,
					1,
					1
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: COLOR_STOPS[0].hex,
					roughness: .25,
					metalness: .1,
					clearcoat: .8,
					clearcoatRoughness: .2,
					sheen: 1,
					sheenColor: "#ffffff"
				})
			}),
			[-1.35, 1.35].map((x, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					-.4,
					0
				],
				rotation: [
					0,
					0,
					x < 0 ? .12 : -.12
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.3,
					.28,
					2.4,
					20
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: COLOR_STOPS[0].hex,
					roughness: .55,
					sheen: 1,
					sheenColor: COLOR_STOPS[0].sheen,
					clearcoat: .2
				})]
			}, k)),
			[
				.2,
				-.2,
				-.6
			].map((y, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					y,
					.34
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.045,
					.045,
					.02,
					20
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#d4a944",
					metalness: 1,
					roughness: .25,
					emissive: "#3a2a10",
					emissiveIntensity: .3
				})]
			}, i))
		]
	});
}
function DynamicLights({ activeColorIdx }) {
	const key = (0, import_react.useRef)(null);
	const rim = (0, import_react.useRef)(null);
	const lightColor = (0, import_react.useRef)(new Color(COLOR_STOPS[0].light));
	(0, import_react.useEffect)(() => {
		if (!key.current) return;
		key.current.shadow.mapSize.set(1024, 1024);
		key.current.shadow.bias = -1e-4;
		key.current.shadow.normalBias = .02;
		key.current.shadow.radius = 2;
		key.current.shadow.camera.near = 1;
		key.current.shadow.camera.far = 30;
		key.current.shadow.camera.updateProjectionMatrix();
	}, []);
	(0, import_react.useEffect)(() => {
		if (activeColorIdx === null) return;
		const target = new Color(COLOR_STOPS[activeColorIdx].light);
		gsapWithCSS.to(lightColor.current, {
			r: target.r,
			g: target.g,
			b: target.b,
			duration: 1.2,
			ease: "power3.inOut"
		});
	}, [activeColorIdx]);
	useFrame(({ clock }) => {
		if (key.current) {
			key.current.intensity = 40 + Math.sin(clock.elapsedTime * 1.2) * 4;
			key.current.color.copy(lightColor.current);
		}
		if (rim.current) rim.current.color.copy(lightColor.current);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
			ref: key,
			position: [
				0,
				6,
				4
			],
			angle: .5,
			penumbra: .9,
			intensity: 40,
			color: "#f5c976",
			castShadow: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
			ref: rim,
			position: [
				-5,
				2,
				3
			],
			angle: .6,
			penumbra: 1,
			intensity: 8,
			color: "#f0b060"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
			position: [
				5,
				2,
				3
			],
			angle: .6,
			penumbra: 1,
			intensity: 8,
			color: "#c98a3a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .12 })
	] });
}
function Particles({ count }) {
	const points = (0, import_react.useRef)(null);
	const positions = (0, import_react.useMemo)(() => {
		const arr = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			arr[i * 3] = (Math.random() - .5) * 8;
			arr[i * 3 + 1] = Math.random() * 6 - 3;
			arr[i * 3 + 2] = (Math.random() - .5) * 4;
		}
		return arr;
	}, [count]);
	useFrame((_, delta) => {
		if (!points.current) return;
		const pos = points.current.geometry.attributes.position;
		for (let i = 0; i < count; i++) {
			const y = pos.getY(i) + delta * (.05 + i % 5 * .02);
			pos.setY(i, y > 3 ? -3 : y);
		}
		pos.needsUpdate = true;
		points.current.rotation.y += delta * .02;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("points", {
		ref: points,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferGeometry", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
			attach: "attributes-position",
			args: [positions, 3]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			size: .035,
			color: "#f5c976",
			transparent: true,
			opacity: .55,
			sizeAttenuation: true,
			depthWrite: false
		})]
	});
}
function CameraDolly({ scrollY }) {
	const { camera } = useThree();
	useFrame((_, delta) => {
		const p = scrollY.current;
		const targetZ = 6 - Math.min(p * 3, 2.8);
		const targetY = .3 - p * .4;
		camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 3);
		camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 3);
		camera.lookAt(0, 0, 0);
	});
	return null;
}
function BlazerScene({ activeColorIdx }) {
	const scrollY = (0, import_react.useRef)(0);
	const progress = useScrollProgress();
	scrollY.current = progress;
	const isMobile = useIsMobile();
	const active = activeColorIdx ?? null;
	const vignetteRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!vignetteRef.current) return;
		const v = COLOR_STOPS[active ?? Math.min(COLOR_STOPS.length - 1, Math.round(progress * (COLOR_STOPS.length - 1)))].vignette;
		gsapWithCSS.to(vignetteRef.current, {
			opacity: v,
			duration: 1,
			ease: "power2.out"
		});
	}, [active, progress]);
	const displayedIdx = active ?? Math.min(COLOR_STOPS.length - 1, Math.round(progress * (COLOR_STOPS.length - 1)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 -z-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
				shadows: !isMobile,
				camera: {
					position: [
						0,
						.3,
						6
					],
					fov: 32
				},
				dpr: isMobile ? [1, 1.25] : [1, 1.75],
				gl: {
					antialias: !isMobile,
					powerPreference: "high-performance"
				},
				performance: { min: .5 },
				frameloop: "always",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
						attach: "background",
						args: ["#050505"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
						attach: "fog",
						args: [
							"#050505",
							6,
							14
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicLights, { activeColorIdx: active }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Float, {
						speed: 1,
						rotationIntensity: .15,
						floatIntensity: .4,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blazer, {
							scrollY,
							activeColorIdx: active
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, { count: isMobile ? 30 : 90 }),
					!isMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
						position: [
							0,
							-1.9,
							0
						],
						opacity: .6,
						scale: 8,
						blur: 2.5,
						far: 4,
						color: "#000"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Environment, {
						preset: "studio",
						environmentIntensity: .35
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraDolly, { scrollY })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: vignetteRef,
				className: "pointer-events-none absolute inset-0 bg-vignette",
				style: { opacity: .6 }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.4em] text-muted-foreground",
					children: "Fabric"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 font-display text-2xl text-gold-gradient transition-all duration-500",
					children: COLOR_STOPS[displayedIdx].name
				})]
			})
		]
	});
}
//#endregion
export { BlazerScene };
