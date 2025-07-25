import apiKey from '../variable/apiKey';
import { useHttp } from '../hooks/http.hook';
const useMarvelService = () => {
  const { loading, error, request, clearError } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';

  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${apiKey}`);
    return res.data.results.map(_transformCharacter);
  };
  const getCharacter = async id => {
    const res = await request(`${_apiBase}characters/${id}?${apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };
	const getAllComics = async (offset = 0) => {
    const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${apiKey}`);
    return res.data.results.map(_transformComics);
  };
  const getComic = async id => {
    const res = await request(`${_apiBase}comics/${id}?${apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = char => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
  const _transformComics = comics => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || 'en-us',
      // optional chaining operator
      price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
    };
  };
  return {
    getAllCharacters,
    getCharacter,
    loading,
    error,
    clearError,
    getAllComics,
    getComic,
  };
};

export default useMarvelService;
