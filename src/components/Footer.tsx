export default function Footer() {
  return (
    <footer className="font-body border-t border-gray-300 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-xs text-gray-600">
        <p>© {new Date().getFullYear()} ORBIC · Portland State University</p>

        <div className="flex gap-4">
          <a
            href="https://accessibility.oregonstate.edu/accessibility-statement"
            target="_blank"
            rel="noopener noreferrer"
          >
            Accessibility
          </a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
