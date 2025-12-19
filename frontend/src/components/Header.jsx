import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { categories } from '../mockData';

const Header = ({ cartCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-products?search=${searchQuery}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/bright-logo.webp" alt="Bright Laptop" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm hover:text-gray-600 transition">
                <Menu className="w-4 h-4" />
                <span>Category</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link to={`/all-products?category=${category.slug}`}>
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/all-products" className="text-sm hover:text-gray-600 transition">
              All Products
            </Link>
            <Link to="/business" className="text-sm hover:text-gray-600 transition">
              Business
            </Link>
            <Link to="/about" className="text-sm hover:text-gray-600 transition">
              About Us
            </Link>
            <Link to="/startups" className="text-sm hover:text-gray-600 transition">
              Startups
            </Link>
            <Link to="/blogs" className="text-sm hover:text-gray-600 transition">
              Blogs
            </Link>
          </nav>

          {/* Search, Cart, User */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 w-48 lg:w-64"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-1.5 hover:bg-gray-800 transition"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <form onSubmit={handleSearch} className="md:hidden mb-3">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 w-full"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-1.5"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
              <Link to="/all-products" className="text-sm py-2" onClick={() => setIsMenuOpen(false)}>
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/all-products?category=${category.slug}`}
                  className="text-sm py-2 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link to="/business" className="text-sm py-2" onClick={() => setIsMenuOpen(false)}>
                Business
              </Link>
              <Link to="/about" className="text-sm py-2" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link to="/startups" className="text-sm py-2" onClick={() => setIsMenuOpen(false)}>
                Startups
              </Link>
              <Link to="/blogs" className="text-sm py-2" onClick={() => setIsMenuOpen(false)}>
                Blogs
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;