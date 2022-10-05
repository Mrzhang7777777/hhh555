<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              ref="userForm"
              :model="userInfo"
              :rules="rules"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input
                  v-model="userInfo.password2"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <user-info></user-info>
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <JobInfo></JobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from "@/api/user";
import UserInfo from "./components/user-info.vue";
import JobInfo from "./components/job-info.vue";

export default {
  components: {
    UserInfo,
    JobInfo,
  },
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        //   专门存放基本信息
        username: "",
        password2: "",
      },
      rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 9, message: "密码长度6-9位", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getUserDetailById();
  },

  methods: {
    async saveUser() {
      try {
        // 校验
        await this.$refs.userForm.validate();
        await saveUserDetailById({
          ...this.userInfo,
          password: this.userInfo.password2,
        }); // 将新密码的值替换原密码的值
        this.$message.success("保存成功");
      } catch (error) {
        console.log(error);
      }
    },
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId);
    },
  },
};
</script>

<style>
</style>