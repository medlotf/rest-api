import app from "./app";
//import { env } from "./../env";

const port = 3000; // env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
