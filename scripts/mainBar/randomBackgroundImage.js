function main(){
    let ajax=new XMLHttpRequest()
    let imageXML=new Document()
    let imageURL=""

    ajax.onreadystatechange=function(){
        if (this.readyState===4 && this.status===200){
            imageXML=this.responseXML
            changeBackground()
        }
    }
    ajax.open("get","images/background/imageList.xml",true)
    ajax.send()

    function changeBackground(){
        let imageList=imageXML.getElementsByTagName('item')
        let imageHeadURL="images/background/"
        let randomIndex=Math.trunc(Math.random()*imageList.length)
        let backgroundMain=document.getElementById("backGroundMain")

        imageURL=imageHeadURL+imageList[randomIndex].children[0].textContent.replace("\\","/")

        backgroundMain.style.backgroundImage="url('"+imageURL+"')"
    }
}
main()