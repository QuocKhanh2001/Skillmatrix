<template>
  <div>
    <!-- Thanh công cụ Vue.js -->
    <div v-if="showSuccessAlert" class="alert alert-success" role="alert">{{ successMessage }}</div>
    <div v-if="showDangerAlert" class="alert alert-danger" role="alert">{{ dangerMessage }}</div>

    <div class="container-fluid">
      <div class="row">
        <form class="container-fluid" @submit.prevent="submitForm" enctype="multipart/form-data">
          <div>
            <h1>Skill-matrix</h1>
          </div>
          <div class="col-md-9">
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <!-- Nội dung modal Vue.js -->
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" style="width:15%">ID</th>
            <th scope="col" style="width:10%">Code</th>
            <th scope="col" style="width:20%">Name</th>
            <th v-for="skill in skills" :key="skill.id" class="rotate" scope="col">{{ skill.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td style="text-align:center">
              <p>{{ user.id }}</p>
            </td>
            <td style="text-align:center; ">
              <p>{{ user.code }}</p>
            </td>
            <td style="text-align:center">
              <p>{{ user.name }}</p>
            </td>
            <td v-for="skill in skills" :key="skill.id">
              <select
                v-model="selectedLevel[user.id + ',' + skill.id]"
                data-bs-toggle="tooltip"
                data-bs-html="true"
                :title="getHistory(user.id, skill.id)"
                @change="onSelectChange(user.id, skill.id)"
                :style="{ backgroundColor: selectedColor[user.id + ',' + skill.id] }"
              >
                <option value disabled selected hidden>-</option>
                <option
                  :style="{ backgroundColor: level.color }"
                  v-for="level in levels"
                  :key="level.id"
                  :value="user.id + ',' + skill.id + ',' + level.id"
                  :selected="level.id == selectedLevel[user.id + ',' + skill.id]"
                >{{ level.number }}</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Import Axios

export default {
  data() {
    return {
      showSuccessAlert: false,
      showDangerAlert: false,
      successMessage: "",
      dangerMessage: "",
      users: [], // Dữ liệu người dùng từ API
      skills: [], // Dữ liệu kỹ năng từ API
      levels: [], // Dữ liệu cấp độ từ API
      selectedLevel: {}, // Lưu trữ cấp độ được chọn bởi người dùng
      selectedColor: {} // Lưu trữ màu đã chọn cho mỗi select
    };
  },
  methods: {
    updateColor(userId, skillId) {
      const selectedValue = this.selectedLevel[userId + "," + skillId];
      const levelId = selectedValue.split(",")[2];
      const level = this.levels.find(level => level.id == levelId);

      if (level) {
        const color = level.color;
        // Gửi yêu cầu cập nhật màu lên backend
        axios
          .post("http://localhost:8000/api/skillmatrixs", {
            userId: userId,
            skillId: skillId,
            color: color
          })
          .then(response => {
            // Xử lý phản hồi từ máy chủ (nếu cần)
          })
          .catch(error => {
            console.error(error);
          });
      }
    },

    showModal(userId, skillId) {
      // TODO: Hiển thị modal và cập nhật các giá trị trong modal dựa trên userId và skillId
    },
    getHistory(userId, skillId) {
      // TODO: Truy vấn lịch sử dựa trên userId và skillId và trả về lịch sử
    },

    fetchUsersFromAPI() {
      // Gửi yêu cầu GET đến API để lấy dữ liệu người dùng, kỹ năng và cấp độ khi component được tạo
      axios
        .get("http://localhost:8000/api/users") // Địa chỉ API của bạn
        .then(response => {
          // Xử lý dữ liệu người dùng từ phản hồi API và lưu vào mảng users
          this.users = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchSkillsFromAPI() {
      // Gửi yêu cầu GET đến API để lấy danh sách kỹ năng khi component được tạo
      axios
        .get("http://localhost:8000/api/skills") // Địa chỉ API của bạn để lấy danh sách kỹ năng
        .then(response => {
          // Xử lý dữ liệu kỹ năng từ phản hồi API và lưu vào mảng skills
          this.skills = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchLevelsFromAPI() {
      // Gửi yêu cầu GET đến API để lấy dữ liệu cấp độ khi component được tạo
      axios
        .get("http://localhost:8000/api/levels") // Địa chỉ API để lấy danh sách cấp độ
        .then(response => {
          // Xử lý dữ liệu cấp độ từ phản hồi API và lưu vào mảng levels
          this.levels = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    onSelectChange(userId, skillId) {
      this.showModal(userId, skillId);
      this.updateColor(userId, skillId);
    }
  },
  created() {
    this.fetchUsersFromAPI(); // Gọi hàm fetchDataFromAPI khi component được tạo
    this.fetchSkillsFromAPI(); // Gọi hàm fetchSkillsFromAPI khi component được tạo
    this.fetchLevelsFromAPI(); // Gọi hàm fetchLevelsFromAPI khi component được tạo
  }
};
</script>

<style scoped>
/* CSS scoped chỉ áp dụng cho component này */
</style>
