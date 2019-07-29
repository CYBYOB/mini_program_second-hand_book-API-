// 4.30

// url 的共同前缀,抽象出来便于维护等
const PRE_URL = 'https://www.520cyb.cn/mini/book_shop/'


// 对请求 wx.request 进行封装，简约、直观，便于维护等.header一般不回去动吧？？
function myRequest(url, data, method = 'GET', callbackSuccess, callbackFail=function(){console.error('fail')}) {
  wx.request({
    url: PRE_URL + url,
    data: data,
    method: method,

    success: function (res) {
      if (typeof callbackSuccess === 'function') {
        callbackSuccess(res)
      }
    },
    fail: function () {
      if (typeof callbackFail === 'function') {
        callbackFail()
      }
    },
    // 不关心 complete
    // complete: function () {
    //   if (typeof callbackComplete === 'function') {
    //     callbackComplete()
    //   }
    // },
  })
}


// 对 wx.navigateTo 进行封装,
// pageUrl: 跳转的页面路径， data: 传给新页面的参数（json字符串），其实不用判断是否有携带参数 data ,影响不大
function myNavigateTo(pageUrl, data) {
  wx.navigateTo({
    url: pageUrl+'?' + data
  })
}

// 对 wx.RedirectTo 进行封装,
// pageUrl: 跳转的页面路径， data: 传给新页面的参数（json字符串），其实不用判断是否有携带参数 data ,影响不大
function myRedirectTo(pageUrl, data) {
  wx.navigateTo({
    url: pageUrl + '?' + data
  })
}

// 对 wx.showToast 进行封装, title 提示的内容 默认为空，icon 默认没有，duration 默认 1秒
function myShowToast(title = '', icon = 'none', duration=1000){
  wx.showToast({
    title: title,
    icon: icon,
    duration: duration
  })
}


module.exports = {
  myRequest: myRequest,
  myNavigateTo: myNavigateTo,
  myRedirectTo: myRedirectTo,
  myShowToast: myShowToast,
}