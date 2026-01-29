
import Hero from '../components/Hero.js';
import PopularTrips from '../components/PopularTrips.js';
import Discover from '../components/Discover.js';
import Moments from '../components/Moments.js';
import ExtraSections from '../components/ExtraSections.js';
import Newsletter from '../components/Newsletter.js';

export default function Home() {
    return `
        <div id="home-page">
            ${Hero()}
            ${PopularTrips()}
            ${Discover()}
            ${Moments()}
            ${ExtraSections()}
            ${Newsletter()}
        </div>
    `;
}
