<template>
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
        <input v-model="new_category" type="text" placeholder="Category Name" />
        <strong class="category-msg"> </strong>
        <div class="done" @click="addCategory">Done</div>
      </div>
    </div>
    <div v-if="pri >= 2">
      <h3 @click="active = active == 'store' ? '' : 'store'">Add Store</h3>
      <div class="input-form" v-show="active == 'store'">
        <input v-model="store_name" type="text" placeholder="Store Name" />
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
      if (!this.store_name.length > 1) {
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
.cont {
  display: inline-block;
  margin-top: 20px;
  width: 80%;
}
.cont > div {
  width: 100%;
  margin-bottom: 20px;
  background-color: var(--text-color);
  user-select: none;
}
h3 {
  margin: 0;
  padding: 7.5px;
  text-align: start;
  color: var(--primary-color-light);
}
h3:hover {
  cursor: pointer;
  background-color: var(--primary-color);
}
.input-form {
  padding: 10px;
  background-color: darkgray;
}
.input-form input {
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  font-size: 1rem;
  border: none;
  background-color: #e6e6e6;
}
.done {
  margin: auto;
  padding: 7.5px;
  width: 200px;
  min-width: fit-content;
  border-radius: 10px;
  font-size: 1rem;
  color: white;
  background-color: darkslateblue;
  font-weight: bold;
}
.done:hover {
  cursor: pointer;
  opacity: 0.8;
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
