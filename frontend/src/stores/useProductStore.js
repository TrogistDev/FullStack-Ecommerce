import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    setProducts: (products) => set({ products }),
    createProduct: async (productData) => {
        set({ loading: true });
        try {
            const res = await axios.post("/products", productData);

            set((prevState) => ({
                products: [...prevState.products, res.data],
                loading: false,
            }));
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
            set({ loading: false });
        }
    },
    fetchProductsByCategory: async (category) => {
        set({ loading: true });
        try {
            const response = await axios.get(`/products/category/${category}`);

            set({ products: response.data.products, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || "An error occurred");
        }
    },
    fetchAllProducts: async (id) => {
        set({ loading: true });
        try {
            const response = await axios.get("/products");

            set({ products: response.data.products, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || "An error occurred");
        }
    },
    deleteProduct: async (productId) => {
        set({ loading: true });
        try {
            await axios.delete(`/products/${productId}`);
            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== productId),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || "An error occurred");
        }
    },
    toggleFeaturedProduct: async (productId) => {
        set({ loading: true });
        try {
            const response = await axios.patch(`/products/${productId}`);

            console.log(response);
            set((prevProducts) => ({
                products: prevProducts.products.map((product) =>
                    product._id === productId
                        ? {
                              ...product,
                              isFeatured: response.data.isFeatured,
                          }
                        : product
                ),
                loading: false,
            }));
        } catch (error) {
            console.error("Erro ao destacar produto:", error);
            set({ loading: false });
            const message =
                error.response?.data?.message || error.message || "Erro ao destacar produto";

            toast.error(message);
        }
    },
    fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products/featured");
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      console.log("Error fetching featured products:", error);
    }
  },
}));
