import { Col, Row } from "react-bootstrap";
import { FoodStoreItem } from "../components/FoodStoreItem";
import { useEffect, useState } from "react";
import { getFoods } from "../service";
import { FoodStoreItemProps } from "../types";
import { LoadingSpinner } from "../components/Spinner";

export function FoodStore() {
  const [foods, setFoods] = useState<FoodStoreItemProps[]>([]);

  useEffect(() => {
    async function fetchFoods() {
      const data = await getFoods();
      setFoods(data);
    }
    fetchFoods();
  }, []);

  return (
    <>
      <h1>Food Store</h1>
      {foods.length > 0 ? (
        <>
          <Row md={2} xs={1} lg={3} className="g-3">
            {foods.map((item) => (
              <Col key={item.productId}>
                <FoodStoreItem {...item} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
