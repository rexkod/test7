import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Rocket } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import ProductCard from '../components/ProductCard';
import { products, categories, brands, blogs, testimonials, addToCart } from '../mockData';
import { toast } from '../hooks/use-toast';

const Home = ({ onCartUpdate }) => {
  const bestSellers = products.slice(0, 5);
  const bestDeals = products.slice(0, 3);
  const topPicks = products.slice(5, 8);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    onCartUpdate();
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Banner */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold mb-4">Find Your Perfect Laptop</h2>
            <p className="text-xl text-gray-600 mb-8">Choose between brand new or certified refurbished laptops</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/refurbished-laptops">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
                  <span className="mr-2">🔄</span> Refurbished Laptops - Save up to 70%
                </Button>
              </Link>
              <Link to="/new-laptops">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  <span className="mr-2">✨</span> New Laptops - Latest Models
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Categories Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6">Shop by Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 5).map((category, index) => (
              <Link
                key={category.id}
                to={`/all-products?category=${category.slug}`}
                className={`group relative overflow-hidden rounded-2xl ${index === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="relative h-64 bg-gray-900">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling Banner */}
      <div className="bg-black text-white py-3 overflow-hidden">
        <div className="animate-scroll-left flex space-x-12 whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center space-x-12">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">14 DAYS RETURN</span>
              </div>
              <span className="text-sm font-medium">COD AVAILABLE ON ALL PRODUCTS</span>
              <span className="text-sm font-medium">NO COST EMI AVAILABLE</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-4">
                20000+ Happy<br />Customers
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Trusted by top startups &<br />working professionals
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-black text-white hover:bg-gray-800 py-3 px-6 text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  12 Months Warranty
                </Badge>
                <Badge className="bg-black text-white hover:bg-gray-800 py-3 px-6 text-sm">
                  <span className="mr-2">14</span>
                  14 Days Free Return
                </Badge>
                <Badge className="bg-black text-white hover:bg-gray-800 py-3 px-6 text-sm">
                  <span className="mr-2">%</span>
                  COD & EMI Available
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                alt="Laptop"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl font-bold text-blue-600">G</span>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">4.9 Average Rating</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-orange-500">a</span>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">4.7 Average Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Categories</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/all-products?category=${category.slug}`}
              >
                <Button variant="outline" className="hover:bg-black hover:text-white transition">
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Best Sellers</h2>
            <Link to="/all-products?sort=best-sellers">
              <Button variant="ghost">View More <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Best Deals */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Best <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Deals</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestDeals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Startups */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-2">Trusted by</p>
            <h2 className="text-4xl font-bold mb-2">50+</h2>
            <p className="text-xl text-gray-600">Startup Founders</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="grayscale hover:grayscale-0 transition">
                <img src={testimonial.logo} alt={testimonial.company} className="h-16 w-16 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-center">
              <div className="text-6xl font-bold text-green-600 mb-2">75%</div>
              <p className="text-xl font-semibold mb-2">Less Carbon Emission</p>
              <p className="text-gray-600 text-sm">Eco-friendly choice</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-center">
              <div className="text-4xl font-bold mb-4">₹₹₹</div>
              <p className="text-xl font-semibold mb-2">Pocket Friendly</p>
              <p className="text-gray-600 text-sm">Much cheaper than new ones</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <p className="text-xl font-semibold mb-2">Free Extended Warranty</p>
              <p className="text-gray-600 text-sm">Ensuring protection</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-center">
              <div className="text-4xl font-bold mb-4">100+</div>
              <p className="text-xl font-semibold mb-2">Options to choose from</p>
              <p className="text-gray-600 text-sm">Wide variety available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Top Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPicks.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Favourite Brands</span> Laptops
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition group cursor-pointer"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-12 object-contain grayscale group-hover:grayscale-0 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Blogs</h2>
            <Link to="/blogs">
              <Button variant="ghost">View All <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.slug}`} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{blog.date}</span>
                      <Button variant="ghost" size="sm" className="group-hover:text-blue-600">
                        Read more <ArrowRight className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;