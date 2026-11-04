
import { useEffect, useState } from "react";

const STORAGE_KEY = "clientflow_customers";

// Initial mock customer records
const initialCustomers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@gmail.com",
    phone: "9876543210",
    company: "Tech Solutions",
    status: "Active",
    dateAdded: "2026-11-04T09:00:00.000Z"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@gmail.com",
    phone: "9876543211",
    company: "Creative Studio",
    status: "Active",
    dateAdded: "2026-11-03T09:00:00.000Z"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@gmail.com",
    phone: "9876543212",
    company: "Digital World",
    status: "Inactive",
    dateAdded: "2026-11-02T09:00:00.000Z"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@gmail.com",
    phone: "9876543213",
    company: "Business Hub",
    status: "Active",
    dateAdded: "2026-11-01T09:00:00.000Z"
  },
  {
    id: 5,
    name: "David Miller",
    email: "david@gmail.com",
    phone: "9876543214",
    company: "Smart Tech",
    status: "Inactive",
    dateAdded: "2026-10-31T09:00:00.000Z"
  }
];

// Load customers from LocalStorage
function getInitialCustomers() {
  try {
    const savedCustomers = localStorage.getItem(STORAGE_KEY);

    if (savedCustomers !== null) {
      const parsedCustomers = JSON.parse(savedCustomers);

      if (Array.isArray(parsedCustomers)) {
        return parsedCustomers;
      }
    }
  } catch (error) {
    console.error("Error loading customers:", error);
  }

  return initialCustomers;
}

function useCustomers() {
  const [customers, setCustomers] = useState(getInitialCustomers);

  // Save customers whenever customer data changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(customers)
      );
    } catch (error) {
      console.error("Error saving customers:", error);
    }
  }, [customers]);

  // CREATE
  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now(),
      dateAdded: new Date().toISOString()
    };

    setCustomers((prev) => [newCustomer, ...prev]);
  };

  // UPDATE
  const updateCustomer = (updatedCustomer) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === updatedCustomer.id
          ? updatedCustomer
          : customer
      )
    );
  };

  // DELETE
  const deleteCustomer = (id) => {
    setCustomers((prev) =>
      prev.filter((customer) => customer.id !== id)
    );
  };

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer
  };
}

export default useCustomers;
