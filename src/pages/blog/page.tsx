"use client";
import { useState } from "react";
import Divider from "../../components/divider";
import { blogData } from "../../data/blogData";
import { LabFilters } from "../../components/filter";

export default function Blog() {
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    [],
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOS, setSelectedOS] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const filteredBlogs = blogData.blogs.filter((blog) => {
    const searchMatch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());

    const difficultyMatch =
      selectedDifficulties.length === 0 ||
      selectedDifficulties.includes(blog.difficulty);

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(blog.category);

    const osMatch = selectedOS.length === 0 || selectedOS.includes(blog.os);

    const skillsMatch =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => blog.skills.includes(skill));

    return (
      searchMatch && difficultyMatch && categoryMatch && osMatch && skillsMatch
    );
  });

  return (
    <section
      className="relative w-full min-h-screen bg-[#020617] text-gray-200 flex flex-col items-center pt-24 pb-20"
      id="blog"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-[#00ff41]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-green-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-5xl font-extrabold text-white font-mono matrix-title tracking-tight leading-tight text-center mb-12">
          {blogData.sectionTitle}
          <div className="flex justify-center mt-2">
            <div className="w-24">
              <Divider />
            </div>
          </div>
        </h1>

        <LabFilters
          selectedDifficulties={selectedDifficulties}
          selectedCategories={selectedCategories}
          selectedOS={selectedOS}
          onDifficultyChange={setSelectedDifficulties}
          onCategoryChange={setSelectedCategories}
          onOSChange={setSelectedOS}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSkills={selectedSkills}
          onSkillsChange={setSelectedSkills}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#00ff41]/30 transition-all duration-300 overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white font-mono mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 font-sans">
                  {blog.description}
                </p>
                <div className="mb-4 flex gap-2 flex-wrap">
                  {blog.difficulty && (
                    <span
                      className={`inline-block text-xs px-2 py-1 border font-mono ${
                        blog.difficulty.toLowerCase() === "fácil" ||
                        blog.difficulty.toLowerCase() === "easy"
                          ? "bg-green-500/10 border-green-500/30 text-green-300"
                          : blog.difficulty.toLowerCase() === "intermedio" ||
                              blog.difficulty.toLowerCase() === "medium"
                            ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-300"
                            : blog.difficulty.toLowerCase() === "difícil" ||
                                blog.difficulty.toLowerCase() === "hard"
                              ? "bg-red-500/10 border-red-500/30 text-red-300"
                              : "bg-gray-500/10 border-gray-500/30 text-gray-300"
                      }`}
                    >
                      {blog.difficulty}
                    </span>
                  )}
                  {blog.category && (
                    <span className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs px-2 py-1 font-mono">
                      {blog.category}
                    </span>
                  )}
                  {blog.os && (
                    <span className="inline-block bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] text-xs px-2 py-1 font-mono">
                      {blog.os}
                    </span>
                  )}
                </div>
                <a
                  href={"/blog/" + blog.title}
                  rel="noopener noreferrer"
                  className="text-[#00ff41] hover:text-[#00cc33] text-sm font-semibold font-mono transition-colors"
                >
                  $ cat readme.md &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
