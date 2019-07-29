// pages/my-order/my-order.js

const PRE_PATH = '../../images/my-order/';
const util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      // { id: '1', src: PRE_PATH + 'good.png', name: '高等数学（上）', good_num: 1, now_price: 15, status: '正在运输' },
      // { id: '2', src: PRE_PATH + 'good.png', name: '高等数学（下）', good_num: 2, now_price: 32, status: '已出库' },
      // { id: '3', src: PRE_PATH + 'good.png', name: '高等数学（上）', good_num: 3, now_price: 36, status: '正在运输' },
    ]
  },

  // 自定义函数 开始
  // 点击上边的信息， 会根据 id(goodId,携带过去) 跳转到 相应的商品详情页
  navigateToGoodDetail: (e) => {
    util.myNavigateTo('/pages/good-detail/good-detail', 'goodId=' + e.currentTarget.id)
  },

  // 点击再来一单，根据 id 传给 order-confirm 一个 "goodList" 参数
  buyOnceAgain: (e) => {
    console.log(e)
    // 根据当前的 id 向后端发起请求，将获得的数据 整得成 "goodList" 形式 
    let callbackSuccess = function (res) {
      console.log(res)
      let goodList = res.data;
      // 默认再来一单的数量为 1 
      goodList[0].num = 1,
      console.log(goodList)

      // 格式化数据后，携带数据 并跳转到 order-confirm
      util.myNavigateTo('/pages/order-confirm/order-confirm', 'goodList=' + JSON.stringify(goodList))
    }
    util.myRequest('searchByGoodId.php', { good_id: e.currentTarget.id }, 'GET', callbackSuccess)
  },

  // 点击 催单
  urgeTheOrder: (e) => {
    // ？！！这里应该进行 数据库、短信功能 等操作！！！

    util.myShowToast('催单成功！', 'success')
  },

  // 点击 评价
  evaluateTheOrder: (e) => {
    util.myShowToast('功能暂未开启！')
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
    let callbackSuccess = function (res) {
      console.log(res)
      that.setData({
        orderList: res.data
      })
    }
    // wx.getStorageSync('openid')
    util.myRequest('getMyOrder.php', { user_id: '0' }, 'GET', callbackSuccess);
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