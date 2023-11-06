import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path"; // Import path module
import { fileURLToPath } from "url";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = process.env.PORT || 3080;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "build")));

app.post("/", async (req, res) => {
  const { content } = req.body;
  console.log(content, "content");
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: content,
    max_tokens: 500,
  });
  console.log(completion);
  res.json({
    content: completion.choices[0].message,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
