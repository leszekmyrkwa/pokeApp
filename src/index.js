import React from "react";
import ReactDOM from "react-dom/client";
import PokeAPI from "./components/PokeData";
import './style.scss';

const App = () => {

    return (
       <div className='container'>
          <PokeAPI />
       </div>
    );

}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);