import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Calendar, Clock } from 'lucide-react';

interface LeaveRequestFormProps {
  onSubmit: (data: {
    startDate: string;
    endDate: string;
    reason: string;
  }) => void;
  isLoading?: boolean;
}

export const LeaveRequestForm: React.FC<LeaveRequestFormProps> = ({
  onSubmit,
  isLoading = false
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<{
    startDate?: string;
    endDate?: string;
    reason?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      startDate?: string;
      endDate?: string;
      reason?: string;
    } = {};
    
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!endDate) {
      newErrors.endDate = 'End date is required';
    } else if (endDate < startDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (!reason) {
      newErrors.reason = 'Reason is required';
    } else if (reason.length < 10) {
      newErrors.reason = 'Reason must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        startDate,
        endDate,
        reason
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">Request Leave</h2>
        <p className="text-sm text-gray-500">Submit your leave application</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Start Date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              error={errors.startDate}
              fullWidth
              icon={<Calendar size={18} />}
            />
            
            <Input
              type="date"
              label="End Date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              error={errors.endDate}
              fullWidth
              icon={<Clock size={18} />}
            />
          </div>
          
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className={`block w-full px-4 py-2 rounded-md border ${
                errors.reason
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              placeholder="Please provide detailed reason for your leave request"
            />
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
            )}
          </div>
          
          <CardFooter className="px-0 pb-0 pt-4">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Submit Leave Request
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};