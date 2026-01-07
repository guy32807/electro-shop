import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useGetProductDetailQuery } from "../slices/productDetailApiSlice";
import Rating from "../components/Rating";
const ProductScreen = () => {
  const { id } = useParams();
  const { data: productData, isLoading, error } = useGetProductDetailQuery(id);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Card className="my-3 p-3 rounded border-0 shadow-sm">
        <Row>
          {isLoading ? (<h2>Loading...</h2>) : error ? (<h2>Error: {error?.data?.message || error?.error}</h2>) : (
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
                    <ListGroup.Item>
                      <Button
                        className="btn-block w-100"
                        type="button"
                        disabled={productData.countInStock === 0}
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
