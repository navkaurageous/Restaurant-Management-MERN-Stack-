import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

//creating  express app that will be used to make a server
const app = express();

//things the express going to use
app.use(cors());
app.use(express.json());

//specifying the initial routes
//url users going to use
app.use("/api/v1/restaurants", restaurants);
//if route doesnot exists in our route file
app.use("*", (req, res) => res.status(404).json({ error: "page not found" }));
 
//export app as a module
export default app;

