import { Offcanvas, Stack } from "react-bootstrap"
import { useOrderingCart } from "../context/OrderingCartContext"
import { formatCurrency } from "../healper/formatCurrency"
import { CartItem } from "./CartItem"
import storeItems from "../data/products.json"

type OrderingCartProps = {
  isOpen: boolean
}

export function OrderingCart({ isOpen }: OrderingCartProps) {

  // using context to access cart to access necesssery deta.
  const { closeCart, cartItems } = useOrderingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.productId === cartItem.id)
                return total + (item?.retailPrice || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
