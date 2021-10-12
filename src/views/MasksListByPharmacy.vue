<template>
  <ul class="default">
    <li style="margin-bottom: 10px">
      <ul class="default flex pull-right">
        <li style="margin-right: 10px">
          <el-select v-model="pickPharmacyId" placeholder="請選擇">
            <el-option
              v-for="item in PharmaciesList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          <el-button
            type="primary"
            @click="search"
            :disabled="pickPharmacyId == '' || isLoading"
            >查詢</el-button
          >
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
      </el-table>
    </li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  name: "MasksListByPharmacy",
  data: function () {
    return {
      isLoading: false,
      tableData: [],
      pickPharmacyId: "",
      PharmaciesList: [],
    };
  },
  mounted: function () {
    this.isLoading = false;
    this.tableData = [];
    this.pickPharmacyId = "";
    this.getPharmacies();
  },
  methods: {
    getPharmacies: function () {
      axios
        .post("/api/pharmacy/list", {})
        .then((response) => {
          this.PharmaciesList = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    search: function () {
      if (this.isLoading) {
        return;
      }

      const data = {
        pharmacyId: this.pickPharmacyId,
      };

      this.tableData = [];
      this.isLoading = true;

      axios
        .post("/api/pharmacy/list/masks", data)
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
