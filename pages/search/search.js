// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [
      { id: '高等数学', name: '高等数学' },
      { id: '高等物理', name: '高等物理' },
      { id: '大学物理', name: '大学物理' },
      { id: '大学英语', name: '大学英语' },
      { id: '高等数学是水水水水所所', name: '高等数学是水水水水所所' },
      { id: '高等数学俺水槽扫超市从', name: '高等数学俺水槽扫超市从' },
      { id: '高等数学', name: '高等数学' },
      { id: '高等数学', name: '高等数学' },
      { id: '高等数学', name: '高等数学' },
    ]
  },

  // 自定义函数 开始

  // 点击搜索按钮(提交关键字) 或者 按下“回车键”
  myConfirmByKeyword: function (e) {
    // console.log('search页面中的confirmByKeyword触发了')
    // console.log('传过来的e: ', e)
    this.searchByKwyword(e.detail.keyword)
  },

  // 点击了下面的搜索历史框，更新 keyword 并发起请求
  confirmByhistoryItem: function (e) {
    // console.log(e)
    this.searchByKwyword(e.target.id)
  },

  // 抽象、封装。无论是 通过输入关键字、在按搜索按钮（“回车”） 还是直接点击历史搜索记录，都会触发以下函数
  searchByKwyword: function(keyword) {
    const util = require('../../utils/util.js')
    // 成功获取到搜索结果，携带 搜索结果数据跳转到 search-result页面
    let callbackSuccess = function(res) {
      console.log((res.data))
      util.myNavigateTo('/pages/search-result/search-result', 'searchResultList=' + JSON.stringify(res.data))
    }
    util.myRequest('searchByKeyword.php', { keyword: keyword }, 'GET', callbackSuccess = callbackSuccess)
  },

  clearSearchOfHistory: function(e) {
    this.setData({
      historyList: []
    })
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