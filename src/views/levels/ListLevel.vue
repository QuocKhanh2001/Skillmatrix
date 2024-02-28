<template>
  <div class="level-list">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h2 class="display-4">LEVEL</h2>
      <router-link to="/levels/create">Addnew</router-link>
    </div>

    <div class="container">
      <div class="card-deck mb-3">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" width="120">id</th>
              <th scope="col" width="120">number</th>
              <th scope="col">color</th>
              <th scope="col">description</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(level,index) in levels">
              <th scope="row" align="left">{{ level.id }}</th>
              <td>{{level.number}}</td>
              <td :style="{ backgroundColor: level.color }">{{level.color}}</td>
              <td>{{level.description}}</td>
              <td>
                <router-link :to="{ name:'levels.edit', params: {id: level.id}}">
                  <button class="btn btn-primary">Edit</button>
                </router-link>
                <button class="btn btn-danger" @click="onDelete(level.id)">Delete</button>
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
  name: "LevelForm",
  data() {
    return {
      levels: []
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      this.$request.get("http://localhost:8000/api/levels").then(res => {
        this.levels = res.data;
      });
    },
    onDelete(levelId) {
      this.$swal({
        title: "Do you want to save the delete?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Ok"
      }).then(result => {
        if (result.isConfirmed) {
          this.$request
            .delete(`http://localhost:8000/api/levels/${levelId}`)
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