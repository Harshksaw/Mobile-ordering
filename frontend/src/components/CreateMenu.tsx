import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("categoryName", categoryName);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/v1/menu/createCategory/${categoryName}`

        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      if (res.data.success) {
        toast.success("category added successfully");
        setIsLoading(false);
        console.log("category added successfully");
      }
    } catch (error) {
      toast.error("error in add category ");
      setIsLoading(false);
      console.log("error in add category frontend", error);
    }
  };
  const getCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/menu/getAllCategory`);
      if (res.data.success) {
        setCategories(res.data.categories);
        console.log("categories", res.data.categories);
      }
    } catch (error) {
      console.log("error in fetching categories", error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col w-full h-full  gap-5 p-20 bg-slate-200">
        <form onSubmit={submitHandler} className="flex flex-col gap-5 px-4">
          <label
            className="font-medium text-lg capitalize"
            htmlFor="categoryName"
          >
            category
          </label>
          <input
            name="categoryName"
            id="categoryName"
            className="px-4 py-2 w-full text-lg"
            placeholder="enter categoryName"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
          {isLoading ? (
            <LoaderCircle size={48} className="text-white" />
          ) : (
            <button
              type="submit"
              className="text-white px-4 py-2 text-lg capitalize mb-2"
            >
              {" "}
              Submit
            </button>
          )}
        </form>
        <div className="flex flex-col gap-5">
          <h1 className="text-lg font-medium">Categories</h1>
          {categories.map((category: any) => (
            <div
              key={category._id}
              className="flex justify-between items-center px-4 py-2 bg-slate-100 rounded-sm"
            >
              <p>{category.name}</p>
              <button className="text-white bg-red-500 px-4 py-2 rounded-sm">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
