export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 bottom-0 w-full py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Joseeelv. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
