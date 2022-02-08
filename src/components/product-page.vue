<template>
  <div>
    <h1>{{ name }}</h1>
    <img :src="mainImg" alt="cat" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      any: "any",
    };
  },
  props: ["name", "mainImg", "subImgs", "description"],
};
</script>
