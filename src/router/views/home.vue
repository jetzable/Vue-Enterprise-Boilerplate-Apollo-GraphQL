<template>
  <Layout class="text-center container-fluid">
    <h1>Search Github Repositories</h1>
    <div class="form text-center mx-auto">
      <BaseInput
        v-model="ownerName"
        class="col-md-6 col-lg-5 col-sm-12 mx-auto form-group"
        placeholder="Repository Owner"
      />
      <BaseInput
        v-model="repoName"
        class="col-md-6 col-lg-5 col-sm-12 mx-auto form-group"
        placeholder="Repository Name"
      />
    </div>
    <BaseButton class="col-md-4 mx-2 my-2 btn-group" @click="getRepoByOwner">
      <span class="mx-auto">Search By Owner</span>
    </BaseButton>
    <BaseButton
      class="col-md-4 mx-2 my-2 btn-group text-center"
      @click="getReposFromOwner"
    >
      Search Owner Repositories
    </BaseButton>
    <BaseListItem :repositories="listResults" />
  </Layout>
</template>

<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import { GET_REPO_BY_OWNER, GET_REPOS_FROM_OWNER } from '@src/gql/queries.js'

export default {
  components: { Layout },
  data() {
    return {
      ownerName: '',
      repoName: '',
      listResults: [],
    }
  },
  methods: {
    getReposFromOwner() {
      this.$apollo
        .query({
          query: GET_REPOS_FROM_OWNER,
          variables: {
            ownerName: this.ownerName,
          },
        })
        .then((resp) => {
          const { nodes } = resp.data.repositoryOwner.repositories
          this.listResults = nodes
        })
    },
    getRepoByOwner() {
      this.$apollo
        .query({
          query: GET_REPO_BY_OWNER,
          variables: {
            ownerName: this.ownerName,
            repoName: this.repoName,
          },
        })
        .then((resp) => {
          const { repository } = resp.data
          this.listResults.push(repository)
        })
    },
  },
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
}
</script>
