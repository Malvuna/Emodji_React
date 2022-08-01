import { useState } from "react";
import { Card } from "../Card/Card.jsx";
import { data } from "../../emoji.js";
import Fuse from "fuse.js";

function changeUniqKeywords() {
  return data.map((elem) => ({
    ...elem,
    keywords: [...new Set(elem.keywords.split(" "))].join(" "),
  }));
}
const filterData = changeUniqKeywords();

export function Main() {
  const [textValue, setTextValue] = useState("");
  const changeName = (event) => setTextValue(event.target.value);


  const fuse = new Fuse(filterData, {
    keys: ["title", "keywords"],
    includeScore: false,
  });

  const results = fuse.search(textValue);
  const filterDataResults = textValue
    ? results.map((elem) => elem.item)
    : filterData;

  function onSearch({ currentTarget }) {
    setTextValue(currentTarget.value);
  }
  return (
    <main className="main">
      <input
        className="input"
        name="search"
        placeholder="Placeholder"
        value={textValue}
        onChange={onSearch}
      />
      {filterDataResults.map((elem) => (
        <Card
          key={elem.title}
          symbol={elem.symbol}
          title={elem.title}
          keywords={elem.keywords}
        />
      ))}
    </main>
  );
}
