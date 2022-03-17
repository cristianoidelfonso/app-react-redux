import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Categories = () => {

  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");

  useEffect(async () => {
    UserService.getCategories().then(
      (response) => {
        setCategories(response.data.categories);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          Categories
        </h3>
      </header>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
         {
            // categories.map((category) => {
            //   <tr key={category.id}>
            //     <td>{category.id}</td>
            //     <td>{category.name}</td>
            //     <td>Editar</td>
            //     <td>Excluir</td>
            //   </tr>
            // })

          }
        </tbody>
      </table>
    </div>
  );
};
export default Categories;