const { TwitterApi } = require("twitter-api-v2");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { config } = require("dotenv");
config();

const PORT = process.env.PORT || 3000;
const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_API_KEY,
  appSecret: process.env.TWITTER_CONSUMER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const TWITTER_USER_ID = "1757335862474342400"; // Replace with your Twitter user ID
const PHRASE_TO_MATCH = "SOCIFINET";
const API_DELAY = 15 * 60 * 1000; // 15 minutes in milliseconds
const maxLength = 280;

function removeSpecialCharacters(text) {
  return text.replace(/[^a-zA-Z0-9\s.,!?'"#@]/g, "");
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let lastRequestTime = 0;
async function makeApiRequest(fn, ...args) {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < API_DELAY) {
    const waitTime = API_DELAY - timeSinceLastRequest;
    console.log(`Rate limit hit! Retrying in ${waitTime / 1000}s...`);
    await delay(waitTime);
  }

  lastRequestTime = Date.now();
  try {
    return await fn(...args);
  } catch (error) {
    if (error.code === 429) {
      console.error("Rate limit exceeded, waiting before retrying...");
      await delay(API_DELAY);
      return makeApiRequest(fn, ...args);
    } else {
      console.error("API request failed:", error);
      return null;
    }
  }
}

async function fetchUserTweets() {
  return makeApiRequest(async () => {
    const tweets = await client.v2.userTimeline(TWITTER_USER_ID, {
      "tweet.fields": "conversation_id",
      max_results: 5,
    });
    return tweets.data?.data || [];
  });
}

async function fetchCommentsForTweet(tweetId) {
  return makeApiRequest(async () => {
    try {
      console.log(`Fetching comments for tweet: ${tweetId}`);
      const comments = await client.v2.search(`conversation_id:${tweetId}`, {
        expansions: "author_id",
        "tweet.fields": "text,author_id",
        "user.fields": "username",
      });

      if (!comments || !comments.data?.data) {
        console.log(`No comments found for tweet ${tweetId}`);
        return { comments: [], userMap: new Map() };
      }

      const users = comments.data?.includes?.users || [];
      const userMap = new Map(users.map((user) => [user.id, user.username]));

      return { comments: comments.data?.data, userMap };
    } catch (error) {
      console.error(`Error fetching comments for tweet ${tweetId}:`, error);
      return { comments: [], userMap: new Map() };
    }
  });
}

async function postReply(tweetId, replyMessage) {
  return makeApiRequest(async () => {
    try {
      console.log("Posting reply:", { tweetId, replyMessage });
      const reply = await client.v2.reply(replyMessage, tweetId);
      console.log("Reply posted successfully:", reply);
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  });
}

async function generateAIReply(commentText) {
  try {
    const prompt = `Respond professionally about blockchain and crypto to this comment:
    "${commentText}"
    Keep the response under 280 characters.`;

    const result = await model.generateContent(prompt);
    console.log("Full AI response:", result);

    const generatedText = result.response?.text?.() || "Unable to generate content.";
    const contentToPost = removeSpecialCharacters(generatedText).slice(0, maxLength);

    console.log("Sanitized AI reply:", contentToPost);
    return contentToPost;
  } catch (error) {
    console.error("Error generating AI reply:", error.message);
    return "Sorry, there was an issue generating a reply.";
  }
}

async function processTweetsAndComments() {
  try {
    const tweets = await fetchUserTweets();
    console.log("Processing tweets...");
    if (!tweets || tweets.length === 0) {
      console.log("No tweets found.");
      return;
    }

    for (const tweet of tweets) {
      const { comments, userMap } = await fetchCommentsForTweet(tweet.id) || { comments: [], userMap: new Map() };

      if (!comments || comments.length === 0) {
        console.log(`No comments found for tweet ${tweet.id}, skipping.`);
        continue;
      }

      for (const comment of comments) {
        if (!comment.text) {
          console.log("Comment text is undefined, skipping this comment.");
          continue;
        }

        const authorUsername = userMap.get(comment.author_id) || "User";
        const commentText = comment.text.toLowerCase();

        if (commentText.includes(PHRASE_TO_MATCH.toLowerCase())) {
          console.log(`Matching comment found: ${comment.text}`);

          const aiReply = await generateAIReply(comment.text);
          const replyMessage = `@${authorUsername}, ${aiReply}`;
          await postReply(comment.id, replyMessage);
        }
      }
    }
  } catch (error) {
    console.error("Error processing tweets and comments:", error);
  }
}

// Server setup
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Twitter Bot is running...");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Start bot immediately
(async () => {
  console.log("Executing the bot immediately...");
  await processTweetsAndComments();
  console.log("Bot will check for new tweets every 16 minutes...");
})();




// const { TwitterApi } = require("twitter-api-v2");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { config } = require("dotenv");
// config();

// const client = new TwitterApi({
//   appKey: process.env.TWITTER_CONSUMER_API_KEY,
//   appSecret: process.env.TWITTER_CONSUMER_API_SECRET,
//   accessToken: process.env.TWITTER_ACCESS_TOKEN,
//   accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const TWITTER_USER_ID = "1757335862474342400"; // Replace with your Twitter user ID
// const PHRASE_TO_MATCH = "SOCIFINET";
// const API_DELAY = 15 * 60 * 1000; // 15 minutes in milliseconds
// const maxLength = 280;

// function removeSpecialCharacters(text) {
//   return text.replace(/[^a-zA-Z0-9\s.,!?'"#@]/g, "");
// }

// async function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// let lastRequestTime = 0;
// async function makeApiRequest(fn, ...args) {
//   const now = Date.now();
//   const timeSinceLastRequest = now - lastRequestTime;

//   if (timeSinceLastRequest < API_DELAY) {
//     const waitTime = API_DELAY - timeSinceLastRequest;
//     console.log(`Rate limit hit! Retrying in ${waitTime / 1000}s...`);
//     await delay(waitTime);
//   }

//   lastRequestTime = Date.now();
//   try {
//     return await fn(...args);
//   } catch (error) {
//     if (error.code === 429) {
//       console.error("Rate limit exceeded, waiting before retrying...");
//       await delay(API_DELAY);
//       return makeApiRequest(fn, ...args);
//     } else {
//       console.error("API request failed:", error);
//       return null;
//     }
//   }
// }

// async function fetchUserTweets() {
//   return makeApiRequest(async () => {
//     const tweets = await client.v2.userTimeline(TWITTER_USER_ID, {
//       "tweet.fields": "conversation_id",
//       max_results: 5,
//     });
//     return tweets.data?.data || [];
//   });
// }

// async function fetchCommentsForTweet(tweetId) {
//   return makeApiRequest(async () => {
//     try {
//       console.log(`Fetching comments for tweet: ${tweetId}`);
//       const comments = await client.v2.search(`conversation_id:${tweetId}`, {
//         expansions: "author_id",
//         "tweet.fields": "text,author_id",
//         "user.fields": "username",
//       });

//       if (!comments || !comments.data?.data) {
//         console.log(`No comments found for tweet ${tweetId}`);
//         return { comments: [], userMap: new Map() };
//       }

//       const users = comments.data?.includes?.users || [];
//       const userMap = new Map(users.map((user) => [user.id, user.username]));

//       return { comments: comments.data?.data, userMap };
//     } catch (error) {
//       console.error(`Error fetching comments for tweet ${tweetId}:`, error);
//       return { comments: [], userMap: new Map() };
//     }
//   });
// }

// async function postReply(tweetId, replyMessage) {
//   return makeApiRequest(async () => {
//     try {
//       console.log("Posting reply:", { tweetId, replyMessage });
//       const reply = await client.v2.reply(replyMessage, tweetId);
//       console.log("Reply posted successfully:", reply);
//     } catch (error) {
//       console.error("Error posting reply:", error);
//     }
//   });
// }

// async function generateAIReply(commentText) {
//   try {
//     const prompt = `Respond professionally about blockchain and crypto to this comment:
//     "${commentText}"
//     Keep the response under 280 characters.`;

//     const result = await model.generateContent(prompt);
//     console.log("Full AI response:", result);

//     const generatedText = result.response?.text?.() || "Unable to generate content.";
//     const contentToPost = removeSpecialCharacters(generatedText).slice(0, maxLength);

//     console.log("Sanitized AI reply:", contentToPost);
//     return contentToPost;
//   } catch (error) {
//     console.error("Error generating AI reply:", error.message);
//     return "Sorry, there was an issue generating a reply.";
//   }
// }

// async function processTweetsAndComments() {
//   try {
//     const tweets = await fetchUserTweets();
//     console.log("Processing tweets...");
//     if (!tweets || tweets.length === 0) {
//       console.log("No tweets found.");
//       return;
//     }

//     for (const tweet of tweets) {
//       const { comments, userMap } = await fetchCommentsForTweet(tweet.id) || { comments: [], userMap: new Map() };

//       if (!comments || comments.length === 0) {
//         console.log(`No comments found for tweet ${tweet.id}, skipping.`);
//         continue;
//       }

//       for (const comment of comments) {
//         if (!comment.text) {
//           console.log("Comment text is undefined, skipping this comment.");
//           continue;
//         }

//         const authorUsername = userMap.get(comment.author_id) || "User";
//         const commentText = comment.text.toLowerCase();

//         if (commentText.includes(PHRASE_TO_MATCH.toLowerCase())) {
//           console.log(`Matching comment found: ${comment.text}`);

//           const aiReply = await generateAIReply(comment.text);
//           const replyMessage = `@${authorUsername}, ${aiReply}`;
//           await postReply(comment.id, replyMessage);
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error processing tweets and comments:", error);
//   }
// }

// (async () => {
//   console.log("Executing the bot immediately...");
//   await processTweetsAndComments();
//   console.log("Bot will check for new tweets every 16 minutes...");
// })();
