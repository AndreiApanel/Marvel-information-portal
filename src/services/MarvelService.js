class MarvelService {
	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url},status: ${res.status}`);
		}
		return await res.json();
	};
	getAllCharacters = () => {
		return this.getResource(
			'https://gateway.marvel.com:443/v1/public/characters?apikey=af8b96479082ac1c08e6472e3ae23078'
		);
	};
}

export default MarvelService;