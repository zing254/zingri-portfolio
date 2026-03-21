export default function NotFound() {
  return (
    <div style={{ fontFamily: 'monospace', color: '#00d4ff', background: '#0a0a0f', padding: '20px', textAlign: 'center', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <h1 style={{ fontSize: '4em', marginBottom: '20px', textShadow: '0 0 20px #ff6b35' }}>404</h1>
        <p style={{ fontSize: '1.5em', color: '#a855f7' }}>ERROR: PAGE NOT FOUND</p>
        <p style={{ color: '#39ff14', marginTop: '20px' }}>Redirecting to main portal...</p>
      </div>
    </div>
  )
}