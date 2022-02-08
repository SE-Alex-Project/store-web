<template>
  <div class="settingsAndHistory">
    <div class="Settings">
      <div class="title">
        <strong>Settings</strong>
      </div>

      <div class="settings">
        <div class="setting">change data</div>

        <div class="setting">help</div>
        <div class="setting">log out</div>
      </div>
    </div>

    <div class="History">
      <div class="title">
        <strong>History</strong>
      </div>

      <div class="settings">
        <div
          class="setting"
          v-for="(cart, index) in carts"
          :key="index"
          @click="showCart(cart.id)"
        >
          cart: {{ cart.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      carts: [
        // carts are added in back end and when user open this we got them from backend to continue
        // the same is done for products
        { id: 15, products: [] },
        { id: 20, products: [] },
        { id: 30, products: [] },
      ],
    };
  },
  methods: {
    showCart(id) {
      console.log("let's show the cart " + id);
    },
  },
};
</script>

<style scoped>
.settingsAndHistory {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50%;
  width: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.settings,
.history {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #6200ee;
  border-radius: 5px;
  border: 1px solid #dfe3e8;
  width: 450px;
  height: auto;
}

.title {
  background-color: white;
  border-radius: 20px;
  border: 1px solid #6200ee;
  width: 450px;
  height: 50px;
  padding: 15px;
  margin-top: 10px;
  font-size: 23px;
}

.setting {
  background-color: rgb(247, 240, 216);
  border-radius: 5px;
  border: 1px solid #dfe3e8;
  width: 400px;
  height: 50px;
  margin: 5px 5px 5px 5px;
  padding: 15px;
  font-size: 20px;
}

.setting:hover {
  cursor: pointer;
  transform: scale(1.2, 1.2);
}
</style>
