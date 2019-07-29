// pages/edit-address/edit-address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 顶部的收货信息
    delivery: {
      name: '初始的name我要溢出我要溢出我要溢出我要溢出我要溢出我要溢出',
      phone: 100000000,
      address: '初始的address'
    },

    // 标识 是否当前设为 默认地址,默认不设置为 默认地址（true 才是设为 默认地址）
    setToDefaultFlag: false,
  },

  // 自定义函数 开始 

  // 其实可以将 inputName、inputPhone、inputAddress 进行封装（因为共性较多），但是 这样代码复用率 也不算太高，所以 不做封装
  // 不断更新 name 值
  inputName: function(e) {
    this.setData({
      'delivery.name': e.detail.value
    })
  },

  // 不断更新 phone 值
  inputPhone: function (e) {
    this.setData({
      'delivery.phone': e.detail.value
    })
  },

  // 不断更新 address 值
  inputAddress: function (e) {
    this.setData({
      'delivery.address': e.detail.value
    })
    
    // console.log(this.data)
  },

  // 在 是否设置为默认地址 来回切换
  changeSwitch: function(e) {
    this.setData({
      setToDefaultFlag: e.detail.value
    })
  },

  // 点击删除 当前地址 ，如果是存在于 数据库就将其删掉，以 toast 形式显示 操作结果
  deleteCurrentAddress: (e) => {
    console.log('点击删除地址')

  },

  // 点击保存 按钮 ，根据当前情况（是否设为默认地址，应该还要进行 ”数据域” 合法性的判断） 进行 数据库操作，并以 toast 形式进行 显示操作结果
  save: (e) => {
    console.log('点击保存')
  },


  // 自定义函数 结束


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('ops:', JSON.parse(options.delivery))
    // 从 my-address 中，点击 编辑 或者 新增 后，携带过来的数据 
    this.setData({
      delivery: JSON.parse(options.delivery)
    })
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