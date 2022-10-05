import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router/index'


const state = {
        token: getToken(), // 设置token初始状态   token持久化 => 放到缓存中
        userInfo: {}
    }
    // 修改状态
    // 修改状态
const mutations = {
    // 设置token
    setToken(state, token) {
        state.token = token // 设置token  只是修改state的数据  123 =》 1234
            // vuex变化 => 缓存数据
        setToken(token) // vuex和 缓存数据的同步
    },
    // 删除缓存
    removeToken(state) {
        state.token = null // 删除vuex的token
        removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
    },


    //获取个人信息
    setUserInfo(state, data) {
        state.userInfo = {...data }
    },
    // 删除用户信息
    removeUserInfo(state) {
        state.userInfo = {}
    },

}

// 执行异步
const actions = {
    async login(context, data) {
        // 调用api接口
        const result = await login(data) // 拿到token

        context.commit('setToken', result) // 设置token
            // 拿到token说明登录成功
        setTimeStamp() // 将当前的最新时间写入缓存



    },
    async getUserInfo(context) {
        const result = await getUserInfo()
        const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
        const baseResult = {...result, ...baseInfo } // 将两个接口结果合并
        context.commit('setUserInfo', baseResult)
        return result
    },
    // 登出的action
    logout(context) {
        // 删除token
        context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
            // 删除用户资料
        context.commit('removeUserInfo') // 删除用户信息
            // 重置路由
        resetRouter()
            // 还有一步  vuex中的数据是不是还在
            // 要清空permission模块下的state数据
            // vuex中 user子模块  permission子模块
            // 子模块调用子模块的action  默认情况下 子模块的context是子模块的
            // 父模块 调用 子模块的action
        context.commit('permission/setRoutes', [], { root: true })
            // 子模块调用子模块的action 可以 将 commit的第三个参数 设置成  { root: true } 就表示当前的context不是子模块了 而是父模块
    }


}




export default {
    namespaced: true,
    state,
    mutations,
    actions

}