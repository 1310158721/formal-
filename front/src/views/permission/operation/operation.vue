<!--
  存在问题：
    当修改当前登录用户（自己）的权限时，从操作页面跳转当前页面时会调取两次的用户查询/用户权限菜单接口
    第一次时因为没有因为 this.$store.state.menuList 被清空了，所以调取这两个接口
    第二次是第一次的接口调取成功时，需要重定向到当前页面，相当于刷新当前页面
    暂时没想到方法修改
-->
<template>
  <el-form
    class="permission-operation-wrapper"
    :model="model"
    :rules="rules"
    label-position="left"
    label-width="96px"
    size="small"
    ref="permission-opertion"
    v-if="isLoaded"
  >
    <div class="form-item-wrapper">
      <div class="left flex">
        <el-form-item :label="$t('permission.operation.账户')" prop="account">
          <el-input v-model="model.account" :disabled='mode !== "create"' />
        </el-form-item>
        <el-form-item :label="$t('permission.operation.密码')" prop="password">
          <el-input v-model="model.password" />
        </el-form-item>
        <el-form-item :label="$t('permission.operation.名称')" prop="name">
          <el-input v-model="model.name" />
        </el-form-item>
        <el-form-item :label="$t('permission.operation.号码')" prop="mobile">
          <el-input maxLength='11' v-model="model.mobile" />
        </el-form-item>
        <el-form-item :label="$t('permission.operation.头像')" prop="avatar">
          <t-single-upload
            :on-success="handleSuccess"
            :imageSrc="model.avatar"
            :data="{
              directory: 'avatar'
            }"
          />
        </el-form-item>
        <el-form-item :label="$t('permission.operation.级别')" prop="role">
          <t-select v-model="model.role" :data="roleEnum" />
        </el-form-item>
        <el-form-item :label="$t('permission.operation.简述')" prop="desc">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            v-model="model.desc"
          ></el-input>
        </el-form-item>
      </div>
      <div class="right flex">
        <el-form-item :label="$t('permission.operation.权限')" prop="hasPermission">
          <t-tree
            v-if="treeData"
            :data="treeData"
            ref="tree"
            :default-checked-keys="model.hasPermission"
            :defaultProps="defaultProps"
            nodeKey="permission"
            @check="checkChange"
          />
        </el-form-item>
      </div>
    </div>
    <div class="button-wrapper">
      <el-form-item>
        <el-button type="primary" @click="submit('permission-opertion')">{{
          mode === "create" ? $t('permission.operation.创建用户') : $t('permission.operation.更新用户')
        }}</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { roleEnum } from '@/assets/js/contants/enum'
import REGEXP from '@/assets/js/contants/regexp'
import { USER, MENULIST } from '@/apis/apis'
import { mapMutations } from 'vuex'
export default {
  name: 'PermissionOperation',
  components: {},
  props: {},
  data () {
    // 表单权限非空校验
    const validateHasPermission = (rule, value, callback) => {
      if (!value || !value.length) {
        this.$message.warning('用户权限不能为空')
      } else {
        callback()
      }
    }
    return {
      // 是否处于axios请求当中
      isLoaded: true,
      // 当前组件的模式，添加用户还是更新用户信息
      mode: 'create',
      // 用户列表带进来的用户id(更新模式才有)
      id: null,
      // 权限菜单树形控件所需数据
      treeData: null,
      // 树形控件的一个属性
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      // 表单数据
      model: {
        account: null,
        password: null,
        name: null,
        mobile: null,
        avatar: '',
        role: null,
        desc: null,
        // 默认添加用户时，勾选首页
        hasPermission: ['DASHBOARD']
      },
      // 表单规则
      rules: {
        account: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          {
            pattern: REGEXP.ACCOUNT,
            message: '账号格式不正确，只支持4～10个字母组合',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            pattern: REGEXP.PASSWORD,
            message: '密码格式不正确，只支持4～10个数字/字母组合',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入用户号码', trigger: 'blur' },
          {
            pattern: REGEXP.MOBILE,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ],
        avatar: [
          { required: true, message: '请上传用户头像', trigger: 'blur' }
        ],
        role: [{ required: true, message: '请选择用户角色', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入简述', trigger: 'blur' }],
        hasPermission: [{ validator: validateHasPermission, trigger: 'blur' }]
      }
    }
  },
  computed: {
    // 用户角色枚举
    roleEnum () {
      const userInfo = this.$store.state.userInfo
      const { role, account } = userInfo
      if (role === 'superadmin' || account === 'tanglihe') {
        return roleEnum
      } else if (role === 'admin') {
        return roleEnum.filter(i => i.value !== 'superadmin')
      } else {
        return roleEnum.filter(i => !['superadmin', 'admin'].includes(i.value))
      }
    }
  },
  methods: {
    // 展示全局 mask 方法
    ...mapMutations(['SETGLOBALMASK', 'SETUSERINFO', 'SETMENULIST']),
    // 注册用户接口
    registerUser () {
      this.SETGLOBALMASK(true)
      return new Promise(resolve => {
        const params = JSON.parse(JSON.stringify(this.model))
        // 将 hasPermission 转换为字符串
        params.hasPermission = params.hasPermission.join(',')
        USER.registerUser(params).then(response => {
          setTimeout(() => {
            const { code, msg } = response.data
            if (code === 0) {
              this.SETGLOBALMASK(false)
              this.$message.success(msg)
              this.$router.back()
              resolve()
            }
          }, this.$store.state.apiDelay)
        })
      })
    },
    // 更新用户信息接口
    updateUser () {
      this.SETGLOBALMASK(true)
      const model = JSON.parse(JSON.stringify(this.model))
      model.hasPermission = model.hasPermission.join(',')
      USER.updateUser(Object.assign({}, { id: this.id }, model)).then(response => {
        setTimeout(() => {
          const { code, msg } = response.data
          if (code === 0) {
            this.SETGLOBALMASK(false)
            this.clearStoreMenuList()
            this.$message.success(msg)
          }
        }, this.$store.state.apiDelay)
      })
    },
    // 查看所有的导航菜单
    getMenuList () {
      return new Promise(resolve => {
        MENULIST.getMenuList().then(response => {
          const { result, code } = response.data
          if (code === 0) {
            this.treeData = this.formatButtons(result)
            resolve()
          }
        })
      })
    },
    // 格式化导航菜单的 buttons 属性
    formatButtons (treeData) {
      treeData.map(i => {
        i.title = this.$t('menuList.' + i.title)
        if (i.children && i.children.length) {
          this.formatButtons(i.children)
        } else {
          let buttons = null
          // 多语言处理
          if (Array.isArray(i.buttons) && i.buttons.length) {
            buttons = i.buttons.map((k) => {
              k.title = this.$t('menuList.' + k.title)
              return k
            })
          }
          i.children = buttons
          return i
        }
      })
      return treeData
    },
    // 树形控件改变
    checkChange (data, options) {
      const currentClickKey = data.permission
      const currentCheckKeys = options.checkedKeys
      const isCheck = currentCheckKeys.includes(currentClickKey)

      const childKeyArray = []
      this.getAllChildKeys([data], childKeyArray)
      const hasCheckKeys = this.$refs.tree.getRefs().getCheckedKeys()

      let hasCheckKeysAfterSet = null
      if (isCheck) {
        const { parent } = this.$refs.tree.getRefs().getNode(currentClickKey)
        const parentKeysArray = []
        this.getAllParentKeys(parent, parentKeysArray)
        hasCheckKeysAfterSet = [
          ...new Set([...childKeyArray, ...hasCheckKeys, ...parentKeysArray])
        ]
      } else {
        hasCheckKeysAfterSet = hasCheckKeys.filter(
          i => !childKeyArray.includes(i)
        )
      }
      this.model.hasPermission = hasCheckKeysAfterSet
      this.$refs.tree.getRefs().setCheckedKeys(hasCheckKeysAfterSet)
    },
    // 获取当前所有的子 keys
    getAllChildKeys (parent, childKeyArray = []) {
      parent.map(i => {
        childKeyArray.push(i.permission)
        if (i.children) {
          this.getAllChildKeys(i.children, childKeyArray)
        }
      })
    },
    // 获取当前所有的父 keys
    getAllParentKeys (parent, parentKeysArray = []) {
      if (!Array.isArray(parent.data)) {
        parentKeysArray.push(parent.data.permission)
      }
      if (parent.parent) {
        this.getAllParentKeys(parent.parent, parentKeysArray)
      }
    },
    // 头像上传成功时
    handleSuccess (response) {
      const { url } = response.result
      this.model.avatar = url
    },
    // 表单提交按钮
    submit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.mode === 'create' ? this.registerUser() : this.updateUser()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑模式时才会触发
    clearStoreMenuList () {
      const loginAccount = this.$store.state.userInfo.account
      const editAccount = this.model.account
      if (loginAccount === editAccount) {
        // this.SETUSERINFO(null)
        this.SETMENULIST([])
      }
    }
  },
  created () {
    const { mode, id } = this.$route.query
    this.mode = mode
    this.id = id
    // 编辑模式，赋予表单初始值
    if (this.id) {
      this.isLoaded = false
      USER.checkUser({ id }).then(response => {
        const { result, code } = response.data
        if (code === 0) {
          const {
            account,
            password,
            name,
            mobile,
            avatar,
            role,
            desc,
            hasPermission
          } = result
          this.model = {
            account,
            password,
            name,
            mobile,
            avatar,
            role,
            desc,
            hasPermission: hasPermission.split(',')
          }
          this.isLoaded = true
        }
      })
    }
    // 获取树形控件数据
    this.getMenuList()
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.permission-operation-wrapper {
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .form-item-wrapper {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    .flex {
      flex: 1;
      overflow-y: auto;
    }
    .left {
      margin-right: 10px;
    }
    .right {
      margin-left: 10px;
    }
  }
  .button-wrapper {
    height: 52px;
    padding-top: 20px;
    box-sizing: border-box;
    text-align: center;
  }
}
</style>
