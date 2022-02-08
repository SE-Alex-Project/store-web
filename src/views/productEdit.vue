<template>
  <div class="productModify-cont">
    <div class="step-title">
      <div :class="'title ' + t_product" @click="chooseMe('prod')">Product</div>
      <div :class="'title ' + t_stores" @click="chooseMe('store')">Stores</div>
      <div :class="'title ' + t_images" @click="chooseMe('image')">Images</div>
    </div>
    <div class="step-detail">
      <div class="product" v-show="t_product">
        <label>Category: </label>
        <select v-model="category">
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
        <label>Name</label>
        <input type="text" v-model="name" />
        <label>Price (EGP)</label>
        <input
          type="number"
          min="0"
          onkeypress="return event.charCode >= 46"
          v-model="price"
        />
        <label>Description</label>
        <textarea type="text" v-model="description" />
      </div>
      <div class="stores" v-show="t_stores">
        <table>
          <thead>
            <th>Store</th>
            <th>Quantity</th>
          </thead>
          <tr v-for="(s, i) in stores" :key="i">
            <td>{{ s.name }}</td>
            <td>
              <input
                type="number"
                onkeypress="return event.charCode >= 48"
                min="0"
                v-model="s.quantity"
              />
            </td>
          </tr>
        </table>
      </div>
      <div v-show="t_images">
        <table class="images-table">
          <thead style="display: none">
            <th></th>
          </thead>
          <tr v-for="(p, i) in images" :key="i">
            <td style="width: 5%">{{ i + 1 }}</td>
            <td style="width: 25%">
              <img
                v-show="p.url"
                :src="p.url"
                style="width: 100%"
                alt="product"
              />
            </td>
            <td>
              <div class="input-image">
                <input
                  v-show="p.mode == 'url'"
                  type="url"
                  v-model="p.url"
                  placeholder="Image url"
                />
                <input v-show="p.mode == 'file'" type="file" />
                <strong>or</strong>
                <div
                  class="btn"
                  v-text="p.mode == 'url' ? 'Upload' : 'Use url'"
                  @click="changeInputMode(p)"
                ></div>
              </div>
            </td>
            <td><span class="del" @click="delimage(i)">✘</span></td>
          </tr>
        </table>
        <div class="btn add" @click="incimages">+</div>
      </div>
    </div>
    <div class="submition">
      <p class="err-msg"></p>
      <div class="btn" @click="submit()">
        {{ mode == 1 ? "Add product" : "Submit Modifications" }}
      </div>
    </div>
  </div>
</template>

<script>
const addMode = 1,
  editMode = 2;

let image = function (mode = "url", url = "") {
  return {
    mode,
    url,
  };
};

export default {
  data() {
    return {
      t_product: "choosen",
      t_stores: "",
      t_images: "",
      categories: [],
      stores: [],
      images: [],
      mode: 1,
      pId: "",
      category: "",
      name: "",
      price: "",
      description: "",
    };
  },
  mounted() {
    const productId = this.$route.query.pId;
    this.mode = productId ? editMode : addMode;

    // get categories
    fetch(`${this.$store.state.serverURL}/product/categories`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((cats) => {
            this.categories = cats;
            if (this.mode == addMode) this.category = this.categories[0];
          });
        } else {
          response.text().then((err) => window.alert(err));
        }
      })
      .catch((error) => console.log("error", error));
    // get stores
    fetch(`${this.$store.state.serverURL}/store/get_list`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((strs) => {
            this.stores = strs;
            if (this.mode == addMode) {
              for (let st of this.stores) st.quantity = 0;
            }
          });
        } else {
          response.text().then((err) => window.alert(err));
        }
      })
      .catch((error) => console.log("error", error));

    if (this.mode == editMode) {
      fetch(`${this.$store.state.serverURL}/product/get?pId=${productId}`)
        .then((response) => {
          if (response.ok) {
            response.json().then((product) => {
              this.pId = product.id;
              this.category = product.category;
              this.name = product.name;
              this.price = product.price;
              this.description = product.description;
              for (let pstore of product.stores)
                for (let st of this.stores)
                  if (st.id == pstore.id) st.quantity = pstore.quantity;

              this.images = [];
              for (let pimg of product.images) {
                this.images.push(image("url", pimg));
              }
            });
          } else {
            response.text().then((err) => window.alert(err));
            this.mode = addMode;
            this.$router.push("/productEdit");
          }
        })
        .catch((error) => console.log("error", error));
    }

    this.images = [image(), image(), image()];
  },
  methods: {
    chooseMe(title) {
      if (title == "prod") {
        this.t_product = "choosen";
        this.t_stores = "";
        this.t_images = "";
      } else if (title == "store") {
        this.t_product = "";
        this.t_stores = "choosen";
        this.t_images = "";
      } else {
        this.t_product = "";
        this.t_stores = "";
        this.t_images = "choosen";
      }
    },
    incimages() {
      this.images.push(image());
    },
    delimage(index) {
      this.images.splice(index, 1);
    },
    changeInputMode(p) {
      if (p.mode == "url") {
        p.mode = "file";
        p.url = "";
      } else if (p.mode == "file") p.mode = "url";
    },
    submit() {
      let stores = [];
      for (let s of this.stores) {
        if (Number(s.quantity) > 0) {
          stores.push("" + s.id);
          stores.push("" + s.quantity);
        }
      }

      let images = [];
      for (let img of this.images) if (img.url) images.push(img.url);

      let product = {
        addedBy: window.sessionStorage.getItem("token"),
        name: this.name,
        price: "" + this.price,
        category: this.category,
        description: this.description,
        stores,
        images,
      };

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(product),
        redirect: "follow",
      };

      if (this.mode == addMode) {
        console.log(product);
        fetch(`${this.$store.state.serverURL}/product/add`, requestOptions)
          .then((response) => {
            if (response.ok) {
              window.alert("success");
              this.$router.push("/");
            } else response.text().then((err) => window.alert(err));
          })
          .catch((error) => console.log("error", error));
      } else if (this.mode == editMode) {
        product.id = "" + this.pId;
        requestOptions.body = JSON.stringify(product);

        console.log(product);
        fetch(`${this.$store.state.serverURL}/product/edit`, requestOptions)
          .then((response) => {
            if (response.ok) {
              window.alert("success");
              this.$router.push("/");
            } else response.text().then((err) => window.alert(err));
          })
          .catch((error) => console.log("error", error));
      }
    },
  },
};
</script>

<style scoped>
* {
  font-size: 2vw;
}
input,
textarea {
  border: 1px solid;
  font-family: inherit;
  background-color: aliceblue;
}
.productModify-cont {
  width: 90%;
  margin: 10px auto;
  text-align: left;

  /*vars*/
  --border: 0.3vw;
}
.step-title div:first-child {
  border: var(--border) solid #09cdf0;
  border-bottom: none;
}
.step-title div {
  display: inline-block;
  padding: 10px;
  text-align: center;
  border: var(--border) solid #09cdf0;
  border-left: none;
  border-bottom: none;
  color: white;
}
.title {
  background-color: #6200ee;
}
.title:hover {
  cursor: pointer;
}
.choosen {
  background-color: #09cdf0;
}
.step-detail {
  padding: 10px;
  border: 0.3vw solid #09cdf0;
}
.submition {
  padding: 10px;
  text-align: center;
}
.btn {
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
  color: white;
  background-color: #6200ee;
}
.btn:hover {
  cursor: pointer;
  opacity: 0.8;
}
.err-msg {
  font-size: 0.8em;
  font-weight: bold;
  color: #ff0000;
}
.product label {
  font-size: 0.7em;
  font-weight: bold;
}
.product input,
.product textarea,
.product select {
  display: block;
  margin-bottom: 5px;
  padding: 5px;
  width: 100%;
}
textarea {
  height: 30vh;
  resize: none;
}
table,
th,
td {
  border: 1px solid;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  padding: 5px;
  text-align: center;
}
td {
  padding: 5px;
  text-align: center;
}
td input {
  width: 100%;
  padding: 5px;
  border: none;
}
.input-image {
  display: flex;
  gap: 5px;
  align-items: center;
  background-color: aliceblue;
}
.input-image strong {
  padding: 5px;
}
.input-image input {
  min-width: 100px;
  border: none;
}
.input-image .btn {
  min-width: fit-content;
  color: black;
  background-color: lavender;
}
.del {
  cursor: pointer;
  user-select: none;
  opacity: 0.5;
}
.del:hover {
  opacity: 1;
  color: #ff0000;
}
.add {
  width: 100%;
  text-align: center;
  color: black;
  margin: 5px 0;
  background-color: lavender;
}
@media (max-width: 800px) {
  * {
    font-size: 1.2rem;
  }
  .productModify-cont {
    width: 100%;
  }
}
</style>
