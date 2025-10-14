export default function FeaturesSection() {
  const features = [
    {
      title: "Long-Term Business Optimization",
      description:
        "Advanced optimization algorithms that maximize long-term company value through optimal insurance decisions, using time-average (ergodic) rather than ensemble approaches.",
    },
    {
      title: "Comprehensive Financial Statements",
      description:
        "Familiar financial reporting formats directly from risk analysis outputs (Balance Sheet, Income Statement, Cash Flow).",
    },
    {
      title: "Multi-Layer Insurance Tower Design",
      description:
        "Sophisticated insurance program structuring with support for multiple layers, attachment points, reinstatements, and aggregate limits.",
    },
    {
      title: "Advanced Risk Metrics Suite",
      description:
        "Industry-standard risk metrics quantify tail risk exposure and support data-driven insurance purchasing decisions with confidence intervals and bootstrap analysis.",
    },
    {
      title: "Monte Carlo Simulation Engine",
      description:
        "Model complex loss distributions and understand the full spectrum of potential outcomes with statistical confidence.",
    },
    {
      title: "Scenario Management & Sensitivity Analysis",
      description:
        "Comprehensive framework for managing multiple simulation scenarios, parameter sweeps, and what-if analyses under different market conditions.",
    },
    {
      title: "Strategy Backtesting & Walk-Forward Validation",
      description:
        "Robust backtesting framework that tests insurance strategies against historical and simulated data using walk-forward validation techniques.",
    },
    {
      title: "Real-Time Business Constraints",
      description:
        "Configurable business constraints including maximum risk tolerance, minimum ROE thresholds, leverage ratios, liquidity requirements, and regulatory compliance checks.",
    },
    {
      title: "Executive Reporting & Visualization",
      description:
        "Comprehensive reporting suite with interactive dashboards, Excel export capabilities, and publication-ready visualizations that translate complex analytics into actionable business insights.",
    },
  ];

  return (
    <section 
      className="relative py-24 px-6 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/snow_tracks.webp')",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center text-deep-forest mb-16">
          Application Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-xl overflow-hidden bg-opacity-65 backdrop-blur-sm group hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-deep-forest mb-3">
                  {feature.title}
                </h3>
                <p className="text-deep-forest/70 font-bold">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

