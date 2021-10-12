<template>
  <ul class="default">
    <li style="margin-bottom: 10px">
      <ul class="default flex pull-right">
        <!-- <li style="margin-right: 10px; font-size: small">
          <label>最低價格</label>
          <br />
          <span>{{ priceRange[0] }}</span>
        </li>
        <li style="margin-right: 10px; font-size: small">
          <label>最高價格</label>
          <br />
          <span>{{ priceRange[1] }}</span>
        </li> -->
        <li style="margin-right: 20px; min-width: 200px">
          <label>價格範圍</label>
          <el-slider
            v-model="priceRange"
            label="價格範圍"
            range
            :step="0.01"
            :min="0.01"
            :max="100.0"
          >
          </el-slider>
        </li>
        <li>
          <el-button type="primary" @click="search" :disabled="isLoading"
            >查詢</el-button
          >
        </li>
      </ul>
    </li>
    <li class="flex pull-right table">
      <div style="margin-right: 10px; font-size: small">
        <label>最低價格</label>
        <br />
        <span>{{ priceRange[0] }}</span>
      </div>
      <div style="font-size: small">
        <label>最高價格</label>
        <br />
        <span>{{ priceRange[1] }}</span>
      </div>
    </li>
    <li class="table">
      <el-table v-loading="isLoading" :data="tableData">
        <el-table-column prop="name" label="藥局名稱" width="180">
        </el-table-column>
        <el-table-column label="口罩" v-slot="scope">
          <span>{{ scope.row.products.length }} 種</span>
        </el-table-column>
      </el-table>
    </li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  name: "PharmaciesListByPrice",
  data: function () {
    return {
      isLoading: false,
      tableData: [],
      priceRange: [0.01, 50],
    };
  },
  mounted: function () {
    this.isLoading = false;
    this.tableData = [];
    this.priceRange = [0.01, 50];
  },
  methods: {
    search: function () {
      if (this.isLoading) {
        return;
      }

      const data = {
        min: this.priceRange[0],
        max: this.priceRange[1],
      };
      this.tableData = [];
      this.isLoading = true;

      axios
        .post("/api/pharmacy/list/price", data)
        .then((response) => {
          const data = response.data.data;

          if (data.length == 0) {
            return;
          }

          this.tableData = data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
