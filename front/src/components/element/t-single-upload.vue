<template>
  <el-upload
    class="t-single-upload"
    :action='action'
    :data="data"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :on-success='handleSuccess'
    :on-error='handleError'
    v-bind='$attrs'
    v-on='$listeners'
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus t-single-upload-icon"></i>
  </el-upload>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 't-single-upload',
  props: {
    action: {
      type: String,
      default: '/tools/upload'
    },
    data: {
      type: Object,
      default: () => ({
        directory: 'demo'
      })
    },
    imageSrc: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    ...mapMutations(['SETGLOBALMASK']),
    beforeAvatarUpload (file) {
      this.SETGLOBALMASK(true)
      if (this.$attrs['before-upload']) {
        this.$attrs['before-upload'](file)
      } else {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    },
    handleSuccess (response, file, fileList) {
      this.SETGLOBALMASK(false)
      this.imageUrl = URL.createObjectURL(file.raw)
      if (this.$attrs['on-success']) {
        this.$attrs['on-success'](response, file, fileList)
      } else {
        console.log(response)
        console.log(file)
        console.log(fileList)
      }
    },
    handleError (err, file, fileList) {
      this.SETGLOBALMASK(false)
      if (this.$attrs['on-error']) {
        this.$attrs['on-error'](err, file, fileList)
      } else {
        console.log(err)
        console.log(file)
        console.log(fileList)
      }
    }
  },
  created () {
    this.imageUrl = this.imageSrc
  }
}
</script>

<style lang="scss" scoped>
.t-single-upload {
  /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .t-single-upload-icon {
    font-size: 28px;
    color: #8c939d;
    width: 144px;
    height: 144px;
    line-height: 144px;
    text-align: center;
  }
  .avatar {
    width: 144px;
    height: 144px;
    display: block;
  }
}
</style>
