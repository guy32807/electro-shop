import { useEffect, useState } from "react";
import {
  Link,
  UNSAFE_shouldHydrateRouteLoader,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation
} from "../../slices/productsApiSlice";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Button, Form, Toast } from "react-bootstrap";
import {toast } from 'react-toastify';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailQuery(productId);
  const [uploadProductImage, {isLoading: loadingUpload} ] = useUploadProductImageMutation();

  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id:productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }
    const result = updateProduct(updatedProduct);
    if(result.error){
      toast.error(result.error);
    }else{
      toast.success('Product updated successfully!');
      navigate('/admin/product-list');
    }
  }

  const uploadFileHandler =  async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message)
            setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }
  return (
    <>
      <Link to="/admin/product-list" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isUpdating && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error?.data?.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" placeholder="Enter the image url" value={image} onChange={(e) => setImage(e.target.value)}>
              </Form.Control>
              <Form.Control type="file" label='Choose a file' onChange={uploadFileHandler}></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product availability"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' rows={5}
                type="text"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default ProductEditScreen;
