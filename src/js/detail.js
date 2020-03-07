
//搜索栏效果
   // js的组成：ECMAScript + DOM + BOM
   var textValue = document.querySelector('.search_text');
   var search_boxDom = document.querySelector('.search_box');

   // 事件：第三的周一周二
   search_boxDom.onmouseenter = function () {
       textValue.style.width = 440 + 'px';
       // textValue.focus();//自动获取焦点
   }

   search_boxDom.onmouseleave = function () {
       if (textValue.value == "" && document.activeElement != textValue) {
           textValue.style.width = 0 + 'px';
       }
   }

   textValue.onblur = function () {
       if (textValue.value == "") {
           textValue.style.width = 0 + 'px';
       }
   }






//导航栏效果
getList()
    function getList(){
    $.ajax({
        url:'../lib/nav_top.json',
        dataType:'json',
        success:function(res){
            console.log(res)

            //准备一个空字符串
            let str = ''

            //渲染一级菜单
            res.forEach(item => {
                str += `<li><a>${item.name}</a></li>`
            })
    
            //渲染到哪个位置
            $('#header2 > .top2 > ul')
            .html(str)
            //鼠标放进滑下
            
           
            // 使用了一个 叫做  nav 的变量
            // 但是你前面没有定义过 nav 这个变量
            // console.log(nav) // 这个变量
            .on({
                mouseenter: () => $('#nav').stop().slideDown(),
                mouseleave: () => $('#nav').stop().slideUp()
            })
            .children('li')
            .on('mouseover',function(){
                
                const index = $(this).index()
                
                const list = res[index].list
                
                let str = ''


                list.forEach(item => {
                    str += `
                        <li>
                            <img src="${item.list_url}" alt="">
                            <p class="title">${item.list_name}</p>
                            <span class="price">${item.list_price}</span>
                        </li>
                    `
                  })
                  
                $('#nav > ul').html(str)

            })

            $('#nav')
            .on({
                mouseover: function(){ $(this).finish().show()},
                mouseout:function(){ $(this).finish().slideUp()}
            })



        }
    })
  }





  //放大镜效果
  class Enlarge {
    constructor(ele) {
        this.ele = document.querySelector(ele);
        this.init()
    }
    init() {
        // 需要获取什么元素
        this.show = this.ele.querySelector('.show');
        this.mask = this.ele.querySelector('.mask');
        this.enlarge = this.ele.querySelector('.enlarge');

        // 鼠标移入show盒子，显示mask 和enlarge
        this.show.onmouseover = () => {
            this.mask.style.display = this.enlarge.style.display = 'block';
            this.setStyle();
            this.move()
        }
        // 鼠标移出show盒子，隐藏mask 和enlarge
        this.show.onmouseout = () => {
            this.mask.style.display = this.enlarge.style.display = 'none'
        }

        // 获取小图的标签，并且绑定点击事件？
        this.p = this.ele.querySelector('.list').children;
        let _this = this;
        for (let i = 0; i < this.p.length; i++) {
            this.p[i].onclick = function () {
                _this.change(this);
            }
        }


    }
    setStyle() {
        // 设置放大镜盒子的大小
        // 放大镜盒子的大小 = 遮罩层盒子的大小 * 放大镜盒子背景图的大小 / show盒子的大小

        // 遮罩层盒子的大小
        this.maskWidth = this.mask.offsetWidth;
        this.maskHeight = this.mask.offsetHeight;

        // 放大镜中背景的尺寸
        this.bgx = parseInt(getStyle(this.enlarge, 'background-size').split(' ')[0])
        this.bgy = parseInt(getStyle(this.enlarge, 'background-size').split(' ')[1])

        // show盒子的大小
        this.showWidth = this.show.clientWidth;
        this.showHeight = this.show.clientHeight;

        let enlargeX = this.maskWidth * this.bgx / this.showWidth;
        let enlargeY = this.maskHeight * this.bgy / this.showHeight;

 


        this.enlarge.style.width = enlargeX + 'px';
        this.enlarge.style.height = enlargeY + 'px';

    }
    move() {
        // 改变遮罩层的位置 和 放大镜背景图的位置
        this.show.onmousemove = (e) => {
            /* 
                获取光标位置：
                e.clientX 光标在浏览器可是区域的位置
                e.offsetX 光标在 元素上的位置

                光标在this.show 盒子上的位置

                获取元素的偏移量：
                    距离最左边的位置的距离 offsetLeft
                    离最上边的位置的距离   offsetTop
                跟定位有关系：
                如果没有定位 ，元素的左边框与body的最左边的距离
            */

            let left = e.clientX - this.ele.offsetLeft - this.maskWidth / 2;
            let top = e.clientY - this.ele.offsetTop  - this.maskHeight / 2;

            // 边界值的判断
            if (left <= 0) {
                left = 0;
            }
            if (top <= 0) {
                top = 0;
            }
            if (left >= this.showWidth - this.maskWidth) {
                left = this.showWidth - this.maskWidth;
            }
            if (top >= this.showHeight - this.maskHeight) {
                top = this.showHeight - this.maskHeight
            }
            // 移动遮罩层
            this.mask.style.left = left + 'px';
            this.mask.style.top = top + 'px';

            // 移动背景图
            //  背景图移动的距离 = 背景图 * mask移动距离 / show盒子的大小
            let bgPX = this.bgx * left / this.showWidth;
            let bgPY = this.bgy * top / this.showHeight;
            this.enlarge.style.backgroundPosition = `-${bgPX}px -${bgPY}px`;
        }
    }
    change(ele) {
        //  排他思想
        for (let j = 0; j < this.p.length; j++) {
            this.p[j].classList.remove('active');
        }
        ele.classList.add('active');
        // 把当前点击的这个元素对应大图显示在 show和enlarge中
        // 我不知道点击的是那张图片，但是可以知道点击的是哪个元素
        // 可以通过这个元素来回获取这个元素上所有的属性
        let bigImg = ele.getAttribute('bigImg') // 放大镜的背景图
        let img = ele.getAttribute('img');      // show 盒子显示的图片

        // 获取show盒子下面的img图片
        this.img = this.show.querySelector('img');

        // 给show盒子下面的img图片设置src属性的属性值
        this.img.setAttribute('src', img)
        this.enlarge.style.backgroundImage = `url(${bigImg})`
    }
}


// let imgObj = {
//     idx:1,
//     img:['','','']
// }
// 操作对象
new Enlarge('.box')











//渲染详情页
const goodsInfo = JSON.parse(localStorage.getItem('goods_info'))

if(goodsInfo === null){
    alert('你查看的商品详情不存在了')
}else{
    // console.log(goodsInfo)
   

}   


bindHtml()





 function bindHtml(){

    // $('.box > .list').attr('src',goodsInfo.list_url)
    // p.data("bigimg"，"图片路径")




    $('p').attr('img',goodsInfo.list_url)

    $('p').attr('bigImg',goodsInfo.list_url)
    $('.box > .list > p > img').attr('src',goodsInfo.list_url)
    $('.box > .show > img').attr('src',goodsInfo.list_url)
    $('.jia > .ming').text(goodsInfo.list_name)
    $('.jia > .ke > mark').text('￥'+ goodsInfo.list_price)
    $('.jia > .zong > .ming').text(goodsInfo.list_name)
    $('.jia > .zong > mark').text('￥'+ goodsInfo.list_price)

 }





 $('.jiar').click(function(){
    //  console.log('我要添加购物车了')


     const cartList = JSON.parse(localStorage.getItem('cartList')) || []

     let exits = cartList.some(function(item){
        return item.list_id === goodsInfo.list_id

     })
     console.log(exits)
     if(exits){
        console.log('数据已经存在')

        let data = null
        for(let i=0; i<cartList.length; i++){
            if(cartList[i].list_id === goodsInfo.list_id){
                data = cartList[i]
                break
            }
        }
        data.number++

        data.xiaoji = data.number * data.list_price

     }else{

        goodsInfo.number = 1
        goodsInfo.xiaoji = goodsInfo.list_price
        goodsInfo.isSelect = false  //默认不选中
        cartList.push(goodsInfo)
     }
    


    localStorage.setItem('cartList',JSON.stringify(cartList))

    //  console.log(cartList)

   
 })