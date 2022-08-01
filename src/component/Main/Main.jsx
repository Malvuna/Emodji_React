import { useState, useEffect } from "react";
import { Card } from "../Card/Card.jsx";
import Fuse from "fuse.js";

// function changeUniqKeywords(emodji) {
//   return emodji.map((elem) => ({
//     ...elem,
//     keywords: [...new Set(elem.keywords.split(" "))].join(" "),
//   }));
// }
export function Main({emodji}) {

  // const filterData = changeUniqKeywords(emodji);

  const [textValue, setTextValue] = useState("");
  const changeName = (event) => setTextValue(event.target.value);

  const [filterDataResults, setFilterDataResults] = useState([]);

  
  useEffect(() => {
    let ignore = false;
  
    async function startFetching() {
      const json = fetch("https://emoji.ymatuhin.workers.dev/?search=textValue")
      if (!ignore) {
        json.then((response) => response.json())
        .then((data) => setFilterDataResults(data));
      }
    }
    startFetching();
  
    return () => {
      ignore = true;
    };
  }, [textValue]);

  // const fuse = new Fuse(filterData, {
  //   keys: ["title", "keywords"],
  //   includeScore: false,
  // });

  // const results = fuse.search(textValue);
  
  // const filterDataResults = textValue
  //   ? results.map((elem) => elem.item)
  //   : filterData;
    
  const filter = filterDataResults.length > 0 ? filterDataResults : emodji

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
