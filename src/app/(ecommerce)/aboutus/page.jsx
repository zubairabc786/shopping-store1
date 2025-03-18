import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen  flex flex-col items-center">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-6xl font-bold font-dancing_script text-center text-gray-800 mb-8">
          About Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Text Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
            <p className="mt-4 text-gray-600">
              We started our journey with a passion for delivering exceptional
              services and products to our customers. Over the years, our
              mission has evolved, but our values remain the same—quality,
              integrity, and innovation.
            </p>
            <p className="mt-4 text-gray-600">
              Our team is dedicated to making a positive impact in the industry,
              constantly pushing the boundaries and providing top-notch
              experiences for our clients.
            </p>
          </div>

          {/* Right Side: Image Section */}
          <div className="flex justify-center">
            <Image
              src="/test.jpg"
              alt="Our Team"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Quality</h3>
              <p className="mt-2 text-gray-600">
                We never compromise on quality, ensuring that every product
                meets the highest standards.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Integrity</h3>
              <p className="mt-2 text-gray-600">
                We believe in doing the right thing and being transparent in all
                our operations.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Innovation
              </h3>
              <p className="mt-2 text-gray-600">
                Constantly innovating to provide cutting-edge solutions that
                improve the lives of our customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
