import axios from "axios";

import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const AddItem = () => {
  const [itemsDetails, setItemsDetails] = useState({
    dishName: "",
    description: "",
    price: 0,
    sizes: {
      name: "",
      price: 0,
    },
    image: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("sizes.")) {
      const sizeField = name.split(".")[1];
      setItemsDetails({
        ...itemsDetails,
        sizes: { ...itemsDetails.sizes, [sizeField]: value },
      });
    } else {
      setItemsDetails({ ...itemsDetails, [name]: value });
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setItemsDetails({ ...itemsDetails, image: e.target.files[0] });
    }
  };

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", itemsDetails.dishName);
    formData.append("description", itemsDetails.description);

    formData.append("price", itemsDetails?.price.toString());
    formData.append("sizes[name]", itemsDetails.sizes.name);
    formData.append("sizes[price]", itemsDetails.sizes.price.toString());
    if (itemsDetails.image) {
      formData.append("image", itemsDetails.image);
    }

    try {
      const res = await axios.post(`${BASE_URL}/menu/addMenuItem`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        setIsLoading(false);
        toast.success("Item added successfully");
        console.log("Item added successfully");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("error in add item");
      console.log("error in add item frontend", error);
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col gap-5 p-15 bg-slate-100 rounded-sm">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-5 px-4 bg-slate-100 rounded-sm w-full"
        >
          <label htmlFor="dishName" className="font-medium text-lg capitalize">
            name
          </label>
          <input
            type="text"
            name="dishName"
            id="dishName"
            className="px-4 py-2 w-full text-lg"
            placeholder="enter itemName"
            value={itemsDetails.dishName}
            onChange={handleOnChange}
          />
          <label
            htmlFor="description"
            className="font-medium text-lg capitalize"
          >
            description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="enter item description"
            className="px-4 py-2 w-full text-lg"
            value={itemsDetails.description}
            onChange={handleOnChange}
          />
          <label htmlFor="image" className="font-medium text-lg capitalize">
            image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            // placeholder="enter item description"
            className="px-4 py-2 w-full text-lg"
            // value={itemsDetails.image}
            onChange={handleFileChange}
          />
          <label htmlFor="price" className="font-medium text-lg capitalize">
            price
          </label>
          <input
            type="number"
            name="price"
            placeholder="enter item price"
            id="price"
            className="px-4 py-2 w-full text-lg"
            value={itemsDetails.price}
            onChange={handleOnChange}
          />
          <p className="font-bold"> Sizes of item details</p>
          <label htmlFor="sizeName" className="font-medium text-lg capitalize">
            Size Name
          </label>
          <input
            type="text"
            name="sizes.name"
            placeholder="enter item size name"
            id="sizeName"
            className="px-4 py-2 w-full text-lg"
            value={itemsDetails.sizes.name}
            onChange={handleOnChange}
          />
          <label htmlFor="sizePrice" className="font-medium text-lg capitalize">
            Size Price
          </label>
          <input
            type="number"
            name="sizes.price"
            placeholder="enter item size name"
            id="sizePrice"
            className="px-4 py-2 w-full text-lg"
            value={itemsDetails.sizes.price}
            onChange={handleOnChange}
          />
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

export default AddItem;
