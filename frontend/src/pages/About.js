const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl text-pink-600 font-bold mb-4">
          About Zykacart
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Zykacart is a modern multi-vendor e-commerce platform where buyers and
          sellers interact seamlessly. It allows users to browse products, add
          them to the cart, place orders, and sellers can manage their products
          and dashboard efficiently.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-100 p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-pink-600 mb-2">Buyer Module</h3>
          <p className="text-sm text-gray-600">
            Browse products, add items to the cart, proceed to checkout, and
            track orders.
          </p>
        </div>

        <div className="bg-gray-100 p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-pink-600 mb-2">Seller Module</h3>
          <p className="text-sm text-gray-600">
            Manage products, view dashboard insights, and handle sales
            efficiently.
          </p>
        </div>

        <div className="bg-gray-100 p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-pink-600 mb-2">Admin Module</h3>
          <p className="text-sm text-gray-600">
            Manage categories, users, and control the overall platform.
          </p>
        </div>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl text-pink-600 font-bold mb-4">
          About Developers
        </h1>
        <p className="text-lg">
          Hi, we are{" "}
          <span className="font-semibold text-pink-900">
            Akashdeep Singh and Onkar Singh
          </span>
        </p>
        <p className="text-gray-600 mt-2">
          A passionate Full Stack Developers who built this project to learn and
          implement real-world e-commerce systems.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-pink-600 mb-3">
          Tech Stack
        </h2>
        <p className="text-gray-600">
          React • Tailwind CSS • Node.js • Express.js • MongoDB
        </p>
      </div>
    </div>
  );
};

export default About;
