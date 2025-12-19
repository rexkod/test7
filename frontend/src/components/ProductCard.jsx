import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
        <CardContent className="p-4">
          {/* Extra Off Badge */}
          {product.extraOff && (
            <Badge className="bg-green-500 hover:bg-green-600 mb-2">
              Extra ₹{product.extraOff} Off
            </Badge>
          )}
          
          {/* Verified Badge */}
          {product.verified && (
            <div className="flex items-center space-x-1 mb-3">
              <div className="bg-black text-white rounded-full p-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-gray-600">verified</span>
            </div>
          )}

          {/* Product Image */}
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center bg-yellow-400 text-white px-2 py-0.5 rounded">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs ml-1 font-semibold">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold">₹{product.salePrice.toLocaleString()}</span>
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
          </div>

          {/* Discount Badge */}
          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 mb-4">
            {product.discount}% OFF
          </Badge>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;