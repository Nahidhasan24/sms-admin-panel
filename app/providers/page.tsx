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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Example provider data
const initialProviders = [
  {
    _id: "692ae6a4530c0fd8b6fb6da0",
    name: "5sim",
    apiKey: "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9...",
    apiUrl: "https://5sim.net/v1/",
    status: "active",
  },
  {
    _id: "692ae6a4530c0fd8b6fb6da1",
    name: "smspool",
    apiKey: "xyz123",
    apiUrl: "https://smspool.net/api/",
    status: "inactive",
  },
];

export default function ProvidersPage() {
  const [providers, setProviders] = useState(initialProviders);
  const [editProvider, setEditProvider] = useState<any>(null);

  const handleSave = () => {
    setProviders((prev) =>
      prev.map((p) => (p._id === editProvider._id ? editProvider : p))
    );
    setEditProvider(null);
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
        <SiteHeader page="Services" />

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Providers</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider._id}>
                  <TableCell>{provider.name}</TableCell>
                  <TableCell>**************</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        provider.status === "active" ? "default" : "destructive"
                      }
                    >
                      {provider.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => setEditProvider(provider)}
                        >
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Edit Dialog */}
          {editProvider && (
            <Dialog
              open={!!editProvider}
              onOpenChange={() => setEditProvider(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Provider</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2 mt-2">
                  <Input
                    placeholder="Provider Name"
                    value={editProvider.name}
                    onChange={(e) =>
                      setEditProvider({ ...editProvider, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="API Key"
                    value={editProvider.apiKey}
                    onChange={(e) =>
                      setEditProvider({
                        ...editProvider,
                        apiKey: e.target.value,
                      })
                    }
                  />

                  <Select
                    value={editProvider.status}
                    onValueChange={(value) =>
                      setEditProvider({ ...editProvider, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <DialogFooter className="mt-4">
                  <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
