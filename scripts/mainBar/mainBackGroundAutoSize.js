let imgGet=setInterval(getImageSize,1)

let backgroundImageWidth=0
let backgroundImageHeight=0
let minBackgroundWidth,minBackgroundHeight=0

let img=new Image()
let imageSrc=""

function getImageSize() {
    let main=document.getElementById('backGroundMain')
    if (main.style.backgroundImage!==""){
        imageSrc=document.getElementById('backGroundMain').style.backgroundImage.replace(/url\("|"\)/g,"")
        img.src=imageSrc
        if (img.width!==0 && img.height!==0){
            backgroundImageWidth=img.width
            backgroundImageHeight=img.height
            setMinSize()
            setInterval(zoomBackground,4)
            clearInterval(imgGet)
        }
    }
}

function setMinSize() {
    minBackgroundHeight=document.getElementById('backGroundMain').style.height.replace("px","")
    minBackgroundWidth=Math.round(backgroundImageWidth/Number(backgroundImageHeight/minBackgroundHeight))
}

function zoomBackground() {
    let main=document.getElementById('backGroundMain') //调用元素
    let w1=main.offsetWidth //获取元素宽度

    if (w1<minBackgroundWidth){
        main.style.backgroundPosition='center'
        main.style.backgroundSize=minBackgroundWidth.toString()+'px'
    }else{
        main.style.backgroundPosition='center'
        main.style.backgroundSize='100%'
    }

    main.style.top='\-'+window.pageYOffset.toString()*0.35+'px'
}