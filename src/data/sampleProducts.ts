
import { Product } from '@/lib/types';

// Sample product data (in a real app, this would come from an API)
export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 249.99,
    description: "Experience crystal-clear sound with our premium wireless headphones featuring noise cancellation technology.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    inStock: true,
    featured: true
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 399.99,
    description: "Stay connected with our latest smartwatch featuring health monitoring, GPS, and cellular connectivity.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    inStock: true,
    featured: true
  },
  {
    id: "3",
    name: "Designer Leather Bag",
    price: 159.99,
    description: "A stylish leather bag that combines elegance and functionality, perfect for everyday use.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.6,
    inStock: true,
    featured: true
  },
  {
    id: "4",
    name: "Ultra-Slim Laptop Pro",
    price: 1299.99,
    description: "The latest ultra-slim laptop with powerful performance, stunning display, and all-day battery life.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    rating: 4.9,
    inStock: true,
    featured: true
  },
  {
    id: "5",
    name: "Premium Denim Jacket",
    price: 89.99,
    description: "A classic denim jacket made from premium materials, featuring a comfortable fit and timeless design.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFja2V0fGVufDB8fDB8fHww",
    rating: 4.5,
    inStock: true
  },
  {
    id: "6",
    name: "Ergonomic Office Chair",
    price: 249.99,
    description: "An ergonomic office chair designed for maximum comfort during long work sessions.",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    inStock: true
  },
  {
    id: "7",
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    description: "An eco-friendly, vacuum-insulated water bottle that keeps your drinks hot or cold for hours.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D",
    rating: 4.4,
    inStock: true
  },
  {
    id: "8",
    name: "Modern Coffee Table",
    price: 199.99,
    description: "A sleek, modern coffee table with a minimalist design, perfect for any living room.",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1559554604-0f9a6e3f4109?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwdGFibGV8ZW58MHx8MHx8fDA%3D",
    rating: 4.6,
    inStock: false
  }
];

export const categories = [
  { id: "1", name: "All" },
  { id: "2", name: "Electronics" },
  { id: "3", name: "Clothing" },
  { id: "4", name: "Accessories" },
  { id: "5", name: "Furniture" }
];
