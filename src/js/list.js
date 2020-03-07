

var flag = true;

var list2 = [];

getList()
function getList(){
$.ajax({
    url:'../lib/lie.json',
    dataType:'json',
    success:function(res){
        // console.log(res)

          // 2. 渲染分页器
          $('.pagi').pagination({
            pageCount: Math.ceil(res.length / 12), // 总页数
            current: 1, // 当前页
            jump: true,
            coping: true,
            homePage: '首页', // 首页按钮的文本
            endPage: '末页', // 末页按钮的文本
            prevContent: '上页',
            nextContent: '下页',
            callback: function (api) { // 当你切换页面的时候会触发
              // api.getCurrent() 获取当前是第几页
              // console.log(api.getCurrent())
              let curr = api.getCurrent()

            //   console.log(curr)
              // 根据是第几页, 从我的总数组里面筛选出一部分数据
              //   slice 方法包前不包后
              var list = res.slice((curr - 1) * 12, curr * 12)
              // console.log(list)
              // slice 不改变原始数组, 只是从数组里面拿到一些内容
              // splice 方法才是改变原始数组, 从原始数组里面删除

              // 3-2. 每次使用分页器切换的时候渲染一次
              bindHtml(list)
            }
          })
          // 3. 先把第一页的数据渲染一次
          bindHtml(res.slice(0, 12))

          list2 = res
     }
  })
}
function bindHtml(list) {
  // console.log(list)
  // 根据 list 数组渲染页面就可以了
  let str = ''

  list.forEach(item => {
    str += `
        <li data-id="${item.list_id}" class="goods1">
            <img src="${item.list_url}">
            <p>${item.list_name}</p>
            <p class="yuan">￥${item.list_price}</p>
        </li> 
    `
  })

  $('#goods').html(str)
}

//排序
var btn = document.querySelector('.sort')
btn.onclick = function(){
    flag = !flag
    // console.log(flag)
    // console.log(list)
    list2.sort(function(a, b){
      if(flag === true){
        return a.list_price - b.list_price
      }else{
        return b.list_price - a.list_price
      }
    })

    // console.log(list)

     // 2. 再次重新渲染页面
     $('.pagi').pagination({
      pageCount: Math.ceil(list2.length / 12), // 总页数
      current: 1, // 当前页
      jump: true,
      coping: true,
      homePage: '首页', // 首页按钮的文本
      endPage: '末页', // 末页按钮的文本
      prevContent: '上页',
      nextContent: '下页',
      callback: function (api) { // 当你切换页面的时候会触发
        
        let curr = api.getCurrent()

      
        var list = list2.slice((curr - 1) * 12, curr * 12)
       
        bindHtml(list)
      }
    })
    // 3. 先把第一页的数据渲染一次
    bindHtml(list2.slice(0, 12))
}



//跳转页面
//事件委托绑定一个事件
$('#goods').on('click','li',function(){
  const id=$(this).data('id')
  // console.log(id)
  // console.log('我应该找到list2这个数组中id为'+id+'的那条数据')

  let data = {}

  for(let i=0; i<list2.length; i++){
    if(list2[i].list_id === id){
      data = list2[i]
      break
    }
  }

    localStorage.setItem('goods_info',JSON.stringify(data))

    window.location.href = '../pages/detail.html'

})


//回到顶端
  // 1. 通过浏览器卷去的高度来决定按钮显示和隐藏
    //    需要一个浏览器的滚动事件
    $(window).scroll(() => {
      // 通过判断卷去的高度来决定
      if ($(window).scrollTop() >= 300) {
        // 让回到顶部按钮显示
        $('.goTop').fadeIn()
      } else {
        // 让回到顶部按钮隐藏
        $('.goTop').fadeOut()
      }
    })

    // 2. 点击按钮的时候让页面回到顶部
    $('.goTop').click(() => {
      // 让页面回到顶部 -> 滚回去
      //   让页面滚回去, 需要用到 animate() 函数
      //   滚动的不是窗口, 是页面
      //   所以我们是在这里让 页面的 scrollTop 变成 0
      $('html').animate({
        scrollTop: 0
      }, 1000)

      // animate 是要操作元素的
      // document 是根节点 不是 元素
      // html 是根元素节点
    })


        
