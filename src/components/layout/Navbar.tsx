
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Products', path: '/products', icon: <Search className="w-5 h-5" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-display text-xl font-semibold transition-opacity hover:opacity-80"
        >
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Elegance</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "relative text-sm font-medium transition-colors duration-200",
                "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                location.pathname === link.path ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative interactive-hover"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs bg-primary text-white rounded-full animate-fade-in">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          
          <Link to="/login">
            <Button
              variant="ghost"
              size="icon"
              className="interactive-hover"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
            </Button>
          </Link>
          
          <Link to="/login">
            <Button 
              className="bg-primary hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md interactive-press"
            >
              Login
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:hidden">
          <Link to="/cart" className="relative mr-1">
            <Button
              variant="ghost"
              size="icon"
              className="relative interactive-hover"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs bg-primary text-white rounded-full animate-fade-in">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            className="interactive-press"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-md animate-slide-down">
          <div className="container mx-auto py-4 px-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-secondary"
                )}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <Link
              to="/login"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:bg-secondary"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>
            <div className="pt-2">
              <Button className="w-full bg-primary hover:bg-primary/90 interactive-press">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
