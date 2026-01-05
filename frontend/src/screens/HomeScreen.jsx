import {Row, Col, Card, CardBody, CardHeader, CardFooter} from 'react-bootstrap'
import products from '../products.js'
import Product from '../components/Product.jsx'
const HomeScreen = () => {
  return (
   <>
        <h1 className='pt-4'>Latest Products</h1>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
                <Product product={product} />
            </Col>
          ))}
        </Row>  
   </>
  )
}
export default HomeScreen