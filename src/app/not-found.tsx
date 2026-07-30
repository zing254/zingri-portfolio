export default function NotFound() {
  return (
    <div className="min-h-screen bg-background p-5 flex items-center justify-center">
      <div className="text-center font-mono">
        <h1 className="text-6xl mb-5 text-primary" style={{ textShadow: '0 0 20px #ff6b35' }}>404</h1>
        <p className="text-2xl text-secondary">ERROR: PAGE NOT FOUND</p>
        <p className="text-accent mt-5">Redirecting to main portal...</p>
      </div>
    </div>
  )
}