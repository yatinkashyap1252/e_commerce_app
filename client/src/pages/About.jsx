import React from "react";

const About = () => {
  return (
    <div className="about-page-container p-5" id="about" >
      {/* Section Title */}
      <h1 className="text-4xl font-bold text-center my-5">About Us</h1>

      {/* Content Section */}
      <div className="about-content max-w-4xl mx-auto text-lg leading-relaxed text-gray-700">
        <p className="mb-4">
          Welcome to <span className="font-semibold">[Your Brand Name]</span>! We are passionate about delivering the best products and experiences to our customers. Our journey began with a simple mission: to provide exceptional service and high-quality offerings that cater to the needs of our community.
        </p>

        <p className="mb-4">
          At <span className="font-semibold">[Your Brand Name]</span>, we believe in innovation, quality, and customer satisfaction. Our team is dedicated to ensuring that every interaction you have with us is seamless, meaningful, and memorable.
        </p>

        <p className="mb-4">
          Whether it's through our carefully curated products, outstanding customer support, or community involvement, we strive to create a positive impact in every way possible. Your trust and loyalty are the foundation of our success, and we are committed to exceeding your expectations at every turn.
        </p>

        <p className="mb-4">
          Thank you for being a part of our journey. We look forward to continuing to serve you with excellence and building a lasting relationship.
        </p>

        <p className="text-center font-bold mt-6">Together, let's create something amazing!</p>
      </div>
    </div>
  );
};

export default About;
