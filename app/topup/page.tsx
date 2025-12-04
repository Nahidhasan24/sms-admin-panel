"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Example crypto transactions
const initialTransactions = Array.from({ length: 23 }).map((_, i) => ({
  id: i + 1,
  user: `User ${i + 1}`,
  amount: Math.floor(Math.random() * 100) + 1,
  token: "USDT",
  chain: i % 3 === 0 ? "ERC20" : i % 3 === 1 ? "BSC" : "TRC20",
  status: i % 3 === 0 ? "completed" : i % 3 === 1 ? "pending" : "failed",
  date: `2025-12-${String(4 - (i % 4)).padStart(2, "0")} 10:${i} AM`,
}));

export default function TopupPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [viewTransaction, setViewTransaction] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const transactionsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const indexOfLastTx = currentPage * transactionsPerPage;
  const indexOfFirstTx = indexOfLastTx - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTx, indexOfLastTx);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader page="Top-up Transactions" />

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Crypto Top-ups</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Chain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.user}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.token}</TableCell>
                  <TableCell>{tx.chain}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tx.status === "completed"
                          ? "default"
                          : tx.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => setViewTransaction(tx)}
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            setTransactions((prev) =>
                              prev.filter((t) => t.id !== tx.id)
                            )
                          }
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>

          {/* View Transaction Dialog */}
          {viewTransaction && (
            <Dialog
              open={!!viewTransaction}
              onOpenChange={() => setViewTransaction(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Transaction Details</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2 mt-2">
                  <p>
                    <strong>User:</strong> {viewTransaction.user}
                  </p>
                  <p>
                    <strong>Amount:</strong> {viewTransaction.amount}{" "}
                    {viewTransaction.token}
                  </p>
                  <p>
                    <strong>Chain:</strong> {viewTransaction.chain}
                  </p>
                  <p>
                    <strong>Status:</strong> {viewTransaction.status}
                  </p>
                  <p>
                    <strong>Date:</strong> {viewTransaction.date}
                  </p>
                </div>

                <DialogFooter className="mt-4">
                  <Button onClick={() => setViewTransaction(null)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
