import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './languages/zh'
import en from './languages/en'

// element-ui组件国际化
// import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
// import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementEnLocale from './extra/en'
import elementZhLocale from './extra/zh'
Vue.use(VueI18n)

const i18n = new VueI18n({
  // 设置默认语言
  locale: localStorage.getItem('locale') || 'zh',
  // 添加多语言
  messages: {
    zh: Object.assign(zh, elementZhLocale),
    en: Object.assign(en, elementEnLocale)
  }
})

export default i18n
