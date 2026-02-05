export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 bg-deep-forest text-white py-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-white/80 text-sm">
          © {year} Mostly Optimal. Transforming risk management through
          first principles.
        </p>
      </div>
    </footer>
  );
}

