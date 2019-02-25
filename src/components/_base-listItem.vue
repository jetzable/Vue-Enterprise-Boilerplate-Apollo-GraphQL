<template>
  <div class="row">
    <div
      v-for="repository in repositories"
      :key="repository.name"
      class="card col-md-4 mx-2 my-2"
    >
      <div class="card-body">
        <h5 class="card-title">
          {{ repository.name }}
        </h5>
        <p class="card-text">{{ repository.description }}</p>
        <p class="card-text">{{ repository.createdAt }}</p>
        <a href="`${repository.url}`">URL</a>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    repositories: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" module>
@import '@design';

.button {
  @extend %typography-small;

  padding: $size-button-padding;
  color: $color-button-text;
  cursor: pointer;
  background: $color-button-bg;
  border: none;

  &:disabled {
    cursor: not-allowed;
    background: $color-button-disabled-bg;
  }
}
</style>
