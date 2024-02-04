import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import database from '../firebase/Firebase';

const Bin = React.memo(({ id, onDelete }) => {
  const [indicator, setIndicator] = useState('');
  const [binPercentage, setBinPercentage] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${process.env.VITE_API_URL}/bins/${id}`);
      toast.success('Bin deleted successfully');

      // Call the onDelete prop to update the state in the parent component
      onDelete(id);
    } catch (error) {
      console.error('Error deleting bin:', error);
      toast.error('Error deleting bin. Please try again.');
    } finally {
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleBinPercentage = (data) => {
      const getPercentage = Object.values(data.val());
      setBinPercentage(getPercentage[1]);
    };

    database.ref().child('IOT').on('value', handleBinPercentage);

    return () => {
      // Cleanup the listener when the component unmounts
      database.ref().child('IOT').off('value', handleBinPercentage);
    };
  }, []);

  useEffect(() => {
    if (binPercentage <= 50) {
      setIndicator('green');
    } else if (binPercentage <= 80) {
      setIndicator('yellow');
    } else if (binPercentage <= 100) {
      setIndicator('red');
    }
  }, [binPercentage]);

  return (
    <>
      <div className='binCtn' style={{ backgroundColor: indicator }}>
        <h3>Percentage: {`${binPercentage}%`}</h3>
        <div>
          <Button onClick={() => navigate(`/users/edit-bin/${id}`)}>Edit</Button>
          &nbsp;
          <Button variant='danger' onClick={handleDelete}>Delete</Button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this bin?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default Bin;
