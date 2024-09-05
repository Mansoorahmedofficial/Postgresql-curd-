const { app } = require("./app");

app.get("/", (req, res) => {
  res.send("working !! ");
});

app.listen(process.env.PORT, () =>
  console.info(`runing on http:localhost:${process.env.PORT}`)
);
