import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Commit {
    sha: String
    html_url: String
    message: String
    commitDate: String
    committer: String
  }

  input PageInput {
    limit: Int
    page: Int
  }

  type Query {
    hello: String
    getCommitsWithPagination(pageInfo: PageInput): [Commit]
  }
`;

export default typeDefs;
