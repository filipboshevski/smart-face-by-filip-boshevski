import React, { Component } from 'react';
import '../SignIn/SignIn.css';
import validator from 'validator';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        }
    }
    
    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onSubmitRegister = () => {
        const {registerEmail, registerName, registerPassword} = this.state;
        if (validator.isEmail(registerEmail)) {
            fetch('https://sheltered-ridge-17364.herokuapp.com/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: registerEmail,
                    password: registerPassword,
                    name: registerName
                })
            })
            .then(response => response.json())
            .then((response) => {
                if (response.id) {
                    this.props.loadUser(response);
                    this.props.onRouteChange('home');
                } else if (response === 'Invalid Form Submission!') {
                    console.log('Invalid form submitted! Check Again!');
                    alert('Invalid form submitted! Check again!');
                }
            })
        } else {
            console.log('Invalid email entered!');
            alert('Invalid email address entered!');
        }
    }

    onClickEnter = (event) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.onSubmitRegister();
        }
    }

    render() {
        return (
        <article onKeyDown={this.onClickEnter} className="br2 ba dark-gray b--black-10 w-100 w-50-m w-25-l mw6 shadow-4 center background animation">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 font">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 pb2">Name</label>
                        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-white hover-black w-100" type="text" name="name"  id="name" width='218px' required/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 pb2" htmlFor="email-address">Email</label>
                        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-white hover-black w-100" type="email" name="email-address"  id="email-address" required/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6 pb2" htmlFor="password">Password</label>
                        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-white hover-black w-100" type="password" name="password"  id="password" required/>
                    </div>
                </fieldset>
                <div>
                    <input className="b ph3 pv2 input-reset ba b--black bg-white animation grow pointer f6 dib" type="submit" onClick={this.onSubmitRegister} value="Register" />
                </div>
            </div>
            </main>
        </article>
        );
    }
}

export default Register;