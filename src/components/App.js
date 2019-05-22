import React, { Component } from "react";
import userInfo from "../api/twitchTV";
import getUsersInfo from "../helpers/getUsersInfo";
import SearchBar from "./Search-bar";
import SearchResult from "./SearchResult";
import AllUsers from "./AllUsers";
import OnlineUsers from "./OnlineUsers";
import OfflineUsers from "./OfflineUsers";
import DisplayUsers from "./DisplayUsers";

export default class App extends Component {
  state = {
    users: [],
    isLoading: true,
    searchResult: {},
    isSearchResultLoading: true,
    renderSearchResult: true
  };

  async componentDidMount() {
    this.setState({ users: await getUsersInfo(), isLoading: false });
  }

  onFormSubmit = async searchUser => {
    this.setState({ isSearchResultLoading: true, renderSearchResult: true });

    this.setState({ searchResult: await userInfo(searchUser) });

    this.setState({ isSearchResultLoading: false });
  };

  handleButtons = async (event, stream) => {
    // show spinner while loading info for the list of users
    this.setState({
      isLoading: true,
      renderSearchResult: false
    });

    const activeButton = document.getElementById(event.id);

    // get all buttons and remove class "active" from one of them
    const buttons = Array.from(document.querySelectorAll("button"));
    buttons.map(button => button.classList.remove("active"));

    // add class 'active' to the button which was clicked
    activeButton.classList.add("active");

    // get current info about all given users
    this.setState({ users: await getUsersInfo() });
    this.setState({
      isLoading: false
    });
    // filter all users to show online/offline users and set state respectively. if stream is undefined, it means that "All" button was clicked
    if (stream !== undefined) {
      this.setState(prevState => ({
        users: prevState.users.filter(user => Boolean(user.stream) === stream),
        isLoading: false
      }));
    }
  };

  render() {
    const { searchResult, isSearchResultLoading, renderSearchResult, users, isLoading } = this.state;

    return (
      <div>
        <div className="main">
          <main className="container">
            <header>
              <div id="title">
                <h1>TwitchTV Streamers</h1>
              </div>
              <SearchBar onFormSubmit={this.onFormSubmit} />
            </header>
            {Object.keys(this.state.searchResult).length !== 0 &&
              (this.state.isSearchResultLoading ? (
                <div className="spinner">
                  <div className="lds-spinner">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              ) : (
                renderSearchResult && (
                  <SearchResult searchResult={searchResult} />
                )
              ))}
            <div className="buttons main-flex-item">
              <AllUsers handleButtons={this.handleButtons} />
              <OnlineUsers handleButtons={this.handleButtons} />
              <OfflineUsers handleButtons={this.handleButtons} />
            </div>
            {users && (
              <DisplayUsers
                users={users}
                isLoading={isLoading}
              />
            )}
          </main>
          <footer>Written and coded by OxiBo, 2019</footer>
        </div>
      </div>
    );
  }
}
