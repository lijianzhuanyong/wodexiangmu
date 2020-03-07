
var flag = true;

var list2 = [];

getList()
function getList(){
$.ajax({
    url:'../lib/lie.json',
    dataType:'json',
    success:function(res){


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

          bindHtml(res.slice(0, 12))

          list2 = res
        }
    })

}

function bindHtml(list) {
    list.forEach(item => {
        str += `
            <li class="goods1">
                <img src="${item.list_url}">
                <p>${item.list_name}</p>
                <p class="yuan">￥${item.list_price}</p>
            </li> 
        `
      })

      $('#goods').html(str)
}

var btn = document.querySelector('.sort')
btn.onclick = function(){
    flag = !flag

    list2.sort(function(a, b){
        if(flag === true){
          return a.list_price - b.list_price
        }else{
          return b.list_price - a.list_price
        }
      })


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
          // api.getCurrent() 获取当前是第几页
          // console.log(api.getCurrent())
          let curr = api.getCurrent()

          //   console.log(curr)
          // 根据是第几页, 从我的总数组里面筛选出一部分数据
          //   slice 方法包前不包后
          var list = list2.slice((curr - 1) * 12, curr * 12)
          // console.log(list)
          // slice 不改变原始数组, 只是从数组里面拿到一些内容
          // splice 方法才是改变原始数组, 从原始数组里面删除

          // 3-2. 每次使用分页器切换的时候渲染一次
          bindHtml(list)
        }
      })
      bindHtml(list2.slice(0, 12))
}