import { Search, Filter } from "lucide-react";
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
  };

  const hasActiveFilters =
    selectedDifficulties.length > 0 ||
    selectedCategories.length > 0 ||
    selectedOS.length > 0 ||
    searchQuery;
  return (
    <div className="mb-8 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar laboratorios por nombre, descripción o tags..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white">Filters</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="cursor-pointer text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => toggleDifficulty(difficulty)}
                  className={`cursor-pointer
                    px-4 py-2 rounded-lg border text-sm transition-all
                    ${
                      selectedDifficulties.includes(difficulty)
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                        : "bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600"
                    }
                  `}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={` cursor-pointer
                    px-4 py-2 rounded-lg border text-sm transition-all
                    ${
                      selectedCategories.includes(category)
                        ? "bg-purple-500/20 border-purple-500 text-purple-300"
                        : "bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Operating System
            </label>
            <div className="flex flex-wrap gap-2">
              {osOptions.map((os) => (
                <button
                  key={os}
                  onClick={() => toggleOS(os)}
                  className={` cursor-pointer
                    px-4 py-2 rounded-lg border text-sm transition-all
                    ${
                      selectedOS.includes(os)
                        ? "bg-purple-500/20 border-purple-500 text-purple-300"
                        : "bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600"
                    }
                  `}
                >
                  {os}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
