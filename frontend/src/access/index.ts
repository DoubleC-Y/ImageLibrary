import router from '@/router'
import { useLoginUserStore } from '@/stores/counter'
import ACCESS_ENUM from './accessEnum'
import checkAccess from './checkAccess'

let firstFetchLoginUser = true

router.beforeEach(async (to, from, next) => {
  const loginUserStore = useLoginUserStore()
  let loginUser = loginUserStore.loginUser
  if (firstFetchLoginUser) {
    await loginUserStore.fetchLoginUser()
    loginUser = loginUserStore.loginUser
    firstFetchLoginUser = false
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    next()
    return
  }
  if (!loginUser || !loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
    next(`/user/login?redirect=${to.fullPath}`)
    return
  }
  if (!checkAccess(loginUser, needAccess)) {
    next('/noAuth')
    return
  }
  next()
})
