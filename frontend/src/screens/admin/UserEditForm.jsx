import { useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const UserEditForm = ({ user, submitHandler }) => {
  // Initialize state directly from props - No useEffect needed!
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  return (
    <Form onSubmit={(e) => submitHandler(e, { name, email, isAdmin })}>
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
  );
};

export default UserEditForm;