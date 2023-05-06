import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { FoodStore } from "./pages/FoodStore"
import { Order } from "./pages/Order"
import { Navbar } from "./components/Navbar"
import { OrderingCartProvider } from "./context/OrderingCartContext"

function App() {
  return (
    <OrderingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<FoodStore />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </Container>
    </OrderingCartProvider>
  )
}

export default App
