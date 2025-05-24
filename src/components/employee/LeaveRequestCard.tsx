import React from 'react';
import { LeaveRequest } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Calendar, Clock } from 'lucide-react';

interface LeaveRequestCardProps {
  leaveRequest: LeaveRequest;
}

export const LeaveRequestCard: React.FC<LeaveRequestCardProps> = ({ leaveRequest }) => {
  const getStatusColor = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <div>
          <div className="text-xs text-gray-500">
            Requested on {formatDate(leaveRequest.createdAt)}
          </div>
          <h3 className="text-lg font-medium">Leave Request</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(leaveRequest.status)}`}>
          {leaveRequest.status.charAt(0).toUpperCase() + leaveRequest.status.slice(1)}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar size={18} className="text-blue-500" />
            <div>
              <span className="text-sm text-gray-500">Duration: </span>
              <span>
                {formatDate(leaveRequest.startDate)} - {formatDate(leaveRequest.endDate)}
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Reason:</h4>
            <p className="text-sm text-gray-600 border-l-2 border-gray-200 pl-3 py-1">
              {leaveRequest.reason}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};