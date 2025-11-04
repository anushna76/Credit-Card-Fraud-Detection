import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Dashboard/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Dashboard/ui/select";
import { fraudMetrics } from '@/components/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function FraudMetricsChart() {
  const [timeRange, setTimeRange] = useState('7days');

  return (
    <Card className="col-span-1 lg:col-span-2 shadow-sm border border-gray-100">
      <CardHeader className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between">
        <CardTitle className="text-lg font-heading font-semibold text-gray-800">Fraud Detection Metrics</CardTitle>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <button className="p-1 rounded text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={fraudMetrics}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="normal" fill="#3B82F6" name="Normal Transactions" />
              <Bar dataKey="suspicious" fill="#EF4444" name="Suspicious Activity" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}