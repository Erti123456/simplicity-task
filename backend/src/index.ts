import { env } from "./env.js";
import { app } from "./app.js";

app.listen(env.PORT, () => {
  console.log("The server is running on port: " + env.PORT);
});
