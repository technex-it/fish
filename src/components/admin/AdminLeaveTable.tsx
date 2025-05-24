import React from 'react';
import { LeaveRequest } from '../../types';
import { Button } from '../ui/Button';
import { Check, X } from 'lucide-react';

interface AdminLeaveTableProps {
  leaveRequests: LeaveRequest[];
  onUpdateStatus: (requestId: string, status: 'approved' | 'rejected') => void;
}

export const AdminLeaveTable: React.FC<AdminLeaveTableProps> = ({
  leaveRequests,
  onUpdateStatus
}) => {
  const getStatusColorClass = (status: LeaveRequest['status']) => {
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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reason
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leaveRequests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {request.employeeName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(request.startDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(request.endDate)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {request.reason}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {request.status === 'pending' ? (
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => onUpdateStatus(request.id, 'approved')}
                      variant="success"
                      size="sm"
                      icon={<Check size={16} />}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => onUpdateStatus(request.id, 'rejected')}
                      variant="danger"
                      size="sm"
                      icon={<X size={16} />}
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="text-gray-500">
                    {request.status === 'approved' ? 'Approved' : 'Rejected'}
                  </span>
                )}
              </td>
            </tr>
          ))}
          {leaveRequests.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                No leave requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};