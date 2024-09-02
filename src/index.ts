import fs from "fs";
import path from "path";
import { Tokenizer } from "./tokenizer";

const calculatorFile = fs.readFileSync(
    path.join(__dirname, "./calculator/main.calc")
);
const calculationString = calculatorFile.toString();

const tokenizer = new Tokenizer(calculationString);
const tokens = tokenizer.tokenize();

console.log(tokens);
