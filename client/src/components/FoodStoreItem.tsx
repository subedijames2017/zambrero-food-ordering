import { Button, Card } from "react-bootstrap";
import { useOrderingCart } from "../context/OrderingCartContext";
import { formatCurrency } from "../healper/formatCurrency";
import { FoodStoreItemProps } from "../types";

export function FoodStoreItem(foodItem: FoodStoreItemProps) {
  const { productId, title, retailPrice, imageUrl, description } = foodItem;
  // using context to access cart to access necesssery deta.
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useOrderingCart();
  const quantity = getItemQuantity(productId);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imageUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{title}</span>
          <span className="ms-2 text-muted">{formatCurrency(retailPrice)}</span>
        </Card.Title>
        <Card.Text>{description || title}</Card.Text>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100"
              style={{ backgroundColor: "#4e9c2d" }}
              onClick={() => increaseCartQuantity(foodItem)}
            >
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  onClick={() => decreaseCartQuantity(foodItem)}
                  style={{ backgroundColor: "#4e9c2d" }}
                >
                  -
                </Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button
                  onClick={() => increaseCartQuantity(foodItem)}
                  style={{ backgroundColor: "#4e9c2d" }}
                >
                  +
                </Button>
              </div>
              <Button
                onClick={() => removeFromCart(productId)}
                variant="outline-danger"
              >
                Remove
              </Button>{" "}
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
