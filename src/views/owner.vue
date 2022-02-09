<template>
  <div class="mainDiv">
    <div class="cont">
        <div class="photo">
            <img
                class="imgg"
                src="../assets/accounts/accounts.png"
                width="300"
                height="300"
                alt="login img"
            />
        </div>
            
        <div class="name">
            Mr {{this.ownerName}}
        </div>

        <div class="options">
                <div class="icon" @click="addEmp">
                    MODIFY EMPLOYEE
                </div>
                <div class="icon" @click="remCustAcc">
                    REMOVE CUSTOMER ACCOUNT
                </div>
                <div class="icon" @click="remEmpAcc">
                    REMOVE EMPLOYEE ACCOUNT
                </div>
                <!--
                
                <div class="icon" @click="modifyData">
                    MODIFY DATA
                </div>

                -->
                <!--
                <div class="icon" @click="totSalesProd">
                    TOTAL SALES PRODUCTS
                </div>
                -->
                <!--
                <div class="icon" @click="top5Cust">
                    TOP 5 CUSTOMERS 
                </div>
                -->
                <!--
                <div class="icon" @click="top10Prod">
                    TOP 10 PRODUCTS 
                </div>
                -->
                <div class="icon" @click="cartHist">
                    CARTS HISTORY
                </div>
        </div>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
export default {
    // import emailjs from "file of downloading the library";
    name: "owner",
    data() {
        return {
            ownerName: "hmasa",
           
            message: "",
            name:"here" ,
            email: "mgmido463@gmail.com",
            /* */
            options: [
                
            ]
        };
    },
    mounted() {

    },

    methods: {
         modEmp(){
            console.log("addEmp");
            this.$router.push("modEmp");      
        },
        remCustAcc(){
            console.log("modf");
            this.$router.push("remCust");

        },
        remEmpAcc(){
            console.log("remCastEmp");
            this.$router.push("remEmp");
        },
        cartsHistory(){
            console.log("cartsHistory");
            this.$router.push("history");

        },

        

        
    }


}
</script>

<style scoped>
.photo {
    padding: 30px;
    margin-left: auto;
    margin-right: auto;
    size: 50%;
}

img {
    width: 200px;
    height: 200px;
}
.cont {
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.name {
    padding: 10px 0px 20px;
    font-size: 30px;
    font-weight: bold;
    font-family: 'Brush Script MT', cursive;
    transition: all 0.25s ease;
    text-align: center;
    width: 150px;
    margin-left: auto;
    margin-right: auto;
    
}
.name:hover {
    transform: scale(1.1, 1.1);
}

.options {
    max-width: 800px;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    margin: auto;
}

.icon {
    display: inline-block;
    font-size: 15px;
    font-weight: bold;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 15px;
    padding: 23px;
    height: 75px;
    width: 300px;
    box-shadow: 5px 5px 5px rgb(206, 206, 206);
    background-color: #e6e6e6;
}


.icon:hover {
    transform: scale(1.2, 1.2);
    cursor: pointer;
}




</style>