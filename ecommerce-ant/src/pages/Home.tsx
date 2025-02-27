import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Row, Col, Spin, Typography } from "antd";
import { Product } from "../types";

const { Title } = Typography;

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get<Product[]>("https://fakestoreapi.com/products")
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

    return (
        <div className="p-10">
            <Title level={2} className="text-center">Products</Title>
            <Row gutter={[16, 16]} justify="center">
                {products.map(product => (
                    <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={<img alt={product.title} src={product.image} className="h-48 object-contain p-4" />}
                        >
                            <Card.Meta title={product.title} description={`$${product.price}`} />
                            <Link to={`/product/${product.id}`} className="block mt-2 text-blue-500">
                                View Details
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;
