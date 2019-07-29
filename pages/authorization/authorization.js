// pages/authorization/authorization.js
// 请求的 URL 公共前缀
const app = getApp();
const basicUrl = app.globalData.basicUrl;
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  // 自定义函数 开始
  getUserInfo: function (e) {
    // var that = this;

    // console.log(e.detail.userInfo)
    // 用户未授权！
    if (e.detail.userInfo == undefined) {
      wx.showToast({
        title: '授权方能更好用体验哦~',
        icon: 'none',
      })
      return;
    }

    // 用户允许授权，将 userInfo 数据存放到 storage 和 全局变量 中。
    let userInfo = e.detail.userInfo;
    app.globalData.userInfo = userInfo;
    wx.setStorageSync('userInfo', JSON.stringify(userInfo));

    // 通过 login 获取到 openid ,并存放到 storage 和 全局变量 中
    wx.login({
      success(res) {
        console.log('不含openid的res:', res)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wx952b7f57f95b43a7',
            secret: 'd5033b0372150a0f3b4116eed0c2c508',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          // 通过 code 获取到 openid , 然后将 openid 存放到 全局变量和 Storage 中。
          // 并且插入到数据库中，方便以后 只要通过 openid 就能获取到相关的信息
          success(res) {
            console.log('含openid的res:', res)
            app.globalData.openid = res.data.openid;
            wx.setStorageSync('openid', res.data.openid);
            // wx.setStorageSync('openid', '0');

            // 将用户数据插入到 数据库中。
            let callbackSuccess = function(res) {
              console.log('将用户数据插入到数据库中,结果:', res)
            }

            let data = {
              user_id: res.data.openid,
              nick_name: userInfo.nickName,
              avatar: userInfo.avatarUrl
            }
            util.myRequest('authorization.php', data, 'GET', callbackSuccess);

            // 所需的 user_info 、oprnid 都存放好了，跳转到小程序的首页
            wx.switchTab({
              url: '../me/me',
            })
          }
        })
      }
    });
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