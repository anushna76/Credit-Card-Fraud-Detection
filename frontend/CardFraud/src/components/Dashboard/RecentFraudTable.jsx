
// }

import { useState, useContext } from 'react';
import { AdminDataContext } from '@/components/Context/AdminContext';
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
import { Badge } from "@/components/Dashboard/ui/badge";
import { formatCurrency, formatDate } from '@/components/lib/util';

export default function RecentFraudTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { transactions = [] } = useContext(AdminDataContext);

  // Filter only fraudulent transactions
  const fraudTransactions = transactions.filter(tx => tx.is_fraud === 1 || tx.is_fraud === "1");

  // Pagination logic (optional, adjust as needed)
  const itemsPerPage = 10;
  const totalPages = Math.ceil(fraudTransactions.length / itemsPerPage);
  const paginated = fraudTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // ...badge helpers as before...

  return (
    <Card className="shadow-sm border border-gray-100 mb-6">
      <CardHeader className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <CardTitle className="text-lg font-heading font-semibold text-gray-800">Recent Fraud Alerts</CardTitle>
        <Button variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
          View All
        </Button>
      </CardHeader>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((tx) => (
              <TableRow key={tx._id}>
                <TableCell>{tx._id}</TableCell>
                <TableCell>{tx.first} {tx.last}</TableCell>
                <TableCell>{formatCurrency(tx.amt)}</TableCell>
                <TableCell>{formatDate(tx.trans_date_trans_time)}</TableCell>
                <TableCell>
                  <Badge className="bg-red-100 text-red-800" variant="outline">
                    Fraud
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CardFooter className="px-5 py-3 flex items-center justify-between border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
            {" "}to <span className="font-medium">{Math.min(currentPage * itemsPerPage, fraudTransactions.length)}</span>
            {" "}of <span className="font-medium">{fraudTransactions.length}</span> results
          </p>
        </div>
        <div className="flex space-x-1">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="rounded-l-md"
          >
            Prev
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button 
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "bg-blue-50 text-blue-700" : ""}
            >
              {i + 1}
            </Button>
          ))}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="rounded-r-md"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}