import React, { Component } from "react";
// import { typeahead } from "../helpers/typeahead";

export default class SearchBar extends Component {
  state = {
    searchUser: ""
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.searchUser);
    this.setState({
      searchUser: ""
    });
  };

  handleInput = event => {
    event.preventDefault();
    this.setState({
      searchUser: event.target.value
    });

    /*

    Another way to get data from a form
    
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData

    // https://stackoverflow.com/questions/7752188/formdata-appendkey-value-is-not-working/14092429#14092429

    // https://stackoverflow.com/questions/2276463/how-can-i-get-form-data-with-javascript-jquery

    const form = document.querySelector(".form");
    if (form) {
    let formData = new FormData(form);
    formData = Array.from(formData.entries()); // one of the ways to get data from a form
          }
          
    */
  };

  render() {
    return (
      <div id="searchForm">
        <form
          className="form"
          action=""
          name="search"
          onSubmit={this.onFormSubmit}
        >
          <input
            id="searchUser"
            name="search"
            type="search"
            value={this.state.searchUser}
            placeholder="Search TwitchTV user"
            autoComplete="off"
            onChange={this.handleInput}
          />
        </form>
      </div>
    );
  }
}


  /* 
  inline handling input onChange
  onChange={(e) => this.setState({searchUser: e.target.value })} */

