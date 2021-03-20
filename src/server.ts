"use strict";

import app from "./app";

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`🚀 ModeraCompra server is running on port ${port}!`);
});
