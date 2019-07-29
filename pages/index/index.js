// pages/index/index.js

// 当前面的 路径前缀
const PRE_PATH = '/images/index/';
const util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图 列表
    carouselList: [
      { id: 1, src: PRE_PATH + 'carousel-img-1.png' },
      { id: 2, src: PRE_PATH + 'carousel-img-2.png' },
      { id: 3, src: PRE_PATH + 'carousel-img-3.png' },
    ],

    // 学院列表
    academyList: [
      { id: 0, title: '计', name: '计院' },
      { id: 1, title: '通', name: '通院' },
      { id: 2, title: '电', name: '电院' },
      { id: 3, title: '机', name: '机电院' },
      { id: 4, title: '物光', name: '物光院' },
      { id: 5, title: '公共', name: '公共' },
      { id: 6, title: '课外', name: '课外书' },
      { id: 7, title: '其他', name: '其他书' },
    ],

    // 热销书籍 列表
    hotSaleList: [
      // { id: '1', src: PRE_PATH + '1.png', name: '高等数学（上）', now_price: 15, sale_num: 20 },
      // { id: '2', src: PRE_PATH + '2.png', name: '高等数学（下）', now_price: 16, sale_num: 21 },
      // { id: '11', src: PRE_PATH + '3.png', name: '大学物理（上）', now_price: 17, sale_num: 22 },
      // { id: '12', src: PRE_PATH + '4.png', name: '大学物理（下）', now_price: 18, sale_num: 23 },
      // { id: '13', src: PRE_PATH + '5.png', name: '大学英语（上）', now_price: 19, sale_num: 24 },
    ]
  },

  // 自定义函数 开始
  // 点击顶部的搜索框,跳转到 搜索页面
  searchByKeyword: () => {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 点击 学院 ，展示不同的书院书籍列表
  searchByAcademyId: function(e) {
    console.log('searchByAcademyId的 e:', e)

    // 成功获取到搜索结果，携带 搜索结果数据 并跳转到 search-result页面
    let callbackSuccess = function (res) {
      console.log((res.data))
      util.myNavigateTo('/pages/search-result/search-result', 'searchResultList=' + JSON.stringify(res.data))
    }
    
    util.myRequest('searchByAcademyId.php', { academic_id: e.currentTarget.id }, 'GET', callbackSuccess = callbackSuccess)
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
    // 获得 热销书籍列表,不写在 onLoad是因为 可能用户再次访问时，热销书籍已经在数据库中刷新~
    let callbackSuccess = function (res) {
      console.log((res.data))
      that.setData({
        hotSaleList: res.data
      })
    }

    util.myRequest('getHotSale.php', { }, 'GET', callbackSuccess = callbackSuccess)
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