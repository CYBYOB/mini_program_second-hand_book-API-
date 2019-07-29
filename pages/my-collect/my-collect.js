// pages/my-collect/my-collect.js

// 测试的公共文件路径
const PRE_PATH = '../../images/index/';
const util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList: [
      // { id: '0', src: PRE_PATH + 'good-1.png', name: '高等数学（上）', now_price: 15, good_num: 1 },
      // { id: '1', src: PRE_PATH + 'good-1.png', name: '高等数学（下）', now_price: 16, good_num: 2 },
      // { id: '2', src: PRE_PATH + 'good-1.png', name: '高等数学（上）', now_price: 15, good_num: 1 },
      // { id: '3', src: PRE_PATH + 'good-1.png', name: '高等数学（下）', now_price: 16, good_num: 2 },
      // { id: '4', src: PRE_PATH + 'good-1.png', name: '高等数学（上）', now_price: 15, good_num: 1 },
      // { id: '5', src: PRE_PATH + 'good-1.png', name: '高等数学（下）', now_price: 16, good_num: 2 },
    ],

    // selectedList 保存当前的选中状态,默认为 未选中状态
    selectedList: [],
    // selectedList: [false, false, false, false, false, false],
    
    // 其他信息，比如 是否全选、总价格
    otherInfo: {
      isAllSelect: false,
      totalPrice: 0,
    }

  },

  // 自定义函数 开始

  // 计算总价，封装起来，因为 无论哪一个商品进行 数量或者选择的操作，都会触发 总价钱的变化！
  getTotalPrice: function () {
    let collectList = this.data.collectList;
    let selectedList = this.data.selectedList;

    let total = 0;
    for (var i = 0; i < collectList.length; i++) {
      // 选中的才能计入总价钱
      if(selectedList[i] === true){
        let good = collectList[i];
        total += (good.now_price * good.good_num)
      }
    }
    console.log(total)
    this.setData({
      'otherInfo.totalPrice': total
    })
  },

  // 单选当前的 商品
  clickSelectIcon: function(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      ['selectedList[' + index + ']']: !(this.data.selectedList[index])
    })
    console.log(this.data)
    this.getTotalPrice();
  },

  // 全选全部的商品,先要判断 当前全选的 状态
  clickAllSelect: function(e) {
    let length = this.data.collectList.length;
    let isAllSelect = this.data.otherInfo.isAllSelect;

    // 之前 已经全选，再次点击的话 那就全部取消 选中状态
    if(isAllSelect === true) {
      this.setData({
        ['otherInfo.isAllSelect']: false,
      })
      for (var i = 0; i < length; i++) {
        this.setData({
          ['selectedList[' + i + ']']: false,
        })
      }
    }
    else {
      this.setData({
        ['otherInfo.isAllSelect']: true,
      })
      for (var i = 0; i < length; i++) {
        this.setData({
          ['selectedList[' + i + ']']: true,
        })
      }
    }
    this.getTotalPrice();
  },

  // 数量的 -- , 当前 num 等于 1 时就能进行 -- ！！
  clickMinus: function (e) {
    let index = e.currentTarget.dataset.index;
    let num = parseInt(this.data.collectList[index].good_num);
    if (num <= 1) {
      util.myShowToast('商品数量不能小于1~', 'none', 1000);
      return;
    }
    else {
      this.setData({
        ['collectList[' + index + '].good_num']: num - 1
      })
      this.getTotalPrice();
    }
  },

  // 数量的 ++ , 加到 10就不能加了，如果大量购买应该当面联系
  clickAdd: function (e) {
    let index = e.currentTarget.dataset.index;
    let num = parseInt(this.data.collectList[index].good_num);
    if (num >= 10) {
      util.myShowToast('大量购买请当面联系哦~', 'none', 1500);
      return;
    }
    else {
      this.setData({
        ['collectList[' + index + '].good_num']: num + 1
      })
      this.getTotalPrice();
    }
  },

  // 二次确认了将选中的商品 id、user_id等 发送给后端
  deleteSelect: function() {
    let selectedList = this.data.selectedList;
    let collectList = this.data.collectList;
    // 含删除项 才为 true
    let flag = false;

    // 判断是否真的存在删除项目,只有真的有删除项才能进行 删除
    for(let i=0; i < selectedList.length; i++) {
      console.log(selectedList[i])
      if(selectedList[i] === true) {
        flag = true;
        break;
      }
    }
    // 不含删除项，不可以进行删除操作
    if (!flag) {
      util.myShowToast('删除项不能为空哦~', 'none', 1000);
    }

    // 执行到这里，说明 含 删除项
    let deleteItemsId = [];
    for(let i=0; i < selectedList.length; i++) {
      if(selectedList[i] === true) {
        deleteItemsId.push(collectList[i].id)
      }
    }
    console.log(deleteItemsId)
    let callbackSuccess = function (res) {
      console.log(res)
      
    }
    util.myRequest('deleteMyCollect.php', { user_id: wx.getStorageSync('openid'), deleteItemsId: JSON.stringify(deleteItemsId) }, 'GET', callbackSuccess);
  },

  // 点击删除按钮,会有二次确认以确保不是误删！
  clickDelete: function(e) {
    let that = this;
    wx.showModal({
      title: '删除',
      content: '确定删除选中的收藏？',
      success(res) {
        // 二次确认删除，执行删除操作
        if (res.confirm) {
          that.deleteSelect()
        } else if (res.cancel) {
          util.myShowToast('取消删除成功', 'success', 1500);
        }
      }
    })
  },
  
  // 点击购买按钮。跳转到到 订单确认页面 并携带选中的商品列表
  clickBuy: function(e) {
    let goodList = [];
    let collectList = this.data.collectList;
    let selectedList = this.data.selectedList;

    for (let i = 0; i < collectList.length; i++) {
      if (selectedList[i]) {
        goodList.push(collectList[i])
      }
    }
    util.myNavigateTo('/pages/order-confirm/order-confirm', 'goodList=' + JSON.stringify(goodList))
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
  // 每次进入收藏列表，就通过 user_id 获取到其所收藏的 书籍，并更新 collectList值
  onShow: function () {
    let that = this;
    let callbackSuccess = function (res) {
      console.log(res)
      that.setData({
        collectList: res.data
      })
    }
    util.myRequest('getMyCollect.php', { user_id: wx.getStorageSync('openid') }, 'GET', callbackSuccess);
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