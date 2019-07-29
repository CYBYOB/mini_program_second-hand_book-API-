// pages/feedback/feedback.js

const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 反馈的 类型选择 —— 暂时仅支持BUG、建议、意见
    type: {
      range: ['问题BUG', '建议', '意见'],
      index: 0
    },

    // 其他信息，比如 反馈的内容、联系电话，联系电话可能后续收集了参与抽奖，反送书籍等
    otherInfo: {
      content: '',
      phone: ''
    }
  },

  // 自定义函数 开始
  // 更改反馈类型
  changeType: function(e) {
    console.log(e)
    this.setData({
      'type.index': e.detail.value
    })
  },

  // 输入反馈的内容
  inputContent: function(e) {
    this.setData({
      'otherInfo.content': e.detail.value
    })
  },

  // 点击添加 图片 和 文字说明
  clickPicDesc: function(e) {
    util.myShowToast('后续版本中即将开放~', 'none', 1500);
  },

  // 填写 联系电话，选填。因为为选填，所以其合法性不进行判断
  inputPhone: function(e) {
    this.setData({
      'otherInfo.phone': e.detail.value
    })
  },

  // 点击提交按钮，反馈内容不可为空！！将 用户id，反馈类型，反馈内容，等发送给后端
  clickCommit: function(e) {
    console.log(this.data);
    // 反馈内容不能为空
    if (this.data.otherInfo.content.length === 0) {
      util.myShowToast('反馈内容不能为空！', 'none', 1500);
      return ;
    }

    // 将相关数据发送给后端函数
    this.sendFeedback();
  },

  // 发送反馈内容的具体函数实现
  sendFeedback: function(e) {
    let callbackSuccess = function (res) {
      console.log(res);
      if (res.data === "insert success") {
        util.myShowToast('提交成功！', 'success', 1000);
      }
    }
    // 延缓一下，插入徐需要一点点时间
    util.myShowToast('提交中...', 'loading', 1000);
    let user_id = wx.getStorageSync('openid');
    let type = this.data.type.index;
    let content = this.data.otherInfo.content;
    let phone = this.data.otherInfo.phone;
    util.myRequest('commitFeedback.php', { user_id: user_id, type: type, content: content, phone: phone }, 'GET', callbackSuccess)
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