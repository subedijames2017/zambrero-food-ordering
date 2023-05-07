import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getOrders } from "../service";
import { CartItem } from "../types";
import { OrderItems } from "../components/OrderItem";
import io from "socket.io-client";
import { API_BASE_URL } from "../config";

export function Order() {
  const [orders, setOrders] = useState<CartItem[]>([]);

  const socket = io(API_BASE_URL, {
    transports: ["websocket", "polling", "flashsocket"],
  });

  useEffect(() => {
    async function fetchFoods() {
      const data = await getOrders();
      setOrders(data);
    }
    fetchFoods();
    socket.on("connection", (message: string) => {
      console.log(message);
    });
    socket.on("message", (payload: any) => {
      console.log("Received message:", payload);
    });
    // Request server for new orders when user create order and goes to order page
    socket.emit("UpateNewOrders");
    socket.on("UpdateNewOrderToClient", (payload: CartItem[]) => {
      setOrders(payload);
    });
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
