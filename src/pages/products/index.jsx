import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Form, Modal, Button } from 'react-bootstrap';
import authHeader from "../../services/auth-header";
import moment from 'moment';
moment.locale('pt-br');

const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect( async () => {
    const response = await axios.get(`https://teste-mypharma.herokuapp.com/products`, { headers: authHeader() });
    setProducts(response.data);
  }, [products]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          Products
        </h3>
      </header>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
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
                  <td>{ product.name }</td>
                  <td>${ product.price }.00</td>
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
  );
};
export default Products;