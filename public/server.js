const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let data = [];
if (fs.existsSync("data.json")) {
    data = JSON.parse(fs.readFileSync("data.json", "utf8"));
}

app.post("/submit", (req, res) => {
    const message = req.body.message;

    data.push({ message, time: new Date().toISOString() });

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    res.send("<h1>Saved!</h1><a href='/'>Go Back</a>");
});

app.listen(4000, () => {
    console.log("Server running at http://localhost:3000");
});
