import { Header } from "./component/Header/Header.jsx";
import { Main } from "./component/Main/Main.jsx";
import { Footer } from "./component/Footer/Footer.jsx";
import { useState } from "react";

let arrEmodji = fetch ("https://emoji.ymatuhin.workers.dev/")
.then((response) => response.json())

function App() {

  const [emodji, setemodji] = useState([]);

  arrEmodji.then((data) => setemodji(data))

  return (
    <>
      <Header />
      <Main emodji={emodji}/>
      <Footer />
    </>
  );
}

export default App;
