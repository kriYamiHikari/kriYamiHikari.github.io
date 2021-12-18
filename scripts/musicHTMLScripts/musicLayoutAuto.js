function main(){
    setInterval(autoSize,1)

    let squareContainer=document.getElementsByClassName('musicIndexItemImageContainer')[0]
    let musicItemContainer=document.getElementsByClassName('musicIndexItemContainer')[0]
    let musicTextContainer=document.getElementsByClassName('musicIndexItemTextContainer')[0]

    function autoSize() {
        let windowWidth=document.body.offsetWidth
        if (windowWidth<730){
            squareContainer.style.display="none"
            musicItemContainer.style.justifyContent="center"
            musicTextContainer.style.paddingLeft="0px"
            musicTextContainer.style.textAlign="center"
        }else{
            squareContainer.style.display="flex"
            musicItemContainer.style.justifyContent="space-between"
            musicTextContainer.style.paddingLeft="35px"
            musicTextContainer.style.textAlign="left"
        }
    }
}
main()