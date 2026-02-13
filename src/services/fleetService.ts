
export interface Vehicle {
    id: string;
    type: string;
    chassis: string;
    engine: string;
    hp: string;
    capacity: string;
    driver: string;
    driverId: string;
    status: 'Available' | 'On Trip' | 'Maintenance' | 'Idle';
    initials: string;
    color: string;
}

const MOCK_VEHICLES: Vehicle[] = [
    { id: 'TRK-9022', type: 'Prime Mover • Volvo', chassis: 'CH-B229384-FH16', engine: 'D16K Diesel', hp: '750 HP / Euro 6', capacity: '40 MT', driver: 'John Smith', driverId: 'DRV-002', status: 'Available', initials: 'JS', color: 'blue' },
    { id: 'TRK-4410', type: 'Flatbed • Scania', chassis: 'CH-SC88211-R500', engine: 'DC13 Engine', hp: '500 HP / Euro 5', capacity: '28 MT', driver: 'Marcus R.', driverId: 'DRV-114', status: 'On Trip', initials: 'MR', color: 'purple' },
    { id: 'TRK-0885', type: 'Tanker • Peterbilt', chassis: 'CH-PB11022-579', engine: 'PACCAR MX-13', hp: '510 HP / EPA 21', capacity: '32k L', driver: 'Alan Walker', driverId: 'DRV-098', status: 'Maintenance', initials: 'AW', color: 'orange' },
    { id: 'TRK-1042', type: 'Box Truck • Isuzu', chassis: 'CH-IS882-NQR', engine: '4HK1-TCC', hp: '210 HP / Euro 4', capacity: '8 MT', driver: 'Sarah Connor', driverId: 'DRV-101', status: 'Idle', initials: 'SC', color: 'slate' },
    { id: 'TRK-2291', type: 'Refrigerated • Man', chassis: 'CH-MN112-TGX', engine: 'D2676', hp: '480 HP / Euro 6', capacity: '18 MT', driver: 'Mike T.', driverId: 'DRV-202', status: 'Available', initials: 'MT', color: 'green' }
];

export const fleetService = {
    getVehicles: async (): Promise<Vehicle[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_VEHICLES);
            }, 700);
        });
    },

    getStats: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    total: MOCK_VEHICLES.length,
                    available: MOCK_VEHICLES.filter(v => v.status === 'Available').length,
                    onTrip: MOCK_VEHICLES.filter(v => v.status === 'On Trip').length,
                    maintenance: MOCK_VEHICLES.filter(v => v.status === 'Maintenance').length,
                    idle: MOCK_VEHICLES.filter(v => v.status === 'Idle').length
                });
            }, 500);
        });
    },

    addVehicle: async (vehicle: Omit<Vehicle, 'status' | 'initials' | 'color'>): Promise<Vehicle> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newVehicle: Vehicle = {
                    ...vehicle,
                    status: 'Available',
                    initials: vehicle.driver.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
                    color: 'blue'
                };
                // In a real app, we'd push to the array, but for this mock, we just return it
                // effectively "simulating" the success.
                resolve(newVehicle);
            }, 1000);
        });
    }
};
