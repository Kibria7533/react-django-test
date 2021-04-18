import {useState} from 'react'
import {Row,Col,Container,Jumbotron,Table,Button,Modal,Form} from 'react-bootstrap'

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container style={{background:"yellow" , justifyContent:"center"}}>
      <Row style={{background:"blue" , justifyContent:"center" }}>
      <Jumbotron>
  <h1>Hello, Dijango react public</h1>
</Jumbotron>
      </Row>

    <Row  style={{background:"blue" , justifyContent:"center" }}>
    <Col md={6} style={{background:"red"}}><Table striped bordered hover>
  <thead>
    <tr>
      <th>id</th>
      <th>Task Name</th>
      <th>Actions</th>
      
    </tr>
  </thead>
  <tbody>
   
    <tr>
      <td>3</td>
      <td >Larry the Bird</td>
      <td> <Button >Edit</Button><Button >Delete</Button></td>
    </tr>
    <tr>
      <td>3</td>
      <td >Larry the Bird</td>
      <td><Button >Edit</Button><Button >Delete</Button></td>
    </tr>
    <tr>
      <td>3</td>
      <td >Larry the Bird</td>
      <td><Button >Edit</Button><Button >Delete</Button></td>
    </tr>
  </tbody>
</Table> </Col>
    </Row>
    <Row style={{justifyContent: 'center'}}>
      <Button onClick={handleShow}>Add</Button>
    </Row>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Enter your task</Form.Label>
    <Form.Control type="text" placeholder="Enter your task" />
   
  </Form.Group>

 
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </Container>
  );
}

export default App;
