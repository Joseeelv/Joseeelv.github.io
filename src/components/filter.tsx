import { Search, Filter, X } from "lucide-react";
import { blogData } from "../data/blogData";

interface LabFiltersProps {
  selectedDifficulties: string[];
  selectedCategories: string[];
  selectedOS: string[];
  onDifficultyChange: (difficulties: string[]) => void;
  onCategoryChange: (categories: string[]) => void;
  onOSChange: (os: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const difficulties = Array.from(
  new Set(blogData.blogs.map((blog) => blog.difficulty)),
).filter((diff): diff is string => typeof diff === "string");
const categories = Array.from(
  new Set(blogData.blogs.map((blog) => blog.category)),
).filter((cat): cat is string => typeof cat === "string");
const osOptions = Array.from(
  new Set(blogData.blogs.map((blog) => blog.os)),
).filter((os): os is string => typeof os === "string");

export function LabFilters({
  selectedDifficulties,
  selectedCategories,
  selectedOS,
  onDifficultyChange,
  onCategoryChange,
  onOSChange,
  searchQuery,
  onSearchChange,
  selectedSkills,
  onSkillsChange,
}: LabFiltersProps) {
  const toggleDifficulty = (difficulty: string) => {
    if (selectedDifficulties.includes(difficulty)) {
      onDifficultyChange(selectedDifficulties.filter((d) => d !== difficulty));
    } else {
      onDifficultyChange([...selectedDifficulties, difficulty]);
    }
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const toggleOS = (os: string) => {
    if (selectedOS.includes(os)) {
      onOSChange(selectedOS.filter((o) => o !== os));
    } else {
      onOSChange([...selectedOS, os]);
    }
  };

  const clearFilters = () => {
    onDifficultyChange([]);
    onCategoryChange([]);
    onOSChange([]);
    onSearchChange("");
    onSkillsChange([]);
  };

  const hasActiveFilters =
    selectedDifficulties.length > 0 ||
    selectedCategories.length > 0 ||
    selectedOS.length > 0 ||
    searchQuery ||
    selectedSkills.length > 0;

  return (
    <div className="mb-8 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
        <input
          type="text"
          placeholder="Search labs by name, description or tags..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-[#00ff41]/50 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#00ff41]" />
            <h3 className="text-white font-mono text-sm tracking-wide">
              FILTERS
            </h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="cursor-pointer text-sm text-[#00ff41] hover:text-[#00cc33] font-mono transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-3 uppercase tracking-wider">
              Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => toggleDifficulty(difficulty)}
                  className={`cursor-pointer px-4 py-2 border text-sm font-mono transition-all ${
                    selectedDifficulties.includes(difficulty)
                      ? "bg-[#00ff41]/10 border-[#00ff41]/50 text-[#00ff41]"
                      : "bg-black/50 border-[#1a1a1a] text-gray-500 hover:border-[#00ff41]/30"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-3 uppercase tracking-wider">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`cursor-pointer px-4 py-2 border text-sm font-mono transition-all ${
                    selectedCategories.includes(category)
                      ? "bg-purple-500/10 border-purple-500/50 text-purple-300"
                      : "bg-black/50 border-[#1a1a1a] text-gray-500 hover:border-purple-500/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-3 uppercase tracking-wider">
              Operating System
            </label>
            <div className="flex flex-wrap gap-2">
              {osOptions.map((os) => (
                <button
                  key={os}
                  onClick={() => toggleOS(os)}
                  className={`cursor-pointer px-4 py-2 border text-sm font-mono transition-all ${
                    selectedOS.includes(os)
                      ? "bg-purple-500/10 border-purple-500/50 text-purple-300"
                      : "bg-black/50 border-[#1a1a1a] text-gray-500 hover:border-purple-500/30"
                  }`}
                >
                  {os}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm text-gray-400 mb-3">Skills</label>
          <div className="flex flex-wrap gap-2">
            {Array.from(
              new Set(blogData.blogs.flatMap((blog) => blog.skills || [])),
            ).map((skill) => (
              <button
                key={skill}
                onClick={() =>
                  onSkillsChange(
                    selectedSkills.includes(skill)
                      ? selectedSkills.filter((s) => s !== skill)
                      : [...selectedSkills, skill],
                  )
                }
                className={` cursor-pointer
                      px-4 py-2 rounded-lg border text-sm transition-all
                      ${
                        selectedSkills.includes(skill)
                          ? "bg-purple-500/20 border-purple-500 text-purple-300"
                          : "bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600"
                      }
                    `}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
