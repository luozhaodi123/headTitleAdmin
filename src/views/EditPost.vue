<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <!-- 标题 -->
      <div class="title unifiedLayout">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
      </div>
      <!-- 内容 -->
      <div class="content unifiedLayout">
        <!-- :useCustomImageHandler="true"表示使用自定义的方式处理上传图片
             @image-added="imgUpload"定义上传的函数，需要手动上传图片
        -->
        <el-form-item label="内容">
          <VueEditor v-model="form.content" :useCustomImageHandler="true" @image-added="imgUpload" />
        </el-form-item>
      </div>
      <!-- 栏目 -->
      <div class="totalList unifiedLayout">
        <el-form-item label="栏目">
          <el-checkbox-group v-model="checkList">
            <!-- label表示传给后台的值 -->
            <el-checkbox :label="item.id" v-for="item in totalList" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <!-- 封面 -->
      <div class="postCover unifiedLayout">
        <el-form-item label="封面">
          <el-upload
            :action="$axios.defaults.baseURL+'/upload'"
            :on-success="coverUploaded"
            :on-remove="coverRemoved"
            :file-list="form.cover"
            :headers="{
        Authorization: 'Bearer ' +token
      }"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </div>
      <!-- 类型 -->
      <div class="typelist unifiedLayout">
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
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
      token: "",
      totalList: null,
      checkList: [],
      form: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1
      }
    };
  },
  created() {
    const token = localStorage.getItem("token");
    this.token = token;
    // 加载所有的栏目
    this.$axios({
      url: "/category"
    }).then(res => {
      const newTotalList = res.data.data.filter(item => {
        // 把关注和头条去掉
        if (item.name != "关注" && item.name != "头条") {
          return true;
        } else {
          return false;
        }
      });
      this.totalList = newTotalList;
      // console.log(this.totalList);
    });
    // 查看url地址中是否有带参数
    if (this.$route.query.id) {
      console.log(this.$route.query);
      // 说明是要编辑文章的操作
      this.$axios({
        url: "/post/" + this.$route.query.id
      }).then(res => {
        console.log(res.data.data);
        const { data } = res.data;
        // 要将返回数据中的栏目categories转换成页面显示的数据形式
        const newCateggories = data.categories.map(item => {
          return item.id;
        });
        this.checkList = newCateggories;
        // 处理在发布文章中图片没有基准地址的问题
        // 表示data中的每一项的cover
        let newCover = data.cover.map(img => {
          let newImg = { ...img };
          if (newImg.url.indexOf("http") == -1) {
            newImg.url = this.$axios.defaults.baseURL + newImg.url;
          }
          return newImg;
        });
        data.cover = newCover;
        // 处理content中的div标签在富文本编辑器中的问题
        data.content = data.content.replace(/div/g, "p");
        console.log(data);

        this.form = data;
      });
    }
  },
  watch: {
    // 监听checkList的变化，通过map改变checkList数据的结构
    checkList() {
      let newCheckList = this.checkList.map(item => {
        return { id: item };
      });
      this.form.categories = newCheckList;
    }
  },
  methods: {
    // 处理富文本编辑器上传图片
    /* 参数
       file: 就是用户选择的图片
       editor: 指的是富文本编辑器
       cursorLocation: 指的是当前光标所在的地方
       resetUploader: 上传完毕必须执行的一个复位函数
    */
    imgUpload(file, editor, cursorLocation, resetUploader) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      this.$axios({
        url: "/upload",
        method: "post",
        data: formData
      }).then(res => {
        console.log(res.data);
        // 往编辑框中放入光标所在的位置图片
        editor.insertEmbed(
          cursorLocation,
          "image",
          this.$axios.defaults.baseURL + res.data.data.url
        );
        //插入图片后必须复原上传组件,调用复位函数
        resetUploader();
      });
    },
    // 封面上传的图片
    coverUploaded(res, file) {
      // console.log(res);
      file.id = res.data.id;
      file.url = this.$axios.defaults.baseURL + res.data.url;
      this.form.cover.push(file);
    },
    // 封面删除上传的图片
    coverRemoved(file, fileList) {
      console.log(fileList);
      this.form.cover = fileList;
    },
    // 发表文章
    submit() {
      console.log(this.form);
      this.$axios({
        url: "/post",
        method: "post",
        data: this.form
      }).then(res => {
        console.log(res.data);
        if (res.data.message == "文章发布成功") {
          this.$message.success("文章发表成功");
          // 把form中数据初始化成原来的状态
          this.form = {
            title: "",
            content: "",
            categories: [],
            cover: [],
            type: 1
          };
          this.checkList = [];
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.unifiedLayout {
  .el-checkbox-group {
    .el-checkbox {
      margin-right: 30px;
    }
  }
  /deep/.el-form-item__content {
    .ql-header {
      line-height: 24px;
    }
  }
}
</style>