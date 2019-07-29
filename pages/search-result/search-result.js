// pages/search-result/search-result.js


const PRE_PATH = '../../images/index/';
const compare = require('../../utils/compare.js');
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 销量的 picker 相关数据
    saleList: {
      range: ['销量', '从低到高', '从高到低'],
      index: 0,
    },
    // 价格的 picker 相关数据
    priceList: {
      range: ['价格', '从低到高', '从高到低'],
      index: 0,
    },
    // 上一次的 销量、价格 排序情况
    preSortIndex: {
      saleIndex: 0,
      priceIndex: 0,
    },

    // 搜索结果的渲染列表
    searchResultList: [
      { id: '1', src: PRE_PATH + '1.png', name: '高等数学（上）', now_price: 15, sale_num: 20 },
      { id: 'book2', src: PRE_PATH + '2.png', name: '高等数学（下）', now_price: 16, sale_num: 21 },
      { id: 'book1', src: PRE_PATH + '3.png', name: '大学物理（上）', now_price: 17, sale_num: 22 },
      { id: 'book2', src: PRE_PATH + '4.png', name: '大学物理（下）', now_price: 18, sale_num: 23 },
      { id: 'book1', src: PRE_PATH + '5.png', name: '大学英语（上）', now_price: 19, sale_num: 24 },
    ]
  },


  // 自定义函数 开始
  // 点击搜索按钮(提交关键字) 或者 按下“回车键”
  myConfirmByKeyword: function (e) {
    // 解决小程序 回调函数中 ，数据异步更新的问题
    var that = this;
    // 拿到关键字 keyword 并向后端发起请求
    let callbackSuccess = function(res) {
      console.log(res)
      that.setData({
        searchResultList: res.data
      })
    }
    util.myRequest('searchByKeyword.php', { keyword: e.detail.keyword }, 'GET', callbackSuccess = callbackSuccess)
  },

  // 更改的 销量的排序 方式，需要进行判断 是否真的改变了（即跟上一次的排序方式不一样！！）
  sortChangeBySale: function (e) {
    this.setData({
      'preSortIndex.saleIndex': this.data.saleList.index,
      'saleList.index': parseInt(e.detail.value)
    })

    console.log(this.data)
    // 如果排序方式真的改变了且当前下标不为0才执行
    if (this.data.saleList.index !== this.data.preSortIndex.saleIndex && this.data.saleList.index !== 0) {
      console.log('销量排序方式真的变了！')
      this.setData({
        // 第二个参数ascDescFlag ：1升序 -1降序
        searchResultList: this.data.searchResultList.sort(compare.compareByNumber('sale_num', (this.data.saleList.index === 1 ? 1 : -1)))
      })
      console.log(this.data.searchResultList)
    }
  },


  // 更改的 价格的排序 方式，需要进行判断 是否真的改变了（即跟上一次的排序方式不一样！！）
  sortChangeByPrice: function (e) {
    this.setData({
      'preSortIndex.priceIndex': this.data.priceList.index,
      'priceList.index': parseInt(e.detail.value)
    })

    console.log(this.data)
    // 如果排序方式真的改变了且当前下标不为0才执行
    if (this.data.priceList.index !== this.data.preSortIndex.priceIndex && this.data.priceList.index !== 0) {
      console.log('销量排序方式真的变了！')
      this.setData({
        // 第二个参数ascDescFlag ：1升序 -1降序
        searchResultList: this.data.searchResultList.sort(compare.compareByNumber('now_price', (this.data.priceList.index === 1 ? 1 : -1)))
      })
      console.log(this.data.searchResultList)
    }
  },

  // 自定义函数 结束


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 可能搜索结果为空，需要弹出提示框
    if (0 === JSON.parse(options.searchResultList).length) {
      // 默认无图标，duration 为 1秒
      util.myShowToast('搜索结果为空，换个姿势试试~')
    }
    this.setData({
      searchResultList: JSON.parse(options.searchResultList)
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