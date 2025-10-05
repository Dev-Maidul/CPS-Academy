import Link from "next/link";
import Slider from "./components/slider";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight animate-fade-in-up">
            Welcome to <span className="text-blue-600">CPS Academy</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            <strong className="font-semibold text-2xl md:text-3xl">
              Master Competitive Programming
            </strong>
            <br />
            From Beginner to Advanced - No Prerequisites Needed
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Link
              href="/courses"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Courses
            </Link>
            <Link
              href="/login"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Student Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16 tracking-tight animate-fade-in-up">
            Why Choose CPS Academy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                Expert Instructors
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from industry professionals with years of experience in competitive programming.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                Hands-on Projects
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Build real-world projects to enhance your portfolio and skills.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                Community Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Join our vibrant community of learners and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 mb-12 tracking-tight animate-fade-in-up">
          Meet Our <span className="text-blue-600">CPS Trainers</span>
        </h1>
        <Slider />
      </section>
    </div>
  );
}