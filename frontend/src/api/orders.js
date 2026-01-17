import api from "./client";

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @param {string} orderData.type - Order type (inbound/outbound)
 * @param {number} orderData.created_by - User ID who created the order
 * @param {number} orderData.total_amount - Total amount of the order
 * @returns {Promise<Object>} Created order
 */
export async function createOrder(orderData) {
    try {
        const response = await api.post("/orders/", orderData);
        return response.data;
    } catch (error) {
        console.error("Create order error:", error);
        const errorMessage = error.response?.data?.detail || "Failed to create order";
        throw new Error(errorMessage);
    }
}

/**
 * Get all orders
 * @returns {Promise<Array>} List of orders
 */
export async function getAllOrders() {
    try {
        const response = await api.get("/orders/");
        return response.data;
    } catch (error) {
        console.error("Get orders error:", error);
        throw error;
    }
}

/**
 * Get a specific order by ID
 * @param {number} orderId - Order ID
 * @returns {Promise<Object>} Order details
 */
export async function getOrderById(orderId) {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Get order error:", error);
        throw error;
    }
}

/**
 * Update an order
 * @param {number} orderId - Order ID
 * @param {Object} updates - Order updates
 * @returns {Promise<Object>} Updated order
 */
export async function updateOrder(orderId, updates) {
    try {
        const response = await api.patch(`/orders/${orderId}`, updates);
        return response.data;
    } catch (error) {
        console.error("Update order error:", error);
        throw error;
    }
}
