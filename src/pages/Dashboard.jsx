
import { useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StartCard from "../components/StartCard";
import RecentCustomers from "../components/RecentCustomers";
import CustomerModal from "../components/CustomerModal";
import DeleteConfirmation from "../components/DeleteConfirmation";

import useCustomers from "../hooks/useCustomers";

function Dashboard() {
  const {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();

  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Open add customer modal
  const handleAddClick = () => {
    setSelectedCustomer(null);
    setModalOpen(true);
  };

  // Open edit customer modal
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  // Check duplicate email before saving
  const handleSave = (customerData) => {
    const enteredEmail = customerData.email
      .trim()
      .toLowerCase();

    const duplicateEmail = customers.some((existing) => {
      const existingEmail = existing.email
        ?.trim()
        .toLowerCase();

      const isSameCustomer =
        selectedCustomer &&
        String(existing.id) === String(selectedCustomer.id);

      return (
        existingEmail === enteredEmail &&
        !isSameCustomer
      );
    });

    // Stop saving if email already exists
    if (duplicateEmail) {
      window.alert("This email address already exists!");
      return false;
    }

    // Update existing customer
    if (selectedCustomer) {
      updateCustomer({
        ...customerData,
        email: enteredEmail,
      });
    } else {
      // Add new customer
      addCustomer({
        ...customerData,
        email: enteredEmail,
      });
    }

    setModalOpen(false);
    setSelectedCustomer(null);

    return true;
  };

  // Delete customer
  const handleDelete = () => {
    if (!deleteTarget) return;

    deleteCustomer(deleteTarget.id);
    setDeleteTarget(null);
  };

  // Dashboard statistics
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const recentCustomers = [...customers]
    .sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() -
        new Date(a.dateAdded).getTime()
    )
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="min-w-0 flex-1">
        <Header
          title={activePage}
          setIsOpen={setIsOpen}
        />

        <main className="p-4 md:p-8">
          {activePage === "Dashboard" && (
            <>
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Welcome back! Here is your customer overview.
                  </p>
                </div>

                <button
                  onClick={handleAddClick}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <Plus size={18} />
                  Add Customer
                </button>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <StartCard
                  title="Total Customers"
                  value={totalCustomers}
                  description="All registered customers"
                  type="users"
                />

                <StartCard
                  title="Active Customers"
                  value={activeCustomers}
                  description="Currently active"
                  type="active"
                />

                <StartCard
                  title="Inactive Customers"
                  value={inactiveCustomers}
                  description="Currently inactive"
                  type="inactive"
                />
              </div>

              <RecentCustomers
                customers={recentCustomers}
                onEdit={handleEdit}
                onDelete={setDeleteTarget}
              />
            </>
          )}

          {activePage === "Customers" && (
            <>
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Customers
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage all your customers.
                  </p>
                </div>

                <button
                  onClick={handleAddClick}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <Plus size={18} />
                  Add Customer
                </button>
              </div>

              <RecentCustomers
                customers={customers}
                onEdit={handleEdit}
                onDelete={setDeleteTarget}
              />
            </>
          )}

          {activePage === "Settings" && (
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900">
                Settings
              </h1>
              <p className="mt-2 text-gray-500">
                Settings page coming soon.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Customer Add/Edit Modal */}
      <CustomerModal
        key={selectedCustomer?.id ?? "new-customer"}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSave}
        customer={selectedCustomer}
        customers={customers}
      />

      {/* Delete Confirmation */}
      {deleteTarget && (
        <DeleteConfirmation
          customer={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default Dashboard;
