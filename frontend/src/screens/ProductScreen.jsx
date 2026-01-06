import { Link, useParams } from "react-router-dom";
import products from "../products";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Card className="my-3 p-3 rounded border-0 shadow-sm">
        <Row>
          <Col md={5}>
            <Card.Img src={product.image} variant="top" width={"250px"} fluid />
          </Col>
          <Col md={4}>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price: </strong>${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description: </strong>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Col>
          <Col md={3}>
            <Card.Body>
              <Card.Text>
                <strong>Status: </strong>
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </Card.Text>
              <button
                className="btn btn-primary btn-block"
                type="button"
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};
export default ProductScreen;
