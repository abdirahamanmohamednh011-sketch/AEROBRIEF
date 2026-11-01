// audio-engine.js - Multi-Channel High-Fidelity Cabin Audio System

export class AeroBriefAudioController {
    constructor() {
        this.ambientChannel = new Audio();
        this.crewChannel = new Audio();
        this.chimeChannel = new Audio();
        
        // Configure loops for continuous ambient assets
        this.ambientChannel.loop = true;
    }

    /**
     * Starts background environment noise (Jet engines or gate chatter)
     */
    startCabinAmbience(type = 'gate') {
        const file = type === 'gate' ? 'public/audio/environment/passenger_chatter.mp3' : 'public/audio/environment/engine_hum_cruise.mp3';
        this.ambientChannel.src = file;
        this.ambientChannel.volume = 0.15; // Keep it subtle in the background
        this.ambientChannel.play().catch(e => console.log("Audio interaction pending user context input."));
    }

    /**
     * Executes an elite sequential sound transition: Chime -> Voice Script
     */
    triggerCrewAnnouncement(chimeType, announcementKey) {
        const chimeFile = chimeType === 'AIRBUS' ? 'public/audio/chimes/airbus_2tone.mp3' : 'public/audio/chimes/boeing_tritone.mp3';
        const scriptFile = `public/audio/announcements/${announcementKey}.mp3`;

        console.log(`[AUDIO ENGINE] Sequencing announcement: ${announcementKey}`);
        
        // Lower background ambience volume dynamically while crew speaks
        this.ambientChannel.volume = 0.05;

        this.chimeChannel.src = chimeFile;
        this.chimeChannel.volume = 0.5;
        this.chimeChannel.play();

        this.chimeChannel.onended = () => {
            this.crewChannel.src = scriptFile;
            this.crewChannel.volume = 0.8;
            this.crewChannel.play();
        };

        this.crewChannel.onended = () => {
            // Restore default environmental background volumes when announcement concludes
            this.ambientChannel.volume = 0.15;
        };
    }
}
