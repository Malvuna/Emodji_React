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

  const arrValue = textValue.split(" ").filter((elem) => elem.trim());
  console.log(arrValue);

  return (
    <main className="main">
      <input
        className="input"
        name="search"
        placeholder="Placeholder"
        value={textValue}
        onChange={changeName}
      />
      {filterData
        .filter((elem) =>
          arrValue.every(
            (word) =>
              elem.title.toLowerCase().includes(word) ||
              elem.keywords.toLowerCase().includes(word),
          ),
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
