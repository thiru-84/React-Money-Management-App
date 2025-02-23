import { useEffect, useState } from "react";
import axios from "axios";

function TableFlow({ tableInfo, fetchData }) {
  const [data, setData] = useState([]); // Store table data in state
  const [editIndex, setEditIndex] = useState(null); // Track which row is being edited

  useEffect(() => {
    setData(tableInfo); // Populate state when data changes
  }, [tableInfo]);

  const handleEditClick = (index) => {
    setEditIndex(index); // Set the row to edit mode
  };

  const handleSaveClick = () => {
    setEditIndex(null); // Exit edit mode
  };

  const handleDeleteClick = (index) => {
    axios.delete(`http://localhost:3001/table/${index}`);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value; // Update the specific field
    setData(updatedData);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Prevent page reload

  //   try {
  //     const response = await axios.put(
  //       `https://67b8889a699a8a7baef4681c.mockapi.io/apimemory/${id}`,
  //       {
  //         type: transactionType,
  //         amount: enteredAmount,
  //         description: enteredDescription,
  //         id: "1",
  //       }
  //     );

  //     await fetchData(); // Ensure fetchData() completes before resetting state

  //     // Reset input fields
  //     setEnteredAmount("");
  //     setEnteredDescription("");
  //     setTransactionType("");

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSubmit = async (index) => {
    try {
      const updatedRow = data[index]; // Get the row being edited

      await axios.put(
        `https://67b8889a699a8a7baef4681c.mockapi.io/apimemory/${updatedRow.id}`, // Ensure `id` exists
        {
          type: updatedRow.type,
          amount: updatedRow.amount,
          description: updatedRow.description,
        }
      );

      setEditIndex(null); // Exit edit mode after successful save
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const updatedRow = data[index]; // Get the row being edited

      await axios.delete(
        `https://67b8889a699a8a7baef4681c.mockapi.io/apimemory/${updatedRow.id}`
      );
      await fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <section className="w-full h-screen bg-[#F7F7F7] border-l border-gray-300 mt-14 lg:mt-0">
      <div className="relative overflow-x-auto money-flow-table-container">
        {data.length === 0 ? (
          <div className="money-flow-table-no-data flex flex-col justify-center items-center align-center h-100">
            <div className="h-8 w-8 text-gray-500 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5.5 text-rose-600"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </div>
            <p
              id="current-date"
              className="text-[13px] text-gray-500 font-normal text-center leading-[16px] pt-2 opacity-80"
            >
              Start managing <br />
              your money!
            </p>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Flow
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="money-flow-table">
              {data.map((item, index) => (
                <tr key={index} className="border-b border-gray-300 bg-white">
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      className={`p-2 rounded-md h-9 ${
                        editIndex === index ? "border border-gray-300" : ""
                      }`}
                      disabled={editIndex !== index}
                      value={item.amount}
                      onChange={(e) =>
                        handleInputChange(index, "amount", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      className="p-2 rounded-md"
                      disabled={editIndex !== index}
                      value={item.description || "-"}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className={`p-2 rounded-md ${
                        editIndex === index ? "border border-gray-300" : ""
                      }`}
                      disabled={editIndex !== index}
                      value={item.type}
                      onChange={(e) =>
                        handleInputChange(index, "type", e.target.value)
                      }
                    >
                      <option value="Revenue">Revenue</option>
                      <option value="Expense">Expense</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    {editIndex === index ? (
                      <button
                        onClick={() => handleSubmit(index)} // Pass the correct index
                        className="text-green-700 cursor-pointer"
                      >
                        Save
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditClick(index)}
                          className="text-blue-500 cursor-pointer"
                        >
                          Edit
                        </button>
                        <span>|</span>
                        <button
                          type="submit"
                          onClick={() => handleDelete(index)}
                          className="text-red-500 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default TableFlow;
