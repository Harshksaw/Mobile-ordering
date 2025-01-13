import axios from "axios";
import { Loader2 } from "lucide-react";

import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface Size {
  name: string;
  price: number;
  quantity: string;
}
const AddItem = () => {
  const [itemsDetails, setItemsDetails] = useState({
    dishName: "",
    description: "",
    price: 0,
    sizes: [
      {
        name: "",
        price: 0,
        quantity: "",
      },
    ] as Size[],

    image: null as File | null,
  });
  const [sizesLength, setSizesLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [field, index, sizeField] = name.split(".");
    if (field === "sizes") {
      // const sizeField = name.split(".")[1];
      // setItemsDetails({
      //   ...itemsDetails,
      //   sizes: { ...itemsDetails.sizes, [sizeField]: value },
      // });
      const updatedSizes = [...itemsDetails.sizes];
      updatedSizes[parseInt(index)] = {
        ...updatedSizes[parseInt(index)],
        [sizeField]: value,
      };
      setItemsDetails({ ...itemsDetails, sizes: updatedSizes });
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
    console.log("itemsDetails", itemsDetails);
    const formData = new FormData();
    formData.append("name", itemsDetails.dishName);
    formData.append("description", itemsDetails.description);

    formData.append("price", itemsDetails?.price.toString());
    formData.append("sizes", JSON.stringify(itemsDetails.sizes));
    // formData.append("sizes[name]", itemsDetails.sizes.name);
    // formData.append("sizes[price]", itemsDetails.sizes.price.toString());
    if (itemsDetails.image) {
      formData.append("image", itemsDetails.image);
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/menu/addMenuItem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
          className="flex flex-col gap-5 px-4 bg-slate-100 rounded-sm w-full translate-y-auto"
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
          {/* to select no of sizes */}
          <label htmlFor="size" className="font-medium text-lg capitalize">
            Total number of Sizes of item
          </label>
          <select
            name="size"
            id="size"
            className="px-4 py-2 w-full text-lg"
            value={sizesLength}
            onChange={(e) => {
              const length = parseInt(e.target.value);
              setSizesLength(length);
              setItemsDetails({
                ...itemsDetails,
                sizes: Array.from(
                  { length },
                  (_, i) =>
                    itemsDetails.sizes[i] || {
                      name: "",
                      price: 0,
                      quantity: "",
                    }
                ),
              });
            }}
          >
            <option value="0">Select number of sizes</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          {/* <input
            type="number"
            name="sizesLength"
            id="sizesLength"
            className="rounded-lg px-4 py-2 w-full text-lg"
            value={sizesLength}
            onChange={(e) => {
              const length = parseInt(e.target.value);
              setSizesLength(length);
              setItemsDetails({
                ...itemsDetails,
                sizes: Array.from(
                  { length },
                  (_, i) =>
                    itemsDetails.sizes[i] || {
                      name: "",
                      price: 0,
                      quantity: "",
                    }
                ),
              });
            }}
          /> */}

          <p className="font-bold"> Sizes of item details</p>
          {Array.from({ length: sizesLength }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={`sizes.${index}.name`}
                className="font-medium text-lg capitalize"
              >
                Size Name
              </label>
              <input
                type="text"
                name={`sizes.${index}.name`}
                placeholder="Enter item size name"
                id={`sizes.${index}.name`}
                className="px-4 py-2 w-full text-lg"
                value={itemsDetails.sizes[index]?.name}
                onChange={handleOnChange}
              />
              <label
                htmlFor={`sizes.${index}.price`}
                className="font-medium text-lg capitalize"
              >
                Size Price
              </label>
              <input
                type="number"
                name={`sizes.${index}.price`}
                placeholder="Enter item size price"
                id={`sizes.${index}.price`}
                className="px-4 py-2 w-full text-lg"
                value={itemsDetails.sizes[index]?.price}
                onChange={handleOnChange}
              />
              <label
                htmlFor={`sizes.${index}.quantity`}
                className="font-medium text-lg capitalize"
              >
                Size Quantity
              </label>
              <input
                type="text"
                name={`sizes.${index}.quantity`}
                placeholder="Enter item size quantity"
                id={`sizes.${index}.quantity`}
                className="px-4 py-2 w-full text-lg"
                value={itemsDetails.sizes[index]?.quantity}
                onChange={handleOnChange}
              />
            </div>
          ))}
          {isLoading ? (
            <Loader2 />
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
      </div>
    </div>
  );
};

export default AddItem;
