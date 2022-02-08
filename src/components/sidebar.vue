<template>
  <nav class="sidebar" id="deep">
    <header>
      <div class="image-text">
        <div class="text header-text">
          <span class="name">Categories</span>
        </div>
      </div>
      <span class="icon_cont" @click="myFunctionClick()" id="deep2">
        <i class="fas fa-angle-right change-background fa-2x"></i>
      </span>
    </header>

    <div class="menu-bar" id="scroll">
      <div class="menu">
        <ul class="menu-links">
          <li
            class="nav-link"
            v-for="category in cat"
            :key="category"
            @click="selecteditem(category)"
          >
            <a href="#">
              <span class="text nav-text" name="deep1">{{
                category.charAt(0).toUpperCase() + category.slice(1)
              }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Sidebar",
  data() {
    return {
      toggle: false,
    };
  },
  props: {
    cat: Object,
  },
  methods: {
    myFunctionClick: function () {
      console.log("enter");
      if (!this.toggle) {
        document.getElementById("deep").style.width = "0px";
        const collection = document.getElementsByClassName("text");
        for (let i = 0; i < collection.length; i++) {
          collection[i].style.opacity = "0";
        }
        this.toggle = true;
      } else {
        document.getElementById("deep").style.width = "250px";
        const collection = document.getElementsByClassName("text");
        for (let i = 0; i < collection.length; i++) {
          collection[i].style.opacity = "1";
        }
        this.toggle = false;
      }
    },
    selecteditem: function (name) {
      console.log(name);
      if (name == "All") {
        this.get_product();
      } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          page: Number(this.$store.state.page_num) + 1,
          category: name,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "http://127.0.0.1:8080/product/product_list_category",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            this.$store.state.products = result;
          })
          .catch((error) => console.log("error", error));
      }
    },
    get_product: function () {
      var myHeaders1 = new Headers();
      myHeaders1.append("Content-Type", "application/json");
      var raw1 = JSON.stringify(Number(this.$store.state.page_num) + 1);

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
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Neonderthaw&family=Pacifico&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
/** Reusable Css */
.sidebar .text {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  transition: var(--tran-04);
  white-space: nowrap;
}

/** */
.sidebar {
  height: 100%;
  width: 250px;
  padding: 10px 0px;
  background: var(--sidebar-color);
  transition: var(--tran-05);
  z-index: 100;
}
.sidebar li {
  height: 50px;
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.sidebar .text {
  color: var(--text-color);
  transition: var(--tran-03);
}
.sidebar header {
  position: relative;
}
.sidebar header .image-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sidebar .image-text .header-text {
  display: flex;
  flex-direction: column;
}
.header-text .name {
  font-size: 30px;
  font-weight: bold;
}
.sidebar header .fa-angle-right {
  position: absolute;
  top: 50%;
  right: -35px;
  transform: translateY(-50%);
  height: 35px;
  width: 35px;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--sidebar-color);
  font-size: 22px;
  cursor: pointer;
  z-index: 10000;
}
.sidebar li a {
  list-style: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  text-decoration: none;
  transition: var(--tran-03);
}
.sidebar li a:hover {
  background: var(--primary-color);
}
.sidebar li a:hover .text {
  color: var(--sidebar-color);
}
#scroll{
  height: 85vh;
overflow-y:scroll ;
}
</style>
