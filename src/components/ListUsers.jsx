import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";

const ListUsers = ({ allUsers, setAllUsers, user, setUser, isTaskOpen, setIsTaskOpen }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);
  const [confirmDeleteUserDetails, setConfirmDeleteUserDetails] = useState({});

  const handleDeleteUser = () => {
    // console.log("confirmDeleteUserDetails", confirmDeleteUserDetails);
    const updateUserList = allUsers.filter((item) => item.id !== confirmDeleteUserDetails.id);
    // console.log("updateUserList", updateUserList);
    setAllUsers(updateUserList);
  };

  return (
    <div>
      <div className="p-4">
        <Table>
          <TableCaption>List of Users</TableCaption>
          <TableHeader className="bg-gray-400 text-lg font-bold">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers &&
              allUsers.length > 0 &&
              allUsers.map((el, index) => (
                <TableRow key={index}>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>{el.email}</TableCell>
                  <TableCell>{el.role}</TableCell>
                  <TableCell>{el.address}</TableCell>
                  <TableCell>
                    <div className="flex gap-4 text-xl">
                      <FaUserEdit
                        className="hover:text-blue-700 hover:cursor-pointer"
                        onClick={() => handleEditUser()}
                      />
                      <MdDeleteForever
                        className="hover:text-red-700 hover:cursor-pointer"
                        onClick={() => {
                          setIsDeleteDialogOpen(true);
                          setConfirmDeleteUserDetails(el);
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        {" "}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>Are you sure you want to delete the user?</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setConfirmDeleteUser(true);
                handleDeleteUser();
              }}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListUsers;
