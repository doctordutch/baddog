import React, { useState } from "react";
import { validateEmail } from '../utils/helpers';

function Quote() {

    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const { name, email, message } = formState;
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errorMessage) {
            setFormState({ [e.target.name]: e.target.value });
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            
            // isValid conditional statement
            if (!isValid) {
                setErrorMessage('Your email is invalid.');
              } else {
                  setErrorMessage('');
              }
            } else {
                  if (!e.target.value.length) {
                      setErrorMessage(`Name is required.`);
                  } else {
                      setErrorMessage('');
                  }
                }
          };
       
  

    return (
        <section>
        <h1>Contact us for a custom quote!</h1>
        <form id="contact-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" defaultValue={name} onBlur={handleChange} name="name" />
            </div>
            <div>
                <label htmlFor="email">Email address:</label>
                <input type="email" defaultValue={email} onBlur={handleChange} name="email" />
            </div>
            <div>
                <label htmlFor="message">Please share some details on the item and size you are considering:</label>
                <textarea name="message" defaultValue={message} onBlur={handleChange} rows="10"  />
            </div>
            <div>
                <label htmlFor="species">What wood species are you interested in? (check any of interest)</label>
            </div>
            <div>
                <input type="checkbox"></input>Hickory  
                <br></br>
                <input type="checkbox"></input>Cherry
                <br></br>
                <input type="checkbox"></input>Walnut  
                <br></br>
                <input type="checkbox"></input>Oak  
                <br></br>
                <input type="checkbox"></input>Mahogany  
                <br></br>
                <input type="checkbox"></input>Cedar
                <br></br>
                <input type="checkbox"></input>Other
            </div>
            {errorMessage && (
                <div>
                    <p className="error-text">{errorMessage}</p>
                </div>
            )}
            <button data-testid="button" type="submit">submit</button>
        </form>
        </section>
      );
    }
    
export default Quote;