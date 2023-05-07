import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getOrders } from "../service";
import { CartItem } from "../types";
import { LoadingSpinner } from "../components/Spinner";
import { OrderItems } from "../components/OrderItem";

export function Order() {
  const [orders, setOrders] = useState<CartItem[]>([]);

  useEffect(() => {
    async function fetchFoods() {
      const data = await getOrders();
      setOrders(data);
    }
    fetchFoods();
  }, []);

  return (
    <>
      <h1>Food Store</h1>
      {orders.length > 0 ? (
        <>
          <Row md={2} xs={1} lg={3} className="g-3">
            {orders.map((item, index) => (
              <Col key={index}>
                <OrderItems {...item} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div>No orders to show</div>
      )}
    </>
  );
}
