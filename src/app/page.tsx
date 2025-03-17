import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-900">
      <nav className="bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-white text-xl font-bold">Finance Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-white hover:text-purple-200 px-4 py-2 rounded-full text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Welcome to Finance Manager
          </h2>
          <p className="text-purple-100 text-lg mb-12 max-w-2xl mx-auto">
            Track your expenses, manage your budget, and take control of your financial life 
            with our easy-to-use finance management tools.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/register" 
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="/login" 
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
