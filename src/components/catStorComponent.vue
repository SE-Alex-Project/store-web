<template>
  <!-- Start Landing -->
  <div class="landing">
    <div class="overlay"></div>
    <div class="container">
      <div class="buttonscont">
        <div class="leftIcon" @click="CATTT()">Categories</div>
        <div class="middleIcon" @click="STORRR()">Stores</div>
      </div>
      <div class="CAT" v-if="CAAT">
        <div class="box" v-for="(product, index) in products" :key="index">
          <div class="product">
            <div class="nameCont">
              <span class="title">Category Name</span>
              <h4 class="productname">{{ product.fName }}</h4>
            </div>
            <div class="buttoncontainer2">
              <span class="iconcon" @click="delete_emp(empl)">
                <i class="fas fa-user-times"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="STOR" v-else>
        <div class="box" v-for="(product, index) in products" :key="index">
          <div class="product">
            <div class="nameCont">
              <span class="title">Store ID</span>
              <h4 class="productname">{{ product.fName }}</h4>
            </div>
            <div class="buttoncontainer2">
              <span class="iconcon" @click="delete_emp(empl)">
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
      CAAT: false,
      products: [],
    };
  },

  mounted() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = window.sessionStorage.getItem("token");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://127.0.0.1:8080/manager/getEmployees", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.products = result;
      })
      .catch((error) => console.log("error", error));
  },

  methods: {
    CATTT() {
      console.log("save Cart");
      this.CAAT=true;
    },

    STORRR() {
      console.log("check Out");
      this.CAAT=false;
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
  .leftIcon,
  .middleIcon {
    width: 100px;
    height: 40px;
    font-size: 10px;
    font-weight: bold;
  }
}
.buttonscont .leftIcon:hover,
.buttonscont .middleIcon:hover {
  transform: scale(1.1);
  cursor: pointer;
}
/* End Landing */
.CAT,
.STOR {
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
  transition: var(--tran-05);
}
.box:hover {
  transform: scale(1.1);
}
.box .product {
  height: 100%;
  display: flex;
  justify-content: space-evenly;
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
  overflow: hidden;
}
.title {
  color: black;
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 2px;
}
h4 {
  font-size: 25px;
  font-weight: bold;
  color: var(--main-color);
  margin: 0;
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
