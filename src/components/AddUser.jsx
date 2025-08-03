import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";

const formSchema = z.object({
  id: z.number().min(4, {
    message: "Invalid id",
  }),
  name: z.string().min(3, {
    message: "Invalid name, must be atleast 3 characters",
  }),
  email: z.email().min(4, {
    message: "Invalid email",
  }),
  password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
});

import { useEffect } from "react";
// ...existing code...
const AddUser = ({ allUsers, setAllUsers, user, setUser, isTaskOpen, setIsTaskOpen }) => {
  console.log("user", user);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: user || {
      id: "",
      name: "",
      email: "",
      role: "",
      address: "",
    },
  });

  useEffect(() => {
    // If user is null/empty, reset to empty values (for Add)
    if (!user || Object.keys(user).length === 0) {
      form.reset({
        id: "",
        name: "",
        email: "",
        role: "",
        address: "",
      });
    } else {
      form.reset(user);
    }
  }, [user, isTaskOpen]);

  // Optionally, clear user when dialog is closed (for parent to pass setUser)
  const handleDialogChange = (open) => {
    setIsTaskOpen(open);
    if (!open) setUser(null);
  };

  const handleUser = (value) => {
    const updateUser = { ...value, id: Date.now() };
    console.log("value", value);
    console.log("updateUser", updateUser);
  };

  return (
    <div>
      <Dialog open={isTaskOpen} onOpenChange={handleDialogChange}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUser)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Users</DialogTitle>
                <DialogDescription>Add user details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-gray-600 hover:cursor-pointer"
                            placeholder="Enter name"
                            type="text"
                            required
                            {...field}
                          />
                        </FormControl>{" "}
                        <p className="text-red-500 font-semibold">
                          {form.formState.errors.name && form.formState.errors.name.message}
                        </p>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-gray-600 hover:cursor-pointer"
                            placeholder="Enter email"
                            type="email"
                            required
                            {...field}
                          />
                        </FormControl>{" "}
                        <p className="text-red-500 font-semibold">
                          {form.formState.errors.email && form.formState.errors.email.message}
                        </p>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-gray-600 hover:cursor-pointer"
                            placeholder="Enter role"
                            type="text"
                            required
                            {...field}
                          />
                        </FormControl>{" "}
                        <p className="text-red-500 font-semibold">
                          {form.formState.errors.role && form.formState.errors.role.message}
                        </p>
                      </FormItem>
                    )}
                  ></FormField>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-gray-600 hover:cursor-pointer"
                              placeholder="Enter password"
                              type="password"
                              required
                              {...field}
                            />
                          </FormControl>
                          <p className="text-red-500 font-semibold">
                            {form.formState.errors.password &&
                              form.formState.errors.password.message}
                          </p>
                        </FormItem>
                      )}
                    ></FormField>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Form>
      </Dialog>
    </div>
  );
};

export default AddUser;
