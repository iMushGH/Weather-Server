const request = require("request");

const weather = (address, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=10cd3ac7cda14b40bf7191117242510&q=" +
    address +
    "&";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Can't reach the server! Please try again later.", undefined);
    } else if (response.body.error) {
      callback("The weather location could not be found!", undefined);
    } else {
      console.log(
        response.body.current.condition.text +
          ". It is currently " +
          response.body.current.temp_c +
          " degree out." +
          " It feels like " +
          response.body.current.feelslike_c +
          " degree out."
      );
    }
  });
};

module.exports = weather;
