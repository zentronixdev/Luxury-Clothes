import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

import obsidianImg from "@/assets/blazer-obsidian.jpg";
import navyImg from "@/assets/blazer-navy.jpg";
import maroonImg from "@/assets/blazer-maroon.jpg";
import emeraldImg from "@/assets/blazer-emerald.jpg";
import ivoryImg from "@/assets/blazer-ivory.jpg";

const BlazerScene = lazy(() =>
  import("@/components/ui/BlazerScene").then((m) => ({ default: m.BlazerScene })),
);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Maison Noir · Luxury Wedding Blazer Rental, Chennai" },
      { name: "description", content: "Rent hand-tailored wedding blazers in Chennai. Cinematic fittings, five signature colours, priced from ₹8,999." },
      { property: "og:title", content: "Maison Noir · Wedding Blazer Rental, Chennai" },
      { property: "og:description", content: "Luxury wedding blazers, rented and delivered across Chennai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type ColorKey = "Obsidian" | "Navy" | "Maroon" | "Emerald" | "Ivory";

const COLORS: {
  name: ColorKey;
  hex: string;
  note: string;
  price: number;
}[] = [
  { name: "Obsidian", hex: "#0a0a0a", note: "For the timeless", price: 12999 },
  { name: "Navy", hex: "#0f1e3d", note: "For the classic", price: 10999 },
  { name: "Maroon", hex: "#3d0f18", note: "For the romantic", price: 14999 },
  { name: "Emerald", hex: "#0a3d2a", note: "For the bold", price: 13999 },
  { name: "Ivory", hex: "#e8ddc7", note: "For the eternal", price: 15999 },
];
const COLOR_IDX: Record<ColorKey, number> = { Obsidian: 0, Navy: 1, Maroon: 2, Emerald: 3, Ivory: 4 };

const COLLECTION: {
  name: string; tag: string; color: ColorKey; price: number; image: string;
}[] = [
  { name: "Kyoto Midnight", tag: "Sashiko embroidered wool", color: "Obsidian", price: 12999, image: obsidianImg },
  { name: "Monte Obsidian", tag: "Peak-lapel silk trim", color: "Obsidian", price: 13499, image: obsidianImg },
  { name: "Marina Navy", tag: "Italian wool double-breasted", color: "Navy", price: 10999, image: navyImg },
  { name: "Nizam Indigo", tag: "Sherwani-cut peaked lapel", color: "Navy", price: 11999, image: navyImg },
  { name: "Sevilla Bordeaux", tag: "Hand-loomed velvet", color: "Maroon", price: 14999, image: maroonImg },
  { name: "Rialto Merlot", tag: "Silk-wool blend", color: "Maroon", price: 15999, image: maroonImg },
  { name: "Havana Emerald", tag: "Jacquard weave", color: "Emerald", price: 13999, image: emeraldImg },
  { name: "Kerala Palm", tag: "Embroidered silk", color: "Emerald", price: 14499, image: emeraldImg },
  { name: "Firenze Ivory", tag: "Satin peaked lapels", color: "Ivory", price: 15999, image: ivoryImg },
  { name: "Coromandel Cream", tag: "Cotton-silk tuxedo cut", color: "Ivory", price: 16999, image: ivoryImg },
];

const REVIEWS = [
  { name: "Aarav & Ishita", city: "Chennai", text: "The maroon velvet stole the mandap. Impossibly bespoke fit — none of our guests believed it was rented." },
  { name: "Karthik & Priya", city: "Chennai", text: "White-glove service across Adyar. The ivory tuxedo made every photograph timeless." },
  { name: "Rohan & Meera", city: "Chennai", text: "Cinematic is the only word. The emerald jacquard against the mehendi sunset — pure magic." },
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function Index() {
  const [activeColor, setActiveColor] = useState<ColorKey | null>(null);
  const activeIdx = activeColor ? COLOR_IDX[activeColor] : null;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-background" />}>
        <BlazerScene activeColorIdx={activeIdx} />
      </Suspense>

      <Nav />
      <Hero />
      <ColorReveal activeColor={activeColor} setActiveColor={setActiveColor} />
      <Collection activeColor={activeColor} setActiveColor={setActiveColor} />
      <Reviews />
      <Booking activeColor={activeColor} />
      <Footer />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-background/60 border-b border-border" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-display text-xl tracking-widest">
          MAISON <span className="text-gold-gradient">NOIR</span>
        </a>
        <nav className="hidden gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
          <a href="#collection" className="hover:text-foreground transition-colors">Collection</a>
          <a href="#reviews" className="hover:text-foreground transition-colors">Reviews</a>
          <a href="#booking" className="hover:text-foreground transition-colors">Book</a>
        </nav>
        <a href="#booking" className="rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-gold">
          Reserve
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-center justify-center px-6">
      <motion.div style={{ y, opacity }} className="relative z-10 text-center">
        <div className="mb-6 text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
          ✦ Est. 2018 · Available in Chennai ✦
        </div>
        <h1 className="font-display text-6xl leading-[0.95] tracking-tight md:text-8xl lg:text-9xl">
          The blazer that
          <br />
          <span className="italic text-gold-gradient">writes memory</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
          Cinematic wedding blazers, hand-tailored by masters and delivered to your door across Chennai.
          Rent extraordinary — return the ordinary.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#booking" className="rounded-full bg-primary px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-primary-foreground shadow-gold transition-transform hover:scale-105">
            Reserve Your Blazer
          </a>
          <a href="#collection" className="rounded-full border border-border px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-foreground transition-all hover:border-primary hover:text-primary">
            Explore Collection
          </a>
        </div>
      </motion.div>

      <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        <span>Scroll to reveal</span>
        <div className="h-10 w-px animate-pulse bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}

function ColorReveal({
  activeColor, setActiveColor,
}: { activeColor: ColorKey | null; setActiveColor: (c: ColorKey | null) => void }) {
  return (
    <section className="relative min-h-screen px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }} className="text-center">
          <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-primary">Five Signatures</div>
          <h2 className="font-display text-5xl md:text-7xl">
            One silhouette. <span className="italic text-gold-gradient">Five moods.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
            Tap a colour to filter the collection — the blazer above shifts to match.
          </p>
          {activeColor && (
            <button onClick={() => setActiveColor(null)} className="mt-6 rounded-full border border-primary/40 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-primary hover:bg-primary/10">
              Show all colours
            </button>
          )}
        </motion.div>

        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-5">
          {COLORS.map((c, i) => {
            const isActive = activeColor === c.name;
            const dim = activeColor && !isActive;
            return (
              <motion.button
                key={c.name}
                onClick={() => setActiveColor(isActive ? null : c.name)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                animate={{ opacity: dim ? 0.35 : 1, scale: isActive ? 1.03 : 1 }}
                className={`group relative overflow-hidden rounded-2xl border p-6 text-left backdrop-blur-sm transition-all ${
                  isActive ? "border-primary shadow-gold bg-primary/5" : "border-border bg-card/40 hover:border-primary/50"
                }`}
              >
                <div className="mb-6 aspect-square w-full rounded-xl ring-1 ring-inset ring-white/10 transition-transform group-hover:scale-105"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${c.hex}ee, ${c.hex} 60%, #000)` }} />
                <div className="font-display text-lg">{c.name}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{c.note}</div>
                <div className="mt-3 font-display text-sm text-gold-gradient">from {inr(c.price)}</div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Collection({
  activeColor, setActiveColor,
}: { activeColor: ColorKey | null; setActiveColor: (c: ColorKey | null) => void }) {
  const filtered = useMemo(
    () => (activeColor ? COLLECTION.filter((c) => c.color === activeColor) : COLLECTION),
    [activeColor],
  );

  return (
    <section id="collection" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <div className="mb-3 text-[10px] uppercase tracking-[0.5em] text-primary">
              {activeColor ? `${activeColor} Selection` : "Featured Collection"}
            </div>
            <h2 className="font-display text-5xl md:text-6xl">
              {activeColor ? <>The <span className="italic text-gold-gradient">{activeColor}</span> line</> : "Autumn / Winter Selects"}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveColor(null)}
              className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-all ${
                !activeColor ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >All</button>
            {COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => setActiveColor(c.name)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-all ${
                  activeColor === c.name ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full ring-1 ring-white/20" style={{ background: c.hex }} />
                {c.name}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.article
                key={item.name}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-gold"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={`${item.name} — ${item.color} wedding blazer`}
                    loading="lazy" width={1024} height={1280}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
                    <span className="h-2 w-2 rounded-full" style={{ background: COLORS.find((c) => c.name === item.color)?.hex }} />
                    {item.color}
                  </div>
                </div>
                <div className="flex items-end justify-between p-6">
                  <div>
                    <h3 className="font-display text-2xl">{item.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.tag}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">from</div>
                    <div className="font-display text-2xl text-gold-gradient">{inr(item.price)}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
          <div className="mb-3 text-[10px] uppercase tracking-[0.5em] text-primary">In their words</div>
          <h2 className="font-display text-5xl md:text-6xl">
            Worn on <span className="italic text-gold-gradient">unforgettable</span> Chennai days
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.blockquote key={r.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: i * 0.12 }} className="relative rounded-2xl border border-border bg-card/40 p-8 backdrop-blur-md">
              <div className="mb-6 font-display text-6xl leading-none text-gold-gradient">"</div>
              <p className="text-base italic leading-relaxed text-foreground/90">{r.text}</p>
              <footer className="mt-8 border-t border-border pt-4">
                <div className="font-display text-lg">{r.name}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{r.city}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const EVENT_TYPES = ["Wedding", "Reception", "Sangeet", "Engagement", "Cocktail"] as const;

function Booking({ activeColor }: { activeColor: ColorKey | null }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [reference, setReference] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");
  const [size, setSize] = useState<(typeof SIZES)[number]>("M");
  const [color, setColor] = useState<ColorKey>(activeColor ?? "Obsidian");

  useEffect(() => { if (activeColor) setColor(activeColor); }, [activeColor]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading"); setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      eventDate: String(fd.get("eventDate") || ""),
      eventType: String(fd.get("eventType") || ""),
      city: String(fd.get("city") || "Chennai"),
      color, size,
      notes: String(fd.get("notes") || ""),
    };
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) { setStatus("error"); setErrorMsg(data.error || "Please check your details."); return; }
      setReference(data.reference);
      setStatus("done");
    } catch {
      setStatus("error"); setErrorMsg("Network issue — try again in a moment.");
    }
  };

  return (
    <section id="booking" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/5 to-transparent p-8 backdrop-blur-xl md:p-14">
          <div className="text-center">
            <div className="mb-3 text-[10px] uppercase tracking-[0.5em] text-primary">Reserve your fitting · Chennai</div>
            <h2 className="font-display text-4xl md:text-6xl">
              Your <span className="italic text-gold-gradient">day</span> deserves this.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-muted-foreground">
              Complimentary consultation with a house stylist. Hand-delivered anywhere in Chennai.
            </p>
          </div>

          {status === "done" ? (
            <div className="mt-12 rounded-2xl border border-primary/40 bg-primary/10 p-10 text-center">
              <div className="font-display text-3xl text-gold-gradient">Received.</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Reference <span className="font-mono text-foreground">{reference}</span> — a stylist will call within 24 hours.
              </p>
            </div>
          ) : (
            <form className="mx-auto mt-10 grid max-w-2xl gap-4 md:grid-cols-2" onSubmit={onSubmit}>
              <Field name="name" label="Full name" type="text" placeholder="Arjun Rajan" required />
              <Field name="email" label="Email" type="email" placeholder="you@atelier.com" required />
              <Field name="phone" label="Phone" type="tel" placeholder="+91 98xxx xxxxx" required />
              <Field name="eventDate" label="Event date" type="date" required />

              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Event type</span>
                <select name="eventType" required defaultValue="Wedding" className={fieldCls}>
                  {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>

              <Field name="city" label="City" type="text" defaultValue="Chennai" required />

              <div className="md:col-span-2">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Colour</span>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button type="button" key={c.name} onClick={() => setColor(c.name)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-all ${
                        color === c.name ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/60"
                      }`}>
                      <span className="h-3 w-3 rounded-full ring-1 ring-white/20" style={{ background: c.hex }} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Size</span>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button type="button" key={s} onClick={() => setSize(s)}
                      className={`h-10 w-14 rounded-full border text-xs uppercase tracking-[0.2em] transition-all ${
                        size === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}>{s}</button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <Field name="notes" label="Event details / notes" type="text" placeholder="Venue, timings, inspiration, alterations…" textarea />
              </div>

              {status === "error" && (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs text-destructive md:col-span-2">
                  {errorMsg}
                </div>
              )}

              <button type="submit" disabled={status === "loading"}
                className="mt-4 rounded-full bg-primary py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground shadow-gold transition-transform hover:scale-[1.02] disabled:opacity-60 md:col-span-2">
                {status === "loading" ? "Reserving…" : "Reserve My Blazer"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

const fieldCls =
  "w-full rounded-xl border border-border bg-background/40 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary focus:bg-background/80";

function Field({
  label, type, placeholder, required, textarea, name, defaultValue,
}: {
  label: string; type?: string; placeholder?: string; required?: boolean;
  textarea?: boolean; name: string; defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea name={name} rows={3} placeholder={placeholder} required={required} defaultValue={defaultValue} className={fieldCls} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} required={required} defaultValue={defaultValue} className={fieldCls} />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <div className="font-display text-xl tracking-widest">
            MAISON <span className="text-gold-gradient">NOIR</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">© 2026 Maison Noir Atelier · Chennai. Woven with care.</p>
        </div>
        <div className="flex gap-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <a href="#" className="hover:text-primary">Instagram</a>
          <a href="#" className="hover:text-primary">Pinterest</a>
          <a href="#" className="hover:text-primary">Journal</a>
        </div>
      </div>
    </footer>
  );
}
