import app from "./app.js";
import connectDB from "./DataBase/DB.js";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
