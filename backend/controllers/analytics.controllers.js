import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
export const getAnalyticsData = async () => {
  const totalUsers = await User.CountDocuments();
  const totalProducts = await Product.CountDocuments();
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null, // Agrupa TODOS os documentos em um único grupo (sem separação)
        totalSales: { $sum: 1 }, // Conta quantos documentos existem (cada documento = 1 venda)
        totalRevenue: { $sum: "$totalAmount" }, // Soma o valor do campo "totalAmount" de todos os documentos
      },
    },
  ]);
  const {totalSales, totalRevenue} = salesData[0] || {totalSales: 0, totalRevenue: 0}
  return {
    users:totalUsers,
    products:totalProducts,
    sales:totalSales,
    revenue:totalRevenue
  }
};
export const getDailySalesData = async () =>{
    try {
        const dailySalesData = await Order.aggregate([
        {
            $match:{
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                },
            },
        },
        {
            $group:{
                _id: {$dateToString:{ format: " %Y-%m-%d", date: "$createdAt"}},
                sales: {$sum:1},
                revenue: {$sum:"$totalAmount"},
            },
        },
        {$sort:{_id: 1}},
    ])
    const dateArray = getDatesInRange(startDate,endDate)
    return dateArray.map(date => {
        const foundData= dailySalesData.find( item => item._id === date)
        return {
            date,
            sales: foundData?.sales || 0,
            revenue: foundData?.revenue || 0
        }
    })
    } catch (error) {
      throw error  
    }
}
function getDatesInRange(startDate,endDate){
    const dates = []
    let currentDate = newDate(startDate)
    while (currentDate <= endDate){
        dates.push(currentDate.toISOString().split("T")[0])
        currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
}
