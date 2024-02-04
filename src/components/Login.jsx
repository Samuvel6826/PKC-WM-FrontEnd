import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the validation schema for the login form using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Function to handle the login process
  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      // Make a POST request to the login endpoint
      const res = await axios.post(`${process.env.VITE_API_URL}/users/login`, {
        email: values.email,
        password: values.password,
      });

      // Check if the login was successful
      if (res.status === 200) {
        setIsLoading(false);
        // Save the token in session storage
        sessionStorage.setItem('token', res.data.token);
        // Set a success message and redirect based on the user's role
        setMessage({ variant: 'success', text: res.data.message });
        navigate(res.data.role === 'admin' ? '/dashboard' : '/users/bins');
      }
    } catch (error) {
      setIsLoading(false);
      // Set an error message based on the response data
      setMessage({ variant: 'danger', text: error.response.data.message });
    }
  };

  return (
    <Container id="loginCTN">
      <div id="loginBorder">
        <div id="loginImgCTN">
          <img
            src="https://res.cloudinary.com/dgsucveh2/image/upload/v1706749935/photo_2024-02-01_06.41.54_nsfqx6.jpg"
            alt="Kumaraswamy Statue"
          />
        </div>

        <div id="loginFormCTN">
          {/* Header and college information */}
          <h1>PIONEER KUMARASWAMY COLLEGE</h1>
          <h5>(Affiliated to Manonmaniam Sundaranar University, Tirunelveli)</h5>
          <h3>Reaccredited with B<sup>++</sup> grade by NAAC</h3>
          <h4>Vetturnimadam, Nagercoil - 3.</h4>
          <br />

          {/* Login form */}
          <h1>Login Here!</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            <Form>
              {/* Display alert message if there is any */}
              {message && <Alert variant={message.variant}>{message.text}</Alert>}

              {/* Input field for email */}
              <Field type="email" name="email" placeholder="Enter email" className="form-control mb-3" />
              <ErrorMessage name="email" component="div" className="text-danger" />

              {/* Input field for password */}
              <Field type="password" name="password" placeholder="Password" className="form-control mb-3" />
              <ErrorMessage name="password" component="div" className="text-danger" />

              {/* Login button with loading spinner */}
              <Button variant="primary" type="submit" className="mb-3" block={isLoading.toString()}>
                {isLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </Container>
  );
}

export default Login;
