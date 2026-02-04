import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { categories } from "../data/categories";

export function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCategoryHover = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const handleSubcategoryClick = (subcategory: string) => {
    navigate(`/produtos?categoria=${encodeURIComponent(subcategory)}`);
    setActiveCategory(null);
  };

  return (
    <nav 
      className="border-b border-black/10 bg-white sticky top-0 z-30"
      onMouseLeave={() => setActiveCategory(null)}
    >
      {/* Main Categories */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          {categories.map((category) => (
            <button
              key={category.name}
              onMouseEnter={() => handleCategoryHover(category.name)}
              className={`group relative flex items-center gap-1 py-5 text-xs tracking-wide transition-colors ${
                activeCategory === category.name
                  ? "text-black"
                  : "text-black/60 hover:text-black"
              }`}
            >
              {category.name.toUpperCase()}
              <ChevronDown 
                size={14} 
                className={`transition-transform ${
                  activeCategory === category.name ? "rotate-180" : ""
                }`}
              />
              
              {/* Active indicator */}
              {activeCategory === category.name && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-black" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories Dropdown */}
      {activeCategory && (
        <div className="border-t border-black/10 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="grid grid-cols-4 gap-8">
              {categories
                .find((cat) => cat.name === activeCategory)
                ?.subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => handleSubcategoryClick(subcategory)}
                    className="text-left text-sm text-black/60 hover:text-black transition-colors"
                  >
                    {subcategory}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}