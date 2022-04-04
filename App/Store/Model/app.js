import fetch from '@Network'
import storage from '@Utils/storage'
import Tools from '@Utils/tools'

const app = {
  state: {
    user: {},
    sections: [],
    roleId: '',
  },
  actions: {
    /**
     * @description 获取用户信息
     */
    async getUserInfo() {
      const { data } = await fetch.get(`/app/user/getUserInfo`)
      if (data.ret === 100) {
        this.setState({
          user: Tools.dataVerify(data.data, 'object'),
        })
      }
    },

    /**
     * @description 获取菜单
     */
    async getIndexMenus() {
      const { data } = await fetch.get(`/app/index/getIndexMenus`)
      const sections = Tools.dataVerify(data.dataList, 'array')
      sections.map((item, index) => {
        item.data = [[...item.data]]
      })
      if (data.ret === 100) {
        this.setState({ sections })
      }
    },

    /**
     * @description 修改密码
     * @param {*} params
     * @param {function} callback
     */
    async updateUserPassWord(params, callback) {
      const { data } = await fetch.post(
        `/app/user/updateUserPassWord?oldPassWord=${params.oldPassWord}&newPassWord=${params.newPassWord}&checkPassWord=${params.checkPassWord}`,
      )
      if (data.ret === 100) {
        storage.delete('userToken')
        storage.delete('userId')
        callback && callback()
      }
    },

    /**
     * @description 用户登出
     * @param {*} callback
     */
    async userLogout(callback) {
      const { data } = await fetch.post(`/app/user/logout`)
      if (data.ret === 100) {
        storage.delete('userToken')
        storage.delete('userId')
        callback && callback()
      }
    },

    /**
     * @description 清楚本地缓存
     */
    async clearStorage(callback) {
      storage.delete('userToken')
      storage.delete('userId')
      callback && callback()
    },
  },
}

export default app
