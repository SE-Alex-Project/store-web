<template>
  <div class="mancartview">
    <MangerCartComp/>
  </div>
</template>
<script>
import MangerCartComp from "@/components/MangerCartComp.vue";
export default {
  name: "MangerCartView",
  components: {
    MangerCartComp,
  },
  mounted() {
    this.$store.commit({
      type: "changeType",
      usertype: window.sessionStorage.getItem("userType"),
    });
  },
};
</script>
<style scoped>
</style>