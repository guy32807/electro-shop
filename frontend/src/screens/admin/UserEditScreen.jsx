import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Button, Form, Toast } from "react-bootstrap";
import {toast } from 'react-toastify';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        await updateUser({userId, name, email, isAdmin});
        toast.success('User updated successfully.');
        refetch();
        navigate('/admin/user-list');
    } catch (error) {
        toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <>
      <Link to="/admin/user-list" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}

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
                placeholder="Enter user name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId="isAdmin" className="my-2">
              <Form.Check
                type="checkbox"
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default UserEditScreen;
