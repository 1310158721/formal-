<template>
  <!-- 外部抱一个元素，防止渲染时无限循环，堆溢出 -->
  <div class="menu-item-wrapper">
    <el-menu-item v-if="!item.children || !item.children.length" :index="item.path">
      <i class="icon iconfont" :class="item.icon" />
      <span slot="title">{{ $t('menuList.' + item.title) }}</span>
    </el-menu-item>
    <el-submenu
      v-else
      :index="index"
      popper-append-to-body
      :class="{ 'collapse-hidden': isFirstLoopItem && isCollapse }"
    >
      <template slot="title">
        <i class="icon iconfont" :class="item.icon" />
        <span slot="title" class="title">{{ $t('menuList.' + item.title) }}</span>
      </template>
      <template v-for="(_item, _index) in item.children">
        <!-- 递归调用自身 -->
        <t-sider-item
          :item="_item"
          :index="_index + '-' + index"
          :key="_item.path"
          :isCollapse="isCollapse"
          :isFirstLoopItem='false'
        />
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 't-sider-item',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    // 遍历的下标
    index: {
      type: String,
      default: ''
    },
    // 菜单是否在收缩状态
    isCollapse: {
      type: Boolean,
      default: false
    },
    // 是否为第一次遍历渲染出来的元素
    isFirstLoopItem: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  margin-right: 10px;
}

// 收缩时隐藏文案和箭头
.collapse-hidden {
  /deep/.el-submenu__title {
    .title,
    .el-icon-arrow-right {
      overflow: hidden;
      width: 0;
      height: 0;
      display: inline-block;
      visibility: hidden;
    }
  }
}

// 第一次遍历渲染出来的元素
/deep/.el-menu-item,
/deep/.el-submenu__title {
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  background-color: rgb(38, 52, 69)!important;
  &:hover {
    background-color: #001528 !important;
  }
}
</style>
