import axios from 'axios';
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Form, Modal, Button } from 'react-bootstrap';
import authHeader from "../../services/auth-header";
import moment from 'moment';
moment.locale('pt-br');

const Brands = () => {

  const [brands, setBrands] = useState([]);

  const [name, setName] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log({ name });
    
    axios.post(`http://localhost:5055/brands`, { name }, { headers: authHeader() })
      .then((response) => {
        setBrands(response.data);
        handleClose();
        setName('');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(async () => {
    const response = await axios.get(`http://localhost:5055/brands`,{ headers: authHeader() })
    setBrands(response.data);
  }, [brands]);

  return (
    <>

      <div className="container">
        <header className="jumbotron d-flex flex-row justify-content-between align-items-center mb-4">
          <h3>
            Brands
          </h3>
          <button className="btn btn-success btn-sm" onClick={handleShow}>New Brand</button>
        </header>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CREATED_AT</th>
              <th>UPDATED_AT</th>
              <th colSpan="2" className="text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>

            { brands.length > 0 && brands.map((brand, index) => (
                  <tr key={ brand._id}>
                    <td>{ index + 1 }</td>
                    <td>{ brand.name }</td>
                    <td>{ moment(brand.createdAt).format('DD/MM/YYYY') }</td>
                    <td>{ moment(brand.updatedAt).format('DD/MM/YYYY') }</td>
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
            <Modal.Title>New Brand</Modal.Title>
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

export default Brands;