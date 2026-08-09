export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-500 border-t border-[#1a1a1a] bottom-0 w-full py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-mono">
          <span className="text-[#00ff41]">$</span> echo "© {new Date().getFullYear()} Joseeelv. All rights reserved."
        </p>
      </div>
    </footer>
  );
}