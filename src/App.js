import axios from 'axios';
import { useEffect, useState } from 'react'
import { Row, Col, Container, Jumbotron, Table, Button, Modal, Form } from 'react-bootstrap'
import { Gradient } from 'react-gradient';
function App() {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const [editedTask,setEditedTask]=useState("");
  const [id,setId]=useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getTask = async () => {

    await axios.get('https://warm-falls-02259.herokuapp.com/api/task').then(data => {
      setTasks(data.data)

    })
  }

  const saveTask = async (e) => {
    e.preventDefault()
    setLoading(true)
    await axios.post('https://warm-falls-02259.herokuapp.com/api/task/store', { "task_name": task}
      ,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(data => {
        setLoading(false)
        setTask("")
        setShow(false)

      }).catch(err => {
        setLoading(false)
      })
  }
  const deleteTask=async(id)=>{
    setLoading(true)
    await axios.get(`https://warm-falls-02259.herokuapp.com/api/task/delete/${id}`, 
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(data => {
        setLoading(false)
      }).catch(err => {
        setLoading(false)
      })

  }
  const updateModal=(id,item)=>{
    setEditedTask(item)
    setId(id)
    console.log(item)
    setEditShow(true)


  }

  const updateTask=async(e)=>{
    e.preventDefault();
    setLoading(true)
    await axios.post(`https://warm-falls-02259.herokuapp.com/api/task/update/${id}`,{"task_name":editedTask},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(data => {
        setEditShow(false)
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        setEditShow(false)
      })


  }

  useEffect(async () => {
    await getTask();
  }, [loading])
  return (
    <Container style={{ justifyContent: "center" }}>
      <Row style={{ justifyContent: "center" }}>
        <Jumbotron>
          <h1>Hello, Laravel react public</h1>
        </Jumbotron>
      </Row>

      <Row class="tablecontent" style={{ justifyContent: "center" }}>
        <Col md={6}>


          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Task Name</th>
                <th>Actions</th>

              </tr>
            </thead>
            <tbody>
              {tasks.map((singletask, index) => {
                return (
                  <tr>
                    <td key={index}>{index + 1}</td>
                    <td >{singletask.task_name}</td>
                    <td> <Button onClick={()=>updateModal(singletask.id,singletask.task_name)} >Edit</Button><Button style={{marginLeft:"5px"}} onClick={()=>deleteTask(singletask.id)}>Delete</Button></td>
                  </tr>
                )
              })}


            </tbody>
          </Table>

        </Col>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <Button onClick={handleShow}>Add</Button>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={saveTask}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter your task</Form.Label>
              <Form.Control type="text" onChange={(e)=>setTask(e.target.value)} placeholder="Enter your task" />

            </Form.Group>


            <Button variant="primary" type="submit">
              Add
  </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
      {/* edit modal */}
      <Modal show={editshow} onHide={()=>setEditShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={updateTask} >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter your task</Form.Label>
              <Form.Control type="text" value={editedTask} onChange={(e)=>setEditedTask(e.target.value)} placeholder="Enter your task" />

            </Form.Group>


            <Button variant="primary" type="submit">
              Save Edit
  </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setEditShow(false)}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
