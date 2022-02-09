<template>
  <!-- Start Landing -->
  <div class="landing">
    <div class="overlay"></div>
    <div class="container">
      <div class="emplCart">
        <div class="box" v-for="(empl, index) in empls" :key="index">
          <div class="product">
            <div class="nameCont">
              <div class="firstName">
                <span class="title">First Name</span>
                <h4 class="productname">{{ empl.fName }}</h4>
              </div>
              <div class="secondName">
                <span class="title">Second Name</span>
                <h4 class="productname">{{ empl.lName }}</h4>
              </div>
              <div class="NumdeCont">
                <span class="title">Store Number</span>
                <h4 class="productname">{{ empl.storeId }}</h4>
              </div>
            </div>
            <div class="SECont">
              <div>
                <span class="title">salary</span>
                <h4 class="Email">{{ empl.salary }}</h4>
              </div>
              <div>
                <span class="title">Role</span>
                <h4 class="Email">{{ empl.erole }}</h4>
              </div>
            </div>
            <div class="EmailCont">
                <span class="title">Email</span>
                <h4 class="Email">{{ empl.email }}</h4>
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
      empls: [],
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
        this.empls = result;
      })
      .catch((error) => console.log("error", error));
  },
  methods: {
    delete_emp: function (empl) {
      console.log(empl);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        token: window.sessionStorage.getItem("token"),
        email: empl.email,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch("http://127.0.0.1:8080/user/removeAccount", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          this.get_emp();
        })
        .catch((error) => console.log("error", error));
    },
    get_emp: function () {
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
          this.empls = result;
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
  min-height: 200px;
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
.EmailCont {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

.SECont{
display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
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
