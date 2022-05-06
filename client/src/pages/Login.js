import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {Link} from 'react-router-dom';
import {LOGIN} from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error}] = useMutation(LOGIN);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
      try {
        const mutationResponse = await login({
          variables: {email: formState.email, password: formState.password},
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } catch (e) {
        console.log(e);
      }
    };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <Link to="/signup"> Go back to SignUp</Link>
          <h4 className='card-header'>Login</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                onChange={handleChange}
              />
                   {error ? (
              <p className="error-text">Credentials dont match</p>
  ) : null}
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
         
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
