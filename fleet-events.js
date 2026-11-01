// fleet-events.js - Fleet Catalogs, Live Events & Starter Aircraft Trackers

export const AIRCRAFT_FLEET = [
    { id: "p28a", name: "Piper PA-28 Cherokee", category: "Global Explorer", img: "https://unsplash.com" },
    { id: "b738", name: "Boeing 737-800", category: "Commercial Airliner", img: "https://unsplash.com" },
    { id: "a320", name: "Airbus A320neo", category: "Commercial Airliner", img: "https://unsplash.com" }
];

export const LIVE_EVENTS = [
    { id: 1, title: "Cross the Pond 2027", departure: "EGLL", arrival: "KJFK", date: "Nov 15, 2026" },
    { id: 2, title: "Caribbean Island Hopper", departure: "TNCM", arrival: "TJSJ", date: "Nov 22, 2026" }
];

export class PilotFleetManager {
    constructor() {
        // Every pilot receives one free Piper PA-28 to explore the world
        this.hasStarterPiper = true;
        this.exploredAirports = [];
    }

    logVisitedAirport(icao) {
        if (!this.exploredAirports.includes(icao)) {
            this.exploredAirports.push(icao);
        }
    }
}
