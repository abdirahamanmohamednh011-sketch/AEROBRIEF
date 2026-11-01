// va-economy.js - Corporate VA Ledger & Passenger Logistics for AEROBRIEF

export class VirtualAirlineManager {
    constructor(vaName, initialVault = 500000) {
        this.vaName = vaName;
        this.corporateVault = initialVault; // VA starts with money
        this.cateringCostPerPax = 15;       // Standard catering cost
        this.cabinCrewSalaryExpense = 3500;  // Fixed cost per flight segment
    }

    /**
     * Processes flight financials at touchdown.
     * Ticket prices mimic real-world long/short-haul average values.
     */
    processFlightRevenue(passengerCount, distanceNM, pilotNetSalary) {
        // Real-world dynamic scale: longer flights = slightly higher ticket prices
        const baseTicketPrice = distanceNM > 1500 ? 450 : 180; 
        const grossPassengerIncome = passengerCount * baseTicketPrice;

        // Operating Expenses
        const cateringFees = passengerCount * this.cateringCostPerPax;
        const runwayLandingTax = distanceNM > 1500 ? 2500 : 800; // Heavy jets/large hubs cost more
        const totalOperatingCost = cateringFees + this.cabinCrewSalaryExpense + runwayLandingTax + pilotNetSalary;

        // Net Corporate Profit/Loss
        const netVaEarnings = grossPassengerIncome - totalOperatingCost;
        this.corporateVault += netVaEarnings;

        return {
            airlineName: this.vaName,
            paxRevenue: grossPassengerIncome,
            expenses: {
                catering: cateringFees,
                crewPayroll: this.cabinCrewSalaryExpense,
                runwayFees: runwayLandingTax,
                pilotSalaryDeduction: pilotNetSalary
            },
            vaNetChange: netVaEarnings,
            currentVaultBalance: this.corporateVault
        };
    }
}
