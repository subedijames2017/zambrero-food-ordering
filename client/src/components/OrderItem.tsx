import { Card } from "react-bootstrap";
import { formatCurrency } from "../healper/formatCurrency";
import { CartItem } from "../types";

export function OrderItems(foodItem: CartItem) {
  const { title, retailPrice, imageUrl, description, quantity } = foodItem;

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
          <span className="fs-4">
            {title}
            <span className="text-muted" style={{ fontSize: "1.05rem" }}>
              {" "}
              x{quantity}
            </span>
          </span>

          <span className="ms-2 text-muted">
            {formatCurrency(retailPrice * quantity)}
          </span>
        </Card.Title>
        <Card.Text>{description || title}</Card.Text>
      </Card.Body>
    </Card>
  );
}
