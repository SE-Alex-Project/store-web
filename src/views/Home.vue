<template>
  <div class="home">
    <div class="app">
      <div class="sidebar"><Sidebar :cat="categories" /></div>
      <!-- Start Landing -->
      <div class="landing">
        <div class="overlay"></div>
        <div class="product_cont">
          <Product
            class="prodect"
            v-for="product in this.$store.state.products"
            :key="product.id"
            :req_product="product"
            @update-cart="updateCart"
          />
        </div>
        <span class="icon_cont" @click="prev()">
          <i class="fas fa-angle-left change-background fa-2x"></i>
        </span>
        <span class="icon_cont" @click="next()">
          <i class="fas fa-angle-right change-background fa-2x"></i>
        </span>
        <ul class="bullets">
          <li class="active">{{ page_num + 1 }}</li>
        </ul>
      </div>
      <!-- End Landing -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/sidebar.vue";
import Product from "@/components/product.vue";
export default {
  name: "Home",
  data() {
    return {
      page_num: 0,
      User: "",
      categories: [
        // "categories 1",
        // "categories 2",
        // "categories 3",
        // "categories 4",
        // "categories 1",
        // "categories 2",
        // "categories 3",
        // "categories 4",
        // "categories 1",
        // "categories 2",
        // "categories 3",
        // "categories 4",
        // "categories 1",
        // "categories 2",
        // "categories 3",
        // "categories 4",
        // "categories 1",
        // "categories 2",
        // "categories 3",
        // "categories 4",
        // "categories 1",
        // "categories 2",
        // "categories 3",
        // "categories 4",
      ],
    };
  },
  components: {
    Sidebar,
    Product,
  },
  mounted() {
    this.$store.commit({
      type: "changeType",
      usertype: window.sessionStorage.getItem("userType"),
    });
    this.User = this.$route.params.data;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(Number(this.page_num) + 1);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://127.0.0.1:8080/product/product_list", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.$store.state.products = result;
      })
      .catch((error) => console.log("error", error));
    var requestOptions1 = {
      method: "POST",
      redirect: "follow",
    };
    fetch("http://127.0.0.1:8080/product/categories", requestOptions1)
      .then((response) => response.json())
      .then((result) => {
        this.categories = result;
        this.categories.push("All");
      })
      .catch((error) => console.log("error", error));
    /*fetch("http://127.0.0.1:8080/product/categories")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.categories = result;
      })
      .catch((error) => console.log("error", error));*/
  },
  watch: {
    edit() {
      this.$store.state.page_num = this.page_num;
    },
  },
  methods: {
    prev: function () {
      console.log("enter");
      if (this.page_num != 0) {
        this.page_num--;
        this.$store.state.products = {};
        this.get_product();
      }
    },
    next: function () {
      if (this.$store.state.products.length == 50) {
        this.page_num++;
        this.$store.state.products = {};
        this.get_product();
      }
    },
    get_product: function () {
      var myHeaders1 = new Headers();
      myHeaders1.append("Content-Type", "application/json");
      var raw1 = JSON.stringify(Number(this.page_num) + 1);

      var requestOptions2 = {
        method: "POST",
        headers: myHeaders1,
        body: raw1,
        redirect: "follow",
      };

      fetch("http://127.0.0.1:8080/product/product_list", requestOptions2)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.length > 0) {
            this.$store.state.products = result;
          }
        })
        .catch((error) => console.log("error", error));
    },
    updateCart: function () {
      this.get_product();
    },
  },
};
</script>

<style scoped>
/*start app view*/
.app {
  display: grid;
  grid-template-columns: auto 1fr;
  /* grid-template-rows: auto 1fr; */
}
.sidebar {
  grid-column: 1/2;
  z-index: 10;
}

/*end app view*/
/* Start Landing */
.landing {
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
.landing .product_cont {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 93%;
  height: 90%;
  padding: 0 50px;
  background-color: var(--transparent-color);
  color: white;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  overflow-y: scroll;
}
@media (max-width: 767px) {
  .landing .textt {
    width: 100%;
  }
}
.landing .change-background {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #ddd;
}
@media (max-width: 767px) {
  .landing .change-background {
    display: none;
  }
}
.landing .fa-angle-left {
  left: 30px;
  cursor: pointer;
}
.landing .fa-angle-right {
  right: 30px;
  cursor: pointer;
}
.landing .bullets {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  display: flex;
  color: aliceblue;
  list-style: none;
}
.landing .bullets li {
  width: 40px;
  height: 40px;
  border: 1px solid white;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.landing .bullets li.active {
  background-color: var(--main-color);
  border-color: var(--main-color);
}
/* End Landing */
</style>