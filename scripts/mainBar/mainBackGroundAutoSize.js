setInterval(main,4.1)
function main() {
    let main=document.getElementById('backGroundMain') //调用元素
    let w1=main.offsetWidth //获取元素宽度

    if (w1<backgroundImageWidth*0.75){
        main.style.backgroundPosition='center'
        main.style.backgroundSize=backgroundImageWidth*0.75.toString()+'px'
    }else{
        main.style.backgroundPosition='center'
        main.style.backgroundSize='100%'
    }

    main.style.top='\-'+window.pageYOffset.toString()*0.35+'px'
}