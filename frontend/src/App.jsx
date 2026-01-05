import { Container } from "react-bootstrap"
import Header from "./components/Header"

const App = () => {
  return (
    <>
      <Container className="my-3">
        <main className="py-3">
          <Header />
        </main>
      </Container>
    </>
  )
}
export default App