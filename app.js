//app.js
App({

  data: {

  },
  // 全局数据，放置用户信息 等
  globalData: {
    // 二手书小程序发起请求的 url 公共前缀
    basicUrl: 'https://www.520cyb.cn/mini/book/',
    // 用户重要的数据信息，一般也放在了缓存中
    openid: '',
    userInfo: {},
    // 书籍封面的 URL前缀
    goodURL: 'https://www.520cyb.cn/mini/book/',
  },


  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    // 总体目标：
    // 1、若本地缓存中有 userInfo 和 openid 数据，就赋值给 相关的全局变量，直接跳转到 me 页面,方便验证数据的正确与完整性
    // 2、若本地缓存中没有 userInfo 或 openid 数据，就跳转到 authorization页面 进行授权，并进行相关数据的保存。

    // 缓存中没有 userInfo 或 openid 数据, 重新拉取授权
    if (!wx.getStorageSync('userInfo') || !wx.getStorageSync('openid')) {
      wx.navigateTo({
        url: 'pages/authorization/authorization',
      })
    }

    // 用户不是第一次打开小程序 且 本地缓存中有我们想要的全部数据 ==> userInfo 和 openid

    else {
      this.globalData.userInfo = JSON.parse(wx.getStorageSync('userInfo'));
      this.globalData.openid = wx.getStorageSync('openid');
      // 保存相关数据到全局变量，直接跳转到 index页面
      wx.switchTab({
        url: '/pages/me/me',
      })
      // 为了方便测试，所以 openid 暂时设置为 0
      this.globalData.openid = '0';
      console.log(this.globalData)
    }
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
