// ── SechPoint DPI Panel — Framer Code Component ──
// 1. Assets → Code → + New Code File → name it DpiPanel.tsx
// 2. Select All (Cmd+A), delete, paste this entire file
// 3. Save → drag onto canvas

import { useEffect, useRef, useState, CSSProperties } from "react"

export default function DpiPanel({ style }: { style?: CSSProperties }) {
    const [packets, setPackets] = useState(184273918)
    const [throughput, setThroughput] = useState(412.0)
    const [threats, setThreats] = useState(2841)
    const [spark, setSpark] = useState(() =>
        Array.from({ length: 14 }, () => 20 + Math.random() * 80)
    )
    const lanesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const t1 = setInterval(
            () => setPackets((p) => p + Math.floor(40000 + Math.random() * 90000)),
            120
        )
        const t2 = setInterval(
            () =>
                setThroughput((v) =>
                    Math.max(360, Math.min(486, v + (Math.random() - 0.48) * 14))
                ),
            700
        )
        const t3 = setInterval(
            () => setThreats((v) => v + (Math.random() > 0.6 ? 1 : 0)),
            900
        )
        const t4 = setInterval(
            () => setSpark((b) => [...b.slice(1), 20 + Math.random() * 80]),
            700
        )
        return () => [t1, t2, t3, t4].forEach(clearInterval)
    }, [])

    // Packet flow animation
    useEffect(() => {
        const wrap = lanesRef.current
        if (!wrap) return
        const lanes = [...wrap.querySelectorAll<HTMLElement>(".sp-lane")]
        const colors = ["#06c8c8", "#3b82f6", "#6e56f7", "#06c8c8", "#ff5c7a"]
        function spawn() {
            const lane = lanes[Math.floor(Math.random() * lanes.length)]
            const color = colors[Math.floor(Math.random() * colors.length)]
            const pk = document.createElement("span")
            pk.style.cssText = `
                position:absolute;top:50%;transform:translateY(-50%);
                height:14px;border-radius:4px;z-index:2;
                box-shadow:0 0 12px ${color};
                width:${14 + Math.random() * 26}px;
                background:${color};left:6%;
            `
            lane.appendChild(pk)
            const dur = 2200 + Math.random() * 1400
            const anim = pk.animate(
                [
                    { left: "4%", opacity: 0, offset: 0 },
                    { opacity: 1, offset: 0.08 },
                    { transform: "translateY(-50%) scaleY(1.5)", offset: 0.5 },
                    { transform: "translateY(-50%) scaleY(1)", offset: 0.54 },
                    { opacity: 1, offset: 0.9 },
                    { left: "94%", opacity: 0, offset: 1 },
                ],
                { duration: dur, easing: "linear" }
            )
            anim.onfinish = () => pk.remove()
        }
        const t = setInterval(spawn, 360)
        for (let i = 0; i < 5; i++) setTimeout(spawn, i * 200)
        return () => clearInterval(t)
    }, [])

    const lanes = [
        { tag: "HTTPS", port: ":443" },
        { tag: "QUIC", port: ":443" },
        { tag: "RTP · VoIP", port: ":5004" },
        { tag: "DNS", port: ":53" },
        { tag: "TLS 1.3", port: ":8443" },
    ]

    const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

    return (
        <>
            {/* Google Font */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap"
            />
            <style>{`
                @keyframes sp-blink { 0%,100%{opacity:1} 50%{opacity:.25} }
                @keyframes sp-floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
            `}</style>

            <div
                style={{
                    ...style,
                    ...mono,
                    background: "linear-gradient(160deg,rgba(20,32,62,.95),rgba(9,15,30,.95))",
                    border: "1px solid rgba(255,255,255,.09)",
                    borderRadius: 24,
                    padding: 20,
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                {/* ── Header ── */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        paddingBottom: 16,
                        borderBottom: "1px solid rgba(255,255,255,.05)",
                    }}
                >
                    <span
                        style={{
                            width: 9,
                            height: 9,
                            borderRadius: "50%",
                            background: "#2bd17e",
                            boxShadow: "0 0 9px #2bd17e",
                            display: "inline-block",
                            flexShrink: 0,
                        }}
                    />
                    <span style={{ fontSize: 12.5, color: "#eef3ff", letterSpacing: ".04em" }}>
                        SechPoint DPI Engine ·{" "}
                        <strong style={{ color: "#06c8c8", fontWeight: 600 }}>aig-core-01</strong>
                    </span>
                    <span
                        style={{
                            marginLeft: "auto",
                            fontSize: 11,
                            color: "#66769b",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <span
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: "#06c8c8",
                                display: "inline-block",
                                animation: "sp-blink 1.4s infinite",
                            }}
                        />
                        LIVE
                    </span>
                </div>

                {/* ── Lanes ── */}
                <div ref={lanesRef} style={{ position: "relative", padding: "18px 0 6px", flex: 1 }}>
                    {/* DPI line */}
                    <div
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: 0,
                            bottom: 6,
                            width: 2,
                            transform: "translateX(-50%)",
                            zIndex: 1,
                            background: "linear-gradient(#06c8c8,#0055ff)",
                            boxShadow: "0 0 16px rgba(6,200,200,.5)",
                        }}
                    >
                        <span
                            style={{
                                position: "absolute",
                                top: -9,
                                left: "50%",
                                transform: "translateX(-50%)",
                                fontSize: 9,
                                fontWeight: 600,
                                letterSpacing: ".1em",
                                color: "#060912",
                                background: "#06c8c8",
                                padding: "2px 5px",
                                borderRadius: 5,
                                whiteSpace: "nowrap",
                            }}
                        >
                            DPI
                        </span>
                    </div>

                    {lanes.map((l) => (
                        <div
                            key={l.tag}
                            className="sp-lane"
                            style={{
                                position: "relative",
                                height: 34,
                                margin: "9px 0",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <span
                                style={{
                                    position: "relative",
                                    zIndex: 3,
                                    fontSize: 10.5,
                                    color: "#9fb0d4",
                                    background: "rgba(15,26,48,.8)",
                                    padding: "3px 8px",
                                    borderRadius: 6,
                                    border: "1px solid rgba(255,255,255,.08)",
                                }}
                            >
                                {l.tag}
                            </span>
                            <span
                                style={{
                                    position: "relative",
                                    zIndex: 3,
                                    marginLeft: "auto",
                                    fontSize: 10.5,
                                    color: "#66769b",
                                }}
                            >
                                {l.port}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ── Footer stats ── */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 10,
                        marginTop: 16,
                    }}
                >
                    {/* Throughput */}
                    <div
                        style={{
                            background: "rgba(255,255,255,.03)",
                            border: "1px solid rgba(255,255,255,.05)",
                            borderRadius: 12,
                            padding: "12px 13px",
                        }}
                    >
                        <div style={{ fontSize: 10.5, color: "#66769b", letterSpacing: ".04em" }}>
                            THROUGHPUT
                        </div>
                        <div
                            style={{
                                fontSize: 19,
                                fontWeight: 600,
                                color: "#06c8c8",
                                marginTop: 5,
                            }}
                        >
                            {throughput.toFixed(1)}{" "}
                            <span style={{ fontSize: 12, color: "#66769b" }}>Gbps</span>
                        </div>
                    </div>

                    {/* Packets */}
                    <div
                        style={{
                            background: "rgba(255,255,255,.03)",
                            border: "1px solid rgba(255,255,255,.05)",
                            borderRadius: 12,
                            padding: "12px 13px",
                        }}
                    >
                        <div style={{ fontSize: 10.5, color: "#66769b", letterSpacing: ".04em" }}>
                            PACKETS INSPECTED
                        </div>
                        <div style={{ fontSize: 19, fontWeight: 600, color: "#fff", marginTop: 5 }}>
                            {packets.toLocaleString()}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-end",
                                gap: 2,
                                height: 22,
                                marginTop: 7,
                            }}
                        >
                            {spark.map((h, i) => (
                                <span
                                    key={i}
                                    style={{
                                        flex: 1,
                                        height: h + "%",
                                        background:
                                            "linear-gradient(#06c8c8,rgba(6,200,200,.2))",
                                        borderRadius: 1,
                                        display: "block",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Threats */}
                    <div
                        style={{
                            background: "rgba(255,255,255,.03)",
                            border: "1px solid rgba(255,255,255,.05)",
                            borderRadius: 12,
                            padding: "12px 13px",
                        }}
                    >
                        <div style={{ fontSize: 10.5, color: "#66769b", letterSpacing: ".04em" }}>
                            THREATS BLOCKED
                        </div>
                        <div style={{ fontSize: 19, fontWeight: 600, color: "#ff5c7a", marginTop: 5 }}>
                            {threats.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
