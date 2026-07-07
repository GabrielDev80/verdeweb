const OrderCard = ({ order }) => {
  return (
    <article className="order-card">
      <header className="order-card-header">
        <h2>{order.order_number}</h2>
        <span>{order.status}</span>
      </header>

      <div className="order-card-body">
        <p>
          <strong>Fecha:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString("es-AR")}
        </p>

        <p>
          <strong>Total:</strong> ${order.total_amount}
        </p>

        <p>
          <strong>Productos:</strong> {order.products.length}
        </p>
      </div>
    </article>
  );
};

export default OrderCard;
