// import { useState } from 'react';
// import AppLayout from '@/components/layout/AppLayout';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/Dashboard/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Dashboard/ui/tabs";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/Dashboard/ui/table";
// import { Input } from "@/components/Dashboard/ui/input";
// import { Button } from "@/components/Dashboard/ui/button";
// import { Checkbox } from "@/components/Dashboard/ui/checkbox";
// import { Badge } from "@/components/Dashboard/ui/badge";
// import { authorizationRequests } from '@/components/data/mockData';

// export default function AccountAuthorization() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedIds, setSelectedIds] = useState([]);
  
//   // Filter users based on search term
//   const filteredUsers = authorizationRequests.filter(user => 
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   // Handle checkbox selection
//   const handleSelectUser = (id) => {
//     setSelectedIds(prev => 
//       prev.includes(id) 
//         ? prev.filter(item => item !== id) 
//         : [...prev, id]
//     );
//   };
  
//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectedIds.length === filteredUsers.length) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(filteredUsers.map(user => user.id));
//     }
//   };
  
//   return (
//     <AppLayout title="Deposit  Authorization">
//       <div className="space-y-6">
//         <Card className="shadow-sm border border-gray-100">
//           <CardHeader className="px-5 py-4 border-b border-gray-100">
//             <CardTitle className="text-xl font-heading font-semibold text-gray-800">Account Authorization Management</CardTitle>
//           </CardHeader>
//           <CardContent className="p-6">
//             <Tabs defaultValue="new" className="w-full">
//               <TabsList className="grid grid-cols-3 mb-6">
//                 <TabsTrigger value="new">New Requests</TabsTrigger>
//                 <TabsTrigger value="approved">Approved Deposit</TabsTrigger>
//                 <TabsTrigger value="rejected">Rejected Deposit</TabsTrigger>
//               </TabsList>
              
//               <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                 <Input
//                   placeholder="Search by name or email..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="flex-1"
//                 />
//                 <div className="flex gap-2">
//                   <Button 
//                     variant="default" 
//                     disabled={selectedIds.length === 0}
//                     className="whitespace-nowrap"
//                   >
//                     Approve Selected
//                   </Button>
//                   <Button 
//                     variant="outline" 
//                     disabled={selectedIds.length === 0}
//                     className="whitespace-nowrap"
//                   >
//                     Reject Selected
//                   </Button>
//                 </div>
//               </div>
              
//               <TabsContent value="new" className="space-y-6">
//                 <Table>
//                   <TableHeader className="bg-gray-50">
//                     <TableRow>
//                       <TableHead className="w-[40px]">
//                         <Checkbox 
//                           checked={selectedIds.length === filteredUsers.length && filteredUsers.length > 0}
//                           onCheckedChange={handleSelectAll}
//                         />
//                       </TableHead>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Type</TableHead>
//                       <TableHead>Application Date</TableHead>
//                       <TableHead>KYC Status</TableHead>
//                       <TableHead>Risk Score</TableHead>
//                       <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredUsers.map((user) => (
//                       <TableRow key={user.id} className="hover:bg-gray-50">
//                         <TableCell>
//                           <Checkbox 
//                             checked={selectedIds.includes(user.id)}
//                             onCheckedChange={() => handleSelectUser(user.id)}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex items-center">
//                             <div className={`h-8 w-8 rounded-full ${user.avatarBg} flex items-center justify-center`}>
//                               <span className="font-medium text-teal-700">{user.avatarInitials}</span>
//                             </div>
//                             <div className="ml-3">
//                               <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                               <p className="text-xs text-gray-500">{user.email}</p>
//                             </div>
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           <Badge 
//                             className={`
//                               ${user.type === 'New Account' ? 'bg-blue-100 text-blue-800' : 
//                               user.type === 'Credit Card' ? 'bg-purple-100 text-purple-800' : 
//                               'bg-green-100 text-green-800'}
//                             `} 
//                             variant="outline"
//                           >
//                             {user.type}
//                           </Badge>
//                         </TableCell>
//                         <TableCell className="whitespace-nowrap text-sm text-gray-500">
//                           {new Date(user.date).toLocaleDateString('en-US', { 
//                             month: 'long', 
//                             day: 'numeric', 
//                             year: 'numeric'
//                           })}
//                         </TableCell>
//                         <TableCell>
//                           <Badge 
//                             className={`
//                               ${user.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' : 
//                               user.kycStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                               'bg-red-100 text-red-800'}
//                             `} 
//                             variant="outline"
//                           >
//                             {user.kycStatus}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex items-center">
//                             <span className={`
//                               text-sm font-medium
//                               ${user.riskScore === 'Low' ? 'text-green-700' : 
//                               user.riskScore === 'Medium' ? 'text-yellow-700' : 
//                               'text-red-700'}
//                             `}>
//                               {user.riskScore}
//                             </span>
//                             <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
//                               <div 
//                                 className={`
//                                   h-2 rounded-full
//                                   ${user.riskScore === 'Low' ? 'bg-green-500' : 
//                                   user.riskScore === 'Medium' ? 'bg-yellow-500' : 
//                                   'bg-red-500'}
//                                 `}
//                                 style={{ width: `${user.riskPercentage}%` }}
//                               ></div>
//                             </div>
//                           </div>
//                         </TableCell>
//                         <TableCell className="whitespace-nowrap text-right text-sm font-medium">
//                           <Button variant="outline" size="sm" className="mr-2">
//                             Review
//                           </Button>
//                           <Button variant="outline" size="sm" className="bg-green-50 text-green-700 hover:bg-green-100">
//                             Approve
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
                
//                 {filteredUsers.length === 0 && (
//                   <div className="text-center py-10">
//                     <p className="text-gray-500">No authorization requests found matching your criteria.</p>
//                   </div>
//                 )}
//               </TabsContent>
              
//               <TabsContent value="approved">
//                 <div className="text-center py-10">
//                   <p className="text-gray-500">No approved users yet.</p>
//                 </div>
//               </TabsContent>
              
//               <TabsContent value="rejected">
//                 <div className="text-center py-10">
//                   <p className="text-gray-500">No rejected requests yet.</p>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
        
//         <Card className="shadow-sm border border-gray-100">
//           <CardHeader className="px-5 py-4 border-b border-gray-100">
//             <CardTitle className="text-xl font-heading font-semibold text-gray-800">User Management Policies</CardTitle>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">KYC Requirements</h3>
//                 <ul className="space-y-2 list-disc pl-5">
//                   <li>Valid government-issued photo ID</li>
//                   <li>Proof of address (utility bill, not older than 3 months)</li>
//                   <li>PAN card for all financial transactions</li>
//                   <li>Biometric verification when in-person</li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Risk Assessment Criteria</h3>
//                 <ul className="space-y-2 list-disc pl-5">
//                   <li><strong>Low Risk:</strong> Full KYC, local address, stable income source</li>
//                   <li><strong>Medium Risk:</strong> Partial KYC, recent address change, irregular income</li>
//                   <li><strong>High Risk:</strong> Incomplete KYC, foreign national, PEP status</li>
//                 </ul>
//               </div>
//             </div>
            
//             <div className="mt-6">
//               <h3 className="text-lg font-semibold mb-2">Important Notice</h3>
//               <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
//                 <p className="text-blue-700">
//                   As per the updated RBI guidelines, all new account openings must undergo enhanced due diligence. 
//                   Make sure to verify all documents thoroughly before approval.
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </AppLayout>
//   );
// }

import { useState, useContext, useMemo } from 'react';
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
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/Dashboard/ui/input";
import { Button } from "@/components/Dashboard/ui/button";
import { Checkbox } from "@/components/Dashboard/ui/checkbox";
import { Badge } from "@/components/Dashboard/ui/badge";
import { AdminDataContext } from '@/components/Context/AdminContext';
import axios from 'axios';
export default function AccountAuthorization() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const { depositRequests, loading } = useContext(AdminDataContext);
  const{url}=useContext(AdminDataContext)
  // Memoize filtered requests for performance
  const filteredRequests = useMemo(() => {
    if (!depositRequests) return [];
    return depositRequests.filter(req => {
      const user = req.userId || {};
      return (
        (user.first?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.last?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [depositRequests, searchTerm]);

  // Split by status
  const newRequests = filteredRequests.filter(req => req.status === "pending");
  const approvedRequests = filteredRequests.filter(req => req.status === "approved");
  const rejectedRequests = filteredRequests.filter(req => req.status === "rejected");

  // Checkbox logic
  const handleSelectUser = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  const handleSelectAll = (requests) => {
    if (selectedIds.length === requests.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(requests.map(req => req._id));
    }
  };


   const handleApprove = async (depositId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${url}/admin/approve-deposit/${depositId}`,
        {status:"approved"},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Deposit approved and money credited to account.");
      // Option 1: Refetch depositRequests from backend (recommended for consistency)
      // Option 2: Remove/Update the approved request in local state:
      // setDepositRequests(prev => prev.map(req => req._id === depositId ? { ...req, status: "approved" } : req));
      window.location.reload(); // quick way to refresh, or trigger a refetch in context
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to approve deposit."
      );
    }
  };

  // Helper to render table rows
  const renderRows = (requests) => (
    requests.map((req) => {
      const user = req.userId || {};
      return (
        <TableRow key={req._id} className="hover:bg-gray-50">
          <TableCell>
            <Checkbox 
              checked={selectedIds.includes(req._id)}
              onCheckedChange={() => handleSelectUser(req._id)}
            />
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="font-medium text-teal-700">
                  {user.first?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.first} {user.last}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge className="bg-blue-100 text-blue-800" variant="outline">
              Deposit
            </Badge>
          </TableCell>
          <TableCell className="whitespace-nowrap text-sm text-gray-500">
            {new Date(req.createdAt).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric'
            })}
          </TableCell>
          <TableCell>
            <Badge 
              className={`
                ${req.status === 'approved' ? 'bg-green-100 text-green-800' : 
                  req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}
              `}
              variant="outline"
            >
              {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
            </Badge>
          </TableCell>
          <TableCell>
            <span className="text-sm font-medium text-gray-700">
              ₹{req.amount}
            </span>
          </TableCell>
          <TableCell className="whitespace-nowrap text-right text-sm font-medium">
            <Button variant="outline" size="sm" className="mr-2">
              Review
            </Button>
            {req.status === "pending" && (
              <Button  variant="outline" size="sm" className="bg-green-50 cursor-pointer text-green-700 hover:bg-green-100"  onClick={()=>handleApprove(req._id)}>
                Approve
              </Button>
            )}
          </TableCell>
        </TableRow>
      );
    })
  );

  return (
    <AppLayout title="Deposit Authorization">
      <div className="space-y-6">
        <Card className="shadow-sm border border-gray-100">
          <CardHeader className="px-5 py-4 border-b border-gray-100">
            <CardTitle className="text-xl font-heading font-semibold text-gray-800">Account Authorization Management</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="new" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="new">New Requests</TabsTrigger>
                <TabsTrigger value="approved">Approved Deposit</TabsTrigger>
                <TabsTrigger value="rejected">Rejected Deposit</TabsTrigger>
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
                  >
                    Approve Selected
                  </Button>
                  <Button 
                    variant="outline" 
                    disabled={selectedIds.length === 0}
                    className="whitespace-nowrap"
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
                          checked={selectedIds.length === newRequests.length && newRequests.length > 0}
                          onCheckedChange={() => handleSelectAll(newRequests)}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Application Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : (
                      newRequests.length > 0 ? renderRows(newRequests) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                            No new deposit requests found.
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="approved" className="space-y-6">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Application Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : (
                      approvedRequests.length > 0 ? renderRows(approvedRequests) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                            No approved deposits yet.
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="rejected" className="space-y-6">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Application Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : (
                      rejectedRequests.length > 0 ? renderRows(rejectedRequests) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                            No rejected deposits yet.
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <ToastContainer />
        {/* ...rest of your page (policies, etc.) ... */}
      </div>
      
    </AppLayout>
  );
}