// vuex的权限模块
import { constantRoutes, asyncRoutes } from '@/router'


const state = {
    routes: constantRoutes //所有人默认拥有静态路由
}
const mutations = {
    // newRoutes可以认为是 用户登录 通过权限所得到的动态路由的部分
    setRoutes(state, newRoutes) {
        // 下面这么写不对 不是语法不对 是业务不对
        // state.routes = [...state.routes, ...newRoutes]
        // 有一种情况  张三 登录 获取了动态路由 追加到路由上  李四登录 4个动态路由
        // 应该是每次更新 都应该在静态路由的基础上进行追加
        state.routes = [...constantRoutes, ...newRoutes]
    }
}
const actions = {

    //筛选全线路由
    filterRoutes(context, menus) {
        const routes = []
        menus.forEach(key => {
            routes.push(...asyncRoutes.filter(item => item.name === key))
        })
        context.commit('setRoutes', routes) // 将动态路由提交给mutations
        return routes
    }

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}