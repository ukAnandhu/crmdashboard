
import { useState } from "react";
import {
  ArrowRight,
  Search,
  Pencil,
  Trash2,
  Users
} from "lucide-react";

function RecentCustomers({
  customers,
  onEdit,
  onDelete
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Search and filter customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesName = customer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      customer.status === statusFilter;

    return matchesName && matchesStatus;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <section className="overflow-hidden rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">

      {/* Heading */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-800">
              Customers
            </h2>

            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
              {customers.length}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Manage all your customer information.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

          {/* Search */}
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customer..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-52"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">

          <thead>
            <tr className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Company</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4">Phone</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Date Added</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-slate-100 text-xs text-slate-500 transition hover:bg-slate-50"
              >

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-50 font-bold text-indigo-600">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>

                    <span className="font-semibold text-slate-700">
                      {customer.name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4">
                  {customer.company}
                </td>

                <td className="px-4 py-4">
                  {customer.email}
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  {customer.phone}
                </td>

                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                    customer.status === "Active"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-orange-50 text-orange-600"
                  }`}>
                    {customer.status}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  {formatDate(customer.dateAdded)}
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">

                    <button
                      onClick={() => onEdit(customer)}
                      title="Edit customer"
                      className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-50 text-indigo-600 transition hover:bg-indigo-100"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      onClick={() => onDelete(customer)}
                      title="Delete customer"
                      className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}

            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan="7" className="py-16 text-center">
                  <Users
                    size={35}
                    className="mx-auto mb-3 text-slate-300"
                  />

                  <p className="font-semibold text-slate-600">
                    No customers found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try changing your search or filter.
                  </p>
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400">
        Showing {filteredCustomers.length} of {customers.length} customers
      </div>

    </section>
  );
}

export default RecentCustomers;
