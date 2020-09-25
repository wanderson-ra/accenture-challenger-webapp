export const properties = {
    port: process.env.REACT_APP_PORT || 3000,

    http: {
        rest: {
            challengeApi: {
                baseUrl: process.env.REACT_APP_CHALLENGER_API_URL,
            },
        },
    },
};
