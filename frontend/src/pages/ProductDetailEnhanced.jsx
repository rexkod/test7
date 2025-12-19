import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Shield, Package, Truck, ChevronLeft, Eye, Share2, Plus, Minus, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { products, addToCart } from '../mockData';
import { toast } from '../hooks/use-toast';
import ProductCard from '../components/ProductCard';

const ProductDetailEnhanced = ({ onCartUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedRam, setSelectedRam] = useState('8GB');
  const [selectedStorage, setSelectedStorage] = useState('256GB');
  const [selectedWarranty, setSelectedWarranty] = useState('free-1-year');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewingUsers] = useState(Math.floor(Math.random() * 10) + 3);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      const related = products.filter(
        p => p.category === foundProduct.category && p.id !== foundProduct.id
      ).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart.`,
    });
    onCartUpdate();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleRelatedProductAddToCart = (relatedProduct) => {
    addToCart(relatedProduct);
    toast({
      title: "Added to cart",
      description: `${relatedProduct.name} has been added to your cart.`,
    });
    onCartUpdate();
  };

  const productImages = product ? [product.image, product.image, product.image, product.image] : [];

  const faqs = [
    {
      question: "What are refurbished laptops?",
      answer: "Refurbished laptops are pre-owned devices that have been professionally restored to like-new condition. At Bright, each laptop undergoes rigorous testing, certified repairs, and deep cleaning to meet high-quality standards."
    },
    {
      question: "Are refurbished laptops reliable?",
      answer: "Yes. Every Bright laptop goes through strict quality checks, hardware diagnostics, and functionality tests before being approved for sale."
    },
    {
      question: "What is included with a refurbished laptop purchase?",
      answer: "Each Bright laptop includes a charger, detailed condition report, and a minimum 12-months warranty. Some models may also come with a free carry case."
    }
  ];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="py-8 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            {product.verified && (
              <Badge className="bg-green-500 hover:bg-green-600 mb-4">
                In Stock
              </Badge>
            )}
            
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
              <img
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                    currentImageIndex === idx ? 'border-black' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating & Views */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center bg-yellow-400 text-white px-3 py-1 rounded">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm ml-1 font-semibold">{product.rating} / 5.0</span>
                </div>
                <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Viewing Users */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <Eye className="w-4 h-4" />
                <span>{viewingUsers} people are viewing this right now</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-3 mb-2">
                <span className="text-4xl font-bold">₹{product.salePrice.toLocaleString()}</span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-base py-1">
                  {product.discount}% off
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Inclusive of 18% GST</p>
              <p className="text-sm">
                <span className="text-gray-600">MRP: </span>
                <span className="line-through text-gray-500">₹{product.originalPrice.toLocaleString()}</span>
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                <p className="text-xs font-medium">12 months warranty</p>
              </div>
              <div className="text-center">
                <Package className="w-6 h-6 mx-auto mb-1 text-green-600" />
                <p className="text-xs font-medium">Free 14-days returns</p>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                <p className="text-xs font-medium">24/7 Service</p>
              </div>
            </div>

            {/* Offers */}
            <div className="mb-6 space-y-3">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">No Cost EMI options available</h3>
                <p className="text-sm text-gray-600">Online approval in 2 minutes</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Multiple bank offers available</h3>
                <p className="text-sm text-gray-600">Choose from a range of Bank Offers!</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Exchange Offers on Old Laptops</h3>
                <p className="text-sm text-gray-600">Get up to 50% discount with an exchange!</p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Configuration Options */}
            <div className="space-y-6 mb-6">
              {/* RAM */}
              <div>
                <h3 className="font-semibold mb-3">RAM</h3>
                <div className="flex gap-3">
                  {['8GB', '16GB', '32GB'].map((ram) => (
                    <Button
                      key={ram}
                      variant={selectedRam === ram ? 'default' : 'outline'}
                      onClick={() => setSelectedRam(ram)}
                      className={selectedRam === ram ? 'bg-black text-white' : ''}
                    >
                      {ram}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div>
                <h3 className="font-semibold mb-3">Storage</h3>
                <div className="flex gap-3">
                  {['256GB', '512GB', '1TB'].map((storage) => (
                    <Button
                      key={storage}
                      variant={selectedStorage === storage ? 'default' : 'outline'}
                      onClick={() => setSelectedStorage(storage)}
                      className={selectedStorage === storage ? 'bg-black text-white' : ''}
                    >
                      {storage}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Warranty */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Warranty</h3>
                  <span className="text-sm text-blue-600 cursor-pointer">T&C</span>
                </div>
                <div className="space-y-2">
                  {[
                    { id: 'free-1-year', label: 'Free 1 year', price: 0 },
                    { id: 'extra-1-year', label: 'Extra 1 Year', price: 1499 },
                    { id: 'extra-2-years', label: 'Extra 2 Years', price: 2499 }
                  ].map((warranty) => (
                    <div
                      key={warranty.id}
                      onClick={() => setSelectedWarranty(warranty.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition ${
                        selectedWarranty === warranty.id ? 'border-black bg-gray-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={selectedWarranty === warranty.id}
                            onChange={() => setSelectedWarranty(warranty.id)}
                          />
                          <span className="font-medium">{warranty.label}</span>
                        </div>
                        {warranty.price > 0 && (
                          <span className="font-medium">₹{warranty.price}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-medium text-green-700">
                <Truck className="w-4 h-4 inline mr-2" />
                FREE Shipping by 18 December
              </p>
            </div>

            {/* B2B Pricing */}
            {quantity >= 10 && (
              <div className="mb-6 p-4 bg-bright-50 border-2 border-bright-500 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-bright-500 hover:bg-bright-600">B2B Pricing</Badge>
                  <span className="text-sm font-medium text-bright-700">MOQ: 10 units</span>
                </div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-black">₹{(product.salePrice * 0.85).toLocaleString()}</span>
                  <span className="text-sm text-gray-600">per unit</span>
                  <Badge variant="secondary" className="bg-bright-100 text-bright-700">
                    15% additional off
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Total: ₹{((product.salePrice * 0.85) * quantity).toLocaleString()} for {quantity} units
                </p>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {quantity < 10 && (
                  <span className="text-sm text-gray-600">
                    Order 10+ for B2B pricing
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 py-6 text-lg border-black text-black hover:bg-bright-50"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 bg-black hover:bg-gray-800 text-white py-6 text-lg"
                >
                  BUY NOW
                </Button>
              </div>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries({
                'Screen size': product.specs.screen || '14"',
                'Processor': product.specs.processor,
                'Generation': '4th Gen',
                'RAM': product.specs.ram,
                'Touch': 'No',
                'Storage': product.specs.storage
              }).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Check className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{key}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info Tabs */}
        <Tabs defaultValue="specification" className="mb-16">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="specification">Specification</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="specification" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8 p-6 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-bold text-lg mb-4">Display</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Screen diagonal</span>
                    <span className="font-medium">14"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resolution</span>
                    <span className="font-medium">1280x720</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Screen type</span>
                    <span className="font-medium">HD</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Processor</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">CPU</span>
                    <span className="font-medium">{product.specs.processor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Generation</span>
                    <span className="font-medium">4th</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Battery</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Power Backup</span>
                    <span className="font-medium">Upto 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Adapter</span>
                    <span className="font-medium">USB Adapter</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-6 p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              {product.name} features an {product.specs.processor} processor. Refurbished to perfection and ideal for professionals and students. 
              Comes with {product.specs.os} and a 12-months warranty. Lightweight, durable, and shipped free across India.
            </p>
          </TabsContent>
        </Tabs>

        {/* Testimonials */}
        <div className="mb-16 p-8 bg-gray-50 rounded-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Our Website</h3>
              <div className="text-5xl font-bold mb-2">{product.rating}</div>
              <div className="flex justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600">({product.reviews} Reviews)</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Google Reviews</h3>
              <div className="text-5xl font-bold mb-2">4.7</div>
              <div className="flex justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600">(593 Reviews)</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">Write a Review</Button>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Got Questions? We Have Answers</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-6">
            <Button variant="outline">View More</Button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={handleRelatedProductAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailEnhanced;
