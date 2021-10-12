import { ElButton, ElCol, ElDatePicker, ElInput, ElLoading, ElMessage, ElOption, ElRow, ElSelect, ElSlider, ElTable, ElTableColumn } from 'element-plus'
// import lang from 'element-plus/lib/locale/lang/'
// import locale from 'element-plus/lib/locale'
import 'element-plus/lib/theme-chalk/index.css';

export default (app) => {
    // locale.use(lang)
    app.use(ElButton)
    app.use(ElTable)
    app.use(ElTableColumn)
    app.use(ElRow)
    app.use(ElCol)
    app.use(ElDatePicker)
    app.use(ElSelect)
    app.use(ElOption)
    app.use(ElSlider)
    app.use(ElLoading)
    app.use(ElInput)
    app.use(ElMessage)
}