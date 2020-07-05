<template>
  <!-- container容器 -->
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <div class="logoTitle">黑马头条</div>
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#e9eef3"
        text-color="#333"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" @click="$router.push('/postlist')">
          <i class="el-icon-menu"></i>
          <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('/editpost')">
          <i class="el-icon-setting"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部header -->
      <el-header>
        <img class="portrait" src="@/assets/logo.png" alt />
        {{userInfo.nickname}}
        <div class="logout" @click="logout">退出</div>
      </el-header>
      <!-- 主体main -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userInfo: ""
    };
  },
  created() {
    const userInfo = localStorage.getItem("user");
    this.userInfo = JSON.parse(userInfo);
  },
  methods: {
    logout() {
      console.log("退出登录事件触发了");
      localStorage.clear();
      this.$message.success("已退出登录");
      this.$router.replace("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.logoTitle {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 22px;
}
.iframe {
  width: 100%;
  height: 100%;
  background-color: skyblue;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  background-color: #e9eef3;
  .portrait {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  .logout {
    margin-left: 20px;
    cursor: pointer;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  margin: 10px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
