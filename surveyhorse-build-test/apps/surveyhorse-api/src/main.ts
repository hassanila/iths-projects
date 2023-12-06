import {connect} from "@surveyhorse/surveyhorse-lib"
import app from "./app";

const port = process.env.PORT || 3333;

// test edit
// test edit 2

try {
  connect().then(() => {
    const server = app.listen(port, () => {
      console.log('running in test branch');
      console.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', () => console.log('error'));
  })
} catch (e) {
  console.log('error');
  throw e;
}
