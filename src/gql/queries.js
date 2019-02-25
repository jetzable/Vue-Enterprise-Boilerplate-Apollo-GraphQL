import gql from 'graphql-tag'

export const GET_REPO_BY_OWNER = gql`
  query searchRepositoryByName($ownerName: String!, $repoName: String!) {
    repository(owner: $ownerName, name: $repoName) {
      createdAt
      description
      name
      primaryLanguage {
        name
      }
      url
    }
  }
`

export const GET_REPOS_FROM_OWNER = gql`
  query searchOwner($ownerName: String!) {
    repositoryOwner(login: $ownerName) {
      repositories(last: 5) {
        nodes {
          name
          createdAt
          description
          stargazers {
            totalCount
          }
          url
        }
      }
    }
  }
`
