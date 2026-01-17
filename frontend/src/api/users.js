import api from "./client";

export async function createUser(payload) {
  try {
    const response = await api.post("/users", payload);
    return response.data;
  } catch (error) {
    // Log the full error for debugging
    console.error("API Error:", error.response?.data || error.message);
    
    // Throw a more user-friendly error
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw error;
  }
}

/**
 * Get all users
 * @returns {Promise<Array>} List of all users
 */
export async function getAllUsers() {
  try {
    const response = await api.get("/users/");
    return response.data;
  } catch (error) {
    console.error("Get users error:", error);
    console.error("Error details:", error.response?.data);
    
    // Provide more specific error messages
    if (error.response?.status === 405) {
      throw new Error("This endpoint is not available. Please check your permissions.");
    } else if (error.response?.status === 403) {
      throw new Error("You don't have permission to view users. Admin access required.");
    } else if (error.response?.status === 401) {
      throw new Error("Please log in to view users.");
    }
    
    throw error;
  }
}

/**
 * Update current user's password
 * @param {Object} passwordData - Contains current_password and new_password
 * @returns {Promise<Object>} Success message
 */
export async function updateMyPassword(passwordData) {
  try {
    const response = await api.patch("/users/me/password", passwordData);
    return response.data;
  } catch (error) {
    console.error("Password update error:", error);
    
    if (error.response?.status === 400) {
      throw new Error(error.response.data.detail || "Current password is incorrect");
    } else if (error.response?.status === 401) {
      throw new Error("Please log in to update your password");
    }
    
    throw new Error("Failed to update password. Please try again.");
  }
}
/**
 * Update a user's information (admin only)
 * @param {number} userId - The user ID to update
 * @param {Object} userData - Updated user data (full_name, email, role)
 * @returns {Promise<Object>} Updated user object
 */
export async function updateUser(userId, userData) {
  try {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("User update error:", error);
    
    if (error.response?.status === 403) {
      throw new Error("You don't have permission to update users. Admin access required.");
    } else if (error.response?.status === 404) {
      throw new Error("User not found");
    } else if (error.response?.status === 401) {
      throw new Error("Please log in to update users");
    }
    
    throw new Error(error.response?.data?.detail || "Failed to update user. Please try again.");
  }
}

/**
 * Delete a user (admin only)
 * @param {number} userId - The user ID to delete
 * @returns {Promise<void>}
 */
export async function deleteUser(userId) {
  try {
    await api.delete(`/users/${userId}`);
  } catch (error) {
    console.error("User delete error:", error);
    
    if (error.response?.status === 403) {
      throw new Error("You don't have permission to delete users. Admin access required.");
    } else if (error.response?.status === 404) {
      throw new Error("User not found");
    } else if (error.response?.status === 401) {
      throw new Error("Please log in to delete users");
    }
    
    throw new Error(error.response?.data?.detail || "Failed to delete user. Please try again.");
  }
}
