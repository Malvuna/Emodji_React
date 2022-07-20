import { useState } from "react";
import { Card } from "../Card/Card.jsx";
import { data } from "../../emoji.js";

function changeUniqKeywords() {
  return data.map((elem) => {
    return {
      ...elem,
      keywords: [...new Set(elem.keywords.split(" "))].join(" "),
    };
  });
}
const filterData = changeUniqKeywords();

export function Main() {
  const [name, setName] = useState("");
  const changeName = (event) => setName(event.target.value);

  return (
    <main className="main">
      <input
        className="input"
        name="search"
        placeholder="Placeholder"
        onChange={changeName}
      />

      {filterData
        .filter(
          (elem) =>
            elem.title.toLowerCase().includes(name) ||
            elem.keywords.toLowerCase().includes(name),
        )
        .map((elem) => (
          <Card
            symbol={elem.symbol}
            title={elem.title}
            keywords={elem.keywords}
          />
        ))}
    </main>
  );
}
