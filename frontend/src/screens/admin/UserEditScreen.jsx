import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

import { toast } from "react-toastify";
import UserEditForm from "./UserEditForm";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const submitHandler = async (e, formData) => {
    e.preventDefault();
    try {
      await updateUser({ userId, ...formData }).unwrap();
      toast.success("User updated");
      navigate("/admin/user-list");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
          <UserEditForm
            key={user._id}
            user={user}
            submitHandler={submitHandler}
          />
        )}
      </FormContainer>
    </>
  );
};
export default UserEditScreen;
