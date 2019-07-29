// components/search/search.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 搜索关键字
    keyword: '',

    // 关键字候选，快人一步。后续会根据近期热搜生成，动态录入数据库以便读取。
    keywordConstList: ['高等数学', '大学物理', '大学英语','C','线性代数'],
    keywordList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 搜索关键字不断被更新,也不断地 更新 候选关键字数组的值
    inputKeyword: function(e) {
      console.log('search组件：e:', e, ' this.data值:', this.data)
      // 保存最新的关键词、候选关键数组
      let nowKeyword = e.detail.value;
      let nowKeywordList = [];

      let constList = this.data.keywordConstList;
      let i;
      for (i = 0; i < constList.length; i++) {
        // 候选数组的元素 包含用户输入的关键字，就放入 候选关键数组 中
        console.log(constList[i]);
        if (constList[i].indexOf(nowKeyword) != -1) {
          console.log(i);
          nowKeywordList.push(constList[i]);
        }
      }

      this.setData({
        keyword: nowKeyword,
        keywordList: nowKeywordList
      })
    },

    // 点击搜索按钮(提交关键字) 或者 按下“回车键”,触发 confirmByKeyword 事件，交给 search 页面去处理
    confirmByKeyword: function(e) {
      console.log('组件search中的confirmByKeyword触发了')
      this.triggerEvent('myConfirmByKeyword', { keyword: this.data.keyword})
    },

    // 通过 “快人一步、传送门” 点击进去的
    confirmByShortcut: function(e) {
      console.log(e);
      this.triggerEvent('myConfirmByKeyword', { keyword: e.currentTarget.dataset.keyword })
    }
  }
})
