//选项卡
$('.lun > li').mouseover(function () {
    $('i').stop().animate({
      left: $(this).index() * 133
    })
})




//轮播图
var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay:{
        delay:1000
    },

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })        








//注册弹层
$(".deng").click(function(){
$(".dialog").show(100)
})

//弹层里面的效果
$('document').ready(function(){

// enable material-style inputs in entire body
$('body').materializeInputs();

});

$('document').ready(function(){

$('form').materializeInputs(".input-material input-1, .input-material input-2");

});

//取消弹窗
function qu(){
    $('.dialog').hide()
}







//登录与注册
var nameInp = document.querySelector('.username')
var passInp = document.querySelector('.password')


var form = document.querySelector('form')
form.onsubmit = function(e){
    e =e || window.event

    e.preventDefault()
   

    var uname = nameInp.value
    var upass = passInp.value


    //发送请求
    var xhr = new XMLHttpRequest()

    xhr.open('POST','../login/login.php')

    xhr.onload = function(){
        // console.log(JSON.parse(xhr.responseText))

        var res = JSON.parse(xhr.responseText)

        if(res.code ===0 ){
            alert('用户名或密码错误')
        }else{
            setCookie('login','1',60 * 60 * 24 * 7)
            window.location.href = '../pages/cart.html'
        }

        // if(xhr.responseText === '登录成功'){
        //     window.location.href = '../pages/cart.html'
        // }else{
        //     alert('用户名密码错误')
        // }
    }

    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')

    xhr.send(`username=${uname}&password=${upass}`)

}





getList()
function getList(){
$.ajax({
    url:'../lib/lie.json',
    dataType:'json',
    success:function(res){
      let str = ''

      res.forEach(function(item){
        str += `
          <li>
            <p><img src=${item.list_url} alt=""></p>
            <p>${item.list_name}</p>
            <p>${item.list_price}</p>
          </li>
        `
      })
      $('.nn > ul').html(str)


    }
  })
}



 