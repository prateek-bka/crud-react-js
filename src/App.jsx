import React, { useState } from "react";
import Heading from "./components/Heading";
import AddTask from "./components/AddTask";
import { Button } from "./components/ui/button";
import ListUsers from "./components/ListUsers";

const App = () => {
  const [allUsers, setAllUsers] = useState([
    {
      name: "dahfai",
      email: "akhflasjf",
      role: "dkaslhfla",
      address: "dfgahlf",
    },
  ]);
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-200">
      <Heading />
      <div className="flex items-end justify-end m-4">
        <Button className="hover:cursor-pointer" onClick={() => setIsOpen(true)}>
          Add Task
        </Button>
      </div>
      <AddTask
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        user={user}
        setUser={setUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <ListUsers
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        user={user}
        setUser={setUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default App;
