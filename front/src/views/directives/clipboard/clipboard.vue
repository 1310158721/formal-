<template>
  <div class="t-clipboard-wrapper">
    <!-- <h3>{{ $t('directives.clipboard.固定的文本') }}</h3> -->
    <h3>
      {{ $t('directives.clipboard.固定的文本') }}
    </h3>
    <!-- <el-button class="fixed-text-clipboard" size="small" type="success" v-t-clipboard="clipboardText1"
      >{{ $t('directives.clipboard.复制') }}</el-button
    > -->
    <el-button class="fixed-text-clipboard" size="small" type="success" v-t-clipboard="clipboardText1"
      >
        {{ $t('directives.clipboard.复制') }}
      </el-button
    >

    <!-- <h3>{{ $t('directives.clipboard.动态的文本') }}</h3> -->
    <h3>
      {{ $t('directives.clipboard.动态的文本') }}
    </h3>
    <el-input class="dynamics-text-clipboard" size="small" :placeholder='$t("directives.clipboard.inputPlaceholder")' v-model="clipboardText2">
      <template slot="append">
        <el-button size="small" type="success" v-t-clipboard="clipboardText2"
          >
            {{ $t('directives.clipboard.复制') }}
          </el-button
        >
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'clipboard',
  components: {},
  props: {},
  data () {
    return {
      clipboardText1: '固定文本的复制',
      clipboardText2: ''
    }
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.t-clipboard-wrapper {
  width: 100%;
  height: 100%;
  .fixed-text-clipboard {
    margin: 5px 0 20px;
    display: block;
  }
  .dynamics-text-clipboard {
    margin: 5px 0 20px;
    width: 300px;
  }
}
</style>
