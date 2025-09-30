export default function Courses() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Courses</h1>
      <p className="text-center text-gray-600 mb-12">
        Explore our wide range of programming courses
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Courses Coming Soon</h3>
          <p className="text-gray-600">We are preparing amazing courses for you!</p>
        </div>
      </div>
    </div>
  )
}