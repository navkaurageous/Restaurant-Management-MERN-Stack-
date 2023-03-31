import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js"
//loading the environment variables
dotenv.config();

//to get a access from a mongoClient
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

//connecting to the database
MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  //if there is any error
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    //getting initial reference to the restaurants in the collection
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    //starting a web server
     app.listen(port, () => {
      console.log(`listening on port:${port}`);
    });
    
  });

