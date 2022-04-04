import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import Tour from "./model/tourModel.js";
dotenv.config({ path: "./config.env" });

const app = express();
const port = 3000 || process.env.PORT;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import "./db/config.js";

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

const runDB = async () => {
  if (process.argv[2] === "--import") {
    try {
      await Tour.create(tours);
      console.log("Data imported successfully");
    } catch (err) {
      console.log(err);
    }
  } else if (process.argv[2] === "--delete") {
    try {
      await Tour.deleteMany();
      console.log("Data Deleted");
    } catch (err) {
      console.log(err);
    }
  }
};

runDB();
console.log(process.argv);

app.listen(port, console.log("Server start at port http://localhost:3000"));
