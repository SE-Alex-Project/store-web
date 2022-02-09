<template>
  <div class="cart">
    <catStorComponent />
  </div>
</template>
<script>
import catStorComponent from "@/components/catStorComponent.vue";
export default {
  name: "catStor",
  components: {
    catStorComponent,
  },
  mounted() {
    this.$store.commit({
      type: "changeType",
      usertype: window.sessionStorage.getItem("userType"),
    });
  },
};
</script>