const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* About Zykacart */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl text-pink-600 font-bold mb-4">About Zykacart</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Zykacart is a modern multi-vendor e-commerce platform where buyers and sellers interact seamlessly.
          It allows users to browse products, add to cart, place orders, and sellers to manage their own products and dashboard.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-100 p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-pink-600 mb-2">Buyer Module</h3>
          <p className="text-sm text-gray-600">Browse products, add to cart, checkout, and track orders.</p>
        </div>

        <div className="bg-gray-100 p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-pink-600 mb-2">Seller Module</h3>
          <p className="text-sm text-gray-600">Manage products, dashboard, and sales efficiently.</p>
        </div>

        <div className="bg-gray-100 p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-pink-600 mb-2">Admin Module</h3>
          <p className="text-sm text-gray-600">Control categories, users, and overall platform.</p>
        </div>
      </div>

      {/* About Developer */}
      <div className="text-center mb-10">
        <h1 className="text-3xl text-pink-600 font-bold mb-4">About Developer</h1>
        <p className="text-lg">
          Hi, I'm <span className="font-semibold text-pink-900">Akashdeep Singh</span>
        </p>
        <p className="text-gray-600 mt-2">
          A passionate Full Stack Developer who built this project to learn and implement real-world e-commerce systems.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-pink-600 mb-3">Tech Stack</h2>
        <p className="text-gray-600">
          React • Tailwind CSS • Node.js • Express.js • MongoDB
        </p>
      </div>

    </div>
  );
};

export default About;