
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, UserCog } from 'lucide-react'; // Додано іконку "Адмін панель"
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { getCategories } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const categories = getCategories();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect py-2 shadow-sm' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-serif font-medium tracking-tight transition-opacity hover:opacity-80"
          >
            Curtain SOFIYA
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
  <Link to="/" className="text-sm font-medium transition-colors hover:text-primary/80">
    Головна
  </Link>
  {categories.map((category) => (
    <Link
      key={category.id}
      to={`/category/${category.id}`}
      className="text-sm font-medium transition-colors hover:text-primary/80"
    >
      {category.name}
    </Link>
  ))}
  
</nav>


          <div className="flex items-center space-x-3">
            {/* Пошук */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center border rounded-md px-2 py-0 bg-white shadow-sm">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Пошук..."
                    className="w-32 md:w-48 bg-transparent border-none text-sm px-2 focus:outline-none"
                    autoFocus
                  />
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Пошук</span>
                </Button>
              )}
            </div>

            {/* Кошик */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="button-hover">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Кошик</span>
              </Button>
            </Link>

            {/* Адмін панель */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary/80"
              >
                <UserCog className="h-5 w-5 text-primary" /> {/* Іконка адмін панелі */}
                Адмін
              </Link>
            )}

            {/* Мобільне меню */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden button-hover"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Меню</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect animate-slide-in">
          <div className="container mx-auto p-4 space-y-4">
            <Link to="/" className="block py-2 text-lg font-medium transition-colors hover:text-primary/80">
              Головна
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="block py-2 text-lg font-medium transition-colors hover:text-primary/80"
              >
                {category.name}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 py-2 text-lg font-medium transition-colors hover:text-primary/80"
              >
                <UserCog className="h-6 w-6 text-primary" /> Адмін панель
              </Link>
            )}

            <div className="pt-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Пошук..."
                  className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
