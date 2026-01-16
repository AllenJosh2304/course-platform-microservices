require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log("authservice reached and started")
  console.log(`Auth Service running on port ${PORT}`);
});
