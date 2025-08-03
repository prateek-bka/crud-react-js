import React, { useState } from "react";
import Heading from "./components/Heading";
import { Button } from "./components/ui/button";
import ListUsers from "./components/ListUsers";
import { Toaster } from "@/components/ui/sonner";
import AddUser from "./components/AddUser";

const defaultUserData = [
  {
    id: 235125,
    name: "user 1",
    email: "user1@gmail.com",
    role: "manager",
    address: "address 1",
  },
  {
    id: 235123,
    name: "user 2",
    email: "user2@gmail.com",
    role: "developer",
    address: "address 2",
  },
  {
    id: 235147,
    name: "user 3",
    email: "user3@gmail.com",
    role: "devops",
    address: "address 3",
  },
];

const App = () => {
  const [allUsers, setAllUsers] = useState(defaultUserData);
  const [user, setUser] = useState({});
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-200">
      <Heading />
      <Toaster />
      <div className="flex items-end justify-end m-4">
        <Button
          className="hover:cursor-pointer"
          onClick={() => {
            setUser({});
            setIsTaskOpen(true);
          }}
        >
          Add User
        </Button>
      </div>
      <AddUser
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        user={user}
        setUser={setUser}
        isTaskOpen={isTaskOpen}
        setIsTaskOpen={setIsTaskOpen}
      />

      <ListUsers
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        user={user}
        setUser={setUser}
        isTaskOpen={isTaskOpen}
        setIsTaskOpen={setIsTaskOpen}
      />
    </div>
  );
};

export default App;
