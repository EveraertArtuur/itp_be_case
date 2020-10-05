import http from "http";
import express from "express";
import { compute } from "./compute";
var db = require("./AppDAO");

const app = express();
const Joi = require("@hapi/joi");
const { uuid } = require("uuidv4");

let arrayValidate = Joi.array()
  .items(
    Joi.array().items(Joi.number().integer().min(0).max(10).required()).max(3)
  )
  .max(10);

app.use(express.json());

app.post("/compute", (request, response) => {
  const game = request.body.game;
  const error = arrayValidate.validate(game);

  if (error.error) {
    return response.status(400);
  } else {
    const score = compute(game);
    const id = uuid();
   
    return response.json({
      score: score,
      id: id,
    });
  }
});

app.post("/history", (request, response) => {
  throw new Error("Not yet implemented")
  
});

export const createServer = () => http.createServer(app);
