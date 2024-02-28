<template>
  <div class="level-info">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h3 class="display-5">levels Infomation</h3>
      <router-link to="/levels">Back</router-link>
    </div>

    <div class="container">
      <form @submit.prevent="save">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">number</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              v-model="level.number"
              @blur="validate()"
              v-bind:class="{'is-invalid': errors.number}"
            />
            <div class="invalid-feedback" v-if="errors.number">{{ errors.number }}</div>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">color</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              v-model="level.color"
              v-bind:class="{ 'is-invalid': errors.color }"
            />
            <div class="invalid-feedback" v-if="errors.color">{{ errors.color }}</div>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">description</label>
          <div class="col-sm-9">
            <textarea
              class="form-control"
              rows="3"
              v-model="level.description"
              v-bind:class="{ 'is-invalid': errors.description }"
              @blur="validate()"
            ></textarea>
            <div class="invalid-feedback" v-if="errors.description">{{ errors.description }}</div>
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
  name: "LevelForm",
  data() {
    return {
      errors: {
        number: "",
        color: "",
        description: ""
      },
      level: {
        number: "",
        color: "",
        description: ""
      }
    };
  },
  created() {
    let levelId = this.$route.params.id;

    if (levelId) {
      this.getLevel(levelId);
    }
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        number: "",
        color: "",
        description: ""
      };
      if (!this.level.number) {
        this.errors.number = "levels name is require";
        isValid = false;
      } else if (!this.isNumber(this.level.number)) {
        this.errors.number = "must is number";
        isValid = false;
      }
      if (!this.level.color) {
        this.errors.color = "levels name is require";
        isValid = false;
      }
      if (!this.level.description) {
        this.errors.description = "levels name is require";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d+$/.test(value);
    },
    save() {
      if (this.validate()) {
        if (this.level.id) {
          this.$request
            .put(
              `http://localhost:8000/api/levels/${this.level.id}`,
              this.level
            )
            .then(res => {
              if (res.data.success) {
                // Cập nhật thành công, xóa bản ghi cũ khỏi danh sách
                this.$router.push({ name: "levels.listlevel" });
                return;
              }
              alert("Something went wrong");
            });
        } else {
          this.$request
            .post("http://localhost:8000/api/levels", this.level)
            .then(res => {
              if (res.data.success) {
                this.$router.push({ name: "levels.listlevel" });
                return;
              }
              alert("Something went wrong");
            });
        }
      }
    },
    getLevel(levelId) {
      this.$request
        .get(`http://localhost:8000/api/levels/${levelId}`)
        .then(res => {
          this.level = res.data;
        });
    },
    cancel() {
      (this.level.number = ""),
        (this.level.color = ""),
        (this.level.description = "");
    }
  }
};
</script>