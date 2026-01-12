import Footer from "@/components/marketing/Footer";
import Navbar from "@/components/marketing/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            We're Building the Future of Work
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TaskFlow was founded with a simple mission: make work more
            productive, collaborative, and enjoyable for teams everywhere.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              Founded in 2020, TaskFlow emerged from a simple observation: teams
              were spending more time managing their tools than doing actual
              work. We believed there had to be a better way.
            </p>
            <p>
              Our founders, a group of software engineers and product designers,
              set out to create a task management solution that would be
              powerful enough for enterprise teams yet simple enough for anyone
              to use from day one.
            </p>
            <p>
              Today, TaskFlow serves over 10,000 teams worldwide, from startups
              to Fortune 500 companies. Our platform has helped organizations
              complete over 500,000 tasks and save countless hours of
              productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Customer First
              </h3>
              <p className="text-gray-600">
                We build products that solve real problems for real people. Your
                success is our success.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We're constantly pushing boundaries and exploring new ways to
                improve productivity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Transparency
              </h3>
              <p className="text-gray-600">
                We believe in open communication, honest feedback, and building
                trust with our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the people driving our vision forward
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">AJ</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Alex Johnson
              </h3>
              <p className="text-sm text-gray-600 mb-2">CEO & Co-Founder</p>
              <p className="text-sm text-gray-500">
                Former VP of Engineering at TechCorp
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">SC</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Sarah Chen
              </h3>
              <p className="text-sm text-gray-600 mb-2">CTO & Co-Founder</p>
              <p className="text-sm text-gray-500">
                Lead Architect at CloudSystems
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">MP</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Michael Park
              </h3>
              <p className="text-sm text-gray-600 mb-2">Head of Product</p>
              <p className="text-sm text-gray-500">
                Former Product Lead at DesignHub
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">ER</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Emily Rodriguez
              </h3>
              <p className="text-sm text-gray-600 mb-2">Head of Operations</p>
              <p className="text-sm text-gray-500">MBA from Stanford GSB</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
