<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 缺少treeNode -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <tree-tools
            @editDepts="editDepts"
            @addDepts="addDepts"
            @delDepts="getDepartments"
            slot-scope="{ data }"
            :tree-node="data"
          />
        </el-tree>
        <add-dept
          ref="addDept"
          @addDepts="getDepartments"
          :showDialog.sync="showDialog"
          :treeNode="node"
        ></add-dept>
      </el-card>
    </div>
  </div>
</template>


<script>
import TreeTools from "./components/tree-tools";
import { getDepartments } from "@/api/departments";
import { tranListToTreeData } from "@/utils/index";
import AddDept from "./components/add-dept.vue";
export default {
  components: {
    TreeTools,
    AddDept,
  },
  data() {
    return {
      loading: false, // 用来控制进度弹层的显示和隐藏
      node: null,
      showDialog: false,
      company: {}, // 就是头部的数据结构
      departs: [],
      defaultProps: {
        label: "name", // 表示 从这个属性显示内容
      },
    };
  },
  created() {
    this.getDepartments(); // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      this.loading = true;
      const result = await getDepartments();
      this.departs = tranListToTreeData(result.depts, "");
      this.company = { name: result.companyName, manager: "负责人", id: "" };
      this.loading = false;
    },
    addDepts(node) {
      this.showDialog = true; // 显示弹层
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.node = node;
    },
    // 编辑部门节点
    editDepts(node) {
      // 首先打开弹层
      this.showDialog = true;
      this.node = node; // 赋值操作的节点
      this.$refs.addDept.getDepartDetail(node.id); // 直接调用子组件中的方法 传入一个id
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>

