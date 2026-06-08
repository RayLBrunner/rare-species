export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-xs text-gray-600">
        <p>© 2026 ORBIC · Portland State University</p>

        <div className="flex gap-4">
          <a href="/accessibility">Accessibility</a>
          <a href="/data-request">Data Request</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}