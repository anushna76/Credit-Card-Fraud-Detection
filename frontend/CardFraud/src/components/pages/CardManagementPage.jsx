// import { useState } from 'react';
// import AppLayout from '@/components/layout/AppLayout';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/Dashboard/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Dashboard/ui/tabs";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/Dashboard/ui/table";
// import { 
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/Dashboard/ui/select";
// import { Badge } from "@/components/Dashboard/ui/badge";
// import { Button } from "@/components/Dashboard/ui/button";
// import { Input } from "@/components/Dashboard/ui/input";
// import { cardRequests } from '@/components/data/mockData';
// import { useContext } from 'react';
// import { AdminDataContext } from '../Context/AdminContext';

// export default function CardManagementPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [activeTab, setActiveTab] = useState('pending');
//   const {cardRequests}=useContext(AdminDataContext)

//   // Filter card requests based on search term, status filter, and active tab
//   const filteredRequests = cardRequests.filter(request => {
//     const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatusFilter = statusFilter === 'all' || request.status.toLowerCase() === statusFilter;
//     const matchesTab = request.status.toLowerCase() === activeTab;
//     return matchesSearch && matchesStatusFilter && matchesTab;
//   });

//   // Count stats for the Card Issuance Reports
//   const totalPending = cardRequests.filter(r => r.status === 'Pending').length;
//   const approvedThisMonth = cardRequests.filter(r => {
//     const requestDate = new Date(r.date);
//     return r.status === 'Approved' && 
//            requestDate.getMonth() === 4 && // May (0-based index)
//            requestDate.getFullYear() === 2025;
//   }).length;
//   const declinedThisMonth = cardRequests.filter(r => {
//     const requestDate = new Date(r.date);
//     return r.status === 'Declined' && 
//            requestDate.getMonth() === 4 && 
//            requestDate.getFullYear() === 2025;
//   }).length;

//   return (
//     <AppLayout title="Card Management">
//       <div className="space-y-6">
//         <Card className="shadow-sm border border-gray-100">
//           <CardHeader className="px-5 py-4 border-b border-gray-100">
//             <CardTitle className="text-xl font-heading font-semibold text-gray-800">Card Management Dashboard</CardTitle>
//           </CardHeader>
//           <CardContent className="p-6">
//             <Tabs 
//               value={activeTab} 
//               onValueChange={setActiveTab} 
//               className="w-full"
//             >
//               <TabsList className="grid grid-cols-3 mb-6">
//                 <TabsTrigger value="pending">Pending Requests</TabsTrigger>
//                 <TabsTrigger value="approved">Approved Cards</TabsTrigger>
//                 <TabsTrigger value="declined">Declined Requests</TabsTrigger>
//               </TabsList>
              
//               <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                 <div className="flex-1">
//                   <Input
//                     placeholder="Search by customer name..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full"
//                   />
//                 </div>
//                 <div className="w-40">
//                   <Select value={statusFilter} onValueChange={setStatusFilter}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Filter by status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Statuses</SelectItem>
//                       <SelectItem value="pending">Pending</SelectItem>
//                       <SelectItem value="approved">Approved</SelectItem>
//                       <SelectItem value="declined">Declined</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
              
//               <TabsContent value="pending" className="space-y-6">
//                 <Table>
//                   <TableHeader className="bg-gray-50">
//                     <TableRow>
//                       <TableHead>Customer</TableHead>
//                       <TableHead>Card Type</TableHead>
//                       <TableHead>Application Date</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredRequests.map((request) => (
//                       <TableRow key={request.id}>
//                         <TableCell>
//                           <div className="flex items-center">
//                             <div className={`h-10 w-10 rounded-full ${request.avatarBg} flex items-center justify-center`}>
//                               <span className="font-medium text-blue-700">{request.avatarInitials}</span>
//                             </div>
//                             <div className="ml-3">
//                               <p className="text-sm font-medium text-gray-900">{request.name}</p>
//                               <p className="text-xs text-gray-500">ID: {request.id}</p>
//                             </div>
//                           </div>
//                         </TableCell>
//                         <TableCell>{request.cardType}</TableCell>
//                         <TableCell>
//                           {new Date(request.date).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric"
//                           })}
//                         </TableCell>
//                         <TableCell>
//                           <Badge 
//                             className={`
//                               ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                               request.status === 'Approved' ? 'bg-green-100 text-green-800' : 
//                               'bg-red-100 text-red-800'}
//                             `} 
//                             variant="outline"
//                           >
//                             {request.status}
//                           </Badge>
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <Button 
//                             variant="outline" 
//                             size="sm" 
//                             className="mr-2 bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
//                           >
//                             Approve
//                           </Button>
//                           <Button 
//                             variant="outline" 
//                             size="sm" 
//                             className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200"
//                           >
//                             Decline
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
                
//                 {filteredRequests.length === 0 && (
//                   <div className="text-center py-10">
//                     <p className="text-gray-500">No card requests found matching your criteria.</p>
//                   </div>
//                 )}
//               </TabsContent>
              
//               <TabsContent value="approved">
//                 <Table>
//                   <TableHeader className="bg-gray-50">
//                     <TableRow>
//                       <TableHead>Customer</TableHead>
//                       <TableHead>Card Type</TableHead>
//                       <TableHead>Approval Date</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredRequests.map((request) => (
//                       <TableRow key={request.id}>
//                         <TableCell>
//                           <div className="flex items-center">
//                             <div className={`h-10 w-10 rounded-full ${request.avatarBg} flex items-center justify-center`}>
//                               <span className="font-medium text-blue-700">{request.avatarInitials}</span>
//                             </div>
//                             <div className="ml-3">
//                               <p className="text-sm font-medium text-gray-900">{request.name}</p>
//                               <p className="text-xs text-gray-500">ID: {request.id}</p>
//                             </div>
//                           </div>
//                         </TableCell>
//                         <TableCell>{request.cardType}</TableCell>
//                         <TableCell>
//                           {new Date(request.date).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric"
//                           })}
//                         </TableCell>
//                         <TableCell>
//                           <Badge 
//                             className="bg-green-100 text-green-800"
//                             variant="outline"
//                           >
//                             {request.status}
//                           </Badge>
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <Button 
//                             variant="outline" 
//                             size="sm" 
//                             className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
//                           >
//                             View Details
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
                
//                 {filteredRequests.length === 0 && (
//                   <div className="text-center py-10">
//                     <p className="text-gray-500">No approved cards yet.</p>
//                   </div>
//                 )}
//               </TabsContent>
              
//               <TabsContent value="declined">
//                 <Table>
//                   <TableHeader className="bg-gray-50">
//                     <TableRow>
//                       <TableHead>Customer</TableHead>
//                       <TableHead>Card Type</TableHead>
//                       <TableHead>Declined Date</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredRequests.map((request) => (
//                       <TableRow key={request.id}>
//                         <TableCell>
//                           <div className="flex items-center">
//                             <div className={`h-10 w-10 rounded-full ${request.avatarBg} flex items-center justify-center`}>
//                               <span className="font-medium text-blue-700">{request.avatarInitials}</span>
//                             </div>
//                             <div className="ml-3">
//                               <p className="text-sm font-medium text-gray-900">{request.name}</p>
//                               <p className="text-xs text-gray-500">ID: {request.id}</p>
//                             </div>
//                           </div>
//                         </TableCell>
//                         <TableCell>{request.cardType}</TableCell>
//                         <TableCell>
//                           {new Date(request.date).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric"
//                           })}
//                         </TableCell>
//                         <TableCell>
//                           <Badge 
//                             className="bg-red-100 text-red-800"
//                             variant="outline"
//                           >
//                             {request.status}
//                           </Badge>
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <Button 
//                             variant="outline" 
//                             size="sm" 
//                             className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
//                           >
//                             View Details
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
                
//                 {filteredRequests.length === 0 && (
//                   <div className="text-center py-10">
//                     <p className="text-gray-500">No declined requests yet.</p>
//                   </div>
//                 )}
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
        
//         <Card className="shadow-sm border border-gray-100">
//           <CardHeader className="px-5 py-4 border-b border-gray-100">
//             <CardTitle className="text-xl font-heading font-semibold text-gray-800">Card Issuance Reports</CardTitle>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-gray-50 rounded-lg p-4 text-center">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-1">Total Pending</h3>
//                 <p className="text-2xl font-bold text-blue-600">{totalPending}</p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-4 text-center">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-1">Approved This Month</h3>
//                 <p className="text-2xl font-bold text-green-600">{approvedThisMonth}</p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-4 text-center">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-1">Declined This Month</h3>
//                 <p className="text-2xl font-bold text-red-600">{declinedThisMonth}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </AppLayout>
//   );
// }

import { useState, useContext } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Dashboard/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Dashboard/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/Dashboard/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/Dashboard/ui/select";
import { Badge } from "@/components/Dashboard/ui/badge";
import { Button } from "@/components/Dashboard/ui/button";
import { Input } from "@/components/Dashboard/ui/input";
import { AdminDataContext } from '../Context/AdminContext';
import axios from "axios";
import { toast } from "react-toastify";

export default function CardManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('pending');
  const { cardRequests = [] ,useraccount=[]} = useContext(AdminDataContext);

  // Modal state for approval
  const [showModal, setShowModal] = useState(false);
  const [modalRequestId, setModalRequestId] = useState(null);
  const [modalCardLimit, setModalCardLimit] = useState('');
  const [modalExpiry, setModalExpiry] = useState('');
  const{url}=useContext(AdminDataContext)

  // Open modal for approval
  const openApproveModal = (id) => {
    setModalRequestId(id);
    setModalCardLimit('');
    setModalExpiry('');
    setShowModal(true);
  };

  // Approve with card limit and expiry
  const handleApprove = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${url}/admin/approve-card/${modalRequestId}`,
        {
          status: "approved",
          cardLimit: modalCardLimit,
          cardExpiryDate: modalExpiry,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Card request approved.");
      setShowModal(false);
      setModalRequestId(null);
      setModalCardLimit('');
      setModalExpiry('');
      // Optionally refresh data here
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve card.");
    }
  };

  // Decline handler
  const handleDecline = async (requestId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${url}/admin/approve-card/${requestId}`,
        { status: "declined" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Card request declined.");
      // Optionally refresh data here
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to decline card.");
    }
  };

  // Filter card requests based on search term, status filter, and active tab
  const filteredRequests = cardRequests.filter(request => {
    const matchesSearch = (request.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatusFilter = statusFilter === 'all' || request.status.toLowerCase() === statusFilter;
    const matchesTab = request.status.toLowerCase() === activeTab;
    return matchesSearch && matchesStatusFilter && matchesTab;
  });

  // Count stats for the Card Issuance Reports
const totalPending = cardRequests.filter(r => r.status === 'pending').length;
 const now = new Date();
const thisMonth = now.getMonth();
const thisYear = now.getFullYear();


// const totalPending = cardRequests.filter(r => r.status?.toLowerCase() === 'pending').length;
 const approvedThisMonth = cardRequests.filter(r => r.status === 'approved').length;
// const approvedThisMonth = cardRequests.filter(r => {
//   const requestDate = new Date(r.date || r.createdAt);
//   return r.status?.toLowerCase() === 'approved' &&
//     requestDate.getMonth() === thisMonth &&
//     requestDate.getFullYear() === thisYear;
// }).length;
const declinedThisMonth = cardRequests.filter(r => r.status === 'rejected').length;
// const declinedThisMonth = cardRequests.filter(r => {
//   const requestDate = new Date(r.date || r.createdAt);
//   return (r.status?.toLowerCase() === 'rejected' || r.status?.toLowerCase() === 'rejected') &&
//     requestDate.getMonth() === thisMonth &&
//     requestDate.getFullYear() === thisYear;
// }).length;

  return (
    <AppLayout title="Card Management">
      {/* Modal for approval */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Approve Card Request</h2>
            <div className="mb-3">
              <label className="block mb-1 text-sm font-medium">Card Limit</label>
              <input
                type="number"
                className="w-full border rounded p-2"
                value={modalCardLimit}
                onChange={e => setModalCardLimit(e.target.value)}
                placeholder="Enter card limit"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 text-sm font-medium">Expiry Date</label>
              <input
                type="date"
                className="w-full border rounded p-2"
                value={modalExpiry}
                onChange={e => setModalExpiry(e.target.value)}
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-green-600 text-white"
                onClick={handleApprove}
                disabled={!modalCardLimit || !modalExpiry}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <Card className="shadow-sm border border-gray-100">
          <CardHeader className="px-5 py-4 border-b border-gray-100">
            <CardTitle className="text-xl font-heading font-semibold text-gray-800">Card Management Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="pending">Pending Requests</TabsTrigger>
                <TabsTrigger value="approved">Approved Cards</TabsTrigger>
                <TabsTrigger value="declined">Declined Requests</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by customer name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value="pending" className="space-y-6">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Card Type</TableHead>
                      <TableHead>Application Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`h-10 w-10 rounded-full ${request.avatarBg} flex items-center justify-center`}>
                              <span className="font-medium text-blue-700">{request.avatarInitials}</span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{request.name}</p>
                              <p className="text-xs text-gray-500">ID: {request._id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{request.cardType}</TableCell>
                        <TableCell>
                          {new Date(request.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={`
                              ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              request.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                              'bg-red-100 text-red-800'}
                            `} 
                            variant="outline"
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mr-2 bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
                            onClick={() => openApproveModal(request._id)}
                            disabled={request.status?.toLowerCase() !== "pending"}
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200"
                            onClick={() => handleDecline(request._id)}
                            disabled={request.status?.toLowerCase() !== "pending"}
                          >
                            Decline
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredRequests.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No card requests found matching your criteria.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="approved">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Card Type</TableHead>
                      <TableHead>Approval Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`h-10 w-10 rounded-full ${request.avatarBg} flex items-center justify-center`}>
                              <span className="font-medium text-blue-700">{request.avatarInitials}</span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{request.name}</p>
                              <p className="text-xs text-gray-500">ID: {request.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{request.cardType}</TableCell>
                        <TableCell>
                          {new Date(request.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className="bg-green-100 text-green-800"
                            variant="outline"
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredRequests.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No approved cards yet.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="declined">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Card Type</TableHead>
                      <TableHead>Declined Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`h-10 w-10 rounded-full ${request.avatarBg} flex items-center justify-center`}>
                              <span className="font-medium text-blue-700">{request.avatarInitials}</span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{request.name}</p>
                              <p className="text-xs text-gray-500">ID: {request.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{request.cardType}</TableCell>
                        <TableCell>
                          {new Date(request.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className="bg-red-100 text-red-800"
                            variant="outline"
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredRequests.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No declined requests yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border border-gray-100">
          <CardHeader className="px-5 py-4 border-b border-gray-100">
            <CardTitle className="text-xl font-heading font-semibold text-gray-800">Card Issuance Reports</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Total Pending</h3>
                <p className="text-2xl font-bold text-blue-600">{totalPending}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Approved This Month</h3>
                <p className="text-2xl font-bold text-green-600">{approvedThisMonth}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Declined This Month</h3>
                <p className="text-2xl font-bold text-red-600">{declinedThisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}