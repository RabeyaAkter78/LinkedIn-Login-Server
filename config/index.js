const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

const data = {
    MONGODB_CONNECTION: process.env.MONGODB_CONNECTION,
    PORT: process.env.PORT,

};

module.exports = data;