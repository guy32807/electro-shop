import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import {
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductEditForm = ({ product, onSave, isLoadingUpdate}) => {
  // Initialize state directly from the product prop
   const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category);
  const [countInStock, setCountInStock] = useState(product.countInStock);
  const [description, setDescription] = useState(product.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    });
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image); // This updates the local state with the /uploads/path
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
              {loadingUpload && <Loader />}
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
            <Button type="submit" variant="primary" disabled={isLoadingUpdate} className="my-2">Update</Button>
    </Form>
  );
};

export default ProductEditForm;