import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './character.scss';

const Character = () => {
  const [character, setCharacter] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);
  const {loading, error, getCharacter} = useMarvelService();

  useEffect(() => {}, character);
};
