import { Link } from 'react-router-dom'

export function Error404() {
  return (
    <div className="grid place-items-center min-h-screen gap-4 sm:gap-6 px-4 sm:px-6 bg-gradient-to-br from-red-50 to-red-100">
      <div className="text-center space-y-4 sm:space-y-6 max-w-md">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
          We could not find the page you are looking for.
        </p>
        <Link 
          to="/" 
          className="inline-block mt-4 sm:mt-6 px-6 sm:px-8 py-3 sm:py-4 bg-red-500 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-red-600 transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}


