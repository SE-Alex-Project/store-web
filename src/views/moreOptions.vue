<template>
  <!-- Start Landing -->
  <div class="landing">
    <div class="overlay"></div>
    <div class="container">
      <div class="emplCart">
        <div class="cont">
          <div v-if="pri >= 2">
            <h3 @click="active = active == 'employee' ? '' : 'employee'">
              Add Employee
            </h3>
            <div class="input-form" v-show="active == 'employee'">
              <input v-model="firstname" type="text" placeholder="First Name" />
              <input v-model="lastname" type="text" placeholder="Last Name" />
              <input
                v-model="email"
                type="email"
                placeholder="anyname@employee.com"
              />
              <input v-model="emp_role" type="text" placeholder="Role" />
              <input v-model="emp_salary" type="number" placeholder="Salary" />
              <input v-model="emp_store" type="number" placeholder="Store ID" />
              <input v-model="password" type="text" placeholder="Password" />
              <strong class="employee-msg"> </strong>
              <div class="done" @click="addEmpolyee">Done</div>
            </div>
          </div>
          <div v-if="pri >= 1">
            <h3 @click="active = active == 'category' ? '' : 'category'">
              Add Category
            </h3>
            <div class="input-form" v-show="active == 'category'">
              <input
                v-model="new_category"
                type="text"
                placeholder="Category Name"
              />
              <strong class="category-msg"> </strong>
              <div class="done" @click="addCategory">Done</div>
            </div>
          </div>
          <div v-if="pri >= 2">
            <h3 @click="active = active == 'store' ? '' : 'store'">
              Add Store
            </h3>
            <div class="input-form" v-show="active == 'store'">
              <input
                v-model="store_name"
                type="text"
                placeholder="Store Name"
              />
              <input
                v-model="store_location"
                type="text"
                placeholder="Store Location"
              />
              <strong class="store-msg"> </strong>
              <div class="done" @click="addStore">Done</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Landing -->
</template>

<script>
const serverURL = "http://127.0.0.1:8080";

function validName(str) {
  return /^[a-zA-Z]+$/.test(str);
}
function validEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}
function validPassword(str) {
  return str.length > 7;
}

function sendData(subURL, data) {
  fetch(`${serverURL}/${subURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) window.alert("Success");
      else return response.text().then((err) => window.alert(err));
    })
    .catch((error) => console.log("error", error));
}

export default {
  data() {
    return {
      active: "",
      firstname: "",
      lastname: "",
      email: "",
      emp_role: "",
      emp_salary: "",
      emp_store: "",
      password: "",
      new_category: "",
      store_name: "",
      store_location: "",
      pri: 0, // privilege -> cutomer = 0, employee = 1, manager = 2
    };
  },
  mounted() {
    this.$store.commit({
      type: "changeType",
      usertype: window.sessionStorage.getItem("userType"),
    });
    this.pri = 2;
  },
  methods: {
    addEmpolyee() {
      if (!this.validateEmployee()) return;

      let data = {
        token: window.sessionStorage.getItem("token"),
        email: this.email,
        firstName: this.firstname,
        lastName: this.lastname,
        password: this.password,
        store: String(this.emp_store),
        erole: this.emp_role,
        salary: this.emp_salary,
      };

      sendData("manager/addEmployee", data);
    },
    validateEmployee() {
      let className = "employee-msg";

      if (!validName(this.firstname)) {
        this.msg(className, "err", "First Name should be english letters only");
        return false;
      }
      if (!validName(this.lastname)) {
        this.msg(
          className,
          "err",
          "Second Name should be english letters only"
        );
        return false;
      }
      if (!validEmail(this.email)) {
        this.msg(className, "err", "Invalid email");
        return false;
      }
      if (Number(this.emp_salary) < 0) {
        this.msg(className, "err", "Invalid salary");
        return false;
      }
      if (Number(this.emp_store) < 0) {
        this.msg(className, "err", "Invalid Store ID");
        return false;
      }
      if (!validPassword(this.password)) {
        this.msg(className, "err", "Invalid password");
        return false;
      }

      this.msg(className, "", ""); // reset
      return true;
    },
    addCategory() {
      let className = "category-msg";
      if (!validName(this.new_category)) {
        this.msg(
          className,
          "err",
          "Category Name should be english letters only"
        );
        return;
      }
      this.msg(className, "", ""); // reset

      let data = {
        token: window.sessionStorage.getItem("token"),
        categories: [this.new_category],
      };

      sendData("product/add_category", data);
    },
    addStore() {
      let className = "store-msg";
      if (this.store_name.length < 1) {
        this.msg(className, "err", "Invalid Store Name");
        return;
      }
      this.msg(className, "", ""); // reset

      let data = {
        token: window.sessionStorage.getItem("token"),
        name: this.store_name,
        location: this.store_location,
      };

      sendData("store/add", data);
    },
    msg(className, msgType, msg) {
      let cls = document.querySelector("." + className);
      if (msgType == "err") {
        cls.classList.remove("success");
        cls.classList.add("err");
        cls.innerText = msg;
      } else if (msgType == "success") {
        cls.classList.remove("err");
        cls.classList.add("success");
        cls.innerText = msg;
      } else {
        cls.classList.remove("err");
        cls.classList.remove("success");
        cls.innerText = "";
      }
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
  height: calc(100vh - (122px));
}
.emplCart {
  width: 100%;
  height: calc(100vh - (122px));
  padding: 0 50px 0 50px;
  background-color: var(--transparent-color);
  color: white;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
}
.cont {
  display: inline-block;
  width: 100%;
}
.cont > div {
  width: 100%;
  margin-bottom: 20px;
  background-color:rgb(15 116 143 / 70%);
  user-select: none;
}
h3 {
  margin: 0;
  padding: 7.5px;
  color: var(--primary-color-light);
  font-size: 20px;
  font-weight: bold;
  transition: var(--tran-05);
}
h3:hover {
  cursor: pointer;
  background-color: var(--main-color);
}
.input-form {
  padding: 10px;
  transition: var(--tran-05);
}
.input-form input {
  display: block;
  margin-bottom: 10px;
  padding: 15px;
  width: 100%;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: #ffffff;
  border-radius: 10px;
  font-size: 25px;
  font-weight: bold;
}
.done {
  margin: auto;
  padding: 15px;
  width: 200px;
  min-width: fit-content;
  border-radius: 10px;
  color: rgb(2, 2, 2);
  background-color: rgb(255, 255, 255);
  font-size: 25px;
  font-weight: bold;
  transition: var(--tran-05);
}
.done:hover {
  cursor: pointer;
  color: rgb(255, 255, 255);
  background-color: var(--main-color);
}
.err {
  display: block;
  margin: 5px;
  padding: 5px;
  width: 100%;
  color: red;
  background-color: gold;
}
.success {
  display: block;
  margin: 5px;
  padding: 5px;
  width: 100%;
  color: #1eff28;
  background-color: #2a2b3a;
}
</style>
