


import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Dashboard/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { fraudMetrics } from '@/components/data/mockData';

// Mock data for transaction volume by month
const transactionData = [
  { name: 'Jan', value: 4000000 },
  { name: 'Feb', value: 3000000 },
  { name: 'Mar', value: 2000000 },
  { name: 'Apr', value: 2780000 },
  { name: 'May', value: 1890000 },
  { name: 'Jun', value: 2390000 },
  { name: 'Jul', value: 3490000 },
  { name: 'Aug', value: 4000000 },
  { name: 'Sep', value: 3000000 },
  { name: 'Oct', value: 2000000 },
  { name: 'Nov', value: 2780000 },
  { name: 'Dec', value: 3890000 },
];

// Mock data for customer demographics
const customerDemographics = [
  { name: '18-24', value: 15 },
  { name: '25-34', value: 30 },
  { name: '35-44', value: 25 },
  { name: '45-54', value: 15 },
  { name: '55+', value: 15 },
];

// Colors for the demographics pie chart
const demographicColors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

export default function AnalyticsPage() {
  // Calculate stats dynamically
  const totalTransactionVolume = transactionData.reduce((sum, month) => sum + month.value, 0);
  const totalTransactionCount = 1400000; // As per the static data in the original JSX
  const averageTransactionSize = totalTransactionVolume / totalTransactionCount;

  return (
    <AppLayout title="Analytics Dashboard">
      <div className="space-y-6">
        {/* Transaction Volume Chart */}
        <Card className="shadow-sm border border-gray-100">
          <CardHeader className="px-5 py-4 border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-800">Transaction Volume Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transactionData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: '#6b7280' }} 
                    tickLine={false} 
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`}
                    tick={{ fontSize: 12, fill: '#6b7280' }} 
                    tickLine={false} 
                    axisLine={{ stroke: '#e5e7eb' }}
                    label={{ 
                      value: 'Amount (Millions)', 
                      angle: -90, 
                      position: 'insideLeft', 
                      offset: -5, 
                      fontSize: 12, 
                      fill: '#6b7280' 
                    }}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${(Number(value) / 1000000).toFixed(2)}M`, 'Transaction Volume']} 
                    labelStyle={{ fontSize: 12, color: '#374151' }}
                    itemStyle={{ fontSize: 12 }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="rect" 
                    iconSize={10} 
                    formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
                  />
                  <Bar 
                    dataKey="value" 
                    name="Transaction Volume" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]} 
                    barSize={20} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Transaction Volume</p>
                <p className="text-2xl font-semibold text-gray-800">
                  ₹{(totalTransactionVolume / 1000000000).toFixed(2)}B
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  7.2% Increase
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Average Transaction Size</p>
                <p className="text-2xl font-semibold text-gray-800">
                  ₹{Math.round(averageTransactionSize).toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  3.5% Increase
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Transaction Count</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {(totalTransactionCount / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  5.8% Increase
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Demographics and Fraud Trend Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Age Demographics */}
          <Card className="shadow-sm border border-gray-100">
            <CardHeader className="px-5 py-4 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-800">Customer Age Demographics</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerDemographics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerDemographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={demographicColors[index % demographicColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle" 
                      iconSize={10} 
                      formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Fraud Trend Analysis */}
          <Card className="shadow-sm border border-gray-100">
            <CardHeader className="px-5 py-4 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-800">Fraud Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={fraudMetrics}
                    margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: '#6b7280' }} 
                      tickLine={false} 
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#6b7280' }} 
                      tickLine={false} 
                      axisLine={{ stroke: '#e5e7eb' }}
                      label={{ 
                        value: 'Transactions', 
                        angle: -90, 
                        position: 'insideLeft', 
                        offset: -5, 
                        fontSize: 12, 
                        fill: '#6b7280' 
                      }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [value, name]} 
                      labelStyle={{ fontSize: 12, color: '#374151' }}
                      itemStyle={{ fontSize: 12 }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle" 
                      iconSize={10} 
                      formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="normal" 
                      stroke="#3B82F6" 
                      name="Normal Transactions" 
                      strokeWidth={2} 
                      dot={false} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="suspicious" 
                      stroke="#EF4444" 
                      name="Suspicious Activity" 
                      strokeWidth={2} 
                      dot={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}