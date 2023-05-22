require('dotenv').config();

const keys = {
    app: {
        name:"FullStack Web3 App for 4D Studios",
        apiURL: `${process.env.BASE_API_URL}`,
        secretKey: process.env.JWT_SECRET
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        tokenLife: '1d'
    },
    tokenType: {
        ACCESS: "access",
    },
    port: process.env.PORT || 3000,
    env_mode: process.env.NODE_ENV || "development",
}

export {
    keys
}