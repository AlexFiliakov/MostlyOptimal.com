import type { Metadata } from 'next';
import PlotlySurfaceViewerExtremeShape from "../components/PlotlySurfaceViewerExtremeShape";

export const metadata: Metadata = {
  title: 'Surface Plot - Ergodicity Advantage - See Your Future, Not the Average',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-pure-white">
      <PlotlySurfaceViewerExtremeShape />
    </main>
  );
}
