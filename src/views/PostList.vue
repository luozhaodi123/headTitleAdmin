<template>
  <div>
    <!-- 文章列表容器 -->
    <div class="postlist">
      <!-- 分页组件 -->
      <div class="pagation TopPagation">
        <!-- page-size 表示每页显示的条数 -->
        <!-- total 表示总的条数 -->
        <el-pagination
          layout="sizes,prev, pager, next,total,jumper"
          :page-sizes="[2,5,8,10]"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
        ></el-pagination>
      </div>
      <!-- 表格组件 -->
      <!-- slot-scope="scope"作用域插 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="缩略图" width="120">
          <template slot-scope="scope">
            <img
              v-if="scope.row.cover.length>0"
              class="thumbnail"
              :src="scope.row.cover[0].url"
              alt
            />
            <img v-else class="thumbnail" src="@/assets/logo.png" alt />
          </template>
        </el-table-column>
        <el-table-column label="标题" width="340">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发表作者" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.user.nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.create_date.split("T")[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="pagation botPagation">
        <!-- page-size 表示每页显示的条数 -->
        <!-- total 表示总的条数 -->
        <el-pagination
          layout="sizes,prev, pager, next,total,jumper"
          :page-sizes="[2,5,8,10]"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  created() {
    this.loadList();
  },
  methods: {
    loadList() {
      // 获取文章列表
      this.$axios({
        url: "/post",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        console.log(res.data.data);
        let { data } = res.data;
        // 处理在发布文章中图片没有基准地址的问题
        let newData = data.map(item => {
          // 表示data中的每一项的cover
          let newCover = item.cover.map(img => {
            let newImg = { ...img };
            if (newImg.url.indexOf("http") == -1) {
              newImg.url = this.$axios.defaults.baseURL + newImg.url;
            }
            return newImg;
          });
          item.cover = newCover;
          return item;
        });
        this.tableData = newData;
        this.total = res.data.total;
      });
    },
    // 当前的页码发生改变时
    currentChange(index) {
      this.pageIndex = index;
      this.loadList();
    },
    // 当前页对应的条数发生改变时
    sizeChange(size) {
      this.pageSize = size;
      this.loadList();
    },
    handleEdit(id) {
      console.log(id);
      this.$router.push("/editpost?id=" + id);
    },
    handleDelete(id) {
      this.$message.success("该功能还要继续完善");
    }
  }
};
</script>

<style lang="less" scoped>
.thumbnail {
  width: 70px;
  height: 40px;
  object-fit: cover;
}
.pagation {
  margin: 15px 0;
  .el-pagination {
    padding: 0;
    /deep/.el-input {
      margin: 0;
    }
    /deep/.el-pagination__total {
      margin: 0 10px;
    }
  }
}
.botPagation {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>