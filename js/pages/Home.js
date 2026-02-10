import Hero from '../components/Hero.js';
import PopularTrips from '../components/PopularTrips.js';
import Discover from '../components/Discover.js';
import Moments from '../components/Moments.js';
import ExtraSections from '../components/ExtraSections.js';


export default function Home() {
    return `
        <div id="home-page">
            ${Hero()}
            ${PopularTrips()}
            ${Discover({ limit: 6, showFilters: false })}
            ${Moments()}
            ${ExtraSections()}

        </div>
    `;
}
