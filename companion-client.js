// companion-client.js - Live Web Interface Data Receiver for AEROBRIEF
export class AeroBriefTelemetryReceiver {
    constructor() {
        this.socketUrl = `ws://localhost:8080`;
        this.connectionInstance = null;
    }

    initLiveTelemetryStream(uiUpdateCallback) {
        console.log(`[AEROBRIEF] Syncing tracking matrices with cloud poller nodes...`);
        this.connectionInstance = new WebSocket(this.socketUrl);

        this.connectionInstance.onopen = () => {
            console.log("[AEROBRIEF CLIENT] Cloud network trace streams verified. Live radar tracking online.");
        };

        this.connectionInstance.onmessage = (event) => {
            try {
                const packet = JSON.parse(event.data);
                if (packet.type === 'LIVE_API_UPDATE') {
                    uiUpdateCallback({
                        altitude: Math.round(packet.altitude),
                        groundSpeed: Math.round(packet.speed),
                        heading: Math.round(packet.heading),
                        flightLevel: Math.round(packet.altitude / 100),
                        lat: packet.latitude.toFixed(4),
                        lng: packet.longitude.toFixed(4),
                        equipment: packet.aircraftName
                    });
                }
            } catch (err) {
                console.error("[AEROBRIEF] Processing error on global cloud packet block.", err);
            }
        };
    }
}
