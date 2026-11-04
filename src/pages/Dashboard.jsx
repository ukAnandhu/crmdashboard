
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
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Custom customer hook
  const {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer
  } = useCustomers();

  // Open Add Customer Modal
  const handleAddClick = () => {
    setSelectedCustomer(null);
    setModalOpen(true);
  };

  // Open Edit Customer Modal
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  // Save new or updated customer
  const handleSave = (customerData) => {
    if (selectedCustomer) {
      updateCustomer(customerData);
    } else {
      addCustomer(customerData);
    }

    setModalOpen(false);
    setSelectedCustomer(null);
  };

  // Confirm Delete
  const handleDelete = () => {
    if (deleteTarget) {
      deleteCustomer(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  // Dashboard statistics
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <main className="min-w-0 flex-1">

        {/* Header */}
        <Header
          title={activePage}
          setIsOpen={setIsOpen}
        />

        <div className="p-4 sm:p-6 lg:p-8">

          {/* Dashboard Page */}
          {activePage === "Dashboard" && (
            <>
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Dashboard Overview
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Track and manage your customer relationships.
                  </p>
                </div>

                <button
                  onClick={handleAddClick}
                  className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  <Plus size={18} />
                  Add Customer
                </button>

              </div>

              {/* Statistics Cards */}
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
                  description="Currently active customers"
                  type="active"
                />

                <StartCard
                  title="Inactive Customers"
                  value={inactiveCustomers}
                  description="Currently inactive customers"
                  type="inactive"
                />

              </div>

              {/* Customer Table */}
              <RecentCustomers
                customers={customers}
                onEdit={handleEdit}
                onDelete={setDeleteTarget}
              />
            </>
          )}

          {/* Customers Page */}
          {activePage === "Customers" && (
            <>
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Customer Management
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Add, edit, search and manage your customers.
                  </p>
                </div>

                <button
                  onClick={handleAddClick}
                  className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
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

          {/* Settings Page */}
          {activePage === "Settings" && (
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800">
                Settings
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Settings page coming soon.
              </p>
            </div>
          )}

        </div>
      </main>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <CustomerModal
          key={selectedCustomer?.id ?? "new-customer"}
          isOpen={modalOpen}
          customer={selectedCustomer}
          onClose={() => {
            setModalOpen(false);
            setSelectedCustomer(null);
          }}
          onSave={handleSave}
        />
      )}

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
