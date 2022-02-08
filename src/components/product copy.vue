<template>
  <div class="box">
    <div class="product">
      <div class="imgcontainer" @click="show_product()">
        <img :src="reqaire(req_product.images)" alt="" />
      </div>
      <h4 class="productname">{{ req_product.name }}</h4>
      <h2 class="productprice">{{ req_product.price }} EGP</h2>
      <div class="buttoncontainer" v-if="this.$store.state.sign">
        <!-- <button class="addtocart" @click="add_to_cart()">+</button> -->
        <div class="outer circle">
          <button
            v-if="!this.$store.state.show"
            @click="add_to_cart(req_product)"
          >
            <img src="../image_test/plus.png" alt="" />
          </button>
          <button v-else @click="add_to_cart(req_product)">
            <img src="../image_test/x1.png" alt="" />
          </button>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Product",
  props: {
    req_product: Object,
  },
  methods: {
    reqaire: function (path) {
      return path[0];
    },
    show_product: function () {
      if (this.$store.state.show) {
        this.$router.push({
          name: "productEdit",
          query: {
            pId: this.req_product.id,
          },
        });
      } else {
        this.$router.push({
          name: "products",
          query: {
            pId: this.req_product.id,
          },
        });
      }
    },
    add_to_cart: function (req_product) {
      if (this.$store.state.show) {
        // console.log("delete");
        if (confirm("Do you really want to delete?")) {
          var myHeaders1 = new Headers();
          myHeaders1.append("Content-Type", "application/json");
          var raw1 = JSON.stringify({
            token: window.sessionStorage.getItem("token"),
            product_id: [req_product.id.toString()],
          });

          var requestOptions1 = {
            method: "POST",
            headers: myHeaders1,
            body: raw1,
            redirect: "follow",
          };

          fetch("http://127.0.0.1:8080/product/delete", requestOptions1)
            .then((response) => response.text())
            .then(() => {
              this.$emit("update-cart");
            })
            .catch((error) => console.log("error", error));
        }
      } else {
        // console.log("add_to_cart");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          token: window.sessionStorage.getItem("token"),
          product: req_product.id.toString(),
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://127.0.0.1:8080/customer/addToCart", requestOptions)
          .then((response) => {
            if (response.ok) {
              response.text().then((result) => {
                console.log(result);
              });
            } else {
              response.text().then((err) => window.alert(err));
            }
          })
          // }) response.text())
          // .then((result) => {
          //   console.log(result);
          // })
          .catch((error) => console.log("error", error));
      }
      console.log(req_product);
    },
    // add_to_cart: function (req_product) {
    //   this.$emit("update-cart", req_product);
    //   this.$store.commit({
    //     type: "changeName",
    //     cart_id: req_product,
    //   });
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
.box {
  width: 250px;
  height: 340px;
  background: #eff3f3;
  float: left;
  border: 3px rgb(9, 205, 240);
  box-shadow: 0px 0px 35px rgb(166, 170, 170);
  border-radius: 20px 50px;
  margin: 1rem;
}
.box .product {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 65% repeat(2, calc(35% / 2));
  grid-template-areas:
    "img img img img"
    "name name name name"
    ". price price button";
}
.imgcontainer {
  border-radius: 20px 50px 0px 0px;
  width: 100%;
  height: 100%;
  grid-area: img;
}
.imgcontainer img {
  border-radius: 20px 50px 0px 0px;
  width: inherit;
  height: inherit;
  background-repeat: no-repeat;
  background-attachment: fixed;
  transition: transform 0.5s;
}
.imgcontainer img:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.productname {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  grid-area: name;
}
.productprice {
  color: #6200ee;
  display: grid;
  align-content: center;
  grid-area: price;
}
.buttoncontainer {
  width: 100%;
  height: 100%;
  padding: 5px;
  grid-area: button;
  display: grid;
  justify-content: center;
  align-items: center;
}
/*.buttoncontainer .addtocart {
  width: 45px;
  height: 45px;
  color: white;
  font-size: 30px;
  background-color: #6200ee;
  border-radius: 50%;
}
.buttoncontainer .addtocart:hover {
  cursor: pointer;
  border-color: cyan;
  box-shadow: 0 0 5px #33ffff;
}*/

/*********************/
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

/*********************/
</style>
