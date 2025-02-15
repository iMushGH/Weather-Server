const path = require("node:path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

// Define Path for express config
const publicDirectory = path.join(__dirname, "../public");
const viewTemplate = path.join(__dirname, "../template/views");
const partialsDir = path.join(__dirname, "../template/partials");

// Setup handlers engine and view location
app.set("view engine", "hbs");
app.set("views", viewTemplate);
app.use(express.static(publicDirectory));
hbs.registerPartials(partialsDir);

app.get("", (req, res) => {
  res.render("index", {
    title: "My Weather App",
    title: "Weather",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Enter an address search term to continue",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    // weather(data.location, (error, data) => {
    //   if (data.error) {
    //     return console.log(error);
    //   }
    weather(data.location, (error, data) => {
      if (data.error) {
        return console.log(error);
      }
    });
    res.send({
      latitude: data.latitude,
      longitude: data.longitude,
      time: data.localtime,
      location: req.query.address,
    });

    // console.log(response);
    // console.log(data);
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    description: "Created by",
    name: "Mushnan Hassan",
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    ticket: "Support Token",
    feedback: "We will get in touch with you soon!",
    title: "Help",
  });
});

app.get("/contact", (req, res) => {
  res.render("Contact", {
    title: "Contact",
    tel: "Tel:  ",
    telephone: "+233205371176",
    email: "email: ",
    emailadd: "support@imushgh.com",
  });
});

app.get("/help/*", (req, res) => {
  res.send("Help article not found");
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    error:
      "The page you are looking for can't be found. Please click the home menu to continue browsing. Thank you",
  });
});

app.listen(port, () => {
  console.log("Server is on and running on port" + port);
});
