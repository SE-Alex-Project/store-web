<template>
  <div class="cart">
    <statistcComponent />
  </div>
</template>
<script>
import statistcComponent from "@/components/statisticComponent.vue";
export default {
  name: "statistics",
  components: {
    statistcComponent,
  },
  mounted() {
    this.$store.commit({
      type: "changeType",
      usertype: window.sessionStorage.getItem("userType"),
    });
  },
};
</script>