import React, { Component } from "react";
// import { typeahead } from "../helpers/typeahead";
import typeAheadMatches from "../helpers/typeAhead_handMade";

export default class SearchBar extends Component {
  state = {
    searchUser: "",
    typeAheadSuggestions: []
  };

  componentDidMount() {
    document.body.addEventListener("click", e => {
      // e.stopPropagation();
      if (document.querySelector(".suggestions")) {
        document.querySelector(".suggestions").classList.add("typeAhead");
        document.querySelector(".typeAhead").classList.remove("suggestions");
        // document.getElementById('typeAheadOptions').classList.add("typeAhead")
      }
    });
  }

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.searchUser);
    this.setState({
      searchUser: ""
    });

    /* one of the ways to get data from a form
    const form = document.querySelector(".form");
    if (form) {
      let formData = new FormData(form);
      formData = Array.from(formData.entries()); 
    }
    */
  };

  handleInput = async event => {
    await this.setState({
      searchUser: event.target.value
    });

    if (this.state.searchUser !== "") {
      this.setState({
        typeAheadSuggestions: typeAheadMatches(this.state.searchUser)
      });
    }

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

  renderTypeAheadSuggestions = () => {
    const { typeAheadSuggestions } = this.state;

    if (typeAheadSuggestions) {
      return typeAheadSuggestions.map(user => (
        <li key={user} onClick={this.chooseSuggestion}>
          {user}
        </li>
      ));
    }
  };

  chooseSuggestion = e => {
    e.stopPropagation();
    this.setState({ searchUser: e.target.innerHTML, typeAheadSuggestions: [] });
  };

  render() {
    const typeAheadStyles =
      this.state.typeAheadSuggestions.length > 0 && this.state.searchUser !== ""
        ? "suggestions"
        : "typeAhead";
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
          <ul id="typeAheadOptions" className={typeAheadStyles}>
            {this.renderTypeAheadSuggestions()}
          </ul>
        </form>
      </div>
    );
  }
}

/* 
  inline handling input onChange
  onChange={(e) => this.setState({searchUser: e.target.value })} */
