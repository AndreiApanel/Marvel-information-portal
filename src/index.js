import { createRoot } from 'react-dom/client';

import App from './components/app/App';
// import MarvelService from './services/MarvelService';
import './style/style.scss';
const container = document.getElementById('root');
const root = createRoot(container);
// const marvelServices = new MarvelService();

// marvelServices.getAllCharacters().then((res) => console.log(res));
root.render(
<App />
);

