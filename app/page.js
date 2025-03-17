import React from "react";

export default function Home() {
  return (
    <main className="bg-[oklch(0.627_0.194_149.214)] h-screen text-black p-4">
      <section className="h-screen w-full flex justify-center items-center p-4">

        <div className="text-lg flex flex-col justify-center items-center w-[90%] md:w-[70%] lg:w-[60%] h-[50vh] bg-[oklch(0.871_0.15_154.449)] rounded-lg p-6">

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 md:mb-8 text-center">
            We Manage Your Finance
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-6 text-center">
            Our platform helps you take control of your finances with easy-to-use tools and expert guidance. Whether you're saving, investing, or planning for the future, we've got you covered.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            <button className="bg-[oklch(0.627_0.194_149.214)] text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold transition-colors w-full md:w-auto">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-[oklch(0.627_0.194_149.214)] text-black px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold hover:bg-[oklch(0.627_0.194_149.214)] hover:text-white transition-colors w-full md:w-auto">
              Know More
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}