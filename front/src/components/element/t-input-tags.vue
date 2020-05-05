<template>
  <div class="t-input-tags-wrapper">
    <el-tag
      :key="tag"
      v-for="(tag, index) in dynamicTags"
      :type='types[index % types.length]'
      closable
      @close="handleClose(tag)"
      :effect='effect'
      v-bind="$attrs"
      v-on='$listeners'
    >
      {{ tag }}
    </el-tag>
    <template v-if='dynamicTags.length < limit'>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm(true)"
        @blur="handleInputConfirm(false)"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >
          新增
        </el-button
      >
    </template>
  </div>
</template>

<script>
export default {
  name: 't-input-tags',
  data () {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  props: {
    limit: {
      type: Number,
      default: 4
    },
    effect: {
      type: String,
      default: 'dark'
    },
    types: {
      type: Array,
      default: () => [
        'success',
        'info',
        'warning',
        'danger'
      ]
    },
    dynamicTags: {
      type: Array,
      default: () => [1, 2, 3, 4]
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.$emit('change', this.dynamicTags)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    /**
     * 当触发 input 的enter事件时，
     * 会先触发 enter 事件，然后在触发 blur 事件
     */
    handleInputConfirm (isClickEnter = false) {
      const inputValue = this.inputValue
      // 屏蔽掉 enter 时触发的 blur
      if (!isClickEnter && !this.inputVisible) {
        return false
      } else {
        if (!inputValue) {
          this.$message.warning('添加内容不能为空')
        } else {
          // 精确查询，先转成字符串类型
          if (this.dynamicTags.filter((i) => i.toString() === inputValue).length) {
            this.$message.warning('添加内容已存在')
          } else {
            this.dynamicTags.push(inputValue)
            this.$emit('change', this.dynamicTags)
          }
        }
        /**
         * enter 时会触发 this.inputVisible = false
         * 然后在执行 blur，此时的 this.inputVisible 就是false
         *
         * 相反只是blur 的话 this.inputVisible 就是 true
         */
        this.inputVisible = false
        this.inputValue = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.t-input-tags-wrapper {
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
