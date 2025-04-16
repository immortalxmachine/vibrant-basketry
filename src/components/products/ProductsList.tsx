
import React from 'react';
import { Product } from '@/lib/types';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';

interface ProductsListProps {
  products: Product[];
  isLoading: boolean;
  clearFilters: () => void;
}

const ProductsList = ({ products, isLoading, clearFilters }: ProductsListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your search or filter to find what you're looking for.
        </p>
        <Button onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
