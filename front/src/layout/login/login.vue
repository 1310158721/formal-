<template>
  <div class="login-wrapper">
    <el-form
      :model="model"
      :rules="rules"
      ref="loginForm"
      class="login-form-wrapper"
    >
      <el-form-item prop="account">
        <el-input v-model="model.account" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="model.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="18">
            <el-input v-model="model.code" placeholder="请输入验证码" />
          </el-col>
          <el-col :span="6">
            <el-button
              :disabled="isCodeWork"
              :type="isCodeWork ? 'info' : 'primary'"
              @click="clickCode"
            >
              {{ isCodeWork ? limitTime + "s" : "获取验证码" }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          v-t-throttle="submitOptions"
          :disabled="!model.code || !model.account || !model.password"
          type="primary"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <!-- <span id="footer">
      <a class="text" target="_blank" href="http://beian.miit.gov.cn/">
        粤ICP备19147981号-1
      </a>
    </span> -->
  </div>
</template>

<script>
import REGEXP from '@/assets/js/contants/regexp'
import { USER } from '@/apis/apis'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  components: {},
  props: {},
  data () {
    return {
      isClickCode: false,
      upTime: 30,
      limitTime: 30,
      timer: null,
      isCodeWork: false,
      code: null,
      model: {
        account: '',
        password: '',
        code: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号' },
          {
            pattern: REGEXP.ACCOUNT,
            message: '请输入4～10个字母组合'
          }
        ],
        password: [
          { required: true, message: '请输入密码' },
          {
            pattern: REGEXP.PASSWORD,
            message: '请输入4～10个数字/字母组合'
          }
        ]
      },
      submitOptions: {
        type: 'onclick',
        fn: this.submitForm,
        params: ['loginForm']
      }
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['SETUSERINFO']),
    clickCode () {
      if (!this.isClickCode) {
        clearInterval(this.timer)
        this.isClickCode = true
        this.runTime()
        this.timer = setInterval(() => {
          this.runTime()
        }, 1000)
      }
    },
    // 定时器执行内容
    runTime () {
      if (this.limitTime <= 0) {
        clearInterval(this.timer)
        this.limitTime = this.upTime
        this.isCodeWork = false
        this.isClickCode = false
        this.code = null
      } else {
        if (this.limitTime >= this.upTime) {
          this.getRandomCode().then(result => {
            this.code = result
            this.limitTime--
            this.isCodeWork = true
          })
        } else {
          this.limitTime--
        }
      }
    },
    // 模拟接口请求
    async getRandomCode () {
      const randomCodeLength = 4
      let result = ''
      for (let i = 0; i < randomCodeLength; i++) {
        result += Math.floor(Math.random() * 10)
      }
      this.codeTip(result)
      return await result
    },
    codeTip (code) {
      // 延迟一秒弹出
      setTimeout(() => {
        const h = this.$createElement
        this.$notify({
          title: 'mock的验证码',
          message: h(
            'i',
            { style: 'color: teal' },
            `这是你获取的动态验证码--${code}`
          )
        })
      }, 1000)
    },
    submitForm (formName) {
      if (this.code !== this.model.code) {
        this.$message.error('验证码错误，请重新输入')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          USER.login(this.model).then(res => {
            const { code, result } = res.data
            this.SETUSERINFO(result)
            if (code === 0) {
              this.$router.replace({
                path: '/dashboard'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: rgb(38, 52, 69);
  position: relative;
  .login-form-wrapper {
    width: 520px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .el-button {
      width: 100%;
    }
  }
  #footer {
    width: 100%;
    position: absolute;
    bottom: 0px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    text-align: center;
    .text {
      text-decoration: none;
      color: #939393;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
