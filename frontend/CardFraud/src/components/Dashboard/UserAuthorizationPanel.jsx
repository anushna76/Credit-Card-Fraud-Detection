

import { useContext } from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/Dashboard/ui/Card";
import { Button } from "@/components/Dashboard/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/Dashboard/ui/table";
import { Checkbox } from "@/components/Dashboard/ui/checkbox";
import { Badge } from "@/components/Dashboard/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Dashboard/ui/select";
import { AdminDataContext } from "../Context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserAuthorizationPanel() {
  const { url, userRequests, setUserRequests } = useContext(AdminDataContext);

  
  
  const handleApproveUser = async (userId) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await axios.put(
        `${url}/admin/approve-account/${userId}`,
        { status: "approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "User approved!");
      setUserRequests(prev => prev.filter(user => user._id !== userId));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Approval failed. Please try again."
      );
    }
  };

  return (
    <Card className="shadow-sm border border-gray-100 mb-6">
      <CardHeader className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <CardTitle className="text-lg font-heading font-semibold text-gray-800">New User Authorizations</CardTitle>
        <div className="flex space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="account">Account Opening</SelectItem>
              <SelectItem value="service">Service Activation</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            Authorize All
          </Button>
        </div>
      </CardHeader>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Application Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userRequests.map((user) => (
              <TableRow key={user._id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{user.first} {user.last}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-gray-500">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric'
                  }) : "N/A"}
                </TableCell>
                <TableCell>
                  <Badge 
                    className={
                      user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      user.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    } 
                    variant="outline"
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleApproveUser(user._id)} className="text-green-600 hover:text-green-900">Approve</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CardFooter className="px-5 py-3 border-t border-gray-200">
        <Button variant="outline" className="w-full">
          View All Authorization Requests
        </Button>
      </CardFooter>
    </Card>
  );
}