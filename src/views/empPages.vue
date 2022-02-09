<template>
  <div class="emp">
    <empComponent/>
  </div>
</template>
<script>
import empComponent from "@/components/empComponent.vue";
export default {
  name: "empPages",
  components: {
    empComponent,
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