// pages/cyb/cyb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageList: [
      { name: 'order-confirm' },
      { name: 'good-detail' },
      { name: 'index' },
      { name: 'my-collect' },
      { name: 'my-order' },
      { name: 'edit-address' },
      { name: 'my-address' },
      { name: 'me' },
      { name: 'search' },
      { name: 'search-result' },
    ]
  },

  // 自定义函数 开始
  navigateToPage: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../' + e.currentTarget.id + '/' + e.currentTarget.id,
    })
  },

  // 自定义函数结束

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