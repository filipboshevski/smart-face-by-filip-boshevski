import React, { Component } from 'react';
import './SignIn.css';
import validator from 'validator';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onClickEnter = (event) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.onSubmitSignIn();
        }
    }

    onSubmitSignIn = () => {
        const {signInEmail, signInPassword} = this.state;
        if (this.state.signinEmail !== '' && this.state.signinPassword !== '' && validator.isEmail(signInEmail)) {
            fetch('https://sheltered-ridge-17364.herokuapp.com/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: signInEmail,
                    password: signInPassword
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.id) {
                    this.props.loadUser(response);
                    this.props.onRouteChange('home');
                } else if (response === 'Wrong Password!' || response === 'Wrong Credentials!') {
                    console.log('Wrong email address or password entered!');
                    alert('Wrong email address or password entered!');
                }
            })
        } else {
            console.log('Invalid email address or password entered!');
            alert('Invalid email address or password entered!');
        }
    }

    render () {
        const { onClickRegister } = this.props;
        return (
        <article onKeyDown={this.onClickEnter} className="br2 ba dark-gray b--black-10 w-100 w-50-m w-25-l mw6 shadow-4 center background animation">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 font">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 pb2" htmlFor="email-address">Email</label>
                        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-white hover-black w-100" type="email" name="email-address"  id="email-address" required/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6 pb2" htmlFor="password">Password</label>
                        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-white hover-black w-100" type="password" name="password"  id="password" required/>
                    </div>
                </fieldset>
                <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-white animation grow pointer f6 dib" type="submit" onClick={this.onSubmitSignIn} value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                    <p className="f6 link dim black db pointer underline" onClick={onClickRegister}>Register</p>
                </div>
            </div>
            </main>
        </article>
        );
    }
}

export default SignIn;