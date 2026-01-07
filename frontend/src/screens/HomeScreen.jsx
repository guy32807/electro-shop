import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product.jsx'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {

  const { data: products, isLoading, error } = useGetProductsQuery()
  console.log("Products: ", products)
  return (
   <>
   {isLoading ? (<h2>Loading...</h2>) : error ? (<h2>Error: {error?.data?.message || error?.error}</h2>) : (
     <>
     <h1 className='pt-4'>Latest Products</h1>
     <Row>
       {products.map((product) => (
         <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
           <Product product={product} />
         </Col>
       ))}
     </Row>  
     </>
   )}
   </>
  )
}
export default HomeScreen