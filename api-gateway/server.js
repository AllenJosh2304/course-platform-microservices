require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("api-gateway reached and server stareted")
  console.log(`API Gateway running on port ${PORT}`);
});
