import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import file from './background-animation.json';

import './App.css';

const particlesOptions = JSON.parse(JSON.stringify(file));

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const faces = data.outputs[0].data.regions;
    const array = [];
    let clarifaiFace, faceReturn;
    for (let i = 0; i < faces.length; i++) {
      clarifaiFace = faces[i].region_info.bounding_box;
      faceReturn = {
        leftCol: clarifaiFace.left_col * width - 10,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width) - 10,
        bottomRow: height - (clarifaiFace.bottom_row * height) + 20
      };
      array.push(faceReturn);
      faceReturn = {};
    }
    return array;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  displayFaceBox = (face) => {
    this.state.box.push(face);
    this.showAllFaces(this.state.box);
  }

  showAllFaces = (box) => {
        let top, right, left, bottom, div;
        const imagediv = document.getElementById('imagediv');
        const max = 5000000;
        const min = 0;
        for (let i = 0; i < box[0].length; i++) {
          top = box[0][i].topRow + 20;
          right = box[0][i].rightCol;
          left = box[0][i].leftCol;
          bottom = box[0][i].bottomRow - 20;
          div = document.createElement('div');
          div.id = `${Math.floor(Math.random() * (+max - +min)) + +min}`;
          div.setAttribute('style', `top: ${top}px; right: ${right}px; bottom: ${bottom}px; left: ${left}px;`);
          div.className = 'bounding-box';
          imagediv.appendChild(div);
        }
    }

  onInputChange = (event) => { 
    this.setState({input: event.target.value});
  }

  onStartInputChange = () => {
    this.setState({input: ''});
  }

  removePreviousDetections = () => {
    const imagediv = document.getElementById('imagediv');
    while (imagediv.firstChild) {
        imagediv.removeChild(imagediv.firstChild);
    }
  }

  clearUser = () => {
    this.setState({
      input: '',
      imageURL: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    })
  }

  onButtonSubmit = () => {
    if (this.state.imageURL !== this.state.input) {
      this.removePreviousDetections();
      this.setState({imageURL: this.state.input, box: []});
      const imagediv = document.getElementById('imagediv');
      const imageInsert = document.createElement('img');
      imageInsert.id = 'inputimage';
      imageInsert.setAttribute('style', 'padding-top: 2em');
      imageInsert.setAttribute('width', '500');
      imageInsert.setAttribute('height', 'auto');
      imageInsert.src = this.state.input;
      imageInsert.alt = '';
      imagediv.appendChild(imageInsert);
      fetch('https://sheltered-ridge-17364.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })})
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://sheltered-ridge-17364.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
    }
  else {
    return;
  }
}

  onRouteChange = (route) => {
    switch (route) {
      case 'signin':
        this.setState({isSignedIn: false});
        break;

      case 'home':
        this.setState({isSignedIn: true});
        break;
      
      case 'register':
        this.setState({isSignedIn: false});
        break;
      
      default:
        break;
    }
    this.setState({route: route});
  }

  onClickRegister = () => {
    this.setState({route: 'register'});
  }

  render() {
    return (
      <div className="App">
        <Particles params={particlesOptions} style={{position: 'fixed', top: '0', bottom: '0', left: '0', right: '0', zIndex: '-1'}}/>
        <Navigation clearUser={this.clearUser} onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home'
        ? <div>
        <Logo />
        <Rank username={this.state.user.name} userEntries={this.state.user.entries} />
        <ImageLinkForm onstartinputchange={this.onStartInputChange} oninputchange={this.onInputChange} setImageUrl={this.onButtonSubmit} />
        <FaceRecognition showallfaces={this.showAllFaces} box={this.state.box} imageURL={this.state.imageURL}/>
      </div>
        : ( this.state.route === 'signin'
        ? <SignIn loadUser={this.loadUser} onClickRegister={this.onClickRegister} onRouteChange={this.onRouteChange} />
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> )
    }
      </div>
    )
  }
};


export default App;
