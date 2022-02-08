<template>
  <div class="productsWrapper">
    <div class="upTitles">
      <div class="leftIcon" id="t">PRODUCTS:</div>
      <div class="middleIcon" id="t">QUANTITY:</div>
      <div class="rightIcon" id="t">PRICE:</div>
    </div>

    <div class="productsOuter">
      <div class="product" v-for="(product, index) in products" :key="index">
        <div class="icon">
          {{ product.name }}
        </div>

        <div class="vl"></div>

        <div class="countDiv">
          <div class="outer circle" @click="decrementProduct(product.id)">
            <button>-</button>
            <span></span>
            <span></span>
          </div>
          <div class="countIcon">
            {{ product.quantity }}
          </div>

          <div class="outer circle" @click="incrementProduct(product.id)">
            <button>+</button>
            <span></span>
            <span></span>
          </div>
        </div>

        <div class="vl"></div>

        <div class="icon">
          {{ product.price }}
        </div>
      </div>
    </div>
    <div class="container">
      <div class="totCost">TOTAL COST: {{ totalCost }}</div>
    </div>
    <div class="downTitles">
      <div class="leftIcon" @click="saveCart()">SAVE CART</div>
      <div class="middleIcon" @click="checkOut()">CHECK OUT</div>
      <div class="rightIcon" @click="removeCart()">REMOVE CART</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cartItem",
  data() {
    return {
      products: [
        /*{
                    name: String,
                    count: Number,
                    price: Number
          }*/
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
.vl {
  border-left: 4px solid rgb(92, 195, 221);
  height: 60px;
}
.product {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
}
.upTitles,
.downTitles {
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 50px;
}
.downTitles {
  margin-bottom: 50px;
}
.icon,
.countIcon,
.totCost {
  border-radius: 25px;
  border: 3px solid rgb(130, 15, 238);
  padding-top: 13px;
  padding-bottom: 33px;
  width: 300px;
  height: 20px;
  margin: 10px;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  text-align: center;
}
.countIcon {
  width: 150px;
}
.rightIcon,
.leftIcon,
.middleIcon {
  border-radius: 25px;
  border: 2px solid rgb(130, 15, 238);
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(126, 0, 243);
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(255, 255, 255);
  transition: 0.5s;
  box-shadow: -10px 10px 40px rgb(166, 170, 170);
}
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.totCost {
  width: 400px;
}

.productsWrapper {
  border-radius: 25px 50px;
  border: 5px solid rgb(0, 183, 255);
  padding: 20px 10px;
  width: 1000px;
  height: fit-content;
  background-color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: bold;
  box-shadow: -30px 40px 50px rgb(166, 170, 170);
}
.productsOuter {
  border-radius: 40px 60px;
  border: 3px solid rgb(0, 174, 255);
  padding: 40px 0 40px 0;
  margin: 10px;
  margin-bottom: 30px;
  font-weight: bold;
  background-color: rgb(245, 244, 244);
}
.countDiv {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.outer {
  position: relative;
  background: #111;
}
.circle {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}
.outer button,
.outer span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.outer button {
  background: rgb(17, 17, 17);
  color: #f2f2f2;
  outline: none;
  border: none;
  font-size: 30px;
  z-index: 9;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
}
.circle button {
  height: 35px;
  width: 40px;
  border-radius: 50%;
}
.outer span {
  height: 100%;
  width: 100%;
  background: inherit;
}
.circle span {
  border-radius: 50%;
}
.outer:hover span:nth-child(1) {
  filter: blur(7px);
}
.outer:hover span:nth-child(2) {
  filter: blur(14px);
}
.outer:hover {
  background: linear-gradient(#14ffe9, #ffeb3b, #ff00e0);
  animation: rotate 1.5s linear infinite;
}
@keyframes rotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
.downTitles .leftIcon:hover,
.downTitles .rightIcon:hover,
.downTitles .middleIcon:hover {
  transform: scale(1.1);
  cursor: pointer;
}
</style>
