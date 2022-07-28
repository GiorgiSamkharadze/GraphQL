import axios from "axios";
import ApiKey from "./database/Apikey.js";
import { AuthenticationError } from "apollo-server-express";

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getCommitsWithPagination: async (_, args, context) => {
      console.log(context.findKey);
      if (!context.findKey) {
        throw new AuthenticationError("you must be logged in");
      } else {
        const { limit } = args.pageInfo || 10;
        const { page } = args.pageInfo || 1;

        const datas = await axios.get(
          `https://api.github.com/repos/facebook/react/commits?per_page=${limit}&page=${page}`
        );

        let commitsArr = datas.data.map(({ sha, html_url, commit }) => {
          return {
            sha: sha,
            html_url: html_url,
            message: commit.message,
            commitDate: commit.author.date,
            committer: commit.author.name,
          };
        });

        return commitsArr;
      }
    },
  },

  Mutation: {
    genKey: async () => {
      const genApiKey = [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join("");
      await ApiKey.create({ apiKey: genApiKey });
      return genApiKey;
    },
  },
};

export default resolvers;
