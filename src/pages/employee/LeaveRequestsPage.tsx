import React, { useState } from 'react';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { LeaveRequestForm } from '../../components/employee/LeaveRequestForm';
import { LeaveRequestCard } from '../../components/employee/LeaveRequestCard';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { mockLeaveRequests } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { LeaveRequest } from '../../types';
import { CalendarDays } from 'lucide-react';

export const LeaveRequestsPage: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter leave requests for the current employee
  const employeeRequests = requests.filter(request => request.employeeId === user?.id);

  const handleSubmitLeaveRequest = (data: {
    startDate: string;
    endDate: string;
    reason: string;
  }) => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newRequest: LeaveRequest = {
        id: String(requests.length + 1),
        employeeId: user?.id || '',
        employeeName: user?.name || '',
        startDate: data.startDate,
        endDate: data.endDate,
        reason: data.reason,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      setRequests(prev => [newRequest, ...prev]);
      setIsSubmitting(false);
      
      alert('Leave request submitted successfully!');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Leave Requests</h1>
            <p className="text-gray-600">Submit and track your leave applications.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Leave Request Form */}
            <div className="lg:col-span-1">
              <LeaveRequestForm onSubmit={handleSubmitLeaveRequest} isLoading={isSubmitting} />
            </div>
            
            {/* Leave Request History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-800">Leave Request History</h2>
                </CardHeader>
                
                <CardContent>
                  {employeeRequests.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {employeeRequests.map(request => (
                        <LeaveRequestCard key={request.id} leaveRequest={request} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                        <CalendarDays className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-gray-500">
                        You haven't submitted any leave requests yet.
                      </p>
                    </div>
                  )}
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