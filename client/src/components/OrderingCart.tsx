import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useOrderingCart } from "../context/OrderingCartContext";
import { formatCurrency } from "../healper/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/products.json";
import moment from "moment-timezone";
import { useEffect, useState } from "react";

type OrderingCartProps = {
  isOpen: boolean;
};

export function OrderingCart({ isOpen }: OrderingCartProps) {
  // using context to access cart to access necesssery deta.
  const { closeCart, cartItems, orderFromCart } = useOrderingCart();
  const [isTimeInRange, setIsTimeInRange] = useState(false);

  const handleSubmitOrder = async (event: any) => {
    event.preventDefault();
    orderFromCart();
    closeCart();
    // send order data to server or perform other actions here
  };
  useEffect(() => {
    // Convert the current time to AEST timezone
    const currentTime = moment().tz("Australia/Sydney");

    // Check if the current time is between 10am-10pm AEST
    const isInRange = currentTime.isBetween(
      moment(currentTime).set("hour", 10).set("minute", 0),
      moment(currentTime).set("hour", 22).set("minute", 0)
    );

    setIsTimeInRange(isInRange);
  }, []);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Food Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.productId} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(
                  (i) => i.productId === cartItem.productId
                );
                return total + (item?.retailPrice || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
      {isTimeInRange ? (
        <Button
          className="w-80"
          style={{
            backgroundColor: "#4e9c2d",
            marginBottom: "10px",
            width: "80%",
            height: "58px",
            marginLeft: "40px",
          }}
          onClick={(e) => {
            handleSubmitOrder(e);
          }}
        >
          Place Order
        </Button>
      ) : (
        <span>Ordering allowed between between 10am-10pm AEST </span>
      )}
    </Offcanvas>
  );
}
