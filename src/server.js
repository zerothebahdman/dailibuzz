const dotenv = require("dotenv");
const app = require("./index");

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
