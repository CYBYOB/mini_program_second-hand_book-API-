// pages/mixture/mixture.js

const PRE_PATH = '../../images/mixture/'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 默认展示 活动 的页面
    isActivityShow: false,
    // 活动图文列表，先写死，后面会从后端去获取
    activityList: [
      { id: 'activity_1', src: PRE_PATH + 'activity.png', title: '活动标题1' },
      { id: 'activity_2', src: PRE_PATH + 'activity.png', title: '活动标题2' },
      { id: 'activity_3', src: PRE_PATH + 'activity.png', title: '活动标题3' }
    ],
    // 礼包图文列表
    packList: [
      { id: 'pack_1', src: PRE_PATH + 'pack.png', title: '礼包1' },
      { id: 'pack_2', src: PRE_PATH + 'pack.png', title: '礼包2' },
      { id: 'pack_3', src: PRE_PATH + 'pack.png', title: '礼包3' }
    ],

    // 3个过滤器。默认选中下标为 0 ，即 默认选中 全部，不筛选~
    filterList: [
      { title: '学院', range: ['全部', '计院', '通院', '电院', '机电院', '物光院'], checked: 0 },
      { title: '年级', range: ['全部', '大一', '大二', '大三'], checked: 0 },
      { title: '学期', range: ['全部', '上学期', '下学期'], checked: 0 },
    ],
    // 控制 过滤器框的 显示 与 隐藏
    isClickFilter: true,
  },


  // 自定义函数 开始
  // 在 活动、礼包 中来回切换
  changeActivityShowState: function(e) {
    console.log(e)
    // 所点击的状态,s status的取值范围为 activity 或者 pack
    let status = e.currentTarget.dataset.status;
    this.setData({
      isActivityShow: status === 'activity'? true : false
    })
  },

  // 点击了过滤器图标, isClickFilter 设置为 true ,等到 过滤器框里面 点击了 确定按钮 在设置为 false。
  // 以完成对 过滤器框的 显示 与 隐藏
  clickFilter: function(e) {
    this.setData({
      isClickFilter: true
    })
  },


  changeSelectedItem: function(e) {
    console.log(e)
    // 根据 data- 里面传进来的 type、index 进行拼接，以确定是点击了哪一个并进行 数据的更新
    var dataset = e.currentTarget.dataset;
    var selectedIndex = 'filterList[' + dataset.outeridx + '].checked';
    this.setData({
      [selectedIndex]: dataset.index
    })
  },

  // 点击了重置 按钮， 3个过滤器的 checked均 设为 0、变成了选择全部
  clickReset:function(e) {
    this.setData({
      'filterList[0].checked': 0,
      'filterList[1].checked': 0,
      'filterList[2].checked': 0,
      
    })
  },

  // 点击 确定按钮，筛选出 符合条件的 礼包,并且隐藏 过滤器框
  clickConfirm: function(e) {
    this.setData({
      isClickFilter:false
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