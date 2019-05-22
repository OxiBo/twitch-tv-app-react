import React from "react";
import UserInfo from "./UserInfo";

const SearchResult = ({ searchResult }) => {

  return (
    <div className="search-result">
      <UserInfo user={searchResult} />
    </div>
  );
};

export default SearchResult;
