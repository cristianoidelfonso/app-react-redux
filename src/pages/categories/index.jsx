import axios from 'axios';
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Form, Modal, Button } from 'react-bootstrap';
import authHeader from "../../services/auth-header";
import moment from 'moment';
moment.locale('pt-br');

const Categories = () => {

  const [categories, setCategories] = useState([]);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log({ name, description });
    const payload = {
      name: name,
      description: description
    }
    
    axios.post(`https://teste-mypharma.herokuapp.com/categories`, payload, { headers: authHeader() })
      .then((response) => {
        setCategories(response.data);
        handleClose();
        setName('');
        setDescription('');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(async () => {
    const response = await axios.get(`https://teste-mypharma.herokuapp.com/categories`,{ headers: authHeader() })
    setCategories(response.data);
  }, [categories]);

  return (
    <>
    
      <div className="container">
        <header className="jumbotron d-flex flex-row justify-content-between align-items-center mb-4">
          <h3>
            Categories Index
          </h3>
          <button className="btn btn-success btn-sm" onClick={handleShow}>New Category</button>
         
        </header>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>CREATED_AT</th>
              <th>UPDATED_AT</th>
              <th colSpan="2" className="text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>

            { categories.length > 0 && categories.map((cat, index) => (
                  <tr key={ cat._id}>
                    <td>{ index + 1 }</td>
                    <td>{ cat.name }</td>
                    <td>{ cat.description }</td>
                    
                    <td>{ moment(cat.createdAt).format('DD/MM/YYYY') }</td>
                    <td>{ moment(cat.updatedAt).format('DD/MM/YYYY') }</td>

                    <td className='text-primary'><FaEdit title='Edit' /></td>
                    <td className='text-danger'><FaTrash title='Delete' /></td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>       
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" block="true">
              Save
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
          
    </>
  );
};

export default Categories;