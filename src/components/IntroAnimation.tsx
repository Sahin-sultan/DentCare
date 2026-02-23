import { useEffect, useState } from "react";

const LOGO_URL =
    "https://res.cloudinary.com/ddzreu2to/image/upload/v1771823094/20260223_1030_Image_Generation_remix_01kj4dv76pecnatb5rd0zng7xa_omzpcf.png";

export default function IntroAnimation({ onDone }: { onDone: () => void }) {
    const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress bar 0 → 100 over 1800ms
        const start = performance.now();
        const duration = 1800;
        let raf: number;

        const tick = (now: number) => {
            const elapsed = now - start;
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);
            if (pct < 100) {
                raf = requestAnimationFrame(tick);
            }
        };
        raf = requestAnimationFrame(tick);

        // Phase timeline
        const t1 = setTimeout(() => setPhase("hold"), 400);   // logo settles
        const t2 = setTimeout(() => setPhase("exit"), 2000);  // start exit
        const t3 = setTimeout(() => onDone(), 2700);           // unmount

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onDone]);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
                transition: phase === "exit" ? "opacity 0.7s ease, transform 0.7s ease" : undefined,
                opacity: phase === "exit" ? 0 : 1,
                transform: phase === "exit" ? "scale(1.04)" : "scale(1)",
                pointerEvents: "none",
            }}
        >
            {/* Radial glow behind logo */}
            <div
                style={{
                    position: "absolute",
                    width: 420,
                    height: 420,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)",
                    transition: "opacity 0.6s ease",
                    opacity: phase === "enter" ? 0 : 1,
                    filter: "blur(20px)",
                }}
            />

            {/* Orbiting ring */}
            <div
                style={{
                    position: "absolute",
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(147,197,253,0.25)",
                    animation: "intro-orbit 3s linear infinite",
                    opacity: phase === "enter" ? 0 : 0.8,
                    transition: "opacity 0.8s ease 0.2s",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: 290,
                    height: 290,
                    borderRadius: "50%",
                    border: "1px solid rgba(147,197,253,0.12)",
                    animation: "intro-orbit 5s linear infinite reverse",
                    opacity: phase === "enter" ? 0 : 0.6,
                    transition: "opacity 0.8s ease 0.4s",
                }}
            />

            {/* Logo */}
            <img
                src={LOGO_URL}
                alt="DentCare"
                style={{
                    width: 180,
                    height: 180,
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 40px rgba(59,130,246,0.85)) drop-shadow(0 0 80px rgba(59,130,246,0.4))",
                    transform: phase === "enter" ? "scale(0.4) translateY(20px)" : "scale(1) translateY(0)",
                    opacity: phase === "enter" ? 0 : 1,
                    transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease",
                    position: "relative",
                    zIndex: 1,
                }}
            />

            {/* Brand name */}
            <div
                style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 1,
                    opacity: phase === "enter" ? 0 : 1,
                    transform: phase === "enter" ? "translateY(10px)" : "translateY(0)",
                    transition: "opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s",
                }}
            >
                <span
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 48,
                        fontWeight: 700,
                        color: "#f1f5f9",
                        letterSpacing: "-0.5px",
                    }}
                >
                    Dent
                </span>
                <span
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 48,
                        fontWeight: 700,
                        color: "#60a5fa",
                        letterSpacing: "-0.5px",
                    }}
                >
                    Care
                </span>
            </div>

            {/* Tagline */}
            <p
                style={{
                    marginTop: 8,
                    fontSize: 13,
                    color: "rgba(148,163,184,0.85)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                    opacity: phase === "enter" ? 0 : 1,
                    transition: "opacity 0.5s ease 0.45s",
                }}
            >
                Your Smile Deserves Expert Care
            </p>

            {/* Progress bar */}
            <div
                style={{
                    marginTop: 40,
                    width: 160,
                    height: 3,
                    borderRadius: 99,
                    background: "rgba(255,255,255,0.1)",
                    overflow: "hidden",
                    opacity: phase === "enter" ? 0 : 1,
                    transition: "opacity 0.4s ease 0.3s",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: `${progress}%`,
                        borderRadius: 99,
                        background: "linear-gradient(90deg, #60a5fa, #93c5fd)",
                        boxShadow: "0 0 10px rgba(96,165,250,0.8)",
                        transition: "width 0.1s linear",
                    }}
                />
            </div>

            {/* Percentage */}
            <span
                style={{
                    marginTop: 10,
                    fontSize: 11,
                    color: "rgba(148,163,184,0.6)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    opacity: phase === "enter" ? 0 : 1,
                    transition: "opacity 0.4s ease 0.3s",
                }}
            >
                {Math.round(progress)}%
            </span>

            {/* Keyframes injected once */}
            <style>{`
        @keyframes intro-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
