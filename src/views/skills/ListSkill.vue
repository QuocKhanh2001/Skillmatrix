<template>
  <div class="skill-list">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h2 class="display-4">skills</h2>
      <router-link to="/skills/create">Addnew</router-link>
    </div>

    <div class="container">
      <div class="card-deck mb-3">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" width="120">#</th>
              <th scope="col">skills name</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(skill,index) in skills">
              <th scope="row" align="left">{{ skill.id }}</th>
              <td>{{skill.name}}</td>
              <td>
                <router-link :to="{ name:'skills.edit', params: {id: skill.id}}">
                  <button class="btn btn-primary">Edit</button>
                </router-link>
                <button class="btn btn-danger" @click="onDelete(skill.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SkillForm",
  data() {
    return {
      skills: []
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      this.$request.get("http://localhost:8000/api/skills").then(res => {
        this.skills = res.data;
      });
    },
    onDelete(skillId) {
      this.$swal({
        title: "Do you want to save the delete?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Ok"
      }).then(result => {
        if (result.isConfirmed) {
          this.$request
            .delete(`http://localhost:8000/api/skills/${skillId}`)
            .then(res => {
              if (res.data.success) {
                this.getAll();
                this.$swal.fire("Deleted!", "", "success");
              }
            });
        }
      });
    }
  }
};
</script>