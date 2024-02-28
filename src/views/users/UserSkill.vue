<template>
  <div class="user-list">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h2 class="display-4">LEVEL</h2>
      <router-link to="/users/create">Addnew</router-link>
    </div>

    <div class="container">
      <div class="card-deck mb-3">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" width="120">#</th>
              <th scope="col">users name</th>
              <th scope="col">code</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(user,index) in users">
              <th scope="row" align="left">{{ user.id }}</th>
              <td>{{user.name}}</td>
              <td>{{user.code}}</td>
              <td>
                <router-link :to="{ name:'users.edit', params: {id: user.id}}">
                  <button class="btn btn-primary">Edit</button>
                </router-link>
                <button class="btn btn-danger" @click="onDelete(user.id)">Delete</button>
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
  name: "UserForm",
  data() {
    return {
      users: []
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      this.$request.get("http://localhost:8000/api/users").then(res => {
        this.users = res.data;
      });
    },
    onDelete(userId) {
      this.$swal({
        title: "Do you want to save the delete?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Ok"
      }).then(result => {
        if (result.isConfirmed) {
          this.$request
            .delete(`http://localhost:8000/api/users/${userId}`)
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