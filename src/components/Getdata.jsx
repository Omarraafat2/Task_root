import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

const Getdata = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({ name: '', amount: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://omarraafat2.github.io/host_api/react.json');
        const data = res.data;
        setCustomers(data.customers);
        setTransactions(data.transactions);
        setFilteredData(data.transactions);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });

    const filtered = transactions.filter((transaction) => {
      const customer = customers.find((c) => c.id === transaction.customer_id);
      return (
        (!filter.name || (customer && customer.name.toLowerCase().includes(filter.name.toLowerCase()))) &&
        (!filter.amount || transaction.amount >= parseFloat(filter.amount))
      );
    });
    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center py-16'>
        <BeatLoader color="#4A90E2" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <React.Fragment>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Customer Transactions</h2>
        <div className="mb-4 flex items-center space-x-4">
          <label className="block w-1/3">
            Filter by Name:
            <input
              type="text"
              name="name"
              value={filter.name}
              onChange={handleFilterChange}
              className="mt-1 bg-white block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block w-1/3">
            Filter by Amount:
            <input
              type="number"
              name="amount"
              value={filter.amount}
              onChange={handleFilterChange}
              className="mt-1 block w-full bg-white p-2 border border-gray-300 rounded"
            />
          </label>
          <button
            onClick={() => setFilteredData(transactions)}
            className="px-4 mt-6 py-2 bg-blue-500 text-white rounded"
          >
            Reset
          </button>
        </div>
        {filteredData.length === 0 ? (
          <div className="text-red-500 text-center font-bold text-2xl">No matching records found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4 border-b text-center">Customer ID</th>
                  <th className="py-2 px-4 border-b text-center">Customer Name</th>
                  <th className="py-2 px-4 border-b text-center">Date</th>
                  <th className="py-2 px-4 border-b text-center">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((transaction) => {
                  const customer = customers.find((c) => c.id === transaction.customer_id);
                  const formattedDate = new Date(transaction.date).toLocaleDateString('en-GB', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });
                  return (
                    <tr key={transaction.id} className="even:bg-gray-100 odd:bg-white">
                      <td className="py-2 px-4 border-b text-center">{customer ? customer.id : 'Unknown'}</td>
                      <td className="py-2 px-4 border-b text-center">{customer ? customer.name : 'Unknown'}</td>
                      <td className="py-2 px-4 border-b text-center">{formattedDate}</td>
                      <td className="py-2 px-4 border-b text-center">{transaction.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Getdata;
