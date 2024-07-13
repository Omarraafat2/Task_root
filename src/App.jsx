import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Getdata from './components/Getdata';
import TransactionGraph from './components/CustomerChart';
import TransactionAllGraph from './components/CustomerAllGraph';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='bg-white'>
        <Getdata />
        <div className="flex flex-wrap justify-between p-6">
          <div className="w-full md:w-1/2 p-2">
            <TransactionGraph />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <TransactionAllGraph />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
