import { Col, Row } from "react-bootstrap"
import { FoodStoreItem } from "../components/FoodStoreItem"
import storeItems from "../data/products.json"

export function FoodStore() {
  return (
    <>
      <h1>Food Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map(item => (
          <Col key={item.productId}>
            <FoodStoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  )
}
