<template>
  <div class="skill-info">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h3 class="display-5">skills Infomation</h3>
      <router-link to="/skills">Back</router-link>
    </div>

    <div class="container">
      <form @submit.prevent="save">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">skill name</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              v-model="skill.name"
              @blur="validate()"
              v-bind:class="{'is-invalid': errors.name}"
            />
            <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
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
  name: "SkillForm",
  data() {
    return {
      errors: {
        name: ""
      },
      skill: {
        name: ""
      }
    };
  },
  created() {
    let skillId = this.$route.params.id;

    if (skillId) {
      this.getSkill(skillId);
    }
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        name: ""
      };
      if (!this.skill.name) {
        this.errors.name = "skills name is require";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d+$/.test(value);
    },
    save() {
      if (this.validate()) {
        if (this.skill.id) {
          this.$request
            .put(
              `http://localhost:8000/api/skills/${this.skill.id}`,
              this.skill
            )
            .then(res => {
              if (res.data.success) {
                // Cập nhật thành công, xóa bản ghi cũ khỏi danh sách
                this.$router.push({ name: "skills.listskill" });
                return;
              }
              alert("Something went wrong");
            });
        } else {
          this.$request
            .post("http://localhost:8000/api/skills", this.skill)
            .then(res => {
              if (res.data.success) {
                this.$router.push({ name: "skills.listskill" });
                return;
              }
              alert("Something went wrong");
            });
        }
      }
    },
    getSkill(skillId) {
      this.$request
        .get(`http://localhost:8000/api/skills/${skillId}`)
        .then(res => {
          this.skill = res.data;
        });
    },
    cancel() {
      (this.skill.name = ""), (this.skill.name = ""), (this.skill.name = "");
    }
  }
};
</script>