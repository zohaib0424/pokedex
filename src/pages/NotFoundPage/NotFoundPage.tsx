import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="grid place-items-center min-h-screen gap-4">
      <h1>404 - Not Found</h1>
      <p>We could not find the page you are looking for.</p>
      <Link to="/">Go back</Link>
    </div>
  )
}


