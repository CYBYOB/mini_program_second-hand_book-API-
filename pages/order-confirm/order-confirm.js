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
      // { src: PRE_PAth + 'good.png', name: '高等数学（上）', now_price: 15, good_num: 1 },
      // { src: PRE_PAth + 'good.png', name: '高等数学（下）', now_price: 16, good_num: 2 },
      // { src: PRE_PAth + 'good.png', name: '高等数学（上）', now_price: 17, good_num: 3 }, 
    ],

    // 订单的其他信息，比如 配送方式(默认到店自取，即'self')，买家留言，合计总价钱
    otherInfo: {
      deliveryWay: 'self',
      message: '',
      totalPrice: 0
    }
  },

  // 自定义函数 开始

  // 用户的输入，不断更新 name值
  inputName: function (e) {
    this.setData({
      'deliveryInfo.name': e.detail.value
    })
  },

  // 用户的输入，不断更新 phone值
  inputPhone: function(e) {
    this.setData({
      'deliveryInfo.phone': e.detail.value
    })
  },


  // 用户的输入，不断更新 address值
  inputAddress: function (e) {
    this.setData({
      'deliveryInfo.address': e.detail.value
    })
    console.log(this.data)
  },

  // 计算总价，封装起来，因为 无论哪一个商品进行 数量的操作，都会触发 总价钱的变化！
  getTotalPrice: function() {
    let goodList = this.data.goodList;
    let total = 0;
    let length = goodList.length;
    for(var i=0; i < length; i++) {
      let good = this.data.goodList[i];
      total += (good.now_price * good.good_num)
    }
    console.log(total)
    this.setData({
      'otherInfo.totalPrice': total
    })
  },
  // 数量的 -- , 当前 num 等于 1 时就能进行 -- ！！
  clickMinus: function(e) {
    let index = e.currentTarget.dataset.index;
    let num = parseInt(this.data.goodList[index].good_num);
    if(num <= 1) {
      util.myShowToast('商品数量不能小于1~', 'none', 1500);
      return ;
    }
    else {
      this.setData({
        ['goodList[' + index +'].good_num']: num-1
      })
      this.getTotalPrice();
    }
  },

  // 数量的 ++ , 加到 10就不能加了，如果大量购买应该当面联系
  clickAdd: function (e) {
    let index = e.currentTarget.dataset.index;
    let num = parseInt(this.data.goodList[index].good_num);
    if (num >= 10) {
      util.myShowToast('大量购买请当面联系哦~', 'none', 1500);
      return;
    }
    else {
      this.setData({
        ['goodList[' + index + '].good_num']: num+1
      })
      this.getTotalPrice();
    }
  },

  // 更改配送方式
  clickNoSelf: function(e) {
    this.setData({
      'otherInfo.deliveryWay': 'no_self'
    })
  },
  clickSelf: function (e) {
    this.setData({
      'otherInfo.deliveryWay': 'self'
    })
  },

  // 买家留言
  inputMessage: function(e) {
    this.setData({
      'otherInfo.message': e.detail.value
    })
    console.log(this.data)
  },

  // 提交订单，跳转到支付页面。
  commitOrder: function(e) {
    console.log('tijiao')
  },
  
  // 自定义函数 结束


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 从之前获得购买书籍列表，还要通过 缓存中的 openid请求后端并获取到 默认的收货地址等信息。
    console.log('ops:', JSON.parse(options.goodList))
    this.setData({
      goodList: JSON.parse(options.goodList)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    // 获取默认的 收货信息并更新到 视图上
    let callbackSuccess = function (res) {
      console.log(res)
      that.setData({
        deliveryInfo: res.data[0]
      })
      console.log(that.data.deliveryInfo)
    }
    // wx.getStorageSync('openid');
    util.myRequest('getDefaultAddress.php', { user_id: '0' }, 'GET', callbackSuccess);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})