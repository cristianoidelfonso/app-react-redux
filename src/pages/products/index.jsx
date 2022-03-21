import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Form, Modal, Button } from 'react-bootstrap';
import authHeader from "../../services/auth-header";
import moment from 'moment';
import Select from "../../components/Select";
import Input from "../../components/Input";
moment.locale('pt-br');

const Products = () => {

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [product, setProduct] = useState([]);

  const [products, setProducts] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect( async () => {

    const allCategories = await axios.get(`https://teste-mypharma.herokuapp.com/categories`, { headers: authHeader() });
    setCategories(allCategories.data);
    
    const allBrands = await axios.get(`https://teste-mypharma.herokuapp.com/brands`, { headers: authHeader() });
    setBrands(allBrands.data);
    
    const response = await axios.get(`https://teste-mypharma.herokuapp.com/products`, { headers: authHeader() });
    setProducts(response.data);

  }, [products]);


  const onSubmit = async (e) => {
    e.preventDefault();
    // const payload = JSON.stringify(product);
    const payload = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      brand: product.brand
    }
    
    axios.post(`https://teste-mypharma.herokuapp.com/products`, payload, { headers: authHeader() })
      .then((response) => {
        // setProducts(response.data);
        handleClose();
        setProduct([]);
      })
      .catch((error) => {
        console.log(error);
      })
  
  }

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleSelectCategory(e) {
    setProduct({
      ...product, 
      category: e.target.value,
      
    });
  }

  function handleSelectBrand(e) {
    setProduct({
      ...product, 
      brand: e.target.value,
    });
  }

  return (
    <>
      <div className="container">
        <header className="jumbotron d-flex flex-row justify-content-between align-items-center mb-4">
          <h3>
            Products
          </h3>
          <button className="btn btn-success btn-sm" onClick={handleShow}>New product</button>
        </header>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>BRAND</th>
              <th>STOCK</th>
              <th>CREATED_AT</th>
              <th>UPDATED_AT</th>
              <th colSpan="2" className="text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            { products.length > 0 && products.map((product, index) => (
                  <tr key={ product._id}>
                    <td>{ index + 1 }</td>
                    <td>{ product.name }</td>
                    <td>{ product.category.name }</td>
                    <td>${ product.price }</td>
                    <td>{ product.brand.name }</td>
                    <td>{ product.stock }</td>
                    <td>{ moment(product.createdAt).format('DD/MM/YYYY') }</td>
                    <td>{ moment(product.updatedAt).format('DD/MM/YYYY') }</td>
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
            <Input
              type="text"
              text="Name"
              name="name"
              placeholder="Name"
              handleOnChange={handleChange}
              value={product.name ? product.name : ''}
            />    

            <Input
              type="text"
              text="Description"
              name="description"
              placeholder="Description"
              handleOnChange={handleChange}
              value={product.description ? product.description : ''}
            />    

            <Select
              name="category_id"
              text="Category"
              options={categories}
              handleOnChange={handleSelectCategory}
              value={product.category ? product.category : ''}
            />  

            <Input
              type="number"
              text="Price"
              name="price"
              placeholder="Price"
              handleOnChange={handleChange}
              value={product.price ? product.price : ''}
            />

            <Select
              name="brand_id"
              text="Brand"
              options={brands}
              handleOnChange={handleSelectBrand}
              value={product.brand ? product.brand : ''}
            />  

            <Input
              type="number"
              text="Stock"
              name="stock"
              placeholder="Stock"
              handleOnChange={handleChange}
              value={product.stock ? product.stock : ''}
            /> 
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
export default Products;