import axios from "axios";

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getCommitsWithPagination: async (args) => {
      const { limit, page } = args.pageInfo;

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
    },
  },
};

export default resolvers;
