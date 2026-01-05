import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"
const Product = ({product}) => {
  return (
    <Card className="my-3 p-3 rounded border-0 shadow-sm">
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top" />
        </Link>
      <Card.Body>
       <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
            <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
            </Card.Title>
        </Link>
        <Card.Text className="mt-3">
          {product.description}
        </Card.Text>
        <Card.Text as="div">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <strong>${product.price}</strong>
      </Card.Body>
    </Card>
  )
}
export default Product