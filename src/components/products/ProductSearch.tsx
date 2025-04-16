
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface ProductSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const ProductSearch = ({ searchQuery, setSearchQuery, handleSearch }: ProductSearchProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Search</h3>
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
        <Button 
          type="submit" 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 top-0"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ProductSearch;
