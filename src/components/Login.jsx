import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${process.env.VITE_API_URL}/users/login`, {
        email: values.email,
        password: values.password,
      });
  
      if (res.status === 200) {
        setIsLoading(false);
        sessionStorage.setItem('token', res.data.token);
        setMessage({ variant: 'success', text: res.data.message });
  
        const decoded = jwtDecode(res.data.token);
        navigate(decoded.role === 'admin' ? '/dashboard' : '/users/bins');
      }
    } catch (error) {
      setIsLoading(false);
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
          <h1>PIONEER KUMARASWAMY COLLEGE</h1>
          <h5>(Affiliated to Manonmaniam Sundaranar University, Tirunelveli)</h5>
          <h3>Reaccredited with B<sup>++</sup> grade by NAAC</h3>
          <h4>Vetturnimadam, Nagercoil - 3.</h4>

          <br />

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
              {message && <Alert variant={message.variant}>{message.text}</Alert>}
              <Field type="email" name="email" placeholder="Enter email" className="form-control mb-3" />
              <ErrorMessage name="email" component="div" className="text-danger" />

              <Field type="password" name="password" placeholder="Password" className="form-control mb-3" />
              <ErrorMessage name="password" component="div" className="text-danger" />

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
