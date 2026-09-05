const env = require('./src/config/env')

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

app.listen(env.port, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
