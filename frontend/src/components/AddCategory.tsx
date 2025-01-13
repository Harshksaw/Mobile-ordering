import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [categoryId, setCategoryId] = useState("");
  const [itemIds, setItemIds] = useState<string[]>([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/menu/getAllCategory`);
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  interface Category {
    _id: string;
    name: string;
  }

  interface Item {
    _id: string;
    name: string;
  }

  const getItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/menu/getAllMenuItems`);
      if (res.data.success) {
        setItems(res.data.items);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getItems();
  }, []);

  const handleItemChange = (itemId: string) => {
    setItemIds((prevItemIds) =>
      prevItemIds.includes(itemId)
        ? prevItemIds.filter((id) => id !== itemId)
        : [...prevItemIds, itemId]
    );
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/api/v1/menu/addItemsToCategory`, {
        categoryId,
        itemIds,
      });
      if (res.data.success) {
        toast.success("Items added to category successfully");
        setIsLoading(false);
        console.log("Items added to category successfully");
      }
    } catch (error) {
      toast.error("Error adding items to category");
      setIsLoading(false);
      console.error("Error adding items to category:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between w-full max-h-full gap-4 p-4">
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Add Items to Category</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Select Category
            </label>
            <select
              id="category"
              name="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category: Category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-full h-full">
            <label
              htmlFor="items"
              className="block text-2xl font-medium text-gray-700"
            >
              Select Items
            </label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 h-96 overflow-y-auto">
              {items.map((item: Item) => (
                <div key={item._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`item-${item._id}`}
                    name="items"
                    value={item._id}
                    checked={itemIds.includes(item._id)}
                    onChange={() => handleItemChange(item._id)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`item-${item._id}`}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {isLoading ? (
            <Loader2 />
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Add Items to Category
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
