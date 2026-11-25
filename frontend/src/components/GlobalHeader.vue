<template>
  <a-row :wrap="false">
    <a-col flex="200px">
      <RouterLink to="/">
        <div class="title-bar">
          <img class="logo" src="../assets/云图库图标.svg" alt="logo" />
          <div class="title">云图库</div>
        </div>
      </RouterLink>
    </a-col>
    <a-col flex="auto">
      <a-menu
        :style="{ borderBottom: 0 }"
        v-model:selectedKeys="current"
        mode="horizontal"
        :items="items"
        @click="doMenuClick"
      />
    </a-col>
    <a-col flex="120px">
      <div class="user-login-status">
        <div v-if="loginUserStore.loginUser.id">
          <a-dropdown>
            <ASpace>
              <a-avatar :src="loginUserStore.loginUser.userAvatar" />
              {{ loginUserStore.loginUser.userName ?? '无名' }}
            </ASpace>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="doLogout">
                  退出登录
                  <LogoutOutlined />
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div v-else>
          <a-button type="primary" @click="router.push('/user/login')">登录</a-button>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import { type MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/counter.ts'
import { userControllerUserLogout } from '@/api/userController.ts'
const loginUserStore = useLoginUserStore()
import { computed } from 'vue'

const items = computed<MenuProps['items']>(() => [
  { key: '/', icon: () => h(HomeOutlined), label: '主页', title: '主页' },
  ...(loginUserStore.loginUser.userRole === 'admin'
    ? [{ key: '/admin/userManage', label: '用户管理', title: '用户管理' }]
    : []),
  {
    key: 'alipay',
    label: h('a', { href: 'https://antdv.com', target: '_blank' }, 'Ant Design Vue'),
    title: 'Ant Design Vue',
  },
])

// 用户退出登录
const doLogout = async () => {
  try {
    const res = await userControllerUserLogout()
    if (res.data.code === 0) {
      loginUserStore.setLoginUser({
        userName: '未登录',
      })
      // 不要 await：message 的 Promise 会在提示框关闭后才 resolve，会阻塞跳转
      message.success('退出登录成功')
      router.push('/user/login')
    } else {
      message.error('退出登录失败，' + res.data.message)
    }
  } catch (e) {
    message.error('退出登录失败，请稍后重试')
  }
}

const router = useRouter()
// 路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  })
}

const current = ref<string[]>([])
router.afterEach((to, from) => {
  current.value = [to.path]
})
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 32px;
}
</style>
