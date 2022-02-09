<template>
  <div class="cart">
    <Cartitemnew />
  </div>
</template>
<script>
import Cartitemnew from "@/components/cartitemnew.vue";
export default {
  name: "cart",
  components: {
    Cartitemnew,
  },
  mounted() {
    this.$store.commit({
      type: "changeType",
      usertype: window.sessionStorage.getItem("userType"),
    });
  },
};
</script>
