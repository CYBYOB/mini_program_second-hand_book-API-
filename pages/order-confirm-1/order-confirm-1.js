// pages/order-confirm/order-confirm.js

const PRE_PAth = '../../images/order-confirm/';
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货信息相关的，比如 收货人、电话、地址
    deliveryInfo: {
      // name: '初始',
      // phone: 0,
      // address: '初始'
    },

    // 当前购买的商品信息
    goodList: [
      { src: PRE_PAth + 'good.png', name: '高等数学（上）', now_price: 15, num: 1 },
      { src: PRE_PAth + 'good.png', name: '高等数学（下）', now_price: 16, num: 2 },
      { src: PRE_PAth + 'good.png', name: '高等数学（上）', now_price: 17, num: 3 },
    ]
  },

  // 自定义函数 开始
  // 用户的输入，不断更新 name值
  inputName: function (e) {
    this.setData({
      'deliveryInfo.name': e.detail.value
    })
  },

  // 数量的 -- , 当前 num 等于 1 时就能进行 -- ！！
  minusNum: function (e) {
    this.setData({

    })
  },
  // 自定义函数 结束


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从之前获得购买书籍列表，还要通过 缓存中的 openid请求后端并获取到 默认的收货地址等信息。
    // console.log('ops:', JSON.parse(options.goodList))
    // this.setData({
    //   goodList: JSON.parse(options.goodList)
    // })
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
    // 获取默认的 收货信息并更新到 视图上
    let callbackSuccess = function (res) {
      console.log(res)
      that.setData({
        deliveryInfo: res.data[0]
      })
      console.log(that.data.deliveryInfo)
    }
    util.myRequest('getDefaultAddress.php', { user_id: '0' }, 'GET', callbackSuccess);
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