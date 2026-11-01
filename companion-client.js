<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AEROBRIEF Premium Operations Suite</title>
    <style>
        :root {
            --bg-dark: #0b0f19;
            --panel-bg: rgba(23, 32, 51, 0.85);
            --card-active: #1d2b45;
            --accent-gold: #ffcc00;
            --text-main: #ffffff;
            --text-muted: #8fa0bd;
            --border-glow: 1px solid rgba(255, 255, 255, 0.08);
            --fr24-dark: #111622;
        }

        body {
            font-family: "Chalet", "Century Gothic", "Apple Gothic", sans-serif;
            font-weight: bold;
            background-color: var(--bg-dark);
            color: var(--text-main);
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            line-height: 1.4;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #060911;
            padding: 12px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            z-index: 10;
        }

        h1 { margin: 0; font-size: 20px; color: var(--text-main); letter-spacing: 2px; }
        
        .tab-bar { display: flex; gap: 8px; }
        .tab-button {
            background: transparent;
            color: var(--text-muted);
            border: 1px solid transparent;
            padding: 6px 14px;
            font-family: "Chalet", "Century Gothic", sans-serif;
            font-weight: bold;
            cursor: pointer;
            border-radius: 4px;
            font-size: 12px;
            transition: all 0.2s;
        }
        .tab-button.active, .tab-button:hover {
            background: var(--card-active);
            color: var(--text-main);
            border: var(--border-glow);
        }

        .workspace { display: flex; flex: 1; position: relative; height: calc(100vh - 50px); }

        .sidebar-container {
            width: 340px;
            background: rgba(11, 15, 25, 0.95);
            border-right: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            flex-direction: column;
            z-index: 5;
            padding: 15px;
            box-sizing: border-box;
            gap: 12px;
            overflow-y: auto;
        }

        /* Server Status Indicators (Waypoint Style Top Right) */
        .server-status-container {
            display: flex;
            gap: 10px;
            font-size: 11px;
            letter-spacing: 0.5px;
        }
        .server-badge {
            padding: 3px 8px;
            border-radius: 12px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .badge-expert { background: rgba(39, 174, 96, 0.15); color: #27ae60; border: 1px solid #27ae60; }
        .badge-training { background: rgba(241, 196, 15, 0.15); color: #f1c40f; border: 1px solid #f1c40f; }
        .badge-casual { background: rgba(142, 68, 173, 0.15); color: #8e44ad; border: 1px solid #8e44ad; }

        .traffic-feed-header {
            font-size: 12px;
            color: var(--text-muted);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 8px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
        }
        .tab-sub-link { cursor: pointer; color: var(--text-muted); margin-right: 10px; font-size: 11px; }
        .tab-sub-link.active { color: var(--accent-gold); border-bottom: 1px solid var(--accent-gold); }

        /* High-Clarity Waypoint Flight Cards Selection Panel */
        .waypoint-flight-card {
            background: var(--panel-bg);
            border: var(--border-glow);
            border-radius: 6px;
            padding: 10px;
            display: flex;
            gap: 12px;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }
        .waypoint-flight-card:hover, .waypoint-flight-card.active {
            background: var(--card-active);
            border-color: var(--accent-gold);
        }
        .rank-number { font-size: 11px; color: var(--text-muted); width: 15px; text-align: center; }
        .airline-logo-placeholder {
            width: 32px;
            height: 32px;
            background: #0b0f19;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            border: var(--border-glow);
        }
        .flight-main-info { flex: 1; min-width: 0; }
        .callsign-line { font-size: 13px; color: var(--text-main); display: flex; justify-content: space-between; }
        .aircraft-type-line { font-size: 10px; color: var(--text-muted); margin-top: 2px; }
        .route-line { font-size: 11px; color: var(--accent-gold); margin-top: 4px; letter-spacing: 0.5px; }

        .map-viewport { flex: 1; background: var(--fr24-dark); position: relative; }
        #radarMapContainer { width: 100%; height: 100%; background: var(--fr24-dark); }

        .right-info-overlay {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 340px;
            background: var(--panel-bg);
            border: var(--border-glow);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.6);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            z-index: 4;
            box-sizing: border-box;
        }

        .overlay-title { font-size: 12px; color: var(--accent-gold); letter-spacing: 1px; margin-bottom: 12px; }
        .huge-stat { font-size: 28px; margin: 8px 0; color: #27ae60; }

        .floating-tablet {
            position: absolute;
            top: 150px;
            left: 360px;
            width: 300px;
            background: #172033;
            border: 1px solid var(--accent-gold);
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            z-index: 100;
        }
        .tablet-header { background: var(--card-active); padding: 8px 12px; cursor: move; display: flex; justify-content: space-between; font-size: 11px; }
        .tablet-body { padding: 12px; font-size: 12px; }

        .tactical-toolbar {
            position: absolute;
            right: 20px;
            bottom: 20px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            z-index: 5;
        }
        .tool-icon-btn {
            width: 36px;
            height: 36px;
            background: var(--panel-bg);
            border: var(--border-glow);
            border-radius: 6px;
            color: var(--text-main);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 16px;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        .tool-icon-btn:hover { background: var(--card-active); border-color: var(--accent-gold); }

        .input-group { display: flex; gap: 6px; margin-top: 8px; }
        input { background: #0b0f19; border: var(--border-glow); color: white; padding: 8px; font-family: "Chalet", "Century Gothic", sans-serif; font-size: 12px; flex: 1; }
        button { background: var(--card-active); border: var(--border-glow); color: white; padding: 8px 12px; font-family: "Chalet", "Century Gothic", sans-serif; font-weight: bold; cursor: pointer; }
        button:hover { background: var(--accent-gold); color: black; }
    </style>
</head>
<body>

    <header>
        <h1>AEROBRIEF // SYSTEM CONTROLS</h1>
        
        <!-- Live Server Status Bar Monitors (Waypoint UI Match) -->
        <div class="server-status-container">
            <div class="server-badge badge-expert">● EXPERT: 5,785</div>
            <div class="server-badge badge-training">● TRAINING: 533</div>
            <div class="server-badge badge-casual">● CASUAL: 483</div>
        </div>

        <div class="tab-bar">
            <button class="tab-button active" onclick="switchPage('hq-tab')">[01/HQ]</button>
            <button class="tab-button" onclick="switchPage('map-tab')">[02/RADAR]</button>
        </div>
    </header>

    <!-- FLOATING PILOT EFB TABLET -->
    <div class="floating-tablet" id="pilotTablet">
        <div class="tablet-header" id="tabletDragArea">
            <span>EFB CONTROLS (DRAGGABLE)</span>
            <span style="color:#eb5757; cursor:pointer;" onclick="document.getElementById('pilotTablet').style.display='none'">[X]</span>
        </div>
        <div class="tablet-body">
            <strong>STARTER WORLD EXPLORER FLEET:</strong>
            <p style="margin:4px 0 10px 0; color:var(--accent-gold);">🛩️ Piper PA-28 Explorer (1 ASSIGNED)</p>
            <button onclick="window.startAudioChannel()" style="width:100%;">BOOT CABIN AUDIO CHAINS</button>
        </div>
    </div>

    <div class="workspace">
        <!-- LEFT PANEL: POPULAR TRAFFIC MONITOR FEEDS -->
        <div class="sidebar-container">
            <div class="traffic-feed-header">
                <span>⚡ AIRSPACE TRAFFIC WATCH</span>
                <div>
                    <span class="tab-sub-link active">Most Tracked</span>
                    <span class="tab-sub-link">Landings</span>
                </div>
            </div>
            
            <div class="waypoint-flight-card active" onclick="selectFlightRow('EGLL', 'KJFK', 'AB-992', 'Ryanair', 'Boeing 737-800')">
                <div class="rank-number">1</div>
                <div class="airline-logo-placeholder" style="color: var(--accent-gold);">RYR</div>
                <div class="flight-main-info">
                    <div class="callsign-line"><strong>AB-992</strong><span style="font-size:10px; color:#27ae60;">● LIVE</span></div>
                    <div class="aircraft-type-line">Boeing 737-800 • Captain Abdi</div>
                    <div class="route-line">EGLL ➔ KJFK</div>
                </div>
            </div>

            <div class="waypoint-flight-card" onclick="selectFlightRow('SBGL', 'SBSP', 'G3-044', 'GOL', 'Boeing 737-MAX8')">
                <div class="rank-number">2</div>
                <div class="airline-logo-placeholder" style="color: #f39c12;">GOL</div>
                <div class="flight-main-info">
                    <div class="callsign-line"><strong>G3-044GL</strong></div>
                    <div class="aircraft-type-line">Boeing 737-MAX8 • Rafael Bullara</div>
                    <div class="route-line">SBGL ➔ SBSP</div>
                </div>
            </div>
        </div>

        <!-- FULLSCREEN RADAR VIEWPORT CONTAINER -->
        <div class="map-viewport">
            <div id="radarMapContainer"></div>
            
            <!-- Floating Vertical Map Action Menu Button Panel (Right Toolbar) -->
            <div class="tactical-toolbar">
                <div class="tool-icon-btn" onclick="zoomRadarMap('in')">＋</div>
                <div class="tool-icon-btn" onclick="zoomRadarMap('out')">－</div>
                <div class="tool-icon-btn" onclick="toggleRadarLayers()">🌐</div>
                <div class="tool-icon-btn" onclick="document.getElementById('pilotTablet').style.display='block'">📋</div>
            </div>
        </div>

        <!-- RIGHT AREA OVERLAYS: LEDGERS & DATA INPUTS -->
        <div class="right-info-overlay" id="hq-tab">
            <div class="overlay-title">01 // CORPORATE VA ACCOUNTING</div>
            <div>AIRLINE RESERVES SYSTEM VAULT Balance:</div>
            <div class="huge-stat" id="vaVaultDisplay">£500,000.00</div>
            <hr style="border:0; border-top:1px solid rgba(255,255,255,0.05); margin:15px 0;">
            <div class="overlay-title">02 // PILOT PAYROLL SYSTEM METRICS</div>
            <div>CURRENT BANK WALLET BALANCE:</div>
            <div style="font-size:22px; font-weight:bold; margin-top:5px;" id="balanceDisplay">£10,000.00</div>
            <hr style="border:0; border-top:1px solid rgba(255,255,255,0.05); margin:15px 0;">
            <div class="overlay-title">03 // SIMBRIEF DISPATCH PACKET IMPORTER</div>
            <div class="input-group">
                <input type="text" id="sbUser" placeholder="ENTER SIMBRIEF USERNAME ID">
                <button onclick="importSimBriefData()">SYNC FP</button>
            </div>
            <pre id="routeStatus" style="font-size:10px; margin-top:10px; white-space:pre-wrap; color:var(--text-muted);">AWAITING PACKET SYNC REQUESTS...</pre>
        </div>

        <div class="right-info-overlay" id="map-tab" style="display:none;">
            <div class="overlay-title">04 // INTERACTIVE ATC HUD SYSTEM TELEMETRY</div>
            <div style="background:#0b0f19; padding:12px; border-radius:6px; font-size:12px; line-height:1.6;">
                <strong>SELECTED TRACKING:</strong> <span id="telemetryCallsign" style="color:var(--accent-gold);">AB-992</span><br>
                <strong>VIRTUAL AIRLINE:</strong> <span id="telemetryVA">Ryanair</span><br>
                <strong>FLIGHT ROUTING:</strong> <span id="telemetryRoute">EGLL ➔ KJFK</span><br>
                <strong>AIRFRAME MODEL:</strong> <span id="telemetryAircraft" style="font-size:11px;">Boeing 737-800</span><br>
                <hr style="border-color:rgba(255,255,255,0.05)">
                <div id="liveAvionicsHUD">Polling active telemetry frame array...</div>
            </div>
        </div>
    </div>
    <!-- REAL-TIME INTERACTION SCRIPT ENGINE MODULES -->
    <script type="module">
        import { initializeFloatingTablet } from './tablet-overlay.js';
        import { AeroBriefTelemetryReceiver } from './companion-client.js';
        import { AeroBriefPlanner } from './simbrief.js';

        const flightPlanner = new AeroBriefPlanner();
        const liveApiReceiver = new AeroBriefTelemetryReceiver();

        try {
            initializeFloatingTablet("pilotTablet", "tabletDragArea");
        } catch(e) { console.log("Draggable elements configured."); }

        window.switchPage = function(tabId) {
            document.getElementById('hq-tab').style.display = tabId === 'hq-tab' ? 'block' : 'none';
            document.getElementById('map-tab').style.display = tabId === 'map-tab' ? 'block' : 'none';
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        };

        window.selectFlightRow = function(origin, dest, callsign, airline, aircraft) {
            document.querySelectorAll('.waypoint-flight-card').forEach(card => card.classList.remove('active'));
            event.currentTarget.classList.add('active');
            
            document.getElementById('telemetryCallsign').innerText = callsign;
            document.getElementById('telemetryVA').innerText = airline;
            document.getElementById('telemetryRoute').innerText = `${origin} ➔ ${dest}`;
            document.getElementById('telemetryAircraft').innerText = aircraft;
        };

        window.zoomRadarMap = function(direction) {
            console.log(`[AEROBRIEF MAP HUD] Adjusting vector zoom resolution metric: ${direction}`);
        };

        window.toggleRadarLayers = function() {
            alert("🌐 Radar Layer Matrix:\nSwapping between terrain vector views and tactical air traffic airspace grids.");
        };

        function processLiveTelemetryUpdate(data) {
            const hud = document.getElementById('liveAvionicsHUD');
            if (hud) {
                hud.innerHTML = `
                    <strong>ALTITUDE CONFIG:</strong> FL${data.flightLevel} (${data.altitude.toLocaleString()} FT)<br>
                    <strong>GROUND SPEED:</strong> ${data.groundSpeed} KTS<br>
                    <strong>GEOGRAPHIC LAT:</strong> ${data.lat}<br>
                    <strong>GEOGRAPHIC LNG:</strong> ${data.lng}
                `;
            }
            const planeIcon = document.querySelector('#radarMapContainer div div:nth-child(2)');
            const textLabel = document.querySelector('#radarMapContainer div div:nth-child(3)');
            if (planeIcon && textLabel) {
                planeIcon.style.transform = `rotate(${data.heading}deg)`;
                textLabel.innerHTML = `${document.getElementById('telemetryCallsign').innerText}<br>FL${data.flightLevel} / ${data.groundSpeed}KT`;
            }
        }

        const mapBox = document.getElementById('radarMapContainer');
        if (mapBox) {
            mapBox.innerHTML = `
                <div style="width:100%; height:100%; position:relative; background:#111622;">
                    <div style="position:absolute; top:0; left:0; width:100%; height:100%; background-image:linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px); background-size:40px 40px;"></div>
                    <div style="position:absolute; top:50%; left:50%; font-size:26px; cursor:pointer; transform:translate(-50%,-50%); filter:drop-shadow(0 2px 4px black);" onclick="switchPage('map-tab')">✈️</div>
                    <div style="position:absolute; top:56%; left:51%; font-size:10px; background:rgba(6,9,17,0.9); padding:4px 6px; border-radius:4px; border:1px solid var(--accent-gold); color:white; line-height:1.2;">AB-992<br>FL360</div>
                </div>`;
        }

        liveApiReceiver.initLiveTelemetryStream(processLiveTelemetryUpdate);
    </script>
</body>
</html>
