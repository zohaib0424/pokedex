import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', gap: 16 }}>
      <h1>404 - Not Found</h1>
      <p>We could not find the page you are looking for.</p>
      <Link to="/">Go back</Link>
    </div>
  )
}


