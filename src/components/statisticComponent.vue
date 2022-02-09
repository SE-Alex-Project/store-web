<template>
  <!-- Start Landing -->
  <div class="landing">
    <div class="overlay"></div>
    <div class="container">
      <div class="buttonscont">
        <div class="leftIcon" @click="TOTALSALESPRODUCT()">
          TOTAL SALES PRODUCTS
        </div>
        <div class="middleIcon" @click="TOP5CUSTOMER()">TOP 5 CUSTOMERS</div>
        <div class="rightIcon" @click="TOP10PRODUCT()">TOP 10 PRODUCTS</div>
      </div>
      <div class="TOTALSALESBOOK" v-if="condition_top_SALES_product">
        <div
          class="box"
          v-for="(PRODUCTS, index) in TOTALSALESPRODUCTS"
          :key="index"
        >
          <div class="product">
            <div class="nameCont">
              <div class="firstName">
                <span class="title">Product ID</span>
                <h4 class="productname">{{ PRODUCTS.productId }}</h4>
              </div>
              <div class="firstName">
                <span class="title">Product Name</span>
                <h4 class="productname">{{ PRODUCTS.productName }}</h4>
              </div>
              <div class="NumdeCont">
                <span class="title">Price</span>
                <h4 class="productname">{{ PRODUCTS.price }}</h4>
              </div>
              <div class="NumdeCont">
                <span class="title">Quantity</span>
                <h4 class="productname">{{ PRODUCTS.quantity }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="TOP5CUSTOMER" v-else-if="condition_top_Customer">
        <div
          class="box"
          v-for="(CUSTOMER, index) in TOP5CUSTOMERS"
          :key="index"
        >
          <div class="product">
            <div class="nameCont">
              <div class="firstName">
                <span class="title">Customer Email</span>
                <h4 class="productname">{{ CUSTOMER.userEmail }}</h4>
              </div>
              <div class="NumdeCont">
                <span class="title">Money</span>
                <h4 class="productname">{{ CUSTOMER.totalPrice }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="TOP10PRODUCTs" v-else>
        <div
          class="box"
          v-for="(PRODUCTS, index) in TOP10PRODUCTSS"
          :key="index"
        >
          <div class="product">
            <div class="nameCont">
              <div class="firstName">
                <span class="title">Product Name</span>
                <h4 class="productname">{{ PRODUCTS.productName }}</h4>
              </div>
              <div class="NumdeCont">
                <span class="title">Price</span>
                <h4 class="productname">{{ PRODUCTS.price }}</h4>
              </div>
              <div class="NumdeCont">
                <span class="title">Quantity</span>
                <h4 class="productname">{{ PRODUCTS.totalSales }}</h4>
              </div>
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
  name: "statisticComponent",
  data() {
    return {
      token:"",
      condition_top_SALES_product: true,
      condition_top_Customer: false,
      condition_top_product: false,
      TOTALSALESPRODUCTS: [],
      TOP5CUSTOMERS: [],
      TOP10PRODUCTSS: [],
    };
  },
  mounted() {
    fetch("http://localhost:8080/manager/totalSales")
      .then((response) => response.json())
      .then((result) => {
        // here we read the cart from backend
        console.log(result);
        this.TOTALSALESPRODUCTS = result;
      })
      .catch((error) => console.log("error", error));
  },

  methods: {
    TOTALSALESPRODUCT() {
      console.log("save Cart");
      this.condition_top_SALES_product = true;
      this.condition_top_Customer = false;
      this.condition_top_product = false;
      fetch("http://localhost:8080/manager/totalSales")
      .then((response) => response.json())
      .then((result) => {
        // here we read the cart from backend
        console.log(result);
        this.TOTALSALESPRODUCTS = result;
      })
      .catch((error) => console.log("error", error));
    },

    TOP5CUSTOMER() {
      console.log("check Out");
      this.condition_top_SALES_product = false;
      this.condition_top_Customer = true;
      this.condition_top_product = false;
      fetch("http://localhost:8080/manager/top10Customers")
      .then((response) => response.json())
      .then((result) => {
        // here we read the cart from backend
        console.log(result);
        this.TOP5CUSTOMERS = result;
      })
      .catch((error) => console.log("error", error));
    },

    TOP10PRODUCT() {
      this.condition_top_SALES_product = false;
      this.condition_top_Customer = false;
      this.condition_top_product = true;
      fetch("http://localhost:8080/manager/top10Sales")
      .then((response) => response.json())
      .then((result) => {
        // here we read the cart from backend
        console.log(result);
        this.TOP10PRODUCTSS = result;
      })
      .catch((error) => console.log("error", error));
    },
  },
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
.TOTALSALESBOOK,
.TOP5CUSTOMER,
.TOP10PRODUCTs {
  width: 100%;
  height: 70vh;
  padding: 0 50px 0 50px;
  background-color: var(--transparent-color);
  color: white;
  display: flex;
  flex-flow: wrap;
  align-content: flex-start;
  overflow-y: scroll;
}
.box {
  width: 100%;
  min-height: 100px;
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
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 2px;
}
h4 {
  font-size: 25px;
  font-weight: bold;
  color: var(--main-color);
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

/**  start buttons headers */
.buttonscont {
  padding: 20px;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
@media (max-width: 767px) {
  .buttonscont {
    width: 100%;
  }
}
.rightIcon,
.leftIcon,
.middleIcon {
  border-radius: 25px;
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(184, 55, 55);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: rgb(255, 255, 255);
  transition: 0.5s;
  box-shadow: -10px 10px 40px rgb(166, 170, 170);
}
@media (max-width: 767px) {
  .rightIcon,
  .leftIcon,
  .middleIcon {
    width: 100px;
    height: 40px;
    font-size: 10px;
    font-weight: bold;
  }
}
.buttonscont .leftIcon:hover,
.buttonscont .rightIcon:hover,
.buttonscont .middleIcon:hover {
  transform: scale(1.1);
  cursor: pointer;
}
/**  end buttons headers */
/* End Landing */
</style>
