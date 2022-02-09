<template>
  <div class="accounts-cont">
    <div class="flex-left">
      <img
        class="imgg"
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
          <div>
            <input
              type="email"
              v-model="email"
              autocomplete="email"
              placeholder="Email"
              readonly
              disabled
              id="emailTxt"
            />
            <span>{{ emailError }}</span>
          </div>
          <div class="edit">
            <input v-model="firstname" type="text" placeholder="First Name" />
            <span>{{ firstnameError }}</span>
          </div>
          <div class="edit">
            <input v-model="lastname" type="text" placeholder="Last Name" />
            <span>{{ lastnameError }}</span>
          </div>

          <div class="edit">
            <input v-model="storeNum" type="text" placeholder="StoreNumber" />
            <span></span>
          </div>
          <div class="edit">
            <input v-model="erole" type="text" placeholder="Employee Role" />
            <span></span>
          </div>
          <div class="edit">
            <input v-model="salary" type="text" placeholder="Salary" />
            <span></span>
          </div>
          
          <div class="done" @click="saveData">SAVE DATA</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
function validName(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function validPassword(str) {
  return str.length > 7;
}
export default {
  name: "modifyUser",
  data() {
    return {
      mode: "Modify User Data",
      firstname: "",
      firstnameError: "",
      lastname: "",
      lastnameError: "",
      email: "hmldfksj@fhsjkf",
      emailError: "",
      password: "",
      passwordError: "",
      confirmpassword: "",
      confirmpasswordError: "",
      token: "",
      storeNum: "",
      erole: "",
      salary: "",
    };
  },
 
  mounted() {
    this.$store.commit({
      type: "changeType",
      usertype: window.sessionStorage.getItem("userType"),
    });
    // read email
    // here we should all the original data to show it
    var str = "Email: " + this.email;
    var input = document.getElementById("emailTxt");
    input.value = str;
    this.token = window.sessionStorage.getItem("token");
    //for test
    this.email = "test@employee.com"
    var myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    var raw1 = {
        token: this.token,
        email: this.email,
    };
    console.log(raw1);

    var requestOptions = {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify(raw1),
    };

    console.log(requestOptions.body);

    fetch("http://localhost:8080/manager/getEmployeeInfo", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        this.firstname = result.firstName;
        this.lastname = result.lastName;
        this.email = result.email;
        this.storeNum = result.store;
        this.erole = result.role;
        this.salary = result.salary;
      })
      .catch((error) => console.log("error", error));
  },

  methods: {
    saveData() {
      console.log("saved the data");
      var myHeader = new Headers();
      myHeader.append("Content-Type", "application/json");
      var raw1 = {
        email: this.email,
        firstName: this.firstname,
        lastName: this.lastname,
        password: this.password,
        store: this.storeNum,
        erole: this.erole,
        salary: this.salary
      };
      console.log(raw1);

      var requestOptions = {
        method: "POST",
        headers: myHeader,
        body: JSON.stringify(raw1),
      };

      console.log(requestOptions.body);

      fetch("http://localhost:8080/manager/modifyEmployee", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          this.$router.push("/");
        })
        .catch((error) => console.log("error", error));

      // here we also need to return to the home
    },
  },
  watch: {
    firstname(v) {
      this.firstnameError = validName(v) ? "" : "✘ Invalid Name";
    },
    lastname(v) {
      this.lastnameError = validName(v) ? "" : "✘ Invalid Name";
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
#emailTxt {
  font-weight: bold;
}
.accounts-cont {
  display: inline-flex;
  margin-bottom: 40px;
  min-height: 70vh;
  width: 100%;
  max-width: 900px;
  flex-direction: row;
  align-items: center;
  position: fixed;
  left: 30%;
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

.done:hover {
  cursor: pointer;
  transform: scale(1.2, 1.2);
}
.imgg:hover,
.edit:hover {
  transform: scale(1.1, 1.1);
}
</style>
