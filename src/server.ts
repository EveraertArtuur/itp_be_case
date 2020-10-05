import http from "http";
import express from "express";
import { compute } from "./compute";
import {
  ContainerTypes,
  ValidatedRequestSchema,
  ValidatedRequest,
  createValidator,
} from "express-joi-validation";

const app = express();
const Joi = require("@hapi/joi");


let arrayValidate = Joi.array().items(Joi.array().items(Joi.number().integer().min(0).max(10).required()).max(3)).max(10);


app.use(express.json());

app.post("/compute", (request, response) => {
  const game = request.body.game;
  const error = arrayValidate.validate(game);
  console.log(error);

  if (error.error) {
    console.log("fout");
   return response.status(400);
    
  }else{
    const score = compute(game);
    return response.status(200).json({ score: score });
  }
 
});

export const createServer = () => http.createServer(app);
