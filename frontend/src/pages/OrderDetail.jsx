import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, Package, MapPin, Phone, CheckCircle, Circle, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { sampleOrders } from '../mockData';
import { toast } from '../hooks/use-toast';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const foundOrder = sampleOrders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId]);

  const handleDownloadInvoice = () => {
    toast({
      title: "Downloading Invoice",
      description: "Your invoice is being prepared for download.",
    });
    // In a real app, this would trigger PDF download
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  const statusColors = {
    'Delivered': 'bg-green-500',
    'In Transit': 'bg-blue-500',
    'Processing': 'bg-orange-500',
    'Cancelled': 'bg-red-500'
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/profile')}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">Order {order.id}</h1>
                    <p className="text-gray-600">
                      Placed on {new Date(order.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <Badge className={`${statusColors[order.status] || 'bg-gray-500'} text-white text-base py-1 px-4`}>
                    {order.status}
                  </Badge>
                </div>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadInvoice}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                    <Button variant="outline" className="flex-1">
                      Cancel Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Track Shipment</h2>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Tracking Number</p>
                    <p className="font-mono font-semibold">{order.trackingNumber}</p>
                  </div>
                </div>

                {order.deliveredDate ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 font-medium">
                      ✓ Delivered on {new Date(order.deliveredDate).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800 font-medium">
                      <Truck className="w-4 h-4 inline mr-2" />
                      Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                )}

                <div className="space-y-6">
                  {order.timeline.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-500 fill-current" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-300" />
                        )}
                        {index < order.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                        )}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <h3 className={`font-semibold ${step.completed ? 'text-black' : 'text-gray-400'}`}>
                          {step.status}
                        </h3>
                        <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                          <div className="flex items-center space-x-2">
                            {item.pricingType === 'B2B' ? (
                              <Badge className="bg-orange-500 text-white text-xs">B2B Pricing</Badge>
                            ) : (
                              <Badge className="bg-blue-500 text-white text-xs">B2C Pricing</Badge>
                            )}
                            <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                          <p className="text-sm text-gray-600">₹{item.price.toLocaleString()} each</p>
                        </div>
                      </div>
                      {index < order.items.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-semibold text-green-600">-₹{order.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Address
                </h2>
                <div className="text-sm space-y-1">
                  <p className="font-semibold">{order.shippingAddress.name}</p>
                  <p className="text-gray-700">{order.shippingAddress.address}</p>
                  <p className="text-gray-700">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  <p className="text-gray-700">{order.shippingAddress.pincode}</p>
                  <p className="text-gray-600 flex items-center mt-2">
                    <Phone className="w-4 h-4 mr-1" />
                    {order.shippingAddress.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Need Help?</h2>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Return/Replace Items
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
