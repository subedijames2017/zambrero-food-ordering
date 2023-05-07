import { Button, Stack } from "react-bootstrap";
import { useOrderingCart } from "../context/OrderingCartContext";
import storeItems from "../data/products.json";
import { formatCurrency } from "../healper/formatCurrency";
import { CartItemProps } from "../types";

export function CartItem({ productId, quantity }: CartItemProps) {
  const { removeFromCart } = useOrderingCart();
  const item = storeItems.find((i) => i.productId === productId);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imageUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt="food"
      />
      <div className="me-auto">
        <div>
          {item.title}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.retailPrice)}
        </div>
      </div>
      <div> {formatCurrency(item.retailPrice * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.productId)}
      >
        &times;
      </Button>
    </Stack>
  );
}
