import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [categoryDetails, setCategoryDetails] = useState({
    category: '',
  });
  const [categories, setCategories] = useState([]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/menu/getAllCategory`);
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/menu/createCategory/${categoryDetails.category}`
      );
      if (res.status === 201) {
        console.log('Category added successfully');
        setCategoryDetails({ ...categoryDetails, category: '' }); // Clear the input field
        getCategories(); // Refresh the category list
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between w-full max-h-full gap-4 p-4">
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Create Category</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={categoryDetails.category}
              onChange={(e) => setCategoryDetails({ ...categoryDetails, category: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Add Category
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="mb-2 p-2 border-b border-gray-200">
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategory;