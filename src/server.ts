"use strict";

import app from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Modera Compra server is running on ${port}!`);
});
