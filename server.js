import { app } from "./app.js";
import { connectDatabase } from "./data/database.js";

//connect to database
connectDatabase();

//listen to server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});