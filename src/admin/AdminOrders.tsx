import { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/backend/admin/get_orders.php", {credentials: "include",})
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setOrders(data.data);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Budget</th>
              <th className="p-2 border">Timeline</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Reference_File</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="p-2 border">{order.client_name}</td>
                <td className="p-2 border">{order.email}</td>
                <td className="p-2 border">{order.phone}</td>
                <td className="p-2 border">{order.product_type}</td>
                <td className="p-2 border">{order.budget}</td>
                <td className="p-2 border">{order.timeline}</td>
                <td className="p-2 border">{order.description}</td>
                <td className="p-2 border">{order.reference_file}</td>
                <td className="p-2 border">
                  {new Date(order.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
