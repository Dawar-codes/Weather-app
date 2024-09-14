import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

const apiKey = "babaee17629e6520d1593162a3c9a0be";

/* http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key} */

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });
  
  app.get("/weather", async (req, res) => {

    const cityName = req.query.city;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
      const result = response.data;
      res.render("index.ejs", { content: result });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: "City not Found"
      });
    }

  });


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  