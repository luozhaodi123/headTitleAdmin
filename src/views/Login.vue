<template>
  <!-- 登录容器 -->
  <el-row type="flex" justify="center" align="middle" class="wrapper">
    <!-- 表单组件 -->
    <el-form ref="form" :model="form" label-width="80px">
      <!-- 用户名 -->
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <!-- 登录或重置按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="onClear">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 发送登录请求
    onSubmit() {
      //判断form中的username和password是否为空
      if (!this.form.username && !this.form.password) {
        this.$message.error("用户名和密码不能为空");
        return;
      }
      this.$axios({
        url: "/login",
        method: "post",
        data: this.form
      }).then(res => {
        console.log(res.data);
        if (res.data.message == "登录成功") {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          this.$message.success("登录成功");
          this.$router.push("/");
        } else {
          this.$message.error("登录失败，请重新登录");
        }
      });
    },
    onClear() {
      this.form = {
        username: "",
        password: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>