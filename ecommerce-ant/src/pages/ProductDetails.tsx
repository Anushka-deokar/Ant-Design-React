import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Typography, Spin } from "antd";
import { Product } from "../types";

const { Title, Text } = Typography;

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get<Product>(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching product:", error));
    }, [id]);

    if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="max-w-2xl p-6">
                <img src={product?.image} alt={product?.title} className="w-48 h-48 mx-auto mb-4" />
                <Title level={2}>{product?.title}</Title>
                <Text>{product?.description}</Text>
                <Title level={3} className="text-green-600 mt-4">${product?.price}</Title>
            </Card>
        </div>
    );
};

export default ProductDetails;
