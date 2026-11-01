// career.js - The Financial & Performance Engine for AEROBRIEF
export class AeroBriefCareer {
    constructor() {
        this.monthlyBaseSalary = 10000; // Your target £10,000 virtual game money
        this.flightFines = 0;
        this.flightLog = [];
        this.passengerComfort = 100; // Starts perfect at 100%
    }

    // This handles live penalties based on flight performance
    checkPerformanceViolation(altitude, speed, gForce) {
        // Penalty 1: Flying too fast below 10,000 feet
        if (altitude < 10000 && speed > 250) {
            this.logViolation(500, "Overspeed: Exceeded 255 knots below 10k ft");
        }

        // Penalty 2: Excessive G-Forces shaking up the passengers
        if (gForce > 1.8 || gForce < 0.3) {
            this.passengerComfort -= 10;
            this.logViolation(200, "Passenger Discomfort: Severe G-force fluctuation");
        }
    }

    // Calculates bonus or penalty when the wheels touch down
    evaluateLanding(verticalSpeedFPM) {
        let bonus = 0;

        if (verticalSpeedFPM >= -150) {
            bonus = 1000; // "Butter" landing bonus!
            console.log("AEROBRIEF Status: Excellent landing! +£1,000 bonus.");
        } else if (verticalSpeedFPM <= -400) {
            this.logViolation(1500, "Hard Landing: Exceeded airframe safety limits");
        }

        return bonus;
    }

    logViolation(fineAmount, reason) {
        if (!this.flightLog.includes(reason)) {
            this.flightFines += fineAmount;
            this.flightLog.push(reason);
            console.warn(`[AEROBRIEF CAREER LOG] Fine Issued: -£${fineAmount} | Reason: ${reason}`);
        }
    }

    // Calculate how much the pilot actually gets deposited into their virtual bank account
    calculateFinalPaycheck(landingBonus) {
        const grossEarnings = this.monthlyBaseSalary + landingBonus;
        // The pilot can never go completely bankrupt below £0 in a single flight
        const netPayout = Math.max(0, grossEarnings - this.flightFines); 
        
        return {
            basePay: this.monthlyBaseSalary,
            bonuses: landingBonus,
            totalFines: this.flightFines,
            netBankDeposit: netPayout,
            violations: this.flightLog,
            passengerSatisfaction: Math.max(0, this.passengerComfort)
        };
    }
}
