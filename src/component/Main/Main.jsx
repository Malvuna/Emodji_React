import { useState } from "react";
import { Card } from "../Card/Card.jsx";
import { data } from "../../emoji.js";

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

  const arrValue = textValue.split(" ");

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
      {arrValue.map((searchWord) =>
        filterData
          .filter(
            (elem) =>
              elem.title.toLowerCase().includes(searchWord) ||
              elem.keywords.toLowerCase().includes(searchWord),
          )
          .map((elem) => (
            <Card
              symbol={elem.symbol}
              title={elem.title}
              keywords={elem.keywords}
            />
          )),
      )}
    </main>
  );
}
