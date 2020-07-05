<template>
  <!-- 登录容器 -->
  <el-row type="flex" justify="center" align="middle" class="wrapper">
    <div class="boxForm">
      <h4 class="title">
        <span class="iconfont iconnew"></span> 黑马头条后台
      </h4>
      <!-- 表单组件 -->
      <el-form ref="form" :model="form" label-width="80px" class="form">
        <!-- 用户名 -->
        <el-form-item label="账号:">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码:">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <!-- 登录或重置按钮 -->
        <el-form-item class="btnWrapper">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="onClear">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
          this.$router.replace("/");
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
  .boxForm {
    width: 260px;
    padding: 0 30px 30px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: url("../assets/bg.jpg") no-repeat;
    .title {
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: white;
      .icon {
        display: block;
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 4px;
      }
      .iconnew {
        font-size: 60px;
        color: #fff;
      }
    }
    .form {
      padding: 20px 30px;
      border: 1px solid #ccc;
      border-radius: 6px;
      box-shadow: 1px 4px 4px 4px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      .el-form-item {
        border: 1px solid #ddd;
        border-radius: 5px;
        display: flex;
        // align-items: center;
        &:last-child {
          border: 0;
        }
        /deep/.el-input__inner {
          border: 0;
          padding: 0 10px 0 0;
        }
        /deep/.el-form-item__label {
          text-align: center;
          padding: 0;
        }
        /deep/.el-form-item__content {
          margin: 0 !important;
        }
      }
      .btnWrapper {
        display: flex;
        align-items: center;
        justify-content: space-around;
        .el-button {
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          padding: 0;
        }
      }
    }
  }
}
</style>