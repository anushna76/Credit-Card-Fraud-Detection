

import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Dashboard/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Dashboard/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/Dashboard/ui/table";
import { Input } from "@/components/Dashboard/ui/input";
import { Button } from "@/components/Dashboard/ui/button";
import { Checkbox } from "@/components/Dashboard/ui/checkbox";
import { Badge } from "@/components/Dashboard/ui/badge";
import { AdminDataContext } from '@/components/Context/AdminContext';

export default function UserAuthorizationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const { url, userRequests, setUserRequests } = useContext(AdminDataContext);

  // Filter users based on search term
  const filteredUsers = userRequests.filter(user => 
    (`${user.first} ${user.last}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Handle checkbox selection
  const handleSelectUser = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedIds.length === filteredUsers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredUsers.map(user => user._id));
    }
  };

  // Approve a single user
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
  // Approve selected users
  const handleApproveSelected = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      await Promise.all(selectedIds.map(userId =>
        axios.put(
          `${url}/admin/approve-account/${userId}`,
          { status: "approved" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      ));
      toast.success("Selected users approved!");
      setSelectedIds([]);
      if (typeof fetchUserRequests === "function") fetchUserRequests();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Approval failed. Please try again."
      );
    }
  };

  // Reject selected users (optional)
  const handleRejectSelected = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      await Promise.all(selectedIds.map(userId =>
        axios.put(
          `${url}/admin/approve-account/${userId}`,
          { status: "rejected" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      ));
      toast.success("Selected users rejected!");
      setSelectedIds([]);
      if (typeof fetchUserRequests === "function") fetchUserRequests();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Rejection failed. Please try again."
      );
    }
  };

  return (
    <AppLayout title="User Authorization">
      <div className="space-y-6">
        <Card className="shadow-sm border border-gray-100">
          <CardHeader className="px-5 py-4 border-b border-gray-100">
            <CardTitle className="text-xl font-heading font-semibold text-gray-800">User Authorization Management</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="new" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="new">New Requests</TabsTrigger>
                <TabsTrigger value="approved">Approved Users</TabsTrigger>
                <TabsTrigger value="rejected">Rejected Requests</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    disabled={selectedIds.length === 0}
                    className="whitespace-nowrap"
                    onClick={handleApproveSelected}
                  >
                    Approve Selected
                  </Button>
                  <Button 
                    variant="outline" 
                    disabled={selectedIds.length === 0}
                    className="whitespace-nowrap"
                    onClick={handleRejectSelected}
                  >
                    Reject Selected
                  </Button>
                </div>
              </div>
              
              <TabsContent value="new" className="space-y-6">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox 
                          checked={selectedIds.length === filteredUsers.length && filteredUsers.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Application Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user._id} className="hover:bg-gray-50">
                        <TableCell>
                          <Checkbox 
                            checked={selectedIds.includes(user._id)}
                            onCheckedChange={() => handleSelectUser(user._id)}
                          />
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
                          <Button variant="outline" size="sm" className="mr-2">
                            Review
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-green-50 cursor-pointer text-green-700 hover:bg-green-100"
                            onClick={() => handleApproveUser(user._id)}
                          >
                            Approve
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No authorization requests found matching your criteria.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="approved">
                <div className="text-center py-10">
                  <p className="text-gray-500">No approved users yet.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="rejected">
                <div className="text-center py-10">
                  <p className="text-gray-500">No rejected requests yet.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border border-gray-100">
          <CardHeader className="px-5 py-4 border-b border-gray-100">
            <CardTitle className="text-xl font-heading font-semibold text-gray-800">User Management Policies</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">KYC Requirements</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Valid government-issued photo ID</li>
                  <li>Proof of address (utility bill, not older than 3 months)</li>
                  <li>PAN card for all financial transactions</li>
                  <li>Biometric verification when in-person</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Risk Assessment Criteria</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li><strong>Low Risk:</strong> Full KYC, local address, stable income source</li>
                  <li><strong>Medium Risk:</strong> Partial KYC, recent address change, irregular income</li>
                  <li><strong>High Risk:</strong> Incomplete KYC, foreign national, PEP status</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Important Notice</h3>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-700">
                  As per the updated RBI guidelines, all new account openings must undergo enhanced due diligence. 
                  Make sure to verify all documents thoroughly before approval.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}