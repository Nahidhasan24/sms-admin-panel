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
  DialogTrigger,
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

// Example service data
const initialServices = [
  {
    id: 1,
    name: "Twitter",
    provider: "5sim",
    provider_service_id: "twitter",
    country: "USA",
    price: 15,
    image:
      "https://res.cloudinary.com/dr0dmpqyi/image/upload/v1764614100/Logo_of_Twitter_v7zxw3.svg",
    operator: "any",
    status: "Active",
  },
  {
    id: 2,
    name: "Facebook",
    provider: "smspool",
    provider_service_id: "facebook",
    country: "USA",
    price: 20,
    image:
      "https://res.cloudinary.com/dr0dmpqyi/image/upload/v1764614101/2023_Facebook_icon_zd7hsk.svg",
    operator: "",
    status: "Inactive",
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;

  const [editService, setEditService] = useState<any>(null);
  const [deleteService, setDeleteService] = useState<any>(null);
  const [addService, setAddService] = useState<any>(null);

  const totalPages = Math.ceil(services.length / servicesPerPage);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  // Handlers
  const handleEditSave = () => {
    setServices((prev) =>
      prev.map((s) => (s.id === editService.id ? editService : s))
    );
    setEditService(null);
  };

  const handleDeleteConfirm = () => {
    setServices((prev) => prev.filter((s) => s.id !== deleteService.id));
    setDeleteService(null);
  };

  const handleAddSave = () => {
    setServices((prev) => [...prev, { ...addService, id: Date.now() }]);
    setAddService(null);
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
        <div className="flex flex-1 flex-col p-4 lg:p-6">
          {/* Add Service Button */}
          {/* Add Service Button */}
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setAddService({ provider: "5sim" })}>
              Add Service
            </Button>

            <Dialog
              open={!!addService}
              onOpenChange={() => setAddService(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                {addService && (
                  <div className="flex flex-col gap-2">
                    <Input
                      placeholder="Service Name"
                      value={addService.name || ""}
                      onChange={(e) =>
                        setAddService({ ...addService, name: e.target.value })
                      }
                    />
                    <Select
                      value={addService.provider || "5sim"}
                      onValueChange={(value) =>
                        setAddService({
                          ...addService,
                          provider: value,
                          operator: "",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5sim">5sim</SelectItem>
                        <SelectItem value="smspool">smspool</SelectItem>
                      </SelectContent>
                    </Select>

                    {addService.provider === "5sim" && (
                      <Input
                        placeholder="Operator"
                        value={addService.operator || ""}
                        onChange={(e) =>
                          setAddService({
                            ...addService,
                            operator: e.target.value,
                          })
                        }
                      />
                    )}

                    <Input
                      placeholder="Provider Service ID"
                      value={addService.provider_service_id || ""}
                      onChange={(e) =>
                        setAddService({
                          ...addService,
                          provider_service_id: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Country"
                      value={addService.country || ""}
                      onChange={(e) =>
                        setAddService({
                          ...addService,
                          country: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={addService.price || ""}
                      onChange={(e) =>
                        setAddService({
                          ...addService,
                          price: Number(e.target.value),
                        })
                      }
                    />
                    <Input
                      placeholder="Image URL"
                      value={addService.image || ""}
                      onChange={(e) =>
                        setAddService({ ...addService, image: e.target.value })
                      }
                    />
                    <Select
                      value={addService.status || "Active"}
                      onValueChange={(value) =>
                        setAddService({ ...addService, status: value })
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
                )}
                <DialogFooter className="mt-4">
                  <Button onClick={handleAddSave}>Add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Services Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Service Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentServices.map((service, index) => (
                <TableRow key={service.id}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.provider}</TableCell>
                  <TableCell>{service.provider_service_id}</TableCell>
                  <TableCell>{service.country}</TableCell>
                  <TableCell>${service.price}</TableCell>
                  <TableCell>
                    {service.provider === "5sim" ? service.operator : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        service.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {service.image && (
                      <img
                        src={service.image}
                        className="h-6 w-6 object-contain"
                      />
                    )}
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
                          onClick={() => setEditService(service)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteService(service)}
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

          {/* Edit Dialog */}
          {editService && (
            <Dialog
              open={!!editService}
              onOpenChange={() => setEditService(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Service</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <Input
                    value={editService.name}
                    onChange={(e) =>
                      setEditService({ ...editService, name: e.target.value })
                    }
                    placeholder="Service Name"
                  />
                  {/* Provider select */}
                  <Select
                    value={editService.provider}
                    onValueChange={(value) =>
                      setEditService({
                        ...editService,
                        provider: value,
                        operator: "",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5sim">5sim</SelectItem>
                      <SelectItem value="smspool">smspool</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Only show operator if provider is 5sim */}
                  {editService.provider === "5sim" && (
                    <Input
                      placeholder="Operator"
                      value={editService.operator || ""}
                      onChange={(e) =>
                        setEditService({
                          ...editService,
                          operator: e.target.value,
                        })
                      }
                    />
                  )}

                  <Input
                    value={editService.provider_service_id}
                    onChange={(e) =>
                      setEditService({
                        ...editService,
                        provider_service_id: e.target.value,
                      })
                    }
                    placeholder="Service Name"
                  />
                  <Input
                    value={editService.country}
                    onChange={(e) =>
                      setEditService({
                        ...editService,
                        country: e.target.value,
                      })
                    }
                    placeholder="Country"
                  />
                  <Input
                    type="number"
                    value={editService.price}
                    onChange={(e) =>
                      setEditService({
                        ...editService,
                        price: Number(e.target.value),
                      })
                    }
                    placeholder="Price"
                  />
                  <Input
                    value={editService.image}
                    onChange={(e) =>
                      setEditService({ ...editService, image: e.target.value })
                    }
                    placeholder="Image URL"
                  />
                  <Select
                    value={editService.status}
                    onValueChange={(value) =>
                      setEditService({ ...editService, status: value })
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
          {deleteService && (
            <Dialog
              open={!!deleteService}
              onOpenChange={() => setDeleteService(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Service</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete {deleteService.name}?</p>
                <DialogFooter className="mt-4 flex gap-2">
                  <Button variant="destructive" onClick={handleDeleteConfirm}>
                    Delete
                  </Button>
                  <Button onClick={() => setDeleteService(null)}>Cancel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
