/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
import 'regenerator-runtime';
import '../scss/styles.scss';
import '../scss/responsive.scss';
import '../components/navbarComponent';
import '../components/footerComponent';
import '../components/head-custom';
import Bencana from './cardBencana';
import WeatherApp from './cuaca';
import Pagination from './pagination';
import Cuaca from './cuacaLandingPage';
import BencanaHome from './bencanaLandingPage';
import generateTeamMemberCards from './team';

document.addEventListener('DOMContentLoaded', () => {
    generateTeamMemberCards();
});
const myBencana = new Bencana();
myBencana.init();

const weatherApp = new WeatherApp();
const myCuaca = new Cuaca();

const myPagination = new Pagination();

const myBencanaHome = new BencanaHome();
