<template>
  <div class="mainCont">
    <div class="icons">
      <div class="icon">
        <h1>Verification form</h1>
      </div>
      <div class="icon">
        <label>verification Number</label>
        <input
          type="text"
          name="userEnteredNumber"
          v-model="userEnteredNumber"
          placeholder="verification Number"
        />
      </div>
    </div>
    <div class="subBtn">
      <div class="btn" @click="verify">Verify</div>
      <div class="btn" @click="resend">resend</div>
    </div>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  name: "remEmp",
  data() {
    return {
      sendNumber: -1,
      userEnteredNumber: "",
      message: "",
      name: "here",
      email: "mgmido463@gmail.com",
    };
  },
  mounted() {
    //first we get the data >> email >> userName
    this.email = window.sessionStorage.getItem("email");
    this.name = window.sessionStorage.getItem("name");
    this.sendEmail();
    alert(
      "we have send you a verification number to make sure that this account belongs to you"
    );
  },
  methods: {
    verify() {
      if (this.userEnteredNumber == this.sendNumber) {
        alert("your account is verified");
        this.$router.push("/");
      } else {
        alert("wrong number");
        this.userEnteredNumber = "";
      }
    },
    resend() {
      this.userEnteredNumber = "";
      this.sendEmail();
    },
    fillMessage() {
      let rand = Math.floor(Math.random() * 9999 + 1000);
      console.log(rand);
      this.message = "your verification number is " + rand;
      console.log(this.message);
      this.sendNumber = rand;
    },
    sendEmail() {
      // sending email method to be written in another place for verification
      this.fillMessage();
      console.log({
        customer_name: this.name,
        message: this.message,
        customer_email: this.email,
      });
      try {
        emailjs.send(
          "service_it8ctuw",
          "template_jtc7jst",
          {
            customer_name: this.name,
            message: this.message,
            customer_email: this.email,
          },
          "user_qNHmSzCgV5SwiEW2FjmPZ"
        );
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 14px;
}

.mainCont {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  min-width: 400px;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  margin: auto;
  background-color: #e6e6e6;
  box-shadow: 7px 7px rgb(126, 126, 126);
  border-radius: 5px;
  margin-top: 12%;
}

form {
  margin: 50px;
}

.btn {
  font-size: 30px;
  font-weight: bold;
  border-radius: 10px;
  margin: 30px auto;
  width: 200px;
  padding: 10px;
  background-color: rgb(238, 15, 15);
  color: white;
  text-align: center;
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
}
.btn:hover {
  transform: scale(1.2, 1.2);
  cursor: pointer;
}

.icon {
  /*display: flex;
  flex-direction: row;
*/
  padding: 10px 0px 20px;
  font-size: 20px;
  font-weight: bold;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  transition: all 0.25s ease;
}

label {
  padding: 10px;
  font-size: 22px;
}

input {
  padding: 10px;
  border: 10px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
}
</style>