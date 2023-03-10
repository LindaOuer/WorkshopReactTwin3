import { Component, useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";

import { deleteProduct, getallProducts } from "../service/api";
import Product from "./Product";

function Products(props) {
    const [products, setProducts] = useState([]);
    const [Greeting, setGreeting] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {
        getProducts();
        // getallProducts().then((res)=> setProducts(res)).catch((err)=> console.log(err))
    }, []);

    const getProducts = async () => {
        const response = await getallProducts();
        console.log(response);
        setProducts(response.data);
    };
    const buy = (product) => {
        if (product.quantity > 0) {
            product.quantity--;
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        }
    };
    const deleteProd = async (id) => {
        const result = window.confirm("Are you sure you want to delete?");
        if (result) {
            await deleteProduct(id);
            getProducts();
        }
    };
    useEffect(() => {
        console.log("I have finished rendering avec un état = " + Greeting);
        setGreeting(true);
        setTimeout(() => {
            setGreeting(false);
        }, 3000);
        return () => {
            console.log("I'm being destroyed");
        };
    }, []);
    useEffect(() => {
        console.log("I have been updated avec un état = " + Greeting);
    }, [Greeting]);

    return (
        <Container style={{ marginTop: "30px" }}>
            {Greeting && (
                <Alert variant="success">
                    <Alert.Heading>
                        Hey, Welcome To Our Shop <strong> MyStore </strong>{" "}
                    </Alert.Heading>
                    <p>
                        Thank you for choosing our store, we hope you enjoy your
                        shopping experience!
                    </p>
                    <hr />
                </Alert>
            )}
            <Row>
                {products.map((product, index) => (
                    <Col md={4} key={product.id}>
                        <Product
                            product={product}
                            buyFunction={buy}
                            deleteProd={deleteProd}
                        />
                    </Col>
                ))}
            </Row>
            {showMessage && (
                <Alert style={{ marginTop: "30px" }} variant="primary">
                    <p>You Bought an Item</p>
                </Alert>
            )}
        </Container>
    );
}

export default Products;
