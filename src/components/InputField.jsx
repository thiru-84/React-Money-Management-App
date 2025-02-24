import axios from "axios";
import { useEffect, useState } from "react";

function InputField({ fetchData, tableInfo }) {
  const date = new Date();
  const dateFormat = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [transactionType, setTransactionType] = useState("Revenue");

  const [data, setData] = useState([]); // Store table data in state

  useEffect(() => {
    setData(tableInfo); // Update state when `tableInfo` changes
  }, [tableInfo]);

  const totalIncome = data
    .filter((item) => item.type === "Revenue")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = data
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://67b8889a699a8a7baef4681c.mockapi.io/apimemory",
        {
          type: transactionType,
          amount: enteredAmount,
          description: enteredDescription,
          id: "1",
        }
      );

      await fetchData();
      setEnteredAmount("");
      setEnteredDescription("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="md:flex md:gap-10">
        <main className="font-bold lg:pt-8 pb-2 px-4 border-b border-gray-300 lg:border-b-0 flex flex-col justify-between">
          {/* <!-- date and time --> */}
          <div className="flex justify-between">
            <p id="current-date" className="text-sm text-gray-500 font-normal">
              {date.toLocaleString("en-GB", dateFormat)}
            </p>

            <div className="lg:block hidden">
              <p className="text-sm text-gray-500 font-normal">
                © Created by{" "}
                <a
                  href="https://github.com/thiru-84"
                  className="text-black underline font-meidum"
                  target="_blank"
                >
                  Thiru
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <div>
              {/* <!-- heading and message --> */}
              <div className="lg:mt-14 mt-12">
                <h2 className="text-[24px] leading-[22px] lg:hidden ">
                  Track & Manage Your Money Smarter
                </h2>
                <h2 className="text-[36px] leading-[35px] hidden lg:block">
                  Track & Manage Your Money Smarter
                </h2>
                <p className="font-normal opacity-50 pt-2 lg:pt-3 text-sm tracking-[1px]">
                  Better money management for better savings.
                </p>
              </div>

              {/* <!-- input field --> */}
              <div className="w-100 lg:pt-8 pt-6 w-full">
                <form onSubmit={handleSubmit}>
                  <input
                    type="number"
                    id="user-entered-amount"
                    placeholder="Enter Amount"
                    value={enteredAmount}
                    onChange={(e) => {
                      setEnteredAmount(e.target.value);
                    }}
                    className=" user-entered-amount mb-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white text-base font-normal focus:border-gray-300 focus:border-blue-500 hover:border-gray-400 active:border-blue-600"
                  />
                  <textarea
                    id="user-entered-description"
                    placeholder="Short Description"
                    value={enteredDescription}
                    onChange={(e) => {
                      setEnteredDescription(e.target.value);
                    }}
                    className=" user-entered-description mb-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white text-base font-normal focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 active:border-blue-600 resize-y"
                  ></textarea>

                  <div>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg sm:flex">
                      <li className="w-full border-b border-gray-300 sm:border-b-0 sm:border-r">
                        <div className="flex items-center ps-3">
                          <input
                            id="radio-all"
                            type="radio"
                            name="list-radio"
                            value="Revenue"
                            checked={transactionType === "Revenue"}
                            onChange={() => setTransactionType("Revenue")} // Ensure state updates correctly
                            className="w-4 h-4 text-white border-2 border-black bg-black focus:ring-black"
                          />

                          <label
                            htmlFor="radio-revenue"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                          >
                            Revenue
                          </label>
                        </div>
                      </li>

                      <li className="w-full">
                        <div className="flex items-center ps-3">
                          <input
                            id="radio-expense"
                            type="radio"
                            name="list-radio"
                            value="Expense"
                            checked={transactionType === "Expense"}
                            onChange={(e) => setTransactionType(e.target.value)}
                            className="w-4 h-4 text-white border-2 border-black bg-black focus:ring-black"
                          />
                          <label
                            htmlFor="radio-expense"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                          >
                            Expense
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-black dark:hover:bg-gray-900 dark:border-gray-700"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>

            <div className=" border-y border-gray-300 py-8 px-4">
              <div className="flex justify-between">
                <div className="flex flex-col justify-center align-center items-center total-income mx-auto">
                  <h3>{totalIncome}</h3>
                  <p className="font-normal text-sm text-gray-500">
                    Total Income
                  </p>
                </div>
                <div className="border-r border-gray-200"></div>
                <div className="flex flex-col justify-center align-center items-center expense mx-auto">
                  <h3>{totalExpense}</h3>
                  <p className="font-normal text-sm text-gray-500">
                    Total Expenses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default InputField;
