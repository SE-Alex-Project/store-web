<template>
  <!-- Start Landing -->
  <div class="landing">
    <div class="overlay"></div>
    <div class="container">
      <div class="emplCart">
        <div class="box" v-for="(empl, index) in empls" :key="index">
          <div class="product">
            <div class="nameCont">
              <div class="NumdeCont">
                <span class="title">Cart ID</span>
                <h4 class="productname">{{ empl.cartId }}</h4>
              </div>
              <div class="firstName">
                <span class="title">Email</span>
                <h4 class="productname">{{ empl.userEmail }}</h4>
              </div>
              <div class="secondName">
                <span class="title">Date</span>
                <h4 class="productname">{{ empl.buyDate }}</h4>
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
  name: "MangerCartComp",
  data() {
    return {
      empls: [],
    };
  },
  mounted() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = this.$store.state.email_crt;
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(requestOptions.body);
    fetch("http://127.0.0.1:8080/user/userCart_Email", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.empls = result;
      })
      .catch((error) => console.log("error", error));
  },
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
  align-content: flex-start;
  overflow-y: scroll;
}
.box {
  width: 100%;
  min-height: 100px;
  background: #eff3f3;
  border: 3px rgb(9, 205, 240);
  box-shadow: 0px 0px 35px rgb(166, 169, 170);
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
@media (max-width: 767px) {
  h4 {
    font-size: 15px;
  }
  .title {
    font-size: 10px;
  }
}
</style>
