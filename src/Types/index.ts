export type ProjectPayload = {
    name: string;
    description: string;
    status: 'WORKING' | 'DONE';
    repo: 'FRONTEND' | 'BACKEND';
    url: string;
    liveLink: string;
    gitFrontend: string;
    gitBackend: string;
};


export type Aboutpayload = {
    description: string;
    image: string;
    gitLink: string;
    discordUsername: string;
    WhatsAppNumber: string;
    createdAt: Date;
    updatedAt: Date;
};
