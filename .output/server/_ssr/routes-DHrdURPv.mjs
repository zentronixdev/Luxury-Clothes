import { a as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@react-three/drei+[...].mjs";
import { i as AnimatePresence, n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DHrdURPv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SmoothScroll() {
	(0, import_react.useEffect)(() => {
		const lenis = new Lenis({
			duration: 1.4,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			wheelMultiplier: 1
		});
		let rafId;
		function raf(time) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}
		rafId = requestAnimationFrame(raf);
		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	}, []);
	return null;
}
var blazer_obsidian_default = "/assets/blazer-obsidian-DqTUMhrq.jpg";
var blazer_navy_default = "/assets/blazer-navy-rA_BD6x0.jpg";
var blazer_maroon_default = "/assets/blazer-maroon-DjcvZvs3.jpg";
var blazer_emerald_default = "/assets/blazer-emerald-CK704YE_.jpg";
var blazer_ivory_default = "/assets/blazer-ivory-Nd32Hkro.jpg";
var BlazerScene = (0, import_react.lazy)(() => import("./BlazerScene-BofDQoGh.mjs").then((m) => ({ default: m.BlazerScene })));
var COLORS = [
	{
		name: "Obsidian",
		hex: "#0a0a0a",
		note: "For the timeless",
		price: 12999
	},
	{
		name: "Navy",
		hex: "#0f1e3d",
		note: "For the classic",
		price: 10999
	},
	{
		name: "Maroon",
		hex: "#3d0f18",
		note: "For the romantic",
		price: 14999
	},
	{
		name: "Emerald",
		hex: "#0a3d2a",
		note: "For the bold",
		price: 13999
	},
	{
		name: "Ivory",
		hex: "#e8ddc7",
		note: "For the eternal",
		price: 15999
	}
];
var COLOR_IDX = {
	Obsidian: 0,
	Navy: 1,
	Maroon: 2,
	Emerald: 3,
	Ivory: 4
};
var COLLECTION = [
	{
		name: "Kyoto Midnight",
		tag: "Sashiko embroidered wool",
		color: "Obsidian",
		price: 12999,
		image: blazer_obsidian_default
	},
	{
		name: "Monte Obsidian",
		tag: "Peak-lapel silk trim",
		color: "Obsidian",
		price: 13499,
		image: blazer_obsidian_default
	},
	{
		name: "Marina Navy",
		tag: "Italian wool double-breasted",
		color: "Navy",
		price: 10999,
		image: blazer_navy_default
	},
	{
		name: "Nizam Indigo",
		tag: "Sherwani-cut peaked lapel",
		color: "Navy",
		price: 11999,
		image: blazer_navy_default
	},
	{
		name: "Sevilla Bordeaux",
		tag: "Hand-loomed velvet",
		color: "Maroon",
		price: 14999,
		image: blazer_maroon_default
	},
	{
		name: "Rialto Merlot",
		tag: "Silk-wool blend",
		color: "Maroon",
		price: 15999,
		image: blazer_maroon_default
	},
	{
		name: "Havana Emerald",
		tag: "Jacquard weave",
		color: "Emerald",
		price: 13999,
		image: blazer_emerald_default
	},
	{
		name: "Kerala Palm",
		tag: "Embroidered silk",
		color: "Emerald",
		price: 14499,
		image: blazer_emerald_default
	},
	{
		name: "Firenze Ivory",
		tag: "Satin peaked lapels",
		color: "Ivory",
		price: 15999,
		image: blazer_ivory_default
	},
	{
		name: "Coromandel Cream",
		tag: "Cotton-silk tuxedo cut",
		color: "Ivory",
		price: 16999,
		image: blazer_ivory_default
	}
];
var REVIEWS = [
	{
		name: "Aarav & Ishita",
		city: "Chennai",
		text: "The maroon velvet stole the mandap. Impossibly bespoke fit — none of our guests believed it was rented."
	},
	{
		name: "Karthik & Priya",
		city: "Chennai",
		text: "White-glove service across Adyar. The ivory tuxedo made every photograph timeless."
	},
	{
		name: "Rohan & Meera",
		city: "Chennai",
		text: "Cinematic is the only word. The emerald jacquard against the mehendi sunset — pure magic."
	}
];
var inr = (n) => `₹${n.toLocaleString("en-IN")}`;
function Index() {
	const [activeColor, setActiveColor] = (0, import_react.useState)(null);
	const activeIdx = activeColor ? COLOR_IDX[activeColor] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmoothScroll, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 -z-10 bg-background" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlazerScene, { activeColorIdx: activeIdx })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorReveal, {
				activeColor,
				setActiveColor
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection, {
				activeColor,
				setActiveColor
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reviews, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Booking, { activeColor }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const on = () => setScrolled(window.scrollY > 40);
		on();
		window.addEventListener("scroll", on, { passive: true });
		return () => window.removeEventListener("scroll", on);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-background/60 border-b border-border" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "font-display text-xl tracking-widest",
					children: ["MAISON ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gold-gradient",
						children: "NOIR"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#collection",
							className: "hover:text-foreground transition-colors",
							children: "Collection"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#reviews",
							className: "hover:text-foreground transition-colors",
							children: "Reviews"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#booking",
							className: "hover:text-foreground transition-colors",
							children: "Book"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#booking",
					className: "rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-gold",
					children: "Reserve"
				})
			]
		})
	});
}
function Hero() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
	const opacity = useTransform(scrollYProgress, [0, .7], [1, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		ref,
		className: "relative flex min-h-screen items-center justify-center px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			style: {
				y,
				opacity
			},
			className: "relative z-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 text-[10px] uppercase tracking-[0.5em] text-muted-foreground",
					children: "✦ Est. 2018 · Available in Chennai ✦"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-6xl leading-[0.95] tracking-tight md:text-8xl lg:text-9xl",
					children: [
						"The blazer that",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-gold-gradient",
							children: "writes memory"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground",
					children: "Cinematic wedding blazers, hand-tailored by masters and delivered to your door across Chennai. Rent extraordinary — return the ordinary."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 flex flex-wrap items-center justify-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#booking",
						className: "rounded-full bg-primary px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-primary-foreground shadow-gold transition-transform hover:scale-105",
						children: "Reserve Your Blazer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#collection",
						className: "rounded-full border border-border px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-foreground transition-all hover:border-primary hover:text-primary",
						children: "Explore Collection"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			style: { opacity },
			className: "absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scroll to reveal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-px animate-pulse bg-gradient-to-b from-primary to-transparent" })]
		})]
	});
}
function ColorReveal({ activeColor, setActiveColor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative min-h-screen px-6 py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 40
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					amount: .4
				},
				transition: {
					duration: .9,
					ease: [
						.2,
						.8,
						.2,
						1
					]
				},
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 text-[10px] uppercase tracking-[0.5em] text-primary",
						children: "Five Signatures"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-5xl md:text-7xl",
						children: ["One silhouette. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-gold-gradient",
							children: "Five moods."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-6 max-w-lg text-muted-foreground",
						children: "Tap a colour to filter the collection — the blazer above shifts to match."
					}),
					activeColor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveColor(null),
						className: "mt-6 rounded-full border border-primary/40 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-primary hover:bg-primary/10",
						children: "Show all colours"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-20 grid grid-cols-2 gap-6 md:grid-cols-5",
				children: COLORS.map((c, i) => {
					const isActive = activeColor === c.name;
					const dim = activeColor && !isActive;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						onClick: () => setActiveColor(isActive ? null : c.name),
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .7,
							delay: i * .1
						},
						animate: {
							opacity: dim ? .35 : 1,
							scale: isActive ? 1.03 : 1
						},
						className: `group relative overflow-hidden rounded-2xl border p-6 text-left backdrop-blur-sm transition-all ${isActive ? "border-primary shadow-gold bg-primary/5" : "border-border bg-card/40 hover:border-primary/50"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-6 aspect-square w-full rounded-xl ring-1 ring-inset ring-white/10 transition-transform group-hover:scale-105",
								style: { background: `radial-gradient(circle at 30% 30%, ${c.hex}ee, ${c.hex} 60%, #000)` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
								children: c.note
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 font-display text-sm text-gold-gradient",
								children: ["from ", inr(c.price)]
							})
						]
					}, c.name);
				})
			})]
		})
	});
}
function Collection({ activeColor, setActiveColor }) {
	const filtered = (0, import_react.useMemo)(() => activeColor ? COLLECTION.filter((c) => c.color === activeColor) : COLLECTION, [activeColor]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "collection",
		className: "relative px-6 py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .8 },
				className: "flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 text-[10px] uppercase tracking-[0.5em] text-primary",
					children: activeColor ? `${activeColor} Selection` : "Featured Collection"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-5xl md:text-6xl",
					children: activeColor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"The ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-gold-gradient",
							children: activeColor
						}),
						" line"
					] }) : "Autumn / Winter Selects"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveColor(null),
						className: `rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-all ${!activeColor ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
						children: "All"
					}), COLORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveColor(c.name),
						className: `flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-all ${activeColor === c.name ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-2.5 w-2.5 rounded-full ring-1 ring-white/20",
							style: { background: c.hex }
						}), c.name]
					}, c.name))]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "popLayout",
					children: filtered.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						layout: true,
						initial: {
							opacity: 0,
							y: 30,
							scale: .96
						},
						animate: {
							opacity: 1,
							y: 0,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: .96
						},
						transition: {
							duration: .6,
							delay: i % 3 * .08
						},
						className: "group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-gold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[4/5] overflow-hidden bg-black",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: `${item.name} — ${item.color} wedding blazer`,
									loading: "lazy",
									width: 1024,
									height: 1280,
									className: "h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute right-4 top-4 flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-2 w-2 rounded-full",
										style: { background: COLORS.find((c) => c.name === item.color)?.hex }
									}), item.color]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground",
								children: item.tag
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
									children: "from"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-2xl text-gold-gradient",
									children: inr(item.price)
								})]
							})]
						})]
					}, item.name))
				})
			})]
		})
	});
}
function Reviews() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "reviews",
		className: "relative px-6 py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .8 },
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 text-[10px] uppercase tracking-[0.5em] text-primary",
					children: "In their words"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-5xl md:text-6xl",
					children: [
						"Worn on ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-gold-gradient",
							children: "unforgettable"
						}),
						" Chennai days"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 grid gap-6 md:grid-cols-3",
				children: REVIEWS.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.blockquote, {
					initial: {
						opacity: 0,
						y: 40
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						amount: .3
					},
					transition: {
						duration: .7,
						delay: i * .12
					},
					className: "relative rounded-2xl border border-border bg-card/40 p-8 backdrop-blur-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-6 font-display text-6xl leading-none text-gold-gradient",
							children: "\""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base italic leading-relaxed text-foreground/90",
							children: r.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "mt-8 border-t border-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
								children: r.city
							})]
						})
					]
				}, r.name))
			})]
		})
	});
}
var SIZES = [
	"XS",
	"S",
	"M",
	"L",
	"XL",
	"XXL"
];
var EVENT_TYPES = [
	"Wedding",
	"Reception",
	"Sangeet",
	"Engagement",
	"Cocktail"
];
function Booking({ activeColor }) {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [reference, setReference] = (0, import_react.useState)("");
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	const [size, setSize] = (0, import_react.useState)("M");
	const [color, setColor] = (0, import_react.useState)(activeColor ?? "Obsidian");
	(0, import_react.useEffect)(() => {
		if (activeColor) setColor(activeColor);
	}, [activeColor]);
	const onSubmit = async (e) => {
		e.preventDefault();
		setStatus("loading");
		setErrorMsg("");
		const fd = new FormData(e.currentTarget);
		const payload = {
			name: String(fd.get("name") || ""),
			email: String(fd.get("email") || ""),
			phone: String(fd.get("phone") || ""),
			eventDate: String(fd.get("eventDate") || ""),
			eventType: String(fd.get("eventType") || ""),
			city: String(fd.get("city") || "Chennai"),
			color,
			size,
			notes: String(fd.get("notes") || "")
		};
		try {
			const res = await fetch("/api/booking", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const data = await res.json();
			if (!res.ok || !data.ok) {
				setStatus("error");
				setErrorMsg(data.error || "Please check your details.");
				return;
			}
			setReference(data.reference);
			setStatus("done");
		} catch {
			setStatus("error");
			setErrorMsg("Network issue — try again in a moment.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "booking",
		className: "relative px-6 py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-4xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 40
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .9 },
				className: "rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-8 backdrop-blur-xl md:p-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 text-[10px] uppercase tracking-[0.5em] text-primary",
							children: "Reserve your fitting · Chennai"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-4xl md:text-6xl",
							children: [
								"Your ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-gold-gradient",
									children: "day"
								}),
								" deserves this."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-6 max-w-md text-muted-foreground",
							children: "Complimentary consultation with a house stylist. Hand-delivered anywhere in Chennai."
						})
					]
				}), status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 rounded-2xl border border-primary/40 bg-primary/10 p-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-3xl text-gold-gradient",
						children: "Received."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: [
							"Reference ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: reference
							}),
							" — a stylist will call within 24 hours."
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mx-auto mt-10 grid max-w-2xl gap-4 md:grid-cols-2",
					onSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "name",
							label: "Full name",
							type: "text",
							placeholder: "Arjun Rajan",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "email",
							label: "Email",
							type: "email",
							placeholder: "you@atelier.com",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "phone",
							label: "Phone",
							type: "tel",
							placeholder: "+91 98xxx xxxxx",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "eventDate",
							label: "Event date",
							type: "date",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
								children: "Event type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "eventType",
								required: true,
								defaultValue: "Wedding",
								className: fieldCls,
								children: EVENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "city",
							label: "City",
							type: "text",
							defaultValue: "Chennai",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
								children: "Colour"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: COLORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setColor(c.name),
									className: `flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-all ${color === c.name ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/60"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-3 w-3 rounded-full ring-1 ring-white/20",
										style: { background: c.hex }
									}), c.name]
								}, c.name))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
								children: "Size"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: SIZES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSize(s),
									className: `h-10 w-14 rounded-full border text-xs uppercase tracking-[0.2em] transition-all ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
									children: s
								}, s))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								name: "notes",
								label: "Event details / notes",
								type: "text",
								placeholder: "Venue, timings, inspiration, alterations…",
								textarea: true
							})
						}),
						status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs text-destructive md:col-span-2",
							children: errorMsg
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: status === "loading",
							className: "mt-4 rounded-full bg-primary py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground shadow-gold transition-transform hover:scale-[1.02] disabled:opacity-60 md:col-span-2",
							children: status === "loading" ? "Reserving…" : "Reserve My Blazer"
						})
					]
				})]
			})
		})
	});
}
var fieldCls = "w-full rounded-xl border border-border bg-background/40 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary focus:bg-background/80";
function Field({ label, type, placeholder, required, textarea, name, defaultValue }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
			children: label
		}), textarea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			name,
			rows: 3,
			placeholder,
			required,
			defaultValue,
			className: fieldCls
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			name,
			type,
			placeholder,
			required,
			defaultValue,
			className: fieldCls
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "relative border-t border-border px-6 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-display text-xl tracking-widest",
				children: ["MAISON ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gold-gradient",
					children: "NOIR"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: "© 2026 Maison Noir Atelier · Chennai. Woven with care."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "hover:text-primary",
						children: "Instagram"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "hover:text-primary",
						children: "Pinterest"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "hover:text-primary",
						children: "Journal"
					})
				]
			})]
		})
	});
}
//#endregion
export { Index as component };
