import axios from "axios";
import { CartItem, FoodStoreItemProps, SuccessMessage } from "../types";
import { API_BASE_URL } from "../config";

export async function getFoods(): Promise<FoodStoreItemProps[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/foods`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function orderFood(
  carData: CartItem[]
): Promise<SuccessMessage[]> {
  try {
    const response = await axios.post(`${API_BASE_URL}/order`, carData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getOrders(): Promise<CartItem[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/order`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
