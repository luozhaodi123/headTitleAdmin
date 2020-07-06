<template>
  <!-- container容器 -->
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <div class="logoTitle">黑马头条</div>
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="$route.path"
        background-color="#e9eef3"
        text-color="#333"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/postlist" @click="switchPath('/postlist')">
          <i class="el-icon-menu"></i>
          <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item index="/editpost" @click="switchPath('/editpost')">
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
        <BreadCrumb :breadCrumb="breadCrumb" />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
export default {
  components: {
    BreadCrumb
  },
  data() {
    return {
      userInfo: "",
      breadCrumb: []
    };
  },
  created() {
    const userInfo = localStorage.getItem("user");
    this.userInfo = JSON.parse(userInfo);
    // 面包屑导航
    this.breadCrumb = this.$route.matched;
  },
  methods: {
    // 退出登录
    logout() {
      console.log("退出登录事件触发了");
      localStorage.clear();
      this.$message.success("已退出登录");
      this.$router.replace("/login");
    },
    // 切换路由
    switchPath(path) {
      if (this.$route.path != path) {
        this.$router.push(path);
      }
      // 面包屑导航
      this.breadCrumb = this.$route.matched;
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
