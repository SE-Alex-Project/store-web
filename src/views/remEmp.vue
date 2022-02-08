<template>
    <div class="mainCont">
        <div class="icons">
          <div class="icon">
            <label>Employee Name</label>
            <input
              type="text"
              name="name"
              v-model="name"
              placeholder="Employee Name"
            >
          </div>
          <div class="icon">
            <label>Employee Email</label>
            <input
              type="text"
              name="email"
              v-model="email"
              placeholder="Employee email"
            >
          </div>
          <div class="icon">
            <label>Employee salary</label>
            <input
              type="text"
              name="salary"
              v-model="salary"
              placeholder="Employee salary"
            >
          </div>
        </div>
        <div class="subBtn">
            <div class="btn" @click="remEmp">
              REMOVE THE EMPLOYEE
            </div>
        </div>
    </div>


</template>

<script>
export default {
    name: "remEmp",
    data() {
        return {
          emailBox: "",
          nameBox: "",
          salaryBox: "",
          email: "",
          name: "",
          salary: "",
        }
    },
    methods: {
      addEmp() {
        
        this.emailBox = this.email;
        this.nameBox = this.name;
        this.salaryBox = this.salary;
        // now we can control the data
        console.log("emp added");
        console.log(this.email);
        console.log(this.name);
        console.log(this.salary);
        
        this.email = "";
        this.name = "";
        this.salary = "";
      }
    }

}
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
  border: 10px ;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
}
</style>