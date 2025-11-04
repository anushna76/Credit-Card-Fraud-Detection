

import { useContext } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Dashboard/ui/Card";
import { Button } from "@/components/Dashboard/ui/button";
import { Badge } from "@/components/Dashboard/ui/badge";
import { AdminDataContext } from "@/components/Context/AdminContext";

export default function CardRequestsPanel() {
  const { cardRequests = [] } = useContext(AdminDataContext);

  return (
    <Card className="shadow-sm border border-gray-100">
      <CardHeader className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <CardTitle className="text-lg font-heading font-semibold text-gray-800">Credit Card Requests</CardTitle>
        <Badge className="bg-green-100 text-green-800" variant="outline">
          {cardRequests.length} New
        </Badge>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        {cardRequests.map((request) => (
          <div key={request._id || request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center`}>
                <span className="font-medium text-blue-700">
                  {request.avatarInitials || (request.name ? request.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?')}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{request.name || request.cardholderName}</p>
                <p className="text-xs text-gray-500">{request.cardType || request.type}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded hover:bg-green-200 transition-colors">
                Approve
              </button>
              <button className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded hover:bg-red-200 transition-colors">
                Decline
              </button>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full mt-3">
          View All Requests
        </Button>
      </CardContent>
    </Card>
  );
} 