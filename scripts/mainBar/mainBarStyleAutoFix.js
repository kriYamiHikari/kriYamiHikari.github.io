setInterval(main,8)
function main() {
    let barText=document.getElementById('mainBarText')
    let barImageContainer=document.getElementById('mainBarImageContainer')
    let w1=document.body.offsetWidth

    if (w1<810){
        barText.style.display='none'
        barImageContainer.style.width=w1+'px'
    }else{
        barText.style.display='block'
        barImageContainer.style.width='auto'
        barImageContainer.style.paddingRight=0+'px'
        barImageContainer.style.marginLeft=20+'px'
    }
}