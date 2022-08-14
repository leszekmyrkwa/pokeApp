import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PokeData.scss";
import Pagination from "./Pagination";
import SinglePokemon from "./SinglePokemon";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Navbar from "./Navbar";
import Filter from "./Filter";

export default function PokeAPI() {
  const [allPokemonsPage, setAllPokemonsPage] = useState([]);
  const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon');
  const [pageCount, setPageCount] = useState(1);
  const [favouritesStatus, setFavouritesStatus] = useState(false);

  const homePage = 'https://pokeapi.co/api/v2/pokemon';
  let pokemonsCount = currentPage.count;

  useEffect(() => {
    async function getData() {
        let res = await axios.get(currentPage);
        setAllPokemonsPage(res.data.results);
        setCurrentPage(res.data);
    }

    getData();
  }, [currentPage.next]);
 
    function fetchPrevPage() {
      if (currentPage.previous)
        setCurrentPage(currentPage.previous);
        if (pageCount > 1) {
          setPageCount(pageCount - 1);
        }
    }

    function fetchNextPage() {
      if (currentPage.next)
      setPageCount(pageCount + 1)
      setCurrentPage(currentPage.next);
    }

    function backToHome() {
      setPageCount(1)
      setCurrentPage(homePage);
    }

    function showFavourites() {
      if (favouritesStatus === false) {
        setCurrentPage(`https://pokeapi.co/api/v2/pokemon/?limit=${pokemonsCount}`)
        setFavouritesStatus(true);
      } else {
        setFavouritesStatus(false);
      }
    }

  const renderAllPokemons = (allPokemonsPage) => {
    return (
        allPokemonsPage.map((pokemon) => {

          if (favouritesStatus === true) {
            if (pokemon.name === localStorage.getItem(pokemon.name)) {
              return (
                <Grid2 className='pokeDataGrid-inner' key={pokemon.name} xs={4} s={4} md={3}>
                  <SinglePokemon favouritesStatus={favouritesStatus} pokemon={pokemon} />
                </Grid2>
              );
            }
          }

            if (favouritesStatus === false) {
              return (
                <Grid2 className='pokeDataGrid-inner' key={pokemon.name} xs={6} s={4} md={3}>
                  <SinglePokemon favouritesStatus={favouritesStatus} pokemon={pokemon} />
                </Grid2>
              );
            }
      })
    );
  }

  return (
    <div className="pokeData">
      <Navbar backToHome={backToHome} showFavourites={showFavourites} />
      <div className="pokeData-heading">
        <h1>There are <span>{pokemonsCount}</span> Pokemons to catch!</h1>
        <Filter/>
      </div>
      <Grid2 className='pokeDataGrid' container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
         {renderAllPokemons(allPokemonsPage)}
      </Grid2>
       <Pagination
          currentPage={pageCount}
          pageCount={Math.round(pokemonsCount / 20)}
          onPrev={fetchPrevPage}
          onNext={fetchNextPage}
        />
    </div>
  );
}