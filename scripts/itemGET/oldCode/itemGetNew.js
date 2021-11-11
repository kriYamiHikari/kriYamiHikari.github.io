let originItemLoadTxt=""
let itemMainRow=document.getElementById('itemMainRow')
let btn1Test=document.getElementById('btn1')

let afterTxt=""
function getOriginTxt() {
    let xmlHttpGetOriginTxt = new XMLHttpRequest()
    xmlHttpGetOriginTxt.onreadystatechange=function () {
        if (this.readyState==4 && this.status==200){
            originItemLoadTxt=this.responseText
        }
    }
    xmlHttpGetOriginTxt.open("get","itemLoadOrigin.html",true)
    xmlHttpGetOriginTxt.send()
}

function changeTxtFromOrigin(){
    if (originItemLoadTxt!=""){
        let rec=new RegExp('<changeToText>Please change me!</changeToText>',"g")
        afterTxt=originItemLoadTxt.replace(rec,'what the fuck')
    }else{
        afterTxt="fake"
    }
}
btn1Test.onmousedown=function () {
    changeTxtFromOrigin()
    itemMainRow.innerHTML+=afterTxt
}
getOriginTxt()