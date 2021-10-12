<template>
  <ul class="default">
    <li style="margin-bottom: 10px">
      <ul class="default flex pull-right">
        <li style="margin-right: 20px; min-width: 200px">
          <el-input v-model="keyword" type="text"></el-input>
        </li>
        <li>
          <el-button
            type="primary"
            @click="search"
            :disabled="keyword == '' || isLoading"
            >查詢</el-button
          >
        </li>
      </ul>
    </li>
    <li class="table">
      <el-table v-loading="isLoading" :data="tableData">
        <el-table-column prop="name" label="藥局 / 口罩" width="180">
        </el-table-column>
        <el-table-column label="權重" v-slot="scope">
            {{ floatFormat(scope.row.score) }}
        </el-table-column>
      </el-table>
    </li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchMaskOrPharmacy",
  data: function () {
    return {
      isLoading: false,
      tableData: [],
      keyword: "",
    };
  },
  mounted: function () {
    this.isLoading = false;
    this.tableData = [];
    this.keyword = "";
  },
  methods: {
    search: function () {
      if (this.isLoading) {
        return;
      }

      const data = {
        keyword: this.keyword,
      };
      this.tableData = [];
      this.isLoading = true;

      axios
        .post("/api/pharmacy/search", data)
        .then((response) => {
          const data = response.data.data;

          if (data.length == 0) {
            return;
          }

          this.tableData = data;
        })
        .catch(function (error) {
          console.log(error);
          this.$message.error("錯誤");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    floatFormat: function (count) {
        count = parseFloat(count) * 100;
        count = parseInt(count);

        return count / 100;
    },
  },
};
</script>
