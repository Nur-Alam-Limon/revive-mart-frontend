import React from "react";

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Fast Shipping",
      description: "We offer quick and reliable delivery for all orders.",
      icon: "🚚",
    },
    {
      title: "Quality Products",
      description: "Only premium quality materials in our products.",
      icon: "🛍️",
    },
    {
      title: "Customer Support",
      description: "Round-the-clock support to assist you with any queries.",
      icon: "💬",
    },
  ];

  return (
    <section className="px-4 sm:px-8 lg:px-16 bg-gray-50 text-gray-800 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 sm:mb-12 text-gray-800">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="text-3xl sm:text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
