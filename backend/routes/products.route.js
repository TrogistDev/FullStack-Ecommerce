import express from "express";
import { createProduct, deleteProduct, getAllProduct, getFeaturedProducts, getProductsbyCategory, getRecommendedProducts, toggleFeaturedProduct } from "../controllers/product.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js"
import { adminRoute } from "../middleware/auth.middleware.js";


const router = express.Router()
router.get("/", protectRoute,adminRoute,getAllProduct)
router.get("/featured", getFeaturedProducts)
router.get("/recommendations", getRecommendedProducts)
router.get("/category/:category", getProductsbyCategory)
router.post("/", protectRoute,adminRoute,createProduct)
router.patch("/:id", protectRoute,adminRoute, toggleFeaturedProduct)
router.delete("/:id", protectRoute,adminRoute,deleteProduct)
export default router