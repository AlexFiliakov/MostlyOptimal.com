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
          About
        </h1>

        <div className="font-body text-lg leading-relaxed text-deep-forest/90 space-y-6">
          <p>
            I became interested in ergodicity economics in the summer of 2025,
            but the question at its core (why do individual outcomes so often
            diverge from statistical expectations?) had quietly shaped my career
            for years.
          </p>

          <p>
            Over eleven years as an actuary, I&apos;ve had the good fortune of
            seeing insurance from nearly every angle. I started in Life Insurance
            and Annuities at a Fortune 100 company, building dynamic capital
            models to understand how management decisions ripple through company
            financials, using models based on precisely the principles of
            ergodicity (though we did not use that terminology at the time). At
            Verisk Analytics, I spent close to four years modernizing the
            analytical platforms behind the next generation of actuarial
            products. My pricing work in Commercial Casualty has spanned
            Workers&apos; Compensation, General Liability, Product Liability, and
            Commercial Auto. And in my current role at a commercial insurance
            broker, I optimize insurance programs for dozens of clients with
            millions of dollars in combined premium.
          </p>

          <p>
            Each of these roles reinforced a simple observation: what happens to
            a single company over time looks nothing like what happens to the
            average across many companies. When I encountered Ole Peters&apos;
            work on ergodicity economics, it gave that observation a rigorous
            mathematical foundation and clarified my thinking about insurance
            decisions.
          </p>

          <p>
            What started as a quick Excel model (&ldquo;can I derive rational
            insurance prices under ergodic theory?&rdquo;) quickly outgrew the
            spreadsheet. I moved to Python, built a simulation framework, wrote a
            research paper, and kept going. After hundreds of hours of
            development, Mostly Optimal emerged: an open-source engine for
            modeling how individual businesses actually grow, fail, and navigate
            uncertainty over time.
          </p>
        </div>

        <hr className="my-12 border-warm-gray" />

        <h2 className="text-3xl md:text-4xl font-display font-bold text-deep-forest mb-6">
          Vision
        </h2>
        <p className="font-body text-lg leading-relaxed text-deep-forest/90">
          My hope is that this framework nudges the insurance industry toward
          thinking about risk differently. Not as a line item to minimize, but as
          a dynamic that, when properly understood, can accelerate long-term
          growth. If Mostly Optimal serves as a useful starting point for the
          community to build on, refine, and challenge, it will have more than
          done its job.
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
