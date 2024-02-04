import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Menubar from '../common/Menubar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loader from '../common/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  batch: Yup.string().required('Batch is required'),
});

function CreateUser() {
  const navigate = useNavigate();

  // Formik hook for managing form state and submission
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      batch: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const res = await axios.post(`${process.env.VITE_API_URL}/users`, values);

        if (res.status === 200) {
          toast.success(res.data.message);
          navigate('/dashboard');
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <Menubar title={'Create User'} />
      <h2 style={{ margin: '1rem 0 2rem 0' }} className="text-center mb-4">Create User</h2>
      <div className="container-fluid" style={{ width: '60%' }}>
        {/* Formik form */}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error" style={{ color: 'red' }}>
                {formik.errors.firstName}*
              </div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="error" style={{ color: 'red' }}>
                {formik.errors.lastName}*
              </div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email ID</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error" style={{ color: 'red' }}>
                {formik.errors.email}*
              </div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error" style={{ color: 'red' }}>
                {formik.errors.password}*
              </div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label htmlFor="batch">Batch</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Batch"
              name="batch"
              value={formik.values.batch}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.batch && formik.errors.batch ? (
              <div className="error" style={{ color: 'red' }}>
                {formik.errors.batch}*
              </div>
            ) : null}
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" style={{ width: '35%' }}>
              {formik.isSubmitting ? <Loader /> : <>Submit</>}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateUser;
