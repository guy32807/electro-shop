import {Row, Col, Card, CardBody, CardHeader, CardFooter} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../components/Product.jsx'
const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Simulate fetching data from an API
    const products = async () => {
      const {data} = await axios.get('/api/products')
      console.log("Data: ", data)
      setProducts(data)
    }
    products()
  }, [])

  return (
   <>
        <h1 className='pt-4'>Latest Products</h1>
        <Row>
          {products && Array.isArray(products) ? products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          )) : <p>No products available.</p>}
        </Row>  
   </>
  )
}
export default HomeScreen