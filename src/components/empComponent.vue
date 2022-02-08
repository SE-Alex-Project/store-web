<template>
  <!-- Start Landing -->
  <div class="landing">
    <div class="overlay"></div>
    <div class="container">
      <div class="emplCart">
        <div class="box" v-for="(product, index) in products" :key="index">
          <div class="product">
            <div class="nameCont">
              <div class="firstName">
                <span class="title">First Name</span>
                <h4 class="productname">{{ product.name }}</h4>
              </div>
              <div class="secondName">
                <span class="title">Second Name</span>
                <h4 class="productname">{{ product.name }}</h4>
              </div>
              <div class="NumdeCont">
                <span class="title">Store Number</span>
                <h4 class="productname">{{ product.quantity }}</h4>
              </div>
            </div>
            <div class="EmailCont">
              <span class="title">Email</span>
              <h4 class="Email">{{ product.price }}</h4>
            </div>
            <div class="buttoncontainer2">
              <span class="iconcon">
                <i class="fas fa-user-times"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Landing -->
</template>

<script>
export default {
  name: "cartItemnew",
  data() {
    return {
      products: [
        {
          name: "String",
          count: "Number",
          price: "Yousefhassan121999@gmail.com",
          quantity: 5,
        },
        {
          name: "String",
          count: "Number",
          price: "Yousefhassan121999@gmail.com",
          quantity: 5,
        },
        {
          name: "String",
          count: "Number",
          price: "Yousefhassan121999@gmail.com",
          quantity: 5,
        },
        {
          name: "String",
          count: "Number",
          price: "Yousefhassan121999@gmail.com",
          quantity: 5,
        },
        {
          name: "String",
          count: "Number",
          price: "Yousefhassan121999@gmail.com",
          quantity: 5,
        },
        {
          name: "String",
          count: "Number",
          price: "Yousefhassan121999@gmail.com",
          quantity: 5,
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
/* Start Landing */

.landing {
  width: 100%;
  min-height: calc(100vh - (82px));
  background-color: #1f2021;
  background-image: url("../assets/back.jpg");
  background-size: cover;
  position: relative;
}
.landing .overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 60%);
}
.container {
  position: relative;
  padding: 20px;
}
/* End Landing */
.emplCart {
  width: 100%;
  height: calc(100vh - (122px));
    padding: 0 50px 0 50px;

  background-color: var(--transparent-color);
  color: white;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  overflow-y: scroll;
}
.box {
  width: 100%;
  min-height: 200px;
  background: #eff3f3;
  border: 3px rgb(9, 205, 240);
  box-shadow: 0px 0px 35px rgb(166, 170, 170);
  margin: 1rem;
  transition: var(--tran-05);
}
.box:hover {
  transform: scale(1.1);
}
.box .product {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.nameCont {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  width: 100%;
}
@media (max-width: 767px) {
  .nameCont {
    flex-direction: column;
  }
  .nameCont div {
    padding-top: 5px;
  }
}
.title {
  color: black;
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 2px;
}
h4 {
  font-size: 15px;
  font-weight: bold;
  color: var(--text-color);
  margin: 0;
}
.EmailCont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
}
.buttoncontainer2 {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconcon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
}
.fa-user-times {
  font-size: 40px;
  color: black;
}
.fa-user-times:hover {
  cursor: pointer;
  color: var(--main-color);
}
</style>
