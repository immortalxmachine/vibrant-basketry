
import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Categories</h3>
      <div className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === category.name.toLowerCase()
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onCategoryChange(category.name.toLowerCase())}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
