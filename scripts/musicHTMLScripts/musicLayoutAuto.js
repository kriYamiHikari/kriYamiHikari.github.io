setInterval(main,1)
function main(){
    let windowWidth=document.body.offsetWidth
    let squareContainer=document.getElementsByClassName('musicIndexItemImageContainer')[0]
    let musicItemContainer=document.getElementsByClassName('musicIndexItemContainer')[0]
    let musicTextContainer=document.getElementsByClassName('musicIndexItemTextContainer')[0]

    if (windowWidth<620){
        squareContainer.style.display="none"
        musicItemContainer.style.justifyContent="center"
        musicTextContainer.style.paddingLeft="0px"
    }else{
        squareContainer.style.display="flex"
        musicItemContainer.style.justifyContent="space-between"
        musicTextContainer.style.paddingLeft="35px"
    }
}
main()