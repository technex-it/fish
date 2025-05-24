import React, { useState } from 'react';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { AdminLeaveTable } from '../../components/admin/AdminLeaveTable';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { mockLeaveRequests } from '../../data/mockData';
import { LeaveRequest } from '../../types';

export const AdminLeavePage: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  
  const handleUpdateStatus = (requestId: string, status: 'approved' | 'rejected') => {
    setLeaveRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === requestId ? { ...request, status } : request
      )
    );
  };
  
  // Calculate some basic stats
  const pendingRequests = leaveRequests.filter(req => req.status === 'pending').length;
  const approvedRequests = leaveRequests.filter(req => req.status === 'approved').length;
  const rejectedRequests = leaveRequests.filter(req => req.status === 'rejected').length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Leave Management</h1>
            <p className="text-gray-600">Review and manage employee leave requests.</p>
          </div>
          
          {/* Leave Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-yellow-50 border border-yellow-100">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingRequests}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border border-green-100">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-600">Approved Requests</p>
                <p className="text-3xl font-bold text-green-600">{approvedRequests}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50 border border-red-100">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-600">Rejected Requests</p>
                <p className="text-3xl font-bold text-red-600">{rejectedRequests}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Leave Requests Table */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">All Leave Requests</h2>
            </CardHeader>
            
            <CardContent className="p-0">
              <AdminLeaveTable 
                leaveRequests={leaveRequests} 
                onUpdateStatus={handleUpdateStatus} 
              />
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};