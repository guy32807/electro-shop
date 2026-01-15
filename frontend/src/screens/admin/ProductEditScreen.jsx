import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation
} from "../../slices/productsApiSlice";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Button, Form, Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import ProductEditForm from "./ProductEditForm";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailQuery(productId);
  const [updateProduct, { isLoading: isLoadingUpdate }] = useUpdateProductMutation();
  
  const submitHandler = async (formData) => {
    try {
      await updateProduct({ productId, ...formData }).unwrap();
      toast.success('Product updated successfully');
      navigate('/admin/product-list');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/product-list" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isLoadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error?.data?.message}</Message>
        ) : (
          <ProductEditForm
            key={product._id}
            product={product}
            onSave={submitHandler}
            isLoadingUpdate={isLoadingUpdate}
          />
        )}
      </FormContainer>
    </>
  );
};
export default ProductEditScreen;
