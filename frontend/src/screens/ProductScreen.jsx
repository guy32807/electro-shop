import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row, Form } from "react-bootstrap";
import { addToCart } from '../slices/cartSlice.js'

import { useGetProductDetailQuery } from "../slices/productsApiSlice.js";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import { useState } from "react";
const ProductScreen = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const { data: productData, isLoading, error } = useGetProductDetailQuery(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({...productData, qty}));
    navigate('/cart');
  }
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Card className="my-3 p-3 rounded border-0 shadow-sm">
        <Row>
          {isLoading ? (<Loader />) : error ? (<Message variant="danger">{error?.data?.message || error?.error}</Message>) : (
            <>
              <Col md={6}>
                <Card.Img src={productData.image} alt={productData.name} />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{productData.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={productData.rating}
                      text={`${productData.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${productData.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {productData.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${productData.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {productData.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}

                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {productData.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty: </Col>
                          <Col>
                            <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                              {[...Array(productData.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        className="btn-block w-100"
                        type="button"
                        disabled={productData.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </Card>
    </>
  )
}
export default ProductScreen
