import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3080;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
