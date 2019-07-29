// pages/good-detail/good-detail.js

// // 当前页面的 公共路径
const PRE_PATH = '../../images/good-detail/';
const util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前书籍的相关数据
    good: {
      // id: '16',
      src: 'test.png'
      // src: PRE_PATH+'good.png',
      // now_price: 15,
      // pre_price: 20,
      // sale_num: 20,
      // name: '高等数学(下) 陕西教育出版社'
    },
    // 推荐算法，myRecommendList =  热销书籍列表 +  停留时间最后最长的书籍列表
    myRecommendList: [
      // { id: '1', src: '/images/index/' + '1.png', name: '高等数学（上）', now_price: 15, sale_num: 20 },
      // { id: '2', src: '/images/index/' + '2.png', name: '高等数学（下）', now_price: 16, sale_num: 21 },
      // { id: '11', src: '/images/index/' + '3.png', name: '大学物理（上）', now_price: 17, sale_num: 22 },
      // { id: '12', src: '/images/index/' + '4.png', name: '大学物理（下）', now_price: 18, sale_num: 23 },
      // { id: '13', src: '/images/index/' + '5.png', name: '大学英语（上）', now_price: 19, sale_num: 24 },
    ]

  },

  // 自定义函数 开始


  // 点击右上角的 收藏 ，发起请求更新 数据库
  collectCurrentGood:function(e) {
    let callbackSuccess = function (res) {
      // console.log('collectCurrentGood:', res)
      if(parseInt(res.data) === -1) {
        util.myShowToast('已存在，插入失败~')
        return ;
      }
      util.myShowToast('插入成功！', 'success')
    }

    let good_id = this.data.good.id;
    util.myRequest('collectCurrentGood.php', {user_id: '0', good_id: good_id}, 'GET', callbackSuccess)
  },

  // 点击 最底下的购买按钮。将当前 good 书籍对象转成 goodList 数组形式，传给 order-confirm 页面的 onLoad()去处理
  buyCurrentGood: function(e) {
    // 当前 good对象 少了一个 num属性。
    this.setData({
      'good.good_num': 1
    })
    let goodList = new Array(this.data.good);
    console.log(goodList)

    util.myNavigateTo('../order-confirm/order-confirm', 'goodList=' + JSON.stringify(goodList))
  },

  // 调用打电话功能
  makePhoneCall: function(e) {
    wx.makePhoneCall({
      phoneNumber: '19995500687',
    })
  },

  getWechat: function(e) {
    util.myShowToast('负责人微信：ln1003594609', 'none', 1500);
  },
  // 自定义函数 结束

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('good-detail,goodId值：', options.goodId)
    var that = this;
    
    let callbackSuccess = function(res) {
      console.log(res)
      that.setData({
        good: res.data[0]
      })
    }
    // 拿到数据并请求后端 拿到最新的数据
    util.myRequest('searchByGoodId.php', { good_id: options.goodId }, 'GET', callbackSuccess = callbackSuccess)
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
    // "防大数据算法"，千人千面 ———— 筛选出用户停留时间 最长的前5本书籍，放入到 看看其他的列表中,更新 myRecommendList 的值
    let callbackSuccess = function (res) {
      console.log('ssacccsascsa', res)
      that.setData({
        myRecommendList: res.data
      })
      console.log(that.data)
    }

    // wx.getStorageSync('openid')
    util.myRequest('getMyRecommend.php', { user_id: '0' }, 'GET', callbackSuccess = callbackSuccess)
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