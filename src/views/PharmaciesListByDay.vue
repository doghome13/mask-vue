<template>
  <ul class="header">
    <li>
      <el-row :gutter="10">
        <el-col :offset="16" :span="6">
          <el-date-picker
            v-model="pickDatetime"
            type="datetime"
            :format="datetimeFormat"
            :value-format="datetimeFormat"
            placeholder="選擇查看日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="search">查詢</el-button>
        </el-col>
      </el-row>
    </li>
    <li>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="藥局名稱" width="180">
        </el-table-column>
        <el-table-column :label="tableTitle" v-slot="scope">
          <ul>
            <li v-for="hour in scope.row.today" :key="hour.pharmacy_id">
              <span>{{ hour.start_at }}</span> -
              <span>{{ hour.end_at }}</span>
            </li>
          </ul>
        </el-table-column>
      </el-table>
    </li>
  </ul>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "PharmaciesListByDay",
  mixins: [moment],
  data: function () {
    return {
      isLoading: false,
      tableData: [],
      pickDatetime: "",
      datetimeFormat: "YYYY/MM/DD HH:mm:ss",
      tableTitle: "今天營業時間",
    };
  },
  mounted: function () {
    this.isLoading = false;
    this.tableData = [];
    this.pickDatetime = moment().format(this.datetimeFormat);
  },
  methods: {
    search: function () {
      if (this.isLoading) {
        return;
      }

      const [pikcDatet, pickTime] = this.pickDatetime.split(" ");
      const data = {
        date: pikcDatet,
        time: pickTime,
      };
      const today = moment(this.pickDatetime).format("ddd");

      this.tableData = [];
      this.isLoading = true;
      this.tableTitle = pikcDatet + " 營業時間";

      axios
        .post("/api/pharmacy/list/period", data)
        .then((response) => {
          const data = response.data.data;

          if (data.length == 0) {
            return;
          }

          this.tableData = data.map((element) => {
            element.today = element.opening_hours.filter(
              (day) => day.week_day == today
            );
            return element;
          });
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

<style scoped>
ul.header {
  list-style-type: none;
}

.header li:not(:last-of-type) {
  margin-bottom: 10px;
}
</style>