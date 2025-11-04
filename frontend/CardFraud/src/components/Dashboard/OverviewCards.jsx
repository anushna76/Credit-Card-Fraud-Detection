import { ArrowUp } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { dashboardStats } from '../data/mockData';
import { formatCurrency } from '../lib/util';

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Users Card */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-heading font-semibold text-gray-900 mt-1">
                {dashboardStats.totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm">
            <span className="text-green-600 flex items-center">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span className="font-medium">3.2%</span>
            </span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Fraud Alerts Card */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Fraud Alerts</p>
              <p className="text-2xl font-heading font-semibold text-gray-900 mt-1">
                {dashboardStats.fraudAlerts}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm">
            <span className="text-red-600 flex items-center">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span className="font-medium">12.5%</span>
            </span>
            <span className="text-gray-500 ml-2">from last week</span>
          </div>
        </CardContent>
      </Card>

      {/* Card Requests Card */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Card Requests</p>
              <p className="text-2xl font-heading font-semibold text-gray-900 mt-1">
                {dashboardStats.cardRequests}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm">
            <span className="text-green-600 flex items-center">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span className="font-medium">8.1%</span>
            </span>
            <span className="text-gray-500 ml-2">from yesterday</span>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Volume */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Transaction Volume</p>
              <p className="text-2xl font-heading font-semibold text-gray-900 mt-1">
                {formatCurrency(dashboardStats.transactionVolume)}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm">
            <span className="text-green-600 flex items-center">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span className="font-medium">2.3%</span>
            </span>
            <span className="text-gray-500 ml-2">from last week</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}