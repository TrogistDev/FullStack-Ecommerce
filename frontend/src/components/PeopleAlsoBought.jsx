import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import ProductCard from "./ProductCard";

const PeopleAlsoBought = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get("/products/recommendations");

                setRecommendations(res.data.products);
            } catch (error) {
                toast.error(error.response.data.message || "An error occurred");
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold text-emerald-400">PeopleAlsoBought</h3>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-col-3">
                {recommendations.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default PeopleAlsoBought;
