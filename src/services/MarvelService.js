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
  return {
    getAllCharacters,
    getCharacter,
    loading,
    error,
    clearError,
  };
};

export default useMarvelService;
