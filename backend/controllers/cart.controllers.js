import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
     try {
        const products = await Product.find({_id:{$in:req.user.cartItem  }})

        //add quantity for each product
        const cartItems = products.map(product => {
            const item = req.user.carItems.find(cartItem => cartItem.id === product.id)
            return {...product.toJSON(), quantity: item.quantity}
        })
        res.json(cartItems)
     } catch (error) {
        console.log(error.message,"error in getCartProducts controller");
        res.status(500).json({message:error.message})
     }   
}

export const addToCart = async (req, res) => {

    try {
    const {productId} = req.body   
    const user = req.user
    const existingItem = user.cartItem.find(item => item.id === productId)
    if(existingItem){
        existingItem.quantity++
    } else {
        user.cartItem.push(productId)
    }
    await user.save()
    res.json(user.cartItem)
    } catch (error) {
        console.log(error.message,"error in addToCart controller");
        res.status(500).json({message:error.message})
    }
};

export const removeAllFromCart = async (req, res) => {
try {
    const {productId} = req.body
    const user = req.user
    if(!productId){
        user.cartItem = []
    } else {
        user.cartItem = user.cartItem.filter(item => item.id !== productId)
    }
    await user.save()
    res.json(user.cartItem)
} catch (error) {
    console.log(error.message,"error in removeAllFromCart controller");
    res.status(500).json({message:error.message})
}

}

export const updateQuantity = async (req, res) => {
    try {
        const {id:productId} = req.params
        const {quantity} = req.body
        const user = req.user
        const existingItem = user.cartItem.find(item => item.id === productId)
        if(existingItem){
            if(quantity === 0){
                user.cartItem = user.cartItem.filter(item => item.id !== productId)
                await user.save()
                return res.json(user.cartItem)
            }
            existingItem.quantity = quantity
            await user.save()
            return res.json(user.cartItem)
        } else {
            return res.status(404).json({message:"Product not found"})
        }

    } catch (error) {
        console.log(error.message,"error in updateQuantity controller");
        res.status(500).json({message:error.message})
    }
}