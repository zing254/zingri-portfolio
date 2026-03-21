export default function Page() {
  return (
    <div style={{ fontFamily: 'monospace', color: '#00d4ff', background: '#0a0a0f', padding: '20px' }}>
      <h1 style={{ fontSize: '3em', textAlign: 'center', textShadow: '0 0 20px #00d4ff' }}>ZINGRI MASTER</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#a855f7' }}>
        Full-Stack Developer & Ethical Hacker
      </p>
      <p style={{ textAlign: 'center', color: '#39ff14', marginTop: '20px' }}>
        Nairobi, Kenya 🇰🇪
      </p>
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>
          Portfolio under construction - cyberpunk version coming soon!
        </p>
        <div style={{ marginTop: '30px', fontSize: '1.5em', color: '#00d4ff', animation: 'glow 2s infinite' }}>
          💻 BAZENGA SYSTEMS ACTIVE
        </div>
      </div>
      <style jsx>{`
        @keyframes glow {
          0% { text-shadow: 0 0 5px #00d4ff; }
          50% { text-shadow: 0 0 20px #00d4ff, 0 0 30px #00d4ff; }
          100% { text-shadow: 0 0 5px #00d4ff; }
        }
      `}</style>
    </div>
  )
}