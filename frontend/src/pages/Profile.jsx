
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClockIcon, PackageIcon, UserCircleIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';

const Profile = () => {
  const { user, isAuthenticated, loading, updateProfile, logout } = useAuth();
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [orders, setOrders] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/profile' } } });
    }

    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || ''
        }
      });

      loadOrders();
    }
  }, [user, isAuthenticated, loading, navigate]);

  const loadOrders = async () => {
    if (!isAuthenticated) return;

    try {
      setIsLoadingOrders(true);
      const orderData = await api.getUserOrders();
      setOrders(orderData);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      await updateProfile(profileForm);
    } catch (error) {
      console.error('Update profile error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <Button variant="outline" onClick={logout}>Sign out</Button>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-8 w-full justify-start">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserCircleIcon size={16} />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <PackageIcon size={16} />
                Order History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Address</h3>
                    <Separator className="mb-4" />
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          name="address.street"
                          value={profileForm.address.street}
                          onChange={handleChange}
                          placeholder="Street address"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="address.city"
                            value={profileForm.address.city}
                            onChange={handleChange}
                            placeholder="City"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province</Label>
                          <Input
                            id="state"
                            name="address.state"
                            value={profileForm.address.state}
                            onChange={handleChange}
                            placeholder="State or province"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip/Postal Code</Label>
                          <Input
                            id="zipCode"
                            name="address.zipCode"
                            value={profileForm.address.zipCode}
                            onChange={handleChange}
                            placeholder="ZIP or postal code"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order History</h2>
                
                {isLoadingOrders ? (
                  <div className="text-center py-8">Loading your orders...</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You haven't placed any orders yet.
                    </p>
                    <div className="mt-6">
                      <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                      >
                        Browse Menu
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="flex flex-col border rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-50 px-4 py-5 sm:px-6 flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              Order #{order._id.substring(order._id.length - 6)}
                            </h3>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                              <span>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              ${order.totalAmount.toFixed(2)}
                            </p>
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="border-t border-gray-200">
                          <dl>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Order Type
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {order.orderType}
                              </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Items
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                  {order.items.map((item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                    >
                                      <div className="flex items-center flex-1">
                                        <span className="ml-2 w-0 flex-1">
                                          {item.food.name} x {item.quantity}
                                        </span>
                                      </div>
                                      <div className="ml-4 flex-shrink-0">
                                        ${(item.price * item.quantity).toFixed(2)}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
