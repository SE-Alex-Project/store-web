<template>
  <!-- Start Landing -->
  <div class="landing">
    <div class="overlay"></div>
    <div class="container">
      <div class="buttonscont">
        <div class="leftIcon" @click="saveCart()">SAVE CART</div>
        <div class="middleIcon" @click="checkOut()">CHECK OUT</div>
        <div class="rightIcon" @click="removeCart()">REMOVE CART</div>
      </div>
      <div class="CartShow">
        <div class="box" v-for="(product, index) in products" :key="index">
          <div class="product">
            <div class="nameCont">
              <span class="title">Product Name</span>
              <h4 class="productname">{{ product.name }}</h4>
            </div>
            <div class="priceCont">
              <span class="title">Price</span>
              <h4 class="productprice">{{ product.price }}</h4>
            </div>
            <div class="qauntityCont">
              <div class="buttoncontainer1">
                <span class="iconcon" @click="decrementProduct(product.id)">
                  <i class="fas fa-minus-circle" id="ico"></i>
                </span>
              </div>
              <div class="qauntity">{{ product.quantity }}</div>
              <div class="buttoncontainer2">
                <span class="iconcon" @click="incrementProduct(product.id)">
                  <i class="fas fa-plus-circle" id="ico"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="totCost">
        <span>TOTAL COST: {{ totalCost }} </span>
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
          price: "Number",
          quantity: 5,
        },
        {
          name: "String",
          count: "Number",
          price: "Number",
          quantity: 5,
        },
        {
          name: "String",
          count: "Number",
          price: "Number",
          quantity: 5,
        },
        {
          name: "String",
          count: "Number",
          price: "Number",
          quantity: 5,
        },
        {
          name: "String",
          count: "Number",
          price: "Number",
          quantity: 5,
        },
        {
          name: "String",
          count: "Number",
          price: "Number",
          quantity: 5,
        },
      ],
    };
  },

  computed: {
    totalCost() {
      var value = 0;
      for (let i = 0; i < this.products.length; i++) {
        value += this.products[i].quantity * this.products[i].price;
      }
      return value;
    },

    toBackProds() {
      let arr = [];
      for (let i = 0; i < this.products.length; i++) {
        let elem = {
          product: this.products[i].id.toString(),
          quantity: this.products[i].quantity.toString(),
        };
        arr.push(elem);
      }
      return arr;
    },
  },

  mounted() {
    this.token = window.sessionStorage.getItem("token");
    console.log("this is the token " + this.token);
    console.log("read data");
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: this.token,
    };
    console.log(requestOptions.body);
    fetch("http://localhost:8080/customer/getCart", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // here we read the cart from backend
        this.products = JSON.parse(result);
        console.log("results :" + result);
        console.log(this.products);
      })
      .catch((error) => console.text("error", error));
  },

  methods: {
    incrementProduct(id) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id == id) {
          if (this.products[i].quantity < this.products[i].Product_quantity) {
            this.products[i].quantity++;
          } else {
            alert("you cannot increase the quantity of this product");
          }
        }
      }
    },
    decrementProduct(id) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id == id && this.products[i].quantity > 1) {
          this.products[i].quantity--;
          if (this.products[i].quantity <= 0) this.products.splice(i, 1);
        }
      }
    },
    saveCart() {
      console.log("save Cart");
        var myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        var raw1 = {
          token: this.token,
          products: this.toBackProds,
        };
        console.log(raw1);

        var requestOptions = {
          method: "POST",
          headers: myHeader,
          body: JSON.stringify(raw1),
        };

        fetch("http://localhost:8080/customer/modifyCart", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            alert(result);
            console.log(result);
            this.$router.push("/");
          })
          .catch((error) => console.log("error", error));
    },

    checkOut() {
      console.log("check Out");
        var myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        var raw1 = this.token;
        console.log(raw1); // you may loop over products and create new array of just two params or
        // when show products in cart >> call a function that requests the price of every one and show it
        var requestOptions = {
          method: "POST",
          headers: myHeader,
          body: raw1,
          redirect: "follow",
        };

        fetch("http://localhost:8080/customer/buy", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            //show the message in an alert and go to home
            alert(result);
            //console.log(result);
            this.$router.push("/");
          })
          .catch((error) => console.log("error", error));
    },

    removeCart() {
      // send empty cart to modify cart
      console.log("remove cart");
        var myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        this.products = [];
        var raw1 = {
          token: this.token,
          products: this.products,
        };
        console.log(raw1);

        var requestOptions = {
          method: "POST",
          headers: myHeader,
          body: JSON.stringify(raw1),
          redirect: "follow",
        };

        fetch("http://localhost:8080/customer/modifyCart", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            alert("cart is removed");
            console.log(result);
            this.$router.push("/");
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
}
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
/* End Landing */
.CartShow {
  width: 100%;
  height: 70vh;
  padding: 0 50px;
  background-color: var(--transparent-color);
  color: white;
  display: flex;
  flex-flow: wrap;
  align-content: flex-start;
  overflow-y: scroll;
}
.box {
  width: 100%;
  min-height: 120px;
  background: #eff3f3;
  border: 3px rgb(9, 205, 240);
  box-shadow: 0px 0px 35px rgb(166, 170, 170);
  margin: 1rem;
}
.box .product {
  height: 100%;
  display: flex;
}
@media (max-width: 767px) {
  .box .product {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.nameCont {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 50%;
  overflow: hidden;
}
.title {
  color: black;
  font-size: 25px;
  font-weight: bold;
}
h4 {
  font-size: 15px;
  font-weight: bold;
  color: var(--text-color);
  margin: 0;
}
.priceCont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 20%;
}
.qauntityCont {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  width: 30%;
}
.qauntity {
  color: black;
  font-size: 25px;
  padding: 5px;
}
.buttoncontainer1 {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconcon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
}
.fa-plus-circle,
.fa-minus-circle {
  font-size: 30px;
  color: black;
}
.fa-plus-circle:hover,
.fa-minus-circle:hover {
  cursor: pointer;
  color: var(--main-color);
}
.buttoncontainer2 {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.totCost {
  margin-top: 30px;
  width: 100%;
  padding: 20px;
}
.totCost span {
  border-radius: 5px;
  padding: 10px;
  background: #eff3f3;
  color: black;
  font-size: 25px;
  font-weight: bold;
}
</style>
