import { useEffect, useState } from "react";
import { getUserOrders } from "../services/order.service.js";
import OrderCard from "../components/orders/OrderCard.jsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading)
    return (
      <div className="container-lg">
        <main className="orders-page">
          <p>Cargando pedidos...</p>
        </main>
      </div>
    );

  return (
    <div className="container-lg">
      <main className="orders-page">
        <h1>Mis pedidos</h1>

        {orders.length === 0 ? (
          <p>No tenés pedidos realizados.</p>
        ) : (
          <section className="order-list">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default Orders;
