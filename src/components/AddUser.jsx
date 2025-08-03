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
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Invalid name, must be atleast 3 characters",
  }),
  email: z.string().email({
    message: "Invalid email",
  }),
  role: z.enum(["admin", "user", "manager", "developer", "designer"], {
    message: "Please select a valid role",
  }),
  address: z.string().optional(),
});

const AddUser = ({
  allUsers,
  setAllUsers,
  user,
  setUser,
  isTaskOpen,
  setIsTaskOpen,
}) => {
  console.log("user", user);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      address: "",
    },
  });

  // Reset form when user changes (for editing)
  useEffect(() => {
    if (user) {
      form.reset(user);
    } else {
      form.reset({
        name: "",
        email: "",
        role: "",
        address: "",
      });
    }
  }, [user, form]);

  // Optionally, clear user when dialog is closed (for parent to pass setUser)
  const handleDialogChange = (open) => {
    setIsTaskOpen(open);
    if (!open) setUser(null);
  };

  const handleUser = (value) => {
    console.log("Form submitted!", value);

    if (user) {
      // Editing existing user
      const updatedUsers = allUsers.map((u) =>
        u.id === user.id ? { ...value, id: user.id } : u
      );
      setAllUsers(updatedUsers);
    } else {
      // Adding new user
      const newUser = { ...value, id: Date.now() };
      setAllUsers([...allUsers, newUser]);
    }

    // Close the dialog and reset form
    setIsTaskOpen(false);
    setUser(null);
    form.reset();
  };

  return (
    <div>
      <Dialog open={isTaskOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Users</DialogTitle>
            <DialogDescription>Add user details</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUser)}>
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
                          {form.formState.errors.name &&
                            form.formState.errors.name.message}
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
                          {form.formState.errors.email &&
                            form.formState.errors.email.message}
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
                          <select
                            className="w-full p-2 border border-gray-600 rounded-md hover:cursor-pointer"
                            {...field}
                          >
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="manager">Manager</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                          </select>
                        </FormControl>{" "}
                        <p className="text-red-500 font-semibold">
                          {form.formState.errors.role &&
                            form.formState.errors.role.message}
                        </p>
                      </FormItem>
                    )}
                  ></FormField>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-gray-600 hover:cursor-pointer"
                              placeholder="Enter address"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <p className="text-red-500 font-semibold">
                            {form.formState.errors.address &&
                              form.formState.errors.address.message}
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
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUser;
