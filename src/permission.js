// 权限拦截 导航守卫 路由守卫  router
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404']


//路由前置守卫
router.beforeEach(async function(to, from, next) {
    NProgress.start()
    if (store.getters.token) {

        //有token
        if (to.path === '/login') {
            //去往登录页
            next('/')
        } else {
            if (!store.getters.userId) {
                // 如果没有id这个值 才会调用 vuex的获取资料的action
                const { roles } = await store.dispatch('user/getUserInfo')
                    // 为什么要写await 因为我们想获取完资料再去放行

                //筛选路由的
                const routes = await store.dispatch('permission/filterRoutes', roles.menus)
                router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 添加动态路由到路由表  铺路
                next(to.path)
            } else {
                next()
            }

        }
    } else {
        //没有token 
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            next('/login')
        }

    }
    NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})


//路由后置守卫
router.afterEach(function() {
    NProgress.done()
})