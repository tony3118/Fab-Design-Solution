import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminOrders from "./AdminOrders";

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"contacts" | "orders">("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const fetchContacts = async () => {
    const deleteContact = async (id: number) => {
      try {
        await fetch(
          `http://localhost/backend/admin/delete_contact.php?id=${id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        fetchContacts(); // refresh list
      } catch (err) {
        console.error("Delete failed", err);
      }
    };


    setLoadingContacts(true);

    const res = await fetch(
      "http://localhost/backend/admin/get_contacts.php",
      { credentials: "include" }
    );

    const data = await res.json();

    if (data.status === "success") {
      setContacts(data.data);
    }

    setLoadingContacts(false);
  };

  const deleteContact = async (id: number) => {
    try {
      await fetch(
        `http://localhost/backend/admin/delete_contact.php?id=${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      fetchContacts(); // reload table
    } catch (err) {
      console.error("Delete failed", err);
    }
  };


  useEffect(() => {
    fetchContacts();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost/backend/admin/logout.php", {
        credentials: "include",
      });
    } catch (e) {
      // even if request fails, continue logout
    } finally {
      navigate("/admin");
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setActiveTab("contacts");
            fetchContacts();
          }}
          className={`px-4 py-2 rounded ${activeTab === "contacts"
            ? "bg-black text-white"
            : "bg-gray-200"
            }`}
        >
          Contacts
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded ${activeTab === "orders"
            ? "bg-black text-white"
            : "bg-gray-200"
            }`}
        >
          Orders
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === "contacts" && (
        <>
          {loadingContacts ? (
            <p>Loading contacts...</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Message</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td className="border p-2">{c.name}</td>
                    <td className="border p-2">{c.email}</td>
                    <td className="border p-2">{c.subject}</td>
                    <td className="border p-2">{c.message}</td>
                    <td className="border p-2">
                      {new Date(c.created_at).toLocaleString()}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => deleteContact(c.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {activeTab === "orders" && <AdminOrders />}
    </div>
  );
};

export default AdminDashboard;
