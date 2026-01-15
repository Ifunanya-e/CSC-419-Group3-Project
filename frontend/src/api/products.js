import api from "./client";

export async function searchProducts(query) {
  try {
    const response = await api.get("/products/search", {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
}

export async function getLowStockProducts() {
  try {
    const response = await api.get("/products/low-stock");
    return response.data;
  } catch (error) {
    console.error("Low stock error:", error);
    throw error;
  }
}