<template>
  <div class="navigation">
    <span v-for="(item,index) in breadCrumb" :key="index">
      {{item.meta.breadcrumb}}
      <span v-if="index<breadCrumb.length-1">-></span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["breadCrumb"]
};
</script>

<style lang="less" scoped>
.navigation {
  margin-bottom: 20px;
}
</style>