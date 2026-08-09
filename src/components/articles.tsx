import Divider from "./divider";
import { articlesData } from "../data/articlesData";

export default function Articles() {
  return (
    <section
      className="relative w-full min-h-screen bg-[#020617] text-gray-200 flex flex-col items-center pt-10"
      id="articles"
    >
      <div className="binary-diagonal absolute inset-0 z-0 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-5xl font-extrabold text-white font-mono matrix-title tracking-tight leading-tight text-center">
          {articlesData.sectionTitle}
          <div className="flex justify-center mt-2">
            <div className="w-24 pb-5">
              <Divider />
            </div>
          </div>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesData.articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              className="group flex flex-col justify-between h-full min-h-85 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#00ff41]/30 p-6 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              style={{ boxShadow: "0 0 15px rgba(0, 255, 65, 0.03)" }}
            >
              <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-[#00ff41] font-mono mb-4 relative z-10">
                  {article.title}
                </h2>
                <p className="text-gray-300 mb-4 relative z-10 font-sans">
                  {article.summary}
                </p>
              </div>
              <div className="mt-auto">
                <span className="text-sm text-gray-500 font-mono relative z-10">
                  Published:{" "}
                  {new Date(article.publishedDate).toLocaleDateString()}
                </span>
                <span className="block mt-2 text-sm font-mono relative z-10 text-gray-600">
                  {"> "}
                  {article.tags.join(" | ")}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
