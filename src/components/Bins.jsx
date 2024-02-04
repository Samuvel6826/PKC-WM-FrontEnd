import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Menubar from '../common/Menubar';
import Bin from './Bin';

const Bins = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.VITE_API_URL}/bins`);
      if (res.status === 200 && res.data && res.data.data) {
        // console.log('Bins Data Received:', res.data.data);
        setData(res.data.data);
        toast.success(res.data.message);
      } else {
        console.error('Invalid response structure:', res);
        toast.error('Error in API response. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching bins:', error);
      toast.error('Error fetching bins. Please try again.');
    }
  };

  useEffect(() => {
    // Fetch bins data on component mount
    getData();
  }, []);

  const handleBinDelete = (deletedId) => {
    // Update the state by filtering out the deleted bin
    setData((prevData) => prevData.filter((bin) => bin._id !== deletedId));
  };

  return (
    <>
      <div className='binBox'>
        {/* Display the Menubar with the title 'PKC' */}
        <div className="menuBar">
          <Menubar title="PKC" />
        </div>
        {/* Display the list of bins */}
        <div className="binWrapper">
          {data.map((bin) => (
            <Bin key={bin._id} id={bin._id} onDelete={handleBinDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Bins;
