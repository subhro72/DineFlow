const env = require('./src/config/env')

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

// app.listen(env.port, () => {
//     console.log(`Server is running on port ${process.env.PORT || 3000}`);
// });

app.listen(env.port, "0.0.0.0", () => {
    console.log(`Server is running on port ${env.port}`);
});
