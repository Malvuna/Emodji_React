import { useState, useEffect } from "react";
import { Card } from "../Card/Card.jsx";

export function Main() {
  const [textValue, setTextValue] = useState("");
  const changeName = (event) => setTextValue(event.target.value);

  const [filterDataResults, setFilterDataResults] = useState([]);

  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;

    const json = fetch(`https://emoji.ymatuhin.workers.dev/?search=${textValue}`, {signal})

        json.then((response) => response.json())
        .then((data) => setFilterDataResults(data));

    return () => {
      controller.abort();
    };
  }, [textValue]);

const filter = filterDataResults

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
      {filter.map((elem) => (
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


// useEffect(() => {
//   let ignore = false;

//   async function startFetching() {
//     const json = fetch(`https://emoji.ymatuhin.workers.dev/?search=${textValue}`)
//     if (!ignore) {
//       json.then((response) => response.json())
//       .then((data) => setFilterDataResults(data));
//     }
//   }
//   startFetching();

//   return () => {
//     ignore = true;
//   };
// }, [textValue]);

// const filter = filterDataResults.length > 0 ? filterDataResults : emodji