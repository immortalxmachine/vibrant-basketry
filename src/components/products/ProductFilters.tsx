
import React from 'react';
import ProductSearch from './ProductSearch';
import CategoryFilter from './CategoryFilter';
import { categories } from '@/data/sampleProducts';

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const ProductFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  handleCategoryChange,
  handleSearch
}: ProductFiltersProps) => {
  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="sticky top-24 space-y-6">
        <ProductSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={handleSearch} 
        />
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );
};

export default ProductFilters;
