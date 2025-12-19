import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { getCart, getCartTotal } from '../mockData';
import { toast } from '../hooks/use-toast';

const Checkout = ({ onCartUpdate }) => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    addressType: 'Home'
  });
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleAddAddress = (e) => {
    e.preventDefault();
    const address = { ...newAddress, id: Date.now() };
    setAddresses([...addresses, address]);
    setNewAddress({
      name: '',
      phone: '',
      pincode: '',
      address: '',
      locality: '',
      city: '',
      state: '',
      addressType: 'Home'
    });
    setShowAddressForm(false);
    toast({
      title: "Address Added",
      description: "Your address has been saved successfully.",
    });
  };

  const handleProceed = () => {
    if (!selectedAddress && addresses.length === 0) {
      toast({
        title: "No Address Selected",
        description: "Please add and select a delivery address.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Order Placed",
      description: "Your order has been placed successfully!",
    });
    navigate('/profile');
  };

  const total = getCartTotal();
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.salePrice) * item.quantity), 0);

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/cart')}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <span>Home</span>
          <span>/</span>
          <span>Cart</span>
          <span>/</span>
          <span className="text-black font-medium">Address</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Address Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Address Button */}
            <Card>
              <CardContent className="p-6">
                {addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold mb-2">No addresses found :(</h3>
                    <p className="text-gray-600 mb-6">Add a delivery address to proceed</p>
                    <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
                      <DialogTrigger asChild>
                        <Button className="bg-black hover:bg-gray-800 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Address
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Add New Address</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddAddress} className="space-y-4 mt-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Full Name *</label>
                              <Input
                                value={newAddress.name}
                                onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                                placeholder="Enter your name"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Phone Number *</label>
                              <Input
                                value={newAddress.phone}
                                onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                                placeholder="10-digit mobile number"
                                required
                              />
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Pincode *</label>
                              <Input
                                value={newAddress.pincode}
                                onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                                placeholder="6-digit pincode"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">City *</label>
                              <Input
                                value={newAddress.city}
                                onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                                placeholder="Enter city"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Address (House No, Building, Street) *</label>
                            <Input
                              value={newAddress.address}
                              onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                              placeholder="Enter complete address"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Locality / Town *</label>
                            <Input
                              value={newAddress.locality}
                              onChange={(e) => setNewAddress({...newAddress, locality: e.target.value})}
                              placeholder="Enter locality"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">State *</label>
                            <Input
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                              placeholder="Enter state"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Address Type</label>
                            <div className="flex space-x-4">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="addressType"
                                  value="Home"
                                  checked={newAddress.addressType === 'Home'}
                                  onChange={(e) => setNewAddress({...newAddress, addressType: e.target.value})}
                                />
                                <span>Home</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="addressType"
                                  value="Work"
                                  checked={newAddress.addressType === 'Work'}
                                  onChange={(e) => setNewAddress({...newAddress, addressType: e.target.value})}
                                />
                                <span>Work</span>
                              </label>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => setShowAddressForm(false)}>
                              Cancel
                            </Button>
                            <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                              Save Address
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">Select Delivery Address</h2>
                      <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Add New Address</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleAddAddress} className="space-y-4 mt-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Full Name *</label>
                                <Input
                                  value={newAddress.name}
                                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                                  placeholder="Enter your name"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                <Input
                                  value={newAddress.phone}
                                  onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                                  placeholder="10-digit mobile number"
                                  required
                                />
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Pincode *</label>
                                <Input
                                  value={newAddress.pincode}
                                  onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                                  placeholder="6-digit pincode"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">City *</label>
                                <Input
                                  value={newAddress.city}
                                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                                  placeholder="Enter city"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Address (House No, Building, Street) *</label>
                              <Input
                                value={newAddress.address}
                                onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                                placeholder="Enter complete address"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Locality / Town *</label>
                              <Input
                                value={newAddress.locality}
                                onChange={(e) => setNewAddress({...newAddress, locality: e.target.value})}
                                placeholder="Enter locality"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">State *</label>
                              <Input
                                value={newAddress.state}
                                onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                                placeholder="Enter state"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Address Type</label>
                              <div className="flex space-x-4">
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    name="addressType"
                                    value="Home"
                                    checked={newAddress.addressType === 'Home'}
                                    onChange={(e) => setNewAddress({...newAddress, addressType: e.target.value})}
                                  />
                                  <span>Home</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    name="addressType"
                                    value="Work"
                                    checked={newAddress.addressType === 'Work'}
                                    onChange={(e) => setNewAddress({...newAddress, addressType: e.target.value})}
                                  />
                                  <span>Work</span>
                                </label>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                              <Button type="button" variant="outline" onClick={() => setShowAddressForm(false)}>
                                Cancel
                              </Button>
                              <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                                Save Address
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <Card
                          key={address.id}
                          className={`cursor-pointer transition ${selectedAddress?.id === address.id ? 'border-black border-2' : 'border-gray-200'}`}
                          onClick={() => setSelectedAddress(address)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <input
                                type="radio"
                                checked={selectedAddress?.id === address.id}
                                onChange={() => setSelectedAddress(address)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="font-bold">{address.name}</span>
                                  <span className="bg-gray-200 text-xs px-2 py-1 rounded">{address.addressType}</span>
                                </div>
                                <p className="text-sm text-gray-700 mb-1">
                                  {address.address}, {address.locality}
                                </p>
                                <p className="text-sm text-gray-700 mb-1">
                                  {address.city}, {address.state} - {address.pincode}
                                </p>
                                <p className="text-sm text-gray-600">Phone: {address.phone}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Product Information & Review</h2>
                
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-4 mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm line-clamp-2 mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-600 mb-1">{item.specs.storage}, {item.specs.ram}</p>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">₹{item.salePrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}

                <Separator className="my-6" />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{(total + savings).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon Applied</span>
                    <span className="font-semibold">₹0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <Button
                  onClick={handleProceed}
                  className="w-full bg-black hover:bg-gray-800 text-white py-6"
                  disabled={addresses.length === 0}
                >
                  Proceed
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-600 flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    100% Secured Payments
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;