<template>
  <div class="cart">
    <!-- <cart-item /> -->
    <Cartitemnew />
  </div>
</template>
<script>
// import cartItem from "@/components/cartItem.vue";
import Cartitemnew from "@/components/cartitemnew.vue";
export default {
  name: "cart",
  components: {
    // cartItem,
    Cartitemnew,
  },
};
</script>
