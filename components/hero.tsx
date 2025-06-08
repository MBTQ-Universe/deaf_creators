export function Hero() {
  return (
    <section className="bg-black text-white py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Own Your Hands. <br />
          <span className="text-purple-500">Shape the D.</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400">
          DeafCreator is the all-in-one platform for Deaf creators to manage, grow, and monetize their digital
          presence—with the power of AI, automation, and community at your fingertips.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a
            href="/signup"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Get Started
          </a>
          <a
            href="/demo"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  )
}
