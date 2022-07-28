import { gql } from "apollo-server-express";

const typeDefs = gql`
  type CommitInfo {
    sha: String!
    html_url: String!
    message: String!
    commitDate: String!
    committer: String!
  }

  input PageInput {
    limit: Int!
    page: Int!
  }

  type Query {
    hello: String
    getCommitsWithPagination(pageInfo: PageInput): [CommitInfo]
  }

  type Mutation {
    genKey: String
  }
`;

export default typeDefs;
