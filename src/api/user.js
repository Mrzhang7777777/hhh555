import request from '@/utils/request'

export function login(data) {
    // 返回一个promise对象
    return request({
        url: '/sys/login',
        method: 'post',
        data
    })
}

/**
 *  获取用户的基本资料
 *
 * **/
export function getUserInfo() {
    return request({
        url: '/sys/profile',
        method: 'post'
    })
}

export function logout() {

}



/** *
 *
 * 获取用户的基本信息  现在写它 完全是为了显示头像
 * **/
export function getUserDetailById(id) {
    return request({
        url: `/sys/user/${id}`
    })
}

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
    return request({
        url: `/sys/user/${data.id}`,
        method: 'put',
        data
    })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
    return request({
        url: `/employees/${id}/personalInfo`
    })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
    return request({
        url: `/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    })
}