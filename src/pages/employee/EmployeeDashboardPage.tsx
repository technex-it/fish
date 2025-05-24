import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockLeaveRequests } from '../../data/mockData';
import { CalendarDays, Clock, UserCheck, FileCheck } from 'lucide-react';

export const EmployeeDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const pendingLeaveRequests = mockLeaveRequests.filter(request => request.status === 'pending');
  const approvedLeaveRequests = mockLeaveRequests.filter(request => request.status === 'approved');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
            <p className="text-gray-600">Here's what's happening with your employee portal today.</p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Pending Leaves</p>
                    <p className="text-3xl font-bold">{pendingLeaveRequests.length}</p>
                  </div>
                  <div className="p-3 bg-blue-400 bg-opacity-30 rounded-full">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Approved Leaves</p>
                    <p className="text-3xl font-bold">{approvedLeaveRequests.length}</p>
                  </div>
                  <div className="p-3 bg-green-400 bg-opacity-30 rounded-full">
                    <UserCheck className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Remaining Leave Days</p>
                    <p className="text-3xl font-bold">14</p>
                  </div>
                  <div className="p-3 bg-purple-400 bg-opacity-30 rounded-full">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Leave Requests */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Leave Requests</h2>
                <Link to="/leave">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {mockLeaveRequests.slice(0, 3).map((request) => (
                      <div key={request.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <CalendarDays className="h-10 w-10 text-blue-500" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-500 truncate max-w-xs">
                                {request.reason}
                              </p>
                            </div>
                          </div>
                          <div>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              request.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {mockLeaveRequests.length === 0 && (
                      <div className="p-4 text-center text-gray-500">
                        <p>No leave requests yet.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Company Announcements */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Company Announcements</h2>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <FileCheck className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            New Holiday Schedule
                          </p>
                          <p className="text-sm text-gray-500 mb-1">
                            The updated holiday schedule for the upcoming year has been released.
                          </p>
                          <p className="text-xs text-gray-400">
                            Posted on May 15, 2025
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <FileCheck className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            Employee Benefits Update
                          </p>
                          <p className="text-sm text-gray-500 mb-1">
                            We've enhanced our health insurance coverage and added new wellness benefits.
                          </p>
                          <p className="text-xs text-gray-400">
                            Posted on May 10, 2025
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <FileCheck className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            Quarterly Meeting
                          </p>
                          <p className="text-sm text-gray-500 mb-1">
                            The Q2 company meeting will be held on June 1st at 10:00 AM. All employees are required to attend.
                          </p>
                          <p className="text-xs text-gray-400">
                            Posted on May 5, 2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};