<template>
  <!-- Start Header -->
  <input class="input" type="checkbox" id="btn" />
  <div class="header">
    <div class="container">
      <div class="logo_container">
        <img class="logo" src="../assets/logo.jpg" alt="" />
        <h1>Online store</h1>
      </div>
      <ul class="main-nav">
        <li @click="homePage()" title="home page">
          <a><i class="fas fa-home" id="ico"></i></a>
        </li>
        <li
          @click="emplPage()"
          v-if="this.$store.state.man"
          title="empolyees pages"
        >
          <a><i class="fas fa-address-card" id="ico"> </i></a>
        </li>
        <li
          v-if="
            !this.$store.state.show &&
            this.$store.state.sign &&
            !this.$store.state.man
          "
          @click="cartsuit()"
        >
          <a><i class="fas fa-cart-plus" id="ico"></i></a>
        </li>
        <li
          v-if="this.$store.state.show || this.$store.state.man"
          @click="addprod()"
        >
          <a><i class="fas fa-plus-circle" id="ico"></i></a>
        </li>
        <li
          @click="userPage()"
          v-if="!(this.$store.state.show || this.$store.state.man)"
        >
          <a><i class="fas fa-user" id="ico"></i></a>
        </li>
        <li @click="settingPage()" v-if="this.$store.state.man">
          <a><i class="fas fa-users-cog" id="ico"></i></a>
        </li>
        <li v-if="this.$store.state.sign" @click="signout()">
          <a><i class="fas fa-sign-out-alt" id="ico"></i></a>
        </li>
        <li class="search_cont" @click="searchbar_show()">
          <a
            ><div class="form">
              <i class="fas fa-search" id="searr"></i></div
          ></a>
        </li>
      </ul>
      <div class="search_box" id="bbox">
        <input type="text" name="" placeholder="Type..." id="serch_id" />
        <input
          type="submit"
          name=""
          value="Search"
          @click="searchbar_submit()"
        />
      </div>
      <label for="btn" class="icon">
        <span class="fa fa-bars" id="bars"><i class="fas fa-bars"></i></span>
      </label>
    </div>
  </div>
  <!-- End Header -->
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    searchbar_show: function () {
      console.log("entire");
      return (document.getElementById("bbox").style.display = "block");
    },
    searchbar_submit: function () {
      let word = document.getElementById("serch_id").value;
      document.getElementById("serch_id").value = "";
      var myHeader = new Headers();
      myHeader.append("Content-Type", "application/json");
      var raw1 = {
        searchWord: word,
        page: Number(this.$store.state.page_num) + 1,
      };
      console.log(raw1);

      var requestOptions = {
        method: "POST",
        headers: myHeader,
        body: JSON.stringify(raw1),
      };

      fetch("http://localhost:8080/product/search", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          alert(result);
        })
        .catch((error) => console.log("error", error));
      // this.$emit("search",word);
      return (document.getElementById("bbox").style.display = "none");
    },
    userPage: function () {
      if (this.$store.state.sign) {
        this.$router.push("modifyUser");
      } else {
        this.$router.push("Accounts");
      }
    },
    homePage: function () {
      this.$router.push("/");
    },
    emplPage: function () {
      this.$router.push("empPages");
    },
    cartsuit: function () {
      this.$router.push("cart");
    },
    settingPage: function () {
      this.$router.push("moreOptions");
    },
    signout: function () {
      if (confirm("Do you really want to signout?")) {
        this.$store.commit({
          type: "changeType",
          usertype: null,
        });
        window.sessionStorage.setItem("token", null);
        window.sessionStorage.setItem("userType", null);
        this.$store.state.sign = false;
        this.$router.push("Accounts");
      }
    },
    addprod: function () {
      this.$router.push("productEdit");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Neonderthaw&family=Pacifico&display=swap");
/* Start Header */
a {
  text-decoration: none;
}
#btn {
  display: none;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
#ico {
  font-size: 30px;
}
#searr {
  font-size: 30px;
  color: rgb(240, 84, 84);
}
.icon {
  display: none;
}
.icon:hover {
  color: var(--main-color);
}
.search_cont {
  border-left: 3px solid var(--main-color);
}
.form {
  width: 40px;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.form i {
  color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
@media (max-width: 767px) {
  #ico {
    font-size: 20px;
  }
  .icon {
    display: block;
    position: absolute;
    right: 40px;
    top: 17px;
    cursor: pointer;
  }
  .icon #bars {
    position: absolute;
    font-size: 30px;
  }
}
.header {
  padding: 5px;
  background-color: white;
  position: relative;
}
.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}
.header .logo {
  width: 5.5rem;
  border-radius: 50%;
}
.header .container .logo_container {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 767px) {
  .header .container .logo_container {
    width: 100%;
  }
}
.header .container .logo_container h1 {
  margin: 0;
  display: inline-block;
  text-align: center;
  font-family: "Pacifico", cursive;
}

.header .main-nav {
  display: flex;
  transition: var(--main-transition);
}
@media (max-width: 767px) {
  .header .main-nav {
    margin: auto;
    height: 0;
  }
  #btn:checked ~ .header .main-nav {
    height: 40px;
  }
}
.header .main-nav > li > a {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  position: relative;
  color: black;
  padding: 0 20px;
  overflow: hidden;
  font-size: 18px;
  transition: var(--main-transition);
}

@media (max-width: 767px) {
  .header .main-nav > li > a {
    font-size: 14px;
    height: 40px;
    font-weight: bold;
  }
}
.header .main-nav > li > a::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: var(--main-color);
  top: 0;
  left: -100%;
  transition: var(--main-transition);
}
.header .main-nav > li > a:hover {
  color: var(--main-color);
  background-color: #fafafa;
  cursor: pointer;
}
.header .main-nav > li > a:hover::before {
  left: 0;
}
.search_box {
  position: absolute;
  right: 15px;
  top: 120%;
  z-index: 100;
  display: none;
}
.search_box input {
  position: relative;
  display: inline-block;
  font-size: 20px;
  box-sizing: border-box;
  transition: 0.5s;
}

.search_box input[type="text"] {
  background: #fff;
  width: 340px;
  height: 50px;
  border: none;
  outline: none;
  padding: 0 25px;
  border-radius: 25px 0 0 25px;
}
.search_box input[type="submit"] {
  position: relative;
  left: -5px;
  background: rgb(235, 77, 77);
  color: #fff;
  cursor: pointer;
  width: 150px;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 0 25px 25px 0;
}
.search_box input[type="submit"]:hover {
  background: #ff5722;
}
/* .header .links {
  position: relative;
}
.header .links:hover .icon span:nth-child(2) {
  width: 100%;
}
.header .links .icon {
  width: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.header .links .icon span {
  background-color: #333;
  margin-bottom: 5px;
  height: 2px;
}
.header .links .icon span:first-child {
  width: 100%;
}
.header .links .icon span:nth-child(2) {
  width: 60%;
  transition: var(--main-duration);
}
.header .links .icon span:last-child {
  width: 100%;
}
.header .links ul {
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #f6f6f6;
  position: absolute;
  right: 0;
  min-width: 200px;
  top: calc(100% + 15px);
  display: none;
  z-index: 1;
}
.header .links ul::before {
  content: "";
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent #f6f6f6 transparent;
  position: absolute;
  right: 5px;
  top: -20px;
}
.header .links:hover ul {
  display: block;
}
.header .links ul li a {
  display: block;
  padding: 15px;
  text-decoration: none;
  color: #333;
  transition: var(--main-duration);
}
.header .links ul li a:hover {
  padding-left: 25px;
}
.header .links ul li:not(:last-child) a {
  border-bottom: 1px solid #ddd;
} */
/* End Header */
</style>
