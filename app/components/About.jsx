import React from "react";

export default function About() {
    return (
        <main className="bg-[oklch(0.627_0.194_149.214)] min-h-screen text-black p-8">
            {/* About Section */}
            <section className="max-w-6xl mx-auto">
                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
                    About Us
                </h1>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column (Image Placeholder) */}
                    <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center">
                        <p className="text-gray-500">[Your Image Here]</p>
                    </div>

                    {/* Right Column (Text) */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">
                            We Help You Manage Your Finances
                        </h2>
                        <p className="text-lg text-gray-700">
                            At WealthWise, we believe that managing your finances should be simple, intuitive, and stress-free. Our platform is designed to help you take control of your money, whether you're saving for a big purchase, investing for the future, or just trying to stay on top of your expenses.
                        </p>
                        <p className="text-lg text-gray-700">
                            With easy-to-use tools and expert guidance, we empower you to make smarter financial decisions and achieve your goals.
                        </p>
                    </div>
                </div>

              
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Team Member 1 */}
                        <div className="bg-gray-200 rounded-lg p-8 flex flex-col items-center justify-center">
                            <div className="bg-gray-300 w-32 h-32 rounded-full mb-4 flex items-center justify-center">
                                <p className="text-gray-500">[Image]</p>
                            </div>
                            <h3 className="text-xl font-bold">Heramb Bansod</h3>
                            <p className="text-gray-600">CEO & Founder</p>
                        </div>

                        {/* Team Member 2 */}
                        <div className="bg-gray-200 rounded-lg p-8 flex flex-col items-center justify-center">
                            <div className="bg-gray-300 w-32 h-32 rounded-full mb-4 flex items-center justify-center">
                                <p className="text-gray-500">[Image]</p>
                            </div>
                            <h3 className="text-xl font-bold">Rohan Mirge</h3>
                            <p className="text-gray-600">CFO</p>
                        </div>

                        {/* Team Member 3 */}
                        <div className="bg-gray-200 rounded-lg p-8 flex flex-col items-center justify-center">
                            <div className="bg-gray-300 w-32 h-32 rounded-full mb-4 flex items-center justify-center">
                                <p className="text-gray-500">[Image]</p>
                            </div>
                            <h3 className="text-xl font-bold">Avdhoot Jadhav</h3>
                            <p className="text-gray-600">CTO</p>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="mt-16 bg-[oklch(0.871_0.15_154.449)] rounded-lg p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-700">
                        Our mission is to make financial management accessible to everyone. We strive to provide tools and resources that help you achieve financial freedom and security.
                    </p>
                </div>
            </section>
        </main>
    );
}