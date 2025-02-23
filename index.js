// import dotenv from "dotenv";
// dotenv.config();

// import http from "http";
// import OpenAI from "openai"; 
// import { handlePostContentToTwitter } from "./configs/twitterConfig.js";
// import { getRandomNumber, postTopics, removeSpecialCharacters } from "./utils.js";

// // Validate environment variables
// if (!process.env.OPENAI_API_KEY) {
//   console.error("OpenAI API Key is missing. Set it in the environment variables.");
//   process.exit(1);
// }

// const PORT = process.env.PORT || 3000;
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); 

// // Create HTTP server
// const server = http.createServer(async (req, res) => {
//   if (req.url === "/post-on-ping" && req.method === "POST") {
//     try {
//       // Generate the content
//       const prompt = `Check trending topics on X/Twitter and write an interesting essay about "${
//         postTopics[getRandomNumber(postTopics.length)]
//       }". Tag relevant X user accounts that are important to the topic.
//       Make it feel like it's written by a human. Add relevant hashtags at the end of the essay, not the beginning.`;

//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//             store: true,
//         messages: [{ role: "system", content: "You are a helpful AI assistant." }, { role: "user", content: prompt }],
   
//       });

//       const generatedText = response.choices[0]?.message?.content || "Unable to generate content.";
//       const maxLength = 15000;
//       const contentToPost = removeSpecialCharacters(generatedText).slice(0, maxLength);

//       // Post the content to Twitter
//       await handlePostContentToTwitter(contentToPost);

//       console.log("Content posted successfully:", contentToPost);
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Post successful!");
//     } catch (error) {
//       console.error("Error during posting:", {
//         message: error.message,
//         stack: error.stack,
//       });

//       res.writeHead(500, { "Content-Type": "text/plain" });
//       res.end("Error occurred during posting.");
//     }
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Endpoint not found.");
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });



import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { handlePostContentToTwitter } from "./configs/twitterConfig.js";
import { getRandomNumber, postTopics, removeSpecialCharacters } from "./utils.js";

// Validate environment variables
if (!process.env.GOOGLE_API_KEY) {
  console.error("Google API Key is missing. Set it in the environment variables.");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Create HTTP server
const server = http.createServer(async (req, res) => {
  if (req.url === "/post-on-ping" && req.method === "POST") {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate the content
      const prompt = `
         Assumed you are on x/twitter  and using the trend on twitter,write interesting essay about "${
        postTopics[getRandomNumber(postTopics.length)]
      }". tag releant x user account (to tag add @ at the front of the username e.g @cz_binance).dont mention x/twitter in the post cos you are there already
        Make it feel like it's written by a human
      `;

      const result = await model.generateContent(prompt);
      const generatedText = result.response?.text?.() || "Unable to generate content.";
      const maxLength = 15000;
      const contentToPost = removeSpecialCharacters(generatedText).slice(0, maxLength);

      // Post the content to Twitter
      await handlePostContentToTwitter(contentToPost);

      console.log("Content posted successfully:", contentToPost);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Post successful!");
    } catch (error) {
      console.error("Error during posting:", {
        message: error.message,
        stack: error.stack,
      });

      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error occurred during posting.");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Endpoint not found.");
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});