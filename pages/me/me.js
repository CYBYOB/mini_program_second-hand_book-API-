// pages/me/me.js

// 当前页面的 公共路径
const PRE_PATH = '../../images/me/';
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatar: '../../images/avatar.png',
      nick_name: '陈yob0',
      point: 110,
    },

    myList: [
      { id: 'my-order', src: PRE_PATH + 'order.png', title: '我的订单' },
      { id: 'my-address', src: PRE_PATH + 'address.png', title: '收货地址' },
      { id: 'my-collect', src: PRE_PATH + 'collect.png', title: '我的收藏' },
      { id: 'help', src: PRE_PATH + 'help.png', title: '帮助' },
      { id: 'feedback', src: PRE_PATH + 'feedback.png', title: '反馈' },
      { id: 'about', src: PRE_PATH + 'about.png', title: '关于' }      
    ]
  },

  // 自定义函数 开始
  // 进行 我的订单、收货地址、我的收藏 等的页面跳转
  // 使用箭头函数 简约明了
  navigateToMyPages: (e) => {
    // id 值就是页面的名字
    const pathName = e.currentTarget.id
    const util = require('../../utils/util.js')
    util.myNavigateTo('/pages/' + pathName + '/' + pathName)
  },

  // 自定义函数 结束

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;

    // 通过 缓存里面的 openid 发起请求获得 相关数据的回调函数
    let callbackSuccess = function(res) {
      console.log(res)
      that.setData({
        userInfo: res.data[0]
      })
    }
    util.myRequest('getUserInfoByOpenid.php', { user_id: wx.getStorageSync('openid') }, 'GET', callbackSuccess);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})