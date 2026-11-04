
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function CustomerModal({
  isOpen,
  onClose,
  onSave,
  customer,
  customers = [],
}) {
  // Create validation schema using existing customers
  const customerSchema = z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters"),

    email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .refine(
      (email) => {
        const enteredEmail = email.toLowerCase();

        return !customers.some((existingCustomer) => {
          const existingEmail = existingCustomer.email
            ?.trim()
            .toLowerCase();

          const isSameCustomer =
            customer &&
            String(existingCustomer.id) === String(customer.id);

          return (
            existingEmail === enteredEmail &&
            !isSameCustomer
          );
        });
      },
      {
        message: "This email address already exists!",
      }
    ),
    phone: z
      .string()
      .regex(/^\+?[0-9\s-]{10}$/, "Enter a valid phone number"),

    company: z
      .string()
      .min(2, "Company name is required"),

    status: z.enum(["Active", "Inactive"]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: customer?.name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      company: customer?.company || "",
      status: customer?.status || "Active",
    },
  });

  const onSubmit = (data) => {
    onSave({
      ...data,
      ...(customer && {
        id: customer.id,
        dateAdded: customer.dateAdded,
      }),
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-bold text-gray-800">
          {customer ? "Edit Customer" : "Add Customer"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="mb-1 block text-sm font-medium">
              Full Name
            </label>
            <input
              {...register("name")}
              placeholder="Enter customer name"
              className="w-full rounded-lg border p-3"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@gmail.com"
              className="w-full rounded-lg border p-3"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Phone Number
            </label>
            <input
              {...register("phone")}
              placeholder="Enter phone number"
              className="w-full rounded-lg border p-3"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Company
            </label>
            <input
              {...register("company")}
              placeholder="Enter company name"
              className="w-full rounded-lg border p-3"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-500">
                {errors.company.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full rounded-lg border p-3"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2 text-white"
            >
              {customer ? "Update Customer" : "Add Customer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CustomerModal;
