
export interface JobTimeline {
    status: string;
    date: string;
    done: boolean;
}

export interface ContainerJob {
    id: string;
    client: string;
    status: 'Booked' | 'On Route' | 'Delayed' | 'Delivered';
    statusColor: 'slate' | 'blue' | 'rose' | 'emerald';
    location: string;
    type: string;
    nextStep: string;
    eta: string;
    driver: string;
    issue?: string;
    timeline: JobTimeline[];
}

const MOCK_JOBS: ContainerJob[] = [
    {
        id: 'JOB-7721-A',
        client: 'Oceanic Imports Ltd.',
        status: 'Booked',
        statusColor: 'slate',
        location: 'Port of Jebel Ali',
        type: 'General Cargo',
        nextStep: 'Gate In',
        eta: '2 Days',
        driver: 'Unassigned',
        timeline: [
            { status: 'Order Received', date: 'Oct 24, 10:00 AM', done: true },
            { status: 'Booking Confirmed', date: 'Oct 24, 02:30 PM', done: true },
            { status: 'Container Release', date: 'Pending', done: false }
        ]
    },
    {
        id: 'JOB-8890-B',
        client: 'Global Trading Corp',
        status: 'On Route',
        statusColor: 'blue',
        location: 'Truck TX-902 (D. Miller)',
        type: 'Refrigerated',
        nextStep: 'Customs Clearance',
        eta: '45 mins',
        driver: 'David Miller',
        timeline: [
            { status: 'Gate Out', date: 'Oct 25, 08:15 AM', done: true },
            { status: 'In Transit', date: 'Live', done: true },
            { status: 'Arrival at Border', date: 'Est. 11:00 AM', done: false }
        ]
    },
    {
        id: 'JOB-9021-X',
        client: 'Interstate Logistics',
        status: 'Delayed',
        statusColor: 'rose',
        location: 'Terminal Gate 4',
        type: 'Hazmat',
        nextStep: 'Reassign Driver',
        eta: 'Unknown',
        driver: 'Pending',
        issue: 'Traffic congestion at Terminal Gate 4',
        timeline: [
            { status: 'Gate Out', date: 'Oct 25, 07:00 AM', done: true },
            { status: 'Delay Reported', date: 'Oct 25, 09:30 AM', done: true }
        ]
    },
    {
        id: 'JOB-6612-C',
        client: 'Swift Manufacturing',
        status: 'Delivered',
        statusColor: 'emerald',
        location: 'Factory Warehouse',
        type: 'High Value',
        nextStep: 'Completed',
        eta: '-',
        driver: 'Sarah Jenkins',
        timeline: [
            { status: 'Departed', date: 'Oct 24, 02:00 PM', done: true },
            { status: 'Delivered', date: 'Oct 25, 11:24 AM', done: true }
        ]
    }
];

export const containerService = {
    getJobs: async (): Promise<ContainerJob[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_JOBS);
            }, 600);
        });
    },

    getStats: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    active: 1284,
                    waiting: 42,
                    delivered: 89,
                    delayed: 7
                });
            }, 500);
        });
    },

    createJob: async (jobData: any): Promise<ContainerJob> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newJob: ContainerJob = {
                    id: `JOB-${Math.floor(Math.random() * 9000) + 1000}-N`,
                    client: jobData.customer || 'New Client',
                    status: 'Booked',
                    statusColor: 'slate',
                    location: jobData.origin || 'Depot',
                    type: jobData.category || 'General',
                    nextStep: 'Awaiting Driver',
                    eta: 'TBD',
                    driver: 'Unassigned',
                    timeline: [{ status: 'Job Created', date: 'Just now', done: true }]
                };
                resolve(newJob);
            }, 1200);
        });
    }
};
