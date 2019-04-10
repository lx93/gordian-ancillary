import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  async componentDidMount(){
    this.state = {id:(await this.getId())}
    console.log(this.state.id) 
    this.injectWidget();
  }

  async getId () {
    let response = await fetch ("https://test-ancil-overlay.herokuapp.com/v1.2/funnel/cache.js?agent_id=test&flight_string=SFO*2019-10-15T07:20*CQ*123*JFK*2019-10-15T08:45&adults=1");
    let body = await response.text();
    return JSON.parse(body.slice(22,-2)).session_id
  }

  injectWidget(){
    var id = parseInt(this.state.id)-1;
    const script = document.createElement("script");
    script.src = "https://test-ancil-overlay.herokuapp.com/v1/funnel/display.js?agent_id=test&session_id="+id;
    console.log(script.src)
    script.async = true;
    document.body.appendChild(script);
  }

  checkout(){
    if (window.result == null){
      alert("cart is empty! please click above link to book first.")
    }
    else {
      var result = JSON.stringify(window.result)
      result = result.substring(1,result.length-1)
      result = JSON.parse(result)
      console.log(result.seat_id)
      console.log(result.base_price)
      alert("You booked seat: "+result.seat_id+" and your price is: "+result.base_price)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Gordian Ancillary Overlay Exercise
          </p>
          <a
            id = "modal_loader"
            className="App-link"
            href="javascript:;"
          >
            Book flight SFO to JFK
          </a>
          <button onClick={()=>this.checkout()}>cart</button>
        </header>
      </div>
    );
  }
}

export default App;
