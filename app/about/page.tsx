import type { Metadata } from 'next';
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: 'About - Mostly Optimal - See Your Future, Not the Average',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-pure-white">
      <Header />
      <Spacer />

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-deep-forest mb-12 text-center">
          The Story Behind Mostly Optimal
        </h1>

        <div className="font-body text-lg leading-relaxed text-deep-forest/90 space-y-6">
          <p>
            After 11 years as an actuary working across life insurance, analytics,
            commercial casualty, and brokerage, I kept seeing the same gap: the
            analytical tools available to insurance buyers are decades behind what
            carriers use internally. So I built the tool I wished existed.
          </p>

          <p>
            My career has spanned the insurance industry: from building dynamic
            capital models at a Fortune 100 carrier, to modernizing analytical
            platforms at Verisk, to optimizing multi-million-dollar insurance
            programs as a commercial broker. Each role reinforced the same
            observation: what happens to a single company over time looks nothing
            like the industry average.
          </p>

          <p>
            When I discovered the mathematical framework behind this observation,
            everything clicked. A quick Excel prototype turned into a Python
            simulation engine, then a research paper, then the open-source
            platform you see here. Hundreds of hours later, Mostly Optimal is
            ready for the community to use, challenge, and build on.
          </p>
        </div>

        <hr className="my-12 border-warm-gray" />

        <h2 className="text-3xl md:text-4xl font-display font-bold text-deep-forest mb-6">
          Vision
        </h2>
        <p className="font-body text-lg leading-relaxed text-deep-forest/90">
          The insurance industry treats risk as a cost to minimize. It should
          be a lever for growth. This framework is my attempt to prove
          that and give to every insurance buyer the analytical tools that
          carriers have kept to themselves.
        </p>

        <hr className="my-12 border-warm-gray" />

        <h2 className="text-3xl md:text-4xl font-display font-bold text-deep-forest mb-6">
          Values
        </h2>
        <p className="font-body text-lg leading-relaxed text-deep-forest/90 mb-6">
          I built this project on three convictions:
        </p>
        <ul className="space-y-4 font-body text-lg leading-relaxed text-deep-forest/90">
          <li>
            <span className="font-semibold text-deep-forest">Open-mindedness:</span>{' '}
            The best ideas often come from questioning what everyone takes for
            granted.
          </li>
          <li>
            <span className="font-semibold text-deep-forest">Analytic rigor:</span>{' '}
            Intuition matters, but it deserves to be tested.
          </li>
          <li>
            <span className="font-semibold text-deep-forest">Better decisions:</span>{' '}
            The point of all this analysis isn&apos;t the analysis itself.
            It&apos;s making decisions you can stand behind.
          </li>
        </ul>

        <div className="mt-16 font-body text-lg text-deep-forest/90">
          <p className="italic mb-1">Yours in chaos,</p>
          <p className="font-semibold text-deep-forest">Alex Filiakov, ACAS</p>
        </div>
      </section>

      <Spacer />
      <Footer />
    </main>
  );
}
