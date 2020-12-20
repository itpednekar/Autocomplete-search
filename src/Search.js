import React, { useCallback, useState } from "react";
import "./Search.css";
import { debounce } from "lodash";

var FAILURE_COEFF = 10;
var MAX_SERVER_LATENCY = 200;

function Search() {
  const [value, setValue] = useState("");
  const [searchList, setSearchList] = useState([]);

  //waits for user to stop typing in serchbox
  const debounceSearch = useCallback(
    debounce((searches) => setSearchList(searches), 1000),
    []
  );

  const onChangeSearch = (e) => {
    setValue(e.target.value);
    if (value.length !== 0) {
      getSuggestions(e.target.value)
        .then((result) => {
          debounceSearch(result);
        })
        .catch((err) => {});
    } else setSearchList([]);
  };

  const onClickList = (data) => {
    setValue(data);
    setSearchList([]);
  };

  function getRandomBool(n) {
    var maxRandomCoeff = 1000;
    if (n > maxRandomCoeff) n = maxRandomCoeff;
    return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
  }

  function getSuggestions(text) {
    var pre = "pre";
    var post = "post";
    var results = [];
    if (getRandomBool(2)) {
      results.push(pre + text);
    }
    if (getRandomBool(2)) {
      results.push(text);
    }
    if (getRandomBool(2)) {
      results.push(text + post);
    }
    if (getRandomBool(2)) {
      results.push(pre + text + post);
    }
    return new Promise((resolve, reject) => {
      var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
      setTimeout(() => {
        if (getRandomBool(FAILURE_COEFF)) {
          reject();
        } else {
          resolve(results);
        }
      }, randomTimeout);
    });
  }

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Search Here.."
        className="search"
        onChange={onChangeSearch}
        value={value}
      />
      <ul>
        {searchList.map((data, index) => {
          return (
            value.length !== 0 && (
              <li onClick={() => onClickList(data)}>{data}</li>
            )
          );
        })}
      </ul>
    </div>
  );
}

export default Search;
