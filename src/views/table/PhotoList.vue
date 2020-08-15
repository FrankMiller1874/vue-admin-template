<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="安装单ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="源文件名">
        <template slot-scope="scope">
          {{ scope.row.originalName }}
        </template>
      </el-table-column>
      <el-table-column label="物理地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fileLocation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="CRM项目号" align="center">
        <template slot-scope="scope">
          <a @click="showImage(scope.row.id)">{{ scope.row.crmProjectNo }}</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="true"
      :current-page.sync="pageIndex"
      :page-size.sync="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5,10,15,20]"
      :total="total"
      @size-change="fetchData"
      @current-change="fetchData"
    />
    <el-dialog title="安装单详情" :visible.sync="dialogFormVisible">
      <div slot="footer" class="dialog-footer">
        <el-button @click="downloadImage">
          下载
        </el-button>
        <el-button @click="dialogFormVisible = false">
          关闭
        </el-button>
      </div>
      <img :src="imageContent" width="60%" height="60%">
    </el-dialog>
  </div>

</template>

<script>
import { getImageByFileId, getPageList, downloadImage, getFileNameById } from '@/api/photo'

export default {
  data() {
    return {
      list: null,
      pageIndex: 1,
      limit: 5,
      total: 0,
      dialogFormVisible: false,
      listLoading: false,
      imageContent: '',
      currentImageId: '',
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    console.info('PhotoList', 'created')
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPageList(this.pageIndex - 1, this.limit).then(result => {
        this.list = result.content
        this.total = result.totalElements
        console.info('The internet request has returned the value is: ', result)
        this.listLoading = false
      }).catch(error => {
        console.info('A fetal error has occor', error)
      })
    },
    showImage(fileId) {
      this.currentImageId = fileId
      getImageByFileId(fileId).then((resp) => {
        this.imageContent = resp
        this.dialogFormVisible = true
      })
    },
    downloadImage() {
      Promise.all([downloadImage(this.currentImageId), getFileNameById(this.currentImageId)]).then(([fileData, fileName]) => {
        const blob = new Blob([fileData])
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName || undefined)
        } else {
          const link = document.createElement('a')
          const evt = document.createEvent('HTMLEvents')
          evt.initEvent('click', false, false)
          link.href = URL.createObjectURL(blob)
          link.download = fileName || undefined
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
        }
      })
    }
  }
}
</script>

<style>

</style>
