import Divider from "./divider";
import { articlesData } from "../data/articlesData";
export default function Articles() {
  return (
    <>
      <section
        className="relative w-full min-h-screen bg-slate-950 text-gray-200 flex flex-col items-center pt-24 pb-20"
        id="articles"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <h1
            className="text-5xl font-extrabold text-white drop-shadow-lg text-shadow-cyan tracking-wider leading-tight text-center mb-12"
            style={{
              textShadow:
                "0 0 10px rgba(0, 224, 255, 1), 0 0 20px rgba(0, 224, 255, 0.2)",
            }}
          >
            {articlesData.sectionTitle}
            <div className="flex justify-center mt-2">
              <div className="w-24">
                <Divider />
              </div>
            </div>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesData.articles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                className="group flex flex-col justify-between h-full min-h-85 bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                style={{ minHeight: "340px" }}
                target="_blank"
              >
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-cyan-400 mb-4 relative z-10">
                    {article.title}
                  </h2>
                  <p className="text-gray-300 mb-4 relative z-10">
                    {article.summary}
                  </p>
                </div>
                <div className="mt-auto">
                  <span className="text-sm text-gray-400 relative z-10">
                    Published on:{" "}
                    {new Date(article.publishedDate).toLocaleDateString()}
                  </span>
                  <span
                    className="block mt-2 text-sm text-gray-200 relative z-10"
                    style={{ textTransform: "capitalize", color: "#4B5563" }}
                  >
                    Tags: {"#" + article.tags.join(", #")}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
