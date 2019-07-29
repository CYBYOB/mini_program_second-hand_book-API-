// pages/my-address/my-address.js

const util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [
      { name: '名字一', phone: 1234561, address: '地址一我要溢出我要溢出我要溢出我要溢出我要溢出我要溢出我要溢出', default_flag: 1 },
      { name: '名字二', phone: 1234562, address: '地址二', default_flag: 0 },
      { name: '名字三', phone: 1234563, address: '地址三', default_flag: 0 },
      { name: '名字四', phone: 1234564, address: '地址四', default_flag: 0 },
    ]
  },

  // 自定义函数 开始

  editCurrentAddress: (e) => {
    // console.log(JSON.parse(e.currentTarget.dataset.delivery))

    // 携带 delivery空值 并跳转到 edit-address 页面
    util.myNavigateTo('/pages/edit-address/edit-address', 'delivery=' + JSON.stringify(JSON.parse(e.currentTarget.dataset.delivery)))
  },
  
  // 点击 新增按钮 , 携带空值 并跳转到 edit-address 页面
  addNewAddress: function(e) {
    let delivery = new Object();
    delivery.name = '',
    delivery.phone = '',
    delivery.address = '',

    console.log(delivery)
    // 携带 delivery空值 并跳转到 edit-address 页面
    util.myNavigateTo('/pages/edit-address/edit-address', 'delivery=' + JSON.stringify(delivery))
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