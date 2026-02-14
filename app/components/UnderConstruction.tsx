export default function UnderConstruction() {

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 pt-24 pb-12">
      <div className="max-w-4xl w-full text-center">
        {/* Main Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-8 shadow-2xl">
              <svg
                className="w-24 h-24 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          We&apos;re Building Something{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Extraordinary
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Our site is currently under active development. We&apos;re working hard to bring you an amazing experience!
        </p>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full mb-12 shadow-md">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="font-semibold text-sm md:text-base">
            Active Development in Progress
          </span>
        </div>

        {/* Coming Soon */}
        <div className="mb-12">
          <p className="text-2xl text-gray-700 font-medium">
            Coming Soon
          </p>
        </div>

        {/* Footer Message */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
          <p className="text-gray-700 text-lg leading-relaxed">
            Thank you for your patience! We&apos;re putting the finishing touches on something we think you&apos;ll love. 
            Check back soon or bookmark this page to see our progress.
          </p>
        </div>
        <div className="text-xl md:text-2xl mt-6">
          <p className="text-gray-700 leading-relaxed mt-6">
            Meanwhile, take a look at the working pages on our site below:
          </p>
          <ul className="mt-4 space-y-2 max-w-md mx-auto text-left pl-36 list-[circle] list-inside">
            <li>
              <a
                key="research-link"
                href="https://mostlyoptimal.com/research"
                className="text-deep-forest hover:text-electric-teal transition-colors duration-200 relative group font-medium"
              >
                Research
              </a>
            </li>
            <li>
              <a
                key="theory-link"
                href="https://mostlyoptimal.com/theory"
                className="text-deep-forest hover:text-electric-teal transition-colors duration-200 relative group font-medium"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                key="getting-started-link"
                href="https://mostlyoptimal.com/tutorial"
                className="text-deep-forest hover:text-electric-teal transition-colors duration-200 relative group font-medium"
              >
                Quick Start Guide
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
