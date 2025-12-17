import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import { connnectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import productRoutes from "./routes/products.route.js"
import cartRoutes from "./routes/cart.routes.js"
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"
import analyticsRoutes from "./routes/analytics.route.js"
import path from "path"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

const __dirname = path.resolve()


app.use(express.json({limit: "10mb"}))
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/coupons", couponRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/analytics", analyticsRoutes )
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
    })

}
app.listen(PORT,"0.0.0.0", () => {
    console.log("server is running");
    connnectDB()
})
