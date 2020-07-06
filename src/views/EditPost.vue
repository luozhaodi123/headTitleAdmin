<template>
  <div>
    <!-- 标题 -->
    <div class="title unifiedLayout">
      <div class="label">标题</div>
      <el-input v-model="input" placeholder="请输入标题"></el-input>
    </div>
    <!-- 内容 -->
    <div class="content unifiedLayout">
      <div class="label">内容</div>
      <VueEditor />
    </div>
    <!-- 栏目 -->
    <div class="totalList unifiedLayout">
      <div class="label">栏目</div>
      <el-checkbox-group v-model="checkList">
        <el-checkbox :label="item" v-for="(item,index) in totalList" :key="index"></el-checkbox>
      </el-checkbox-group>
    </div>
    <!-- 封面 -->
    <div class="postCover unifiedLayout">
      <div class="label">封面</div>
      <el-upload
        :action="$axios.defaults.baseURL+'/upload'"
        :on-success="coverUploaded"
        :on-remove="coverRemoved"
        :headers="{
        Authorization: 'Bearer ' +token
      }"
        list-type="picture-card"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <!-- 类型 -->
    <div class="typelist unifiedLayout">
      <div class="label">类型</div>
      <el-radio v-model="radio" label="1" size="medium">文章</el-radio>
      <el-radio v-model="radio" label="2" size="medium">视频</el-radio>
    </div>
    <el-button type="primary">提交</el-button>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      input: "",
      // 栏目默认被选中的数组
      checkList: ["头条"],
      radio: 1,
      token: "",
      cover: [],
      totalList: null
    };
  },
  created() {
    const token = localStorage.getItem("token");
    this.token = token;
    // 加载所有的栏目
    this.$axios({
      url: "/category"
    }).then(res => {
      console.log(res.data.data);
      const newTotalList = res.data.data.map(item => {
        return item.name;
      });
      this.totalList = newTotalList;
      // console.log(this.totalList);
    });
  },
  methods: {
    coverUploaded(res) {
      console.log(res);
      this.cover.push({ id: res.data.id });
    },
    coverRemoved(res) {
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
.unifiedLayout {
  display: flex;
  margin-bottom: 10px;
  .label {
    width: 50px;
    height: 40px;
    line-height: 40px;
    text-align: left;
  }
  .el-checkbox-group {
    width: 840px;
    .el-checkbox {
      margin: 10px 30px 10px 0;
    }
  }
}
.title {
  /deep/.el-input__inner {
    width: 840px;
  }
}
.totalList,
.typelist {
  align-items: center;
  margin-top: 60px;
}
.typelist {
  margin-top: 10px;
}
.el-button {
  margin-left: 50px;
}
</style>