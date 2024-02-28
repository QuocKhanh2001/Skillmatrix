<template>
  <div class="user-info">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h3 class="display-5">users Infomation</h3>
      <router-link to="/users">Back</router-link>
    </div>

    <div class="container">
      <form @submit.prevent="save">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">users name</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              v-model="user.name"
              @blur="validate()"
              v-bind:class="{'is-invalid': errors.name}"
            />
            <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">code</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              v-model="user.code"
              v-bind:class="{ 'is-invalid': errors.code }"
            />
            <div class="invalid-feedback" v-if="errors.code">{{ errors.code }}</div>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label"></label>
          <div class="col-sm-9">
            <button type="submit" class="btn btn-primary">Save</button> &nbsp;
            <button type="reset" class="btn btn-danger" @click="cancel(cancel)">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserForm",
  data() {
    return {
      errors: {
        name: "",
        code: ""
      },
      user: {
        name: "",
        code: ""
      }
    };
  },
  created() {
    let userId = this.$route.params.id;

    if (userId) {
      this.getUser(userId);
    }
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        name: "",
        code: ""
      };
      if (!this.user.name) {
        this.errors.name = "users name is require";
        isValid = false;
      }
      if (!this.user.code) {
        this.errors.code = "users name is require";
        isValid = false;
      } else if (!this.isNumber(this.user.code)) {
        this.errors.code = "must is number";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d+$/.test(value);
    },
    save() {
      if (this.validate()) {
        if (this.user.id) {
          this.$request
            .put(`http://localhost:8000/api/users/${this.user.id}`, this.user)
            .then(res => {
              if (res.data.success) {
                // Cập nhật thành công, xóa bản ghi cũ khỏi danh sách
                this.$router.push({ name: "users.userSkill" });
                return;
              }
              alert("Something went wrong");
            });
        } else {
          this.$request
            .post("http://localhost:8000/api/users", this.user)
            .then(res => {
              if (res.data.success) {
                this.$router.push({ name: "users.userSkill" });
                return;
              }
              alert("Something went wrong");
            });
        }
      }
    },
    getUser(userId) {
      this.$request
        .get(`http://localhost:8000/api/users/${userId}`)
        .then(res => {
          this.user = res.data;
        });
    },
    cancel() {
      (this.user.name = ""), (this.user.code = "");
    }
  }
};
</script>