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
import { toast } from "sonner";

const ListUsers = ({ allUsers, setAllUsers, user, setUser, isTaskOpen, setIsTaskOpen }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteUser = () => {
    // console.log("user", user);
    const updateUserList = allUsers.filter((item) => item.id !== user.id);
    // console.log("updateUserList", updateUserList);
    setAllUsers(updateUserList);
    toast(`Success! ${user.name} has been deleted!`);
    setUser({});
  };

  const handleEditUser = (el) => {
    setUser(el);
    setIsTaskOpen(true);
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
                        onClick={() => handleEditUser(el)}
                      />
                      <MdDeleteForever
                        className="hover:text-red-700 hover:cursor-pointer"
                        onClick={() => {
                          setIsDeleteDialogOpen(true);
                          setUser(el);
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
              <Button variant="outline" onClick={() => setUser({})}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => {
                setIsDeleteDialogOpen(false);
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
