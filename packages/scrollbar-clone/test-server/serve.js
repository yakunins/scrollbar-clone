/* eslint-disable no-undef */
const express = require("express");

const app = express();
const port = 3003;

app.use(express.static("./test-server"));
app.use(express.static("./dist"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
