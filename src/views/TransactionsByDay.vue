<template>
  <ul class="default">
    <li style="margin-bottom: 10px" class="table">
      <ul class="default flex pull-right" style="flex-wrap: wrap">
        <li style="margin-bottom: 10px">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="開始日期"
            end-placeholder="结束日期"
            :format="datetimeFormat"
            :value-format="datetimeFormat"
            style="width: fit-content"
          >
          </el-date-picker>
        </li>
        <li style="margin-left: 10px">
          <el-button type="primary" @click="search" :disabled="isLoading"
            >查詢</el-button
          >
        </li>
      </ul>
    </li>
    <li class="table">
      <el-table v-loading="isLoading" :data="tableData">
        <el-table-column prop="name" label="口罩" width="180" sortable>
        </el-table-column>
        <el-table-column prop="color" label="顏色" min-width="50">
        </el-table-column>
        <el-table-column prop="sum" label="累積銷售" min-width="80" sortable>
        </el-table-column>
      </el-table>
    </li>
  </ul>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "TransactionsByDay",
  mixins: [moment],
  data: function () {
    return {
      isLoading: false,
      tableData: [],
      dateRange: "",
      datetimeFormat: "YYYY-MM-DD",
    };
  },
  mounted: function () {
    this.isLoading = false;
    this.tableData = [];
    this.dateRange = [
      moment().format(this.datetimeFormat),
      moment().format(this.datetimeFormat),
    ];
  },
  methods: {
    search: function () {
      if (this.isLoading) {
        return;
      }

      const data = {
        startAt: this.dateRange[0],
        endAt: this.dateRange[1],
      };

      this.tableData = [];
      this.isLoading = true;

      axios
        .post("/api/user/list/transactions", data)
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
  },
};
</script>