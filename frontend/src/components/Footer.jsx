import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Container>
      <footer className="bg-dark text-white p-4">
        <Row>
          <Col md={4}>
            <h5>Electro Shop</h5>
            <p>Your one-stop shop for all electronic needs.</p>
            <p>&copy; {currentYear} Electro Shop. All rights reserved.</p>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: info@electroshop.com</p>
            <p>Phone: (123) 456-7890</p>
          </Col>
          <Col md={4} className="text-md-end">
            <h5>Follow Us</h5>
            <p>
              <a href="#" className="text-white me-2">
                Facebook
              </a>
              <a href="#" className="text-white me-2">
                Twitter
              </a>
              <a href="#" className="text-white">
                Instagram
              </a>
            </p>
          </Col>
        </Row>
      </footer>
    </Container>
  );
};
export default Footer;
