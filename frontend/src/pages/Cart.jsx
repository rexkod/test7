import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { getCart, updateCartQuantity, removeFromCart, getCartTotal, clearCart } from '../mockData';
import { toast } from '../hooks/use-toast';

const Cart = ({ onCartUpdate }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartQuantity(productId, newQuantity);
    setCartItems([...getCart()]);
    onCartUpdate();
  };

  const handleRemove = (productId, productName) => {
    removeFromCart(productId);
    setCartItems([...getCart()]);
    toast({
      title: "Removed from cart",
      description: `${productName} has been removed from your cart.`,
    });
    onCartUpdate();
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const total = getCartTotal();
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.salePrice) * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products yet</p>
            <Link to="/all-products">
              <Button className="bg-black hover:bg-gray-800 text-white">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-semibold mb-2 hover:text-blue-600 transition">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                        {item.quantity >= 10 ? (
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge className="bg-orange-500 text-white text-xs">B2B Pricing</Badge>
                              <span className="text-xs text-gray-600">15% off (MOQ: 10)</span>
                            </div>
                            <div className="flex items-baseline space-x-2">
                              <span className="text-lg font-bold text-orange-600">₹{(item.salePrice * 0.85).toLocaleString()}</span>
                              <span className="text-sm text-gray-500 line-through">₹{item.salePrice.toLocaleString()}</span>
                              <span className="text-sm text-orange-600 font-medium">per unit</span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge className="bg-blue-500 text-white text-xs">B2C Pricing</Badge>
                            </div>
                            <div className="flex items-baseline space-x-2">
                              <span className="text-lg font-bold">₹{item.salePrice.toLocaleString()}</span>
                              <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                              <span className="text-sm text-green-600 font-medium">{item.discount}% off</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(item.id, item.name)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center space-x-2 border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-semibold">₹{(total + savings).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Discount</span>
                  <span className="font-semibold text-green-600">-₹{savings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-green-700 font-medium">
                  You will save ₹{savings.toLocaleString()} on this order
                </p>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg"
              >
                Proceed to Checkout
              </Button>

              <div className="mt-6 space-y-2 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>12 Months Warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>14 Days Return Policy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>COD Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;