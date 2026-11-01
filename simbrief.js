// simbrief.js - The One-Click Flight Planner & Route Decoder for AEROBRIEF

export class AeroBriefPlanner {
    constructor() {
        this.activeFlightPlan = null;
    }

    /**
     * Connects to the public SimBrief API using the pilot's SimBrief username
     * @param {string} username - The SimBrief username or Pilot ID
     */
    async importFlightPlan(username) {
        if (!username) {
            console.error("[AEROBRIEF] SimBrief Username is required.");
            return null;
        }

        // We use JSON=1 to request clean, modern web data instead of heavy XML strings
        const apiUrl = `https://simbrief.com{encodeURIComponent(username)}&json=1`;

        try {
            console.log(`[AEROBRIEF] Fetching live dispatch data for pilot: ${username}...`);
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`SimBrief server error: ${response.status}`);
            }

            const data = await response.json();

            // Guard check: Ensure an active dispatch exists for this account right now
            if (!data.general || !data.general.route) {
                throw new Error("No active flight dispatch found. Please generate a flight plan on SimBrief first.");
            }

            // Extract only the elite pilot metrics to keep our memory usage lightweight
            this.activeFlightPlan = {
                callsign: `${data.general.airline}${data.general.flight_number}`,
                aircraftType: data.general.aircraft_icaocode,
                originICAO: data.origin.icao,
                destinationICAO: data.destination.icao,
                cruiseAltitudeFL: data.general.initial_altitude, // e.g. "36000" or "FL360"
                blockFuelLbs: data.fuels.block_car,
                rawRoute: data.general.route,
                // Elite Feature: Auto-detecting the Top of Descent (ToD) waypoint marker
                todWaypoint: directWaypointMarker(data.navlog.fix)
            };

            console.log("[AEROBRIEF] Flight plan successfully linked!", this.activeFlightPlan);
            return this.activeFlightPlan;

        } catch (error) {
            console.error("[AEROBRIEF PLANNER ERROR]", error.message);
            alert(`AeroBrief Error: ${error.message}`);
            return null;
        }
    }
}

/**
 * Helper function to safely isolate the ideal waypoint marker for Top of Descent
 * @param {Array} fixes - The navigational waypoint tracking log array from SimBrief
 */
function directWaypointMarker(fixes) {
    if (!fixes || fixes.length < 4) return "DEST";
    // Grabs the 3rd waypoint counting backward from the arrival airport runway line
    const todFixIndex = fixes.length - 3;
    return fixes[todFixIndex].ident || "DEST";
}
