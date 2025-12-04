"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Example user data
const initialUsers = [
  { id: 1, name: "Nahid Hasan", balance: 100, status: "Active", country: "BD" },
  { id: 2, name: "John Doe", balance: 50, status: "Inactive", country: "US" },
  { id: 3, name: "Jane Smith", balance: 200, status: "Active", country: "UK" },
  { id: 4, name: "Alice Brown", balance: 120, status: "Active", country: "CA" },
  { id: 5, name: "Bob White", balance: 75, status: "Inactive", country: "AU" },
  { id: 6, name: "Carol Green", balance: 90, status: "Active", country: "NZ" },
];

export default function Page() {
  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const [editUser, setEditUser] = useState<any>(null);
  const [deleteUser, setDeleteUser] = useState<any>(null);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handlers
  const handleEditSave = () => {
    setUsers((prev) => prev.map((u) => (u.id === editUser.id ? editUser : u)));
    setEditUser(null);
  };

  const handleDeleteConfirm = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
    setDeleteUser(null);
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
        <SiteHeader page="Users" />
        <div className="flex flex-1 flex-col p-4 lg:p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>UserID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>${user.balance}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "Active" ? "secondary" : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setEditUser(user)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteUser(user)}>
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

          {/* Edit Dialog */}
          {editUser && (
            <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <Input
                    value={editUser.name}
                    onChange={(e) =>
                      setEditUser({ ...editUser, name: e.target.value })
                    }
                    placeholder="Name"
                  />
                  <Input
                    type="number"
                    value={editUser.balance}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
                        balance: Number(e.target.value),
                      })
                    }
                    placeholder="Balance"
                  />
                  <Input
                    value={editUser.country}
                    onChange={(e) =>
                      setEditUser({ ...editUser, country: e.target.value })
                    }
                    placeholder="Country"
                  />

                  {/* Status select */}
                  <Select
                    value={editUser.status}
                    onValueChange={(value) =>
                      setEditUser({ ...editUser, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter className="mt-4">
                  <Button onClick={handleEditSave}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* Delete Dialog */}
          {deleteUser && (
            <Dialog
              open={!!deleteUser}
              onOpenChange={() => setDeleteUser(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete User</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete {deleteUser.name}?</p>
                <DialogFooter className="mt-4 flex gap-2">
                  <Button variant="destructive" onClick={handleDeleteConfirm}>
                    Delete
                  </Button>
                  <Button onClick={() => setDeleteUser(null)}>Cancel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
