// components/good-list.js

// 当前面的 路径前缀
const PRE_PATH = '/images/index/';
const util = require('../../utils/util.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodList: {
      type: Array,
      value: [{ id: 'book1', src: PRE_PATH + '1.png', name: '高等数学（上）', now_price: 15, sale_num: 20 },
      { id: 'book2', src: PRE_PATH + '2.png', name: '高等数学（下）', now_price: 16, sale_num: 21 }],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      
    // 携带 goodId 重定向到商品详情页
    redirectToGoodDetail: function (e) {
      console.log(e)
      util.myRedirectTo('/pages/good-detail/good-detail', 'goodId=' + e.currentTarget.id)
      // this.triggerEvent('navigateToGoodDetail', { goodId: e.currentTarget.id })
    },
  }
})
