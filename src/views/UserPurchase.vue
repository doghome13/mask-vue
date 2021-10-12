<template>
  <ul class="default">
    <li style="margin-bottom: 10px" class="table">
      <ul class="default flex pull-right">
        <li style="margin-right: 20px">
          <label style="margin-right: 10px">顧客</label>
          <el-select v-model="user.id" placeholder="請選擇">
            <el-option :value="0" label="請選擇"></el-option>
            <el-option
              v-for="item in usersList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          <label style="margin-right: 10px">藥局</label>
          <el-select
            v-model="pickPharmacyId"
            placeholder="請選擇"
            @change="getMasks"
          >
            <el-option :value="0" label="請選擇"></el-option>
            <el-option
              v-for="item in pharmaciesList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </li>
      </ul>
    </li>
    <li class="table">
      <el-table v-loading="isLoading" :data="tableData">
        <el-table-column prop="name" label="口罩名稱" width="180" sortable>
        </el-table-column>
        <el-table-column prop="color" label="顏色" min-width="50">
        </el-table-column>
        <el-table-column prop="price" label="價格" min-width="50" sortable>
        </el-table-column>
        <el-table-column label="選擇" min-width="50" v-slot="scope">
          <el-button
            :type="scope.row.id == product.id ? 'success' : 'default'"
            icon="el-icon-check"
            circle
            @click="pickProduct(scope.row)"
          ></el-button>
        </el-table-column>
      </el-table>
    </li>
    <li class="table flex pull-right">
      <ul class="default">
        <li>
          <label>顧客：</label>
          <span>{{ user.name }}</span>
        </li>
        <li>
          <label>購買商品：</label>
          <span>{{ product.name }}</span>
        </li>
      </ul>
    </li>
    <li class="table flex pull-right">
      <el-button
        type="primary"
        @click="save"
        :disabled="user.id == 0 || product.id == 0 || isLoading"
        v-loading="isLoading"
        >存檔</el-button
      >
    </li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  name: "UserPurchase",
  data: function () {
    return {
      isLoading: false,
      tableData: [],
      user: {
        id: 0,
        name: "",
      },
      product: {
        id: 0,
        name: "",
      },
      pickPharmacyId: 0,
      usersList: [],
      pharmaciesList: [],
    };
  },
  mounted: function () {
    this.isLoading = false;
    this.tableData = [];
    this.user = {
      id: 0,
      name: "",
    };
    this.product = {
      id: 0,
      name: "",
    };
    this.pickPharmacyId = 0;

    this.getPharmacies();
    this.getUsers();
  },
  watch: {
    "user.id": {
      handler: function (uid) {
        const pickUser = this.usersList.find((o) => o.id == uid);

        if (pickUser) {
          this.user.name = pickUser.name;
        } else {
          this.user.id = 0;
        }
      },
      deep: true,
    },
  },
  methods: {
    save: function () {
      if (this.isLoading) {
        return;
      }

      const data = {
        userId: this.user.id,
        productId: this.product.id,
      };
      this.isLoading = true;

      axios
        .post("/api/user/purchase", data)
        .then((response) => {
          if (response.status != 200) {
            this.$message.error("錯誤");
            return;
          }

          this.$message({
            message: "完成",
            type: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
          this.$message.error("錯誤");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getUsers: function () {
      axios
        .post("/api/user/list", {})
        .then((response) => {
          this.usersList = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
          this.$message.error("錯誤");
        });
    },
    getPharmacies: function () {
      axios
        .post("/api/pharmacy/list", {})
        .then((response) => {
          this.pharmaciesList = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
          this.$message.error("錯誤");
        });
    },
    getMasks: function () {
      if (this.isLoading) {
        return;
      }

      this.tableData = [];
      this.product = {
        id: 0,
        name: "",
      };
      const data = {
        pharmacyId: this.pickPharmacyId,
      };
      this.isLoading = true;

      axios
        .post("/api/pharmacy/list/products", data)
        .then((response) => {
          this.tableData = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
          this.$message.error("錯誤");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    pickProduct: function (productData) {
      this.product.id = productData.id;
      this.product.name = productData.name + " (" + productData.color + ")";
    },
  },
};
</script>

<style scoped>
li.table:not(:last-of-type) {
  margin-bottom: 10px;
}
</style>
