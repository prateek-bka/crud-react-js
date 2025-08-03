import React from "react";
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

const ListUsers = ({ allUsers, setAllUsers, user, setUser, isOpen, setIsOpen }) => {
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
                      <FaUserEdit className="hover:text-blue-700 hover:cursor-pointer" />
                      <MdDeleteForever className="hover:text-red-700 hover:cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListUsers;
