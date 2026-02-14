export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 bg-deep-forest text-white py-8 px-6">
      <div className="max-w-7xl mx-auto text-center flex space-x-6 justify-center">
        <p className="text-white/80 text-sm">
          © {year} Mostly Optimal. Better insurance decisions through
          better models.
        </p>
        <a
          href="https://github.com/AlexFiliakov/Ergodic-Insurance-Limits"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

