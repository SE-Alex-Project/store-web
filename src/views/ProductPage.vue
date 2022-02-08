<template>
  <div class="grid-cont">
    <div class="product-imgs">
      <div class="main-img-cont">
        <img class="main-img" :src="image_f()" alt="product" />
      </div>
      <div class="sub-imgs">
        <div v-for="img in images" :key="img">
          <img :src="img" alt="" @click="reqeur_show(img)" />
        </div>
      </div>
    </div>
    <div class="product-info">
      <h1 class="product-name">{{ name }}</h1>
      <hr />
      <div class="description">
        <div class="price_cont">
          <strong>Price: </strong>
          <span class="price"> {{ price }} </span>
          <span class="currency"> EGP</span>
        </div>

        <p>description</p>
        <p class="des">{{ description }}</p>
        <hr />
      </div>
      <div class="props"></div>
      <div class="center" v-if="this.$store.state.sign">
        <div class="outer button" @click="add_to_cart()">
          <button>add to cart</button>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getproductURL: this.$store.state.serverURL + "/product/get",
      pName: "Product Name",
      name: "",
      price: "$$$$",
      description: "",
      images: [""],
      image_show: "",
    };
  },
  mounted() {
    const pId = this.$route.query.pId;
    if (pId) {
      fetch(`${this.getproductURL}?pId=${pId}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("Something went wrong");
        })
        .then((product) => {
          this.name = product.name ? product.name : "product name";
          this.price = product.price ? product.price : "$$$$";
          this.description = product.description;
          this.images = product.images ? product.images : [""];
          this.image_show = this.images[0];
        })
        .catch((error) => console.log("error", error));
    }
  },
  methods: {
    image_f: function () {
      return this.image_show;
    },
    add_to_cart: function () {
      console.log("add_to_cart");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        token: window.sessionStorage.getItem("token"),
        product: this.$route.query.pId.toString(),
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
        .catch((error) => console.log("error", error));
    },
    reqeur_show: function (img) {
      this.image_show = img;
    },
  },
};
</script>

<style scoped>
/* layout style*/
.grid-cont {
  display: grid;
  width: 100%;
  grid-template-columns: 40% 60%;
}
.product-imgs {
  padding: 20px;
}
.sub-imgs {
  display: flex;
  padding: 20px;
  width: 100%;
  height: 250px;
  gap: 10px;
  justify-content: space-evenly;
  overflow-x: auto;
  border-width: 4px;
  border-style: solid;
  border-color: rgb(0, 0, 0);
}
.sub-imgs div {
  width: 250px;
  height: 190px;
  margin: 0 10px 0 10px;
  box-shadow: 0px 0px 35px rgb(166, 170, 170);
  border-radius: 20px 50px;
  transition: transform 0.5s;
}

.sub-imgs div:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.sub-imgs div img {
  width: inherit;
  height: inherit;
  object-fit: fill;
  padding: 1px;
  border-radius: 20px 50px;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.product-info {
  padding: 20px;
}
.grid-cont .product-info h1 {
  color: white;
  background: #6200ee;
  border-radius: 20px;
  padding: 5px;
}
.grid-cont .product-info .description .price_cont {
  width: 100%;
  height: inherit;
  display: flex;
  justify-content: center;
  padding: 10px;
}
.grid-cont .product-info .description .price_cont strong {
  font-size: 30px;
  margin-right: 10px;
}
.grid-cont .product-info .description .price_cont .price {
  font-size: 25px;
  margin-right: 2px;
}
.grid-cont .product-info .description .price_cont .currency {
  margin-left: 10px;
  font-size: 28px;
}
.grid-cont .product-info .description p {
  display: flex;
  justify-content: center;
  font-size: 35px;
  color: white;
  background: #6200ee;
  border-radius: 20px;
  padding: 5px;
  margin-top: 10px;
}
.grid-cont .product-info .description .des {
  /* border-radius: 50%; */
  background: #ffffff;
  color: rgb(0, 0, 0);
  height: 300px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(0, 0, 0);
  font-size: 30px;
  padding: 10px;
  margin-top: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 800px) {
  .grid-cont {
    grid-template-columns: 100%;
  }
}
/****************/
.main-img-cont {
  width: 100%;
  height: 600px;
  margin-bottom: 20px;
}
.main-img {
  margin-bottom: 30px;
  width: inherit;
  height: inherit;
  box-shadow: 0px 0px 35px rgb(166, 170, 170);
  border-radius: 70px 100px;
  transition: transform 0.5s;
}
.main-img:hover {
  cursor: pointer;
  transform: scale(1.02);
}
hr {
  margin: 10px 0;
}
.description {
  text-align: start;
}
.description strong {
  color: var(--cback2);
}
/**********************************************************/
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.outer {
  position: relative;
  margin: 0 50px;
  background: #111;
}
.button {
  height: 70px;
  width: 220px;
  border-radius: 50px;
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
  font-size: 20px;
  z-index: 9;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
}
.button button {
  height: 60px;
  width: 210px;
  border-radius: 50px;
}

.outer span {
  height: 100%;
  width: 100%;
  background: inherit;
}
.button span {
  border-radius: 50px;
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
/**********************************************************/
</style>
