// server.js - Infinite Flight Live API v3 Poller Hub for AEROBRIEF
const { WebSocketServer } = require('ws');

const IF_LIVE_API_KEY = 'fk11oonbbeeoxip0cbw7lt38x3ivv1de'; // LINE 4: PASTE YOUR UNIQUE API KEY HERE
const TARGET_CALLSIGN = 'AB-992'; 
const WS_PORT = 8080;

const wss = new WebSocketServer({ port: WS_PORT });
let activeUiSocket = null;

console.log(`[AEROBRIEF SYSTEM] WebSocket channel listening on port ${WS_PORT}...`);

wss.on('connection', (ws) => {
    console.log('[AEROBRIEF] Cloud Live API Bridge successfully linked to client dashboard panels.');
    activeUiSocket = ws;
    pollInfiniteFlightLiveAPI();
});

async function pollInfiniteFlightLiveAPI() {
    if (!activeUiSocket || activeUiSocket.readyState !== 1) return;

    try {
        console.log("[AEROBRIEF] Querying global Infinite Flight Live API v3 server hubs...");
        
        // Fetch active multiplayer server sessions
        const sessionResponse = await fetch(`https://infiniteflight.com{IF_LIVE_API_KEY}`);
        const sessionData = await sessionResponse.json();

        if (sessionData.errorCode !== 0 || !sessionData.result.length) return;

        // Isolate the id index for the primary Expert Server layout
        const expertServer = sessionData.result.find(s => s.name.includes("Expert") || s.worldType === 3);
        const activeServerId = expertServer ? expertServer.id : sessionData.result.id;

        // Query active traffic currently airborne inside the session
        const flightsResponse = await fetch(`https://infiniteflight.com{activeServerId}?apikey=${IF_LIVE_API_KEY}`);
        const flightsData = await flightsResponse.json();

        if (flightsData.errorCode === 0 && flightsData.result) {
            const targetPlane = flightsData.result.find(f => f.callsign === TARGET_CALLSIGN);

            if (targetPlane) {
                console.log(`[AEROBRIEF INTERCEPT] Target Found: Lat ${targetPlane.latitude}, Lng ${targetPlane.longitude}`);
                activeUiSocket.send(JSON.stringify({
                    type: 'LIVE_API_UPDATE',
                    altitude: targetPlane.altitude,
                    speed: targetPlane.speed,
                    heading: targetPlane.heading,
                    latitude: targetPlane.latitude,
                    longitude: targetPlane.longitude,
                    aircraftName: targetPlane.aircraftName || "Boeing 737-800"
                }));
            }
        }
    } catch (err) {
        console.warn("[AEROBRIEF API WARN] Cloud polling refresh cycle skipped.", err.message);
    }
}

// Poll Infinite Flight global cloud servers every 30 seconds
setInterval(pollInfiniteFlightLiveAPI, 30000);
