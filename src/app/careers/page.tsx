"use client";

import Footer from "@/components/marketing/Footer";
import Navbar from "@/components/marketing/Navbar";
import { useMemo, useState } from "react";

interface Job {
  id: number;
  title: string;
  department: string;
  city: string;
  type: string;
  description: string;
}

const jobsData: Job[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    city: "San Francisco",
    type: "Full-time",
    description:
      "Build scalable systems and lead technical initiatives in our core platform team.",
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    city: "New York",
    type: "Full-time",
    description:
      "Create beautiful, intuitive experiences for millions of users worldwide.",
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    city: "San Francisco",
    type: "Full-time",
    description:
      "Drive product strategy and execution for our flagship task management platform.",
  },
  {
    id: 4,
    title: "Frontend Engineer",
    department: "Engineering",
    city: "Remote",
    type: "Full-time",
    description:
      "Build responsive, performant web applications using React and TypeScript.",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Engineering",
    city: "Austin",
    type: "Full-time",
    description:
      "Maintain and scale our cloud infrastructure to support millions of users.",
  },
  {
    id: 6,
    title: "Customer Success Manager",
    department: "Customer Success",
    city: "Boston",
    type: "Full-time",
    description:
      "Help our enterprise customers succeed and grow with TaskFlow.",
  },
  {
    id: 7,
    title: "Marketing Manager",
    department: "Marketing",
    city: "New York",
    type: "Full-time",
    description:
      "Lead demand generation and brand strategy to grow our market presence.",
  },
  {
    id: 8,
    title: "Data Scientist",
    department: "Data",
    city: "San Francisco",
    type: "Full-time",
    description:
      "Apply machine learning to improve product recommendations and user insights.",
  },
  {
    id: 9,
    title: "Sales Development Representative",
    department: "Sales",
    city: "Chicago",
    type: "Full-time",
    description:
      "Identify and qualify new business opportunities for our sales team.",
  },
  {
    id: 10,
    title: "Backend Engineer",
    department: "Engineering",
    city: "Seattle",
    type: "Full-time",
    description:
      "Design and implement APIs and microservices for our platform.",
  },
  {
    id: 11,
    title: "UX Researcher",
    department: "Design",
    city: "Remote",
    type: "Full-time",
    description:
      "Conduct user research to inform product decisions and improve UX.",
  },
  {
    id: 12,
    title: "Technical Writer",
    department: "Product",
    city: "Austin",
    type: "Full-time",
    description:
      "Create comprehensive documentation and tutorials for our platform.",
  },
  {
    id: 13,
    title: "Security Engineer",
    department: "Engineering",
    city: "San Francisco",
    type: "Full-time",
    description:
      "Protect our platform and user data with robust security practices.",
  },
  {
    id: 14,
    title: "Account Executive",
    department: "Sales",
    city: "New York",
    type: "Full-time",
    description:
      "Close deals and build relationships with enterprise customers.",
  },
  {
    id: 15,
    title: "Content Marketing Specialist",
    department: "Marketing",
    city: "Remote",
    type: "Full-time",
    description:
      "Create engaging content that educates and inspires our audience.",
  },
  {
    id: 16,
    title: "Mobile Engineer (iOS)",
    department: "Engineering",
    city: "San Francisco",
    type: "Full-time",
    description: "Build native iOS applications with Swift and SwiftUI.",
  },
  {
    id: 17,
    title: "HR Manager",
    department: "People",
    city: "San Francisco",
    type: "Full-time",
    description:
      "Support our team's growth and create an amazing workplace culture.",
  },
  {
    id: 18,
    title: "Finance Analyst",
    department: "Finance",
    city: "Boston",
    type: "Full-time",
    description:
      "Support financial planning, analysis, and strategic decision-making.",
  },
  {
    id: 19,
    title: "QA Engineer",
    department: "Engineering",
    city: "Austin",
    type: "Full-time",
    description: "Ensure quality through comprehensive testing and automation.",
  },
  {
    id: 20,
    title: "Partnership Manager",
    department: "Business Development",
    city: "New York",
    type: "Full-time",
    description:
      "Build strategic partnerships to expand our ecosystem and reach.",
  },
  {
    id: 21,
    title: "Customer Support Specialist",
    department: "Customer Success",
    city: "Remote",
    type: "Full-time",
    description: "Provide exceptional support to our growing customer base.",
  },
  {
    id: 22,
    title: "Data Engineer",
    department: "Data",
    city: "Seattle",
    type: "Full-time",
    description:
      "Build data pipelines and infrastructure for analytics and ML.",
  },
];

export default function CareersPage() {
  const [cityFilter, setCityFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Get unique cities and departments for filters
  const cities = Array.from(new Set(jobsData.map((job) => job.city))).sort();
  const departments = Array.from(
    new Set(jobsData.map((job) => job.department))
  ).sort();

  // Filter and paginate jobs
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesCity = !cityFilter || job.city === cityFilter;
      const matchesDepartment =
        !departmentFilter || job.department === departmentFilter;
      return matchesCity && matchesDepartment;
    });
  }, [cityFilter, departmentFilter]);

  const totalPages = Math.ceil(filteredJobs.length / limit);
  const paginatedJobs = filteredJobs.slice((page - 1) * limit, page * limit);

  const handleFilterChange = () => {
    setPage(1); // Reset to first page when filters change
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us build the future of work. We're looking for talented,
            passionate people to join our growing team.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Work at TaskFlow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Competitive Salary
              </h3>
              <p className="text-sm text-gray-600">
                Top of market compensation and equity
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Remote Flexible
              </h3>
              <p className="text-sm text-gray-600">
                Work from anywhere or our offices
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Learning Budget
              </h3>
              <p className="text-sm text-gray-600">
                Annual budget for courses and conferences
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Health Benefits
              </h3>
              <p className="text-sm text-gray-600">
                Comprehensive health, dental, and vision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Open Positions
          </h2>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by City
                </label>
                <select
                  value={cityFilter}
                  onChange={(e) => {
                    setCityFilter(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Department
                </label>
                <select
                  value={departmentFilter}
                  onChange={(e) => {
                    setDepartmentFilter(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Results per page
                </label>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing {paginatedJobs.length} of {filteredJobs.length} positions
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {paginatedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                        {job.department}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        📍 {job.city}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                  <button className="ml-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 text-lg">
                No positions found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setCityFilter("");
                  setDepartmentFilter("");
                  setPage(1);
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
