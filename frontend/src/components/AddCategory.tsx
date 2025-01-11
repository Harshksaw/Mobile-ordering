import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

const AddCategory = () => {
  const [categoryDetails, setCategoryDetails] = useState({
    category: "",
    items: "",
  });
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/menu/getAllCategory`);
      if (res.data.success) {
        setCategories(res.data.categories);
        console.log("categories", res.data.categories);
      }
    } catch (error) {
      console.log("error in fetching categories", error);
    }
  };
  const [items, setItems] = useState();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/menu/getAllMenuItems`);
      if (res.data.success) {
        setItems(res.data.items);
      }
    } catch (error) {
      console.log("error in fetching items", error);
    }
  };
  useEffect(() => {
    fetchItems();
    getCategories();
  }, []);
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("categoryDetails", categoryDetails);
    const form = new FormData();
    form.append("name", categoryDetails.category);
    form.append("item", categoryDetails.items);
    try {
      const res = await axios.post(`${BASE_URL}/menu/addItemToCategory`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        console.log("category added successfully");
      }
    } catch (error) {
      console.log("error in add category frontend", error);
    }
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col gap-5 p-15 bg-slate-100 rounded-sm">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-5 px-4 bg-slate-100 rounded-sm w-full"
        >
          <label
            htmlFor="categoryName"
            className="font-medium text-lg capitalize"
          >
            name
          </label>
          {/* <input
            type="text"
            name="categoryName"
            id="categoryName"
            className="px-4 py-2 w-full text-lg"
            placeholder="enter itemName"
            value={categoryDetails.category}
            onChange={(e) => {
              setCategoryDetails({
                ...categoryDetails,
                category: e.target.value,
              });
            }}
          /> */}
          <select
            value={categories}
            name="categoryName"
            id="categoryName"
            onChange={(e) => {
              setCategoryDetails({
                ...categoryDetails,
                category: e.target.value,
              });
            }}
          >
            {categories?.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="itemSelect"
            className="font-medium text-lg capitalize"
          >
            Select Item
          </label>
          <select
            value={categoryDetails.items}
            onChange={(e) => {
              setCategoryDetails({
                ...categoryDetails,
                items: e.target.value,
              });
            }}
            name="itemSelect"
            id="itemSelect"
          >
            {items?.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="text-white px-4 py-2 text-lg capitalize mb-2"
          >
            {" "}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
