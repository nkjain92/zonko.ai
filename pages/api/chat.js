import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { content } = req.body;

    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: content, // Make sure the request body matches the expected structure
        max_tokens: 500,
      });
      res.status(200).json({ content: completion.choices[0].message });
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
