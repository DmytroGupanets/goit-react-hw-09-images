import React, { useState } from "react";
import PropTypes from "prop-types";

const Searchbar = ({ onFormSubmit }) => {
  const [query, setQuery] = useState("");

  const onHandleChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  const onHandleFormSubmit = (e) => {
    e.preventDefault();

    onFormSubmit(query);
    setQuery("");
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onHandleFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onHandleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
