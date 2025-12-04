"use client";

import { useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Example referral withdrawal data
const initialWithdrawals = [
  {
    id: 1,
    user: "John Doe",
    amount: 100,
    chain: "ERC20",
    wallet: "0x123...abc",
    status: "Pending",
    requestedAt: "2025-12-01 10:15",
  },
  {
    id: 2,
    user: "Jane Smith",
    amount: 50,
    chain: "TRC20",
    wallet: "TAbc123...xyz",
    status: "Pending",
    requestedAt: "2025-12-02 12:30",
  },
];

export default function ReferralWithdrawsPage() {
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const [currentAction, setCurrentAction] = useState<any>(null); // For approve/decline dialog
  const [actionType, setActionType] = useState<"approve" | "decline" | null>(
    null
  );

  const handleApprove = () => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === currentAction.id ? { ...w, status: "Approved" } : w
      )
    );
    setCurrentAction(null);
  };

  const handleDecline = () => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === currentAction.id ? { ...w, status: "Declined" } : w
      )
    );
    setCurrentAction(null);
  };

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
        <SiteHeader page="Referral Withdrawals" />
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Chain</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawals.map((w) => (
                <TableRow key={w.id}>
                  <TableCell>{w.user}</TableCell>
                  <TableCell>{w.amount}</TableCell>
                  <TableCell>{w.chain}</TableCell>
                  <TableCell>{w.wallet}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        w.status === "Approved"
                          ? "default"
                          : w.status === "Declined"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {w.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{w.requestedAt}</TableCell>
                  <TableCell>
                    {w.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setCurrentAction(w);
                            setActionType("approve");
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setCurrentAction(w);
                            setActionType("decline");
                          }}
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Action Dialog */}
          {currentAction && actionType && (
            <Dialog
              open={!!currentAction}
              onOpenChange={() => setCurrentAction(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {actionType === "approve"
                      ? "Approve Withdrawal"
                      : "Decline Withdrawal"}
                  </DialogTitle>
                </DialogHeader>
                <p>
                  Are you sure you want to{" "}
                  {actionType === "approve" ? "approve" : "decline"} the
                  withdrawal of <strong>{currentAction.amount}</strong> by{" "}
                  <strong>{currentAction.user}</strong>?
                </p>
                <DialogFooter className="mt-4 flex gap-2">
                  <Button
                    variant={
                      actionType === "decline" ? "destructive" : "default"
                    }
                    onClick={
                      actionType === "approve" ? handleApprove : handleDecline
                    }
                  >
                    {actionType === "approve" ? "Approve" : "Decline"}
                  </Button>
                  <Button onClick={() => setCurrentAction(null)}>Cancel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
