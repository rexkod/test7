import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, LogOut, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { sampleOrders, sampleAddresses } from '../mockData';

const Profile = () => {
  const [user] = useState({
    name: 'Rex',
    email: 'ajcrex@gmail.com',
    phone: '9066669966',
    gender: 'Male',
    city: '-'
  });

  const orders = sampleOrders;
  const addresses = sampleAddresses;

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center mb-4">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="font-medium">
                      <span className="mr-2">🇮🇳</span>
                      {user.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Gender</p>
                    <p className="font-medium">{user.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">City</p>
                    <p className="font-medium">{user.city}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Orders and Addresses */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="orders">My Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="mt-6">
                {orders.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="mb-6">
                        <Package className="w-24 h-24 mx-auto text-gray-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">No orders yet.</h3>
                      <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                      <Link to="/all-products">
                        <Button className="bg-black hover:bg-gray-800 text-white">
                          Start Shopping
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Link key={order.id} to={`/order/${order.id}`}>
                        <Card className="hover:shadow-lg transition cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="font-bold text-lg">{order.id}</h3>
                                  <Badge className={`${
                                    order.status === 'Delivered' ? 'bg-green-500' :
                                    order.status === 'In Transit' ? 'bg-blue-500' :
                                    'bg-orange-500'
                                  } text-white`}>
                                    {order.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">Ordered on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                            
                            <div className="flex items-center space-x-4 mb-4">
                              <img
                                src={order.items[0].image}
                                alt={order.items[0].name}
                                className="w-20 h-20 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold line-clamp-1">{order.items[0].name}</h4>
                                <p className="text-sm text-gray-600">Quantity: {order.items[0].quantity}</p>
                                {order.items[0].pricingType === 'B2B' && (
                                  <Badge className="bg-orange-100 text-orange-700 text-xs mt-1">B2B Order</Badge>
                                )}
                              </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Total Amount</p>
                                <p className="text-xl font-bold">₹{order.total.toLocaleString()}</p>
                              </div>
                              <Button variant="outline">View Details</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="addresses" className="mt-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="mb-6">
                      <MapPin className="w-24 h-24 mx-auto text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No addresses found</h3>
                    <p className="text-gray-600 mb-6">Add a delivery address</p>
                    <Button className="bg-black hover:bg-gray-800 text-white">
                      Add Address
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;