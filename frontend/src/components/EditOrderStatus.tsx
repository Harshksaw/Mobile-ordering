import { Order } from "@/pages/Order";
import axios from "axios";
import { useState } from "react";

interface EditOrder {
  order: Order;

  closeModel: () => void;
}
const EditOrderStatus = ({ order, closeModel }: EditOrder) => {
  const [status, setStatus] = useState(order.status);
  // "processing", "completed ", "cancelled", "making"
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editOrders(order._id);
  };
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const editOrders = async (id: string) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/order/updateOrderStatus`,
        { id, status }
      );
      if (res.data.success) {
        closeModel();
      }
    } catch (error) {
      console.log("error in edit order", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 mt-10  flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-lg w-96 p-10">
        <h2 className="text-xl font-bold mb-4">Add Category</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              order Status
            </label>
            <select
              name="status"
              id="status"
              value={status}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="making">Making</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              onClick={closeModel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderStatus;
