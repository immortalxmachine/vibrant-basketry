
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

// Sample category data (in a real app, this would come from an API)
const sampleCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "2",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "3",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1549439602-43ebca4c6b5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "4",
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww"
  }
];

const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchCategories = async () => {
      setIsLoading(true);
      // In a real app, fetch from API: const response = await fetch('/api/categories');
      setTimeout(() => {
        setCategories(sampleCategories);
        setIsLoading(false);
      }, 500);
    };
    
    fetchCategories();
  }, []);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-sm font-medium text-primary mb-2">BROWSE CATEGORIES</h2>
          <h3 className="text-3xl font-display font-bold">Find What You Need</h3>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-[4/3] mb-4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="overflow-hidden rounded-xl shadow-subtle bg-white">
                  <div className="relative overflow-hidden aspect-[4/3] group-hover:scale-100">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center",
                      "transform transition-transform duration-300"
                    )}>
                      <h3 className="text-white text-xl font-display font-semibold text-center">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
