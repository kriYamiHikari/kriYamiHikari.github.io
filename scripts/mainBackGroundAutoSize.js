setInterval(main,4.1)
function main() {
    /*let main=document.getElementById('backGroundMain')
    let mainStyle=window.getComputedStyle(main,null)
    let w1=mainStyle.width
    let h1=mainStyle.height
    document.getElementById('test').innerText=w1+' '+h1/
     *///获取外部css文件

    let main=document.getElementById('backGroundMain') //调用元素
    let title=document.getElementById('backGroundTitle')
    let image=document.getElementById('backGroundMain')
    let w1=main.offsetWidth //获取元素宽度
    //document.getElementById('test').innerText=w1

    if (w1<1200){
        main.style.backgroundPosition='center'
        main.style.backgroundSize='1200px'
    }else{
        main.style.backgroundPosition='center'
        main.style.backgroundSize='100%'
    }

    image.style.top='\-'+window.pageYOffset.toString()*0.35+'px'

    //title.style.left=document.body.clientWidth/2-50+'px'

    /*let obj=document.getElementById('mainBar')
    let oba=obj.getBoundingClientRect().left - document.documentElement.clientLeft
    document.getElementById('test2').innerText=oba.toString()
    //main.style.left=Math.abs(oba).toString()+'px'*/ //获取元素相对浏览器可视区域偏移值
}