
import {create} from "zustand";
import { persist } from "zustand/middleware";
import { getProducts } from "../api/product";
import { getUsers } from "../api/users";

export const useProductStore = create(persist((set) => ({
    products: [],
    getProducts: async () => {
        try {
            console.log("Fetching products...");
            const response = await getProducts();
            console.log("Products response:", response);
            set({ products: response.data || response });
            console.log("Products loaded successfully");
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
}), {
  name: "product-store",
  partialize: (state) => ({ products: state.products }),
}));

export const useUserStore = create(persist((set) => ({
    users: [],
    getUsers: async () => {
        try{
            const response = await getUsers();
            set({ users: response.data || response });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        finally {
            console.log("Finished fetching users");
        }

    }
}), {
  name: "user-store",
  partialize: (state) => ({ users: state.users }),
}));