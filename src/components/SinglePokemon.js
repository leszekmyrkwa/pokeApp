import React, { useState, useEffect } from "react";
import axios from "axios";
import './SinglePokemon.scss';
import TypePill from "./PokemonTypePill";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarFullIcon from '@mui/icons-material/Star';

export default function SinglePokemon(props) {

  const [pokemonData, setPokemonData] = useState({});
  const [pokeImg, setPokeImg] = useState("");
  const [pokeTypes, setPokeTypes] = useState([]);
  const [addToFavourite, setAddToFavourite] = useState(false);

  useEffect(() => {
    async function getData() {
          let res = await axios.get(props.pokemon.url);
          setPokemonData(res.data);
          setPokeImg(res.data.sprites.front_default);
          setPokeTypes(res.data.types);
      }

    getData();
  }, [props.pokemon.url]);

  function saveToFavourite() {
    if (localStorage.getItem(pokemonData.name) !== pokemonData.name) {
        localStorage.setItem(pokemonData.name, pokemonData.name);
        setAddToFavourite(true);
    } else {
      localStorage.removeItem(pokemonData.name);
      setAddToFavourite(false);
    }
  }

  function showFavouriteIcon() {
    if (localStorage.getItem(pokemonData.name) === pokemonData.name) {
      return <StarFullIcon onClick={ saveToFavourite } className="pokemonCard-favourite-full"/>
    } else {
      return <StarBorderIcon onClick={ saveToFavourite } className="pokemonCard-favourite"/>
    }
  }
 
  return (
    <Card className="pokemonCard" sx={{ maxWidth: 275 }}>
      {showFavouriteIcon()}
      <CardMedia
          component="img"
          height="194"
          image={pokeImg}
          alt={pokemonData.name}
      />
      <CardContent>
          <Typography gutterBottom variant="h4" component="h4">
              {pokemonData.name}
          </Typography>
          <div className="pokemon-card__types">
            {pokeTypes.map(type => (
              <TypePill compact pokemonType={type.type.name} key={type.type.name} />
            ))}
          </div>
      </CardContent>
    </Card>
  );
}