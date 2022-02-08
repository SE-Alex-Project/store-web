<template>
  <div class="accounts-cont">
    <div class="flex-left">
      <img
        src="../assets/accounts/accounts.png"
        width="300"
        height="300"
        alt="login img"
      />
    </div>
    <div class="flex-right">
      <div class="form-cont">
        <h1>{{ mode }}</h1>
        <form>
          <div v-show="mode == 'Signup'">
            <input v-model="firstname" type="text" placeholder="First Name" />
            <span>{{ firstnameError }}</span>
          </div>
          <div v-show="mode == 'Signup'">
            <input v-model="lastname" type="text" placeholder="Last Name" />
            <span>{{ lastnameError }}</span>
          </div>
          <div>
            <input
              type="email"
              v-model="email"
              autocomplete="email"
              placeholder="Email"
            />
            <span>{{ emailError }}</span>
          </div>
          <div>
            <input
              v-model="password"
              type="password"
              autocomplete="password"
              placeholder="Password"
            />
            <span>{{ passwordError }}</span>
          </div>
          <div v-show="mode == 'Signup'">
            <input
              v-model="confirmpassword"
              type="password"
              autocomplete="confirmpassword"
              name="confirmpassword"
              placeholder="Confirm Password"
            />
            <span>{{ confirmpasswordError }}</span>
          </div>
          <div class="done" @click="action">{{ mode }}</div>
          <p class="change_mode" @click="switch_mode()">
            {{ change_mode_msg }} &#8594;
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Router from "../router/index.js";
const serverURL = "http://localhost:8080/user";

function validName(str) {
  return /^[a-zA-Z]+$/.test(str);
}
function validEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}
function validPassword(str) {
  return str.length > 7;
}
function hash(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

function handleResponse(response, email) {
  if (response.ok)
    response.text().then((token) => {
      let userType = "customer";
      if (email.indexOf("@employee.com") != -1) userType = "employee";
      else if (email.indexOf("@manager.com") != -1) userType = "manager";

      window.sessionStorage.setItem("token", token);
      window.sessionStorage.setItem("userType", userType);
      Router.push("/");
    });
  else response.text().then((err) => window.alert(err));
}

export default {
  data: function () {
    return {
      mode: "Login",
      change_mode_msg: "Create an Account",
      firstname: "",
      firstnameError: "",
      lastname: "",
      lastnameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      confirmpassword: "",
      confirmpasswordError: "",
    };
  },
  methods: {
    switch_mode() {
      if (this.mode == "Login") {
        this.mode = "Signup";
        this.change_mode_msg = "Already have an Account?";
      } else {
        this.mode = "Login";
        this.change_mode_msg = "Create an Account";
      }
    },
    action() {
      if (this.mode == "Login") this.login();
      else if (this.mode == "Signup") this.signup();
    },
    login() {
      if (validEmail(this.email) && validPassword(this.password)) {
        let data = { email: this.email, password: String(hash(this.password)) };
        console.log("hashing:"+data.password);
        fetch(`${serverURL}/logIn`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => handleResponse(response, data.email))
          .catch((error) => console.log("error", error));
      } else window.alert("Please verify that all fields are valid");
    },
    signup() {
      if (
        validName(this.firstname) &&
        validName(this.lastname) &&
        validEmail(this.email) &&
        validPassword(this.password)
      ) {
        let data = {
          email: this.email,
          firstName: this.firstname,
          lastName: this.lastname,
          password: String(hash(this.password)),
        };

        fetch(`${serverURL}/signUp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((response) => handleResponse(response, data.email))
          .catch((error) => console.log("error", error));
      } else window.alert("Please verify that all fields are valid");
    },
  },
  watch: {
    firstname(v) {
      this.firstnameError = validName(v) ? "" : "✘ Invalid Name";
    },
    lastname(v) {
      this.lastnameError = validName(v) ? "" : "✘ Invalid Name";
    },
    email(v) {
      this.emailError = validEmail(v) ? "" : "✘ Invalid Email";
    },
    password(v) {
      this.passwordError = validPassword(v) ? "" : "✘ Short Password";
    },
    confirmpassword(v) {
      this.confirmpasswordError =
        v == this.password ? "" : "✘ Passwords don't match";
    },
  },
};
</script>

<style scoped>
.accounts-cont {
  display: flex;
  margin: auto;
  min-height: 70vh;
  width: 100%;
  max-width: 1000px;
  font-size: 1.3vw;
  flex-direction: row;
  align-items: center;
}
.flex-left {
  flex-grow: 1;
}
.flex-right {
  flex-grow: 4;
}
.form-cont {
  width: 60%;
  margin: auto;
}
.form-cont input {
  display: block;
  margin: auto;
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  font-size: 1.2em;
  border: none;
  background-color: #e6e6e6;
}
.form-cont span {
  display: inline-block;
  margin-bottom: 10px;
  padding: 0 10px;
  width: 100%;
  text-align: start;
  color: rgb(222, 69, 60);
}
h1 {
  margin-bottom: 20px;
}
.done {
  width: 60%;
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  font-size: 1.2em;
  color: white;
  background-color: #6200ee;
  font-weight: bold;
}
.done:hover {
  cursor: pointer;
  opacity: 0.8;
}
.change_mode {
  padding-top: 5px;
}
.change_mode:hover {
  cursor: pointer;
  text-decoration: underline;
}
@media (max-width: 800px) {
  .flex-left {
    display: none;
  }
}
</style>
