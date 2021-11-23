function main(){
    setInterval(events,1)
    let row=document.getElementById('envelopeContainer')
    let originText='            <div class="redEnvelopeItem">\n' +
        '                <img src="redEnvelope.png" class="redEnvelopeItemCloseImg" alt="图片加载失败">\n' +
        '                <div class="redEnvelopeItemViewContainer">\n' +
        '                    <div class="redEnvelopeItemViewText"></div>\n' +
        '                </div>\n' +
        '            </div>'

    //红包事件
    function events(){
        for (let b=0;b<row.children.length;b++){
            row.children[b].getElementsByTagName("img")[0].onclick=function () {
                row.children[b].getElementsByTagName("img")[0].className="redEnvelopeItemCloseImgAnimation"
                row.children[b].getElementsByTagName("div")[0].className="redEnvelopeItemViewContainerAnimation"
            }
            row.children[b].getElementsByTagName("img")[0].ondragstart=function () {
                return false
            }
        }
    }

    document.getElementById('send').onclick=function () {
        let text=document.getElementById('redEnvelopeInputTextarea').value
        let items=text.match(/.*?;/g)
        if (items!=null){
            row.innerHTML=""

            for (let b=0;b<items.length;b++){
                row.innerHTML+=originText
            }

            let newArr=[]
            let len=items.length
            for (let b=0;b<len;b++){
                let random=Math.floor(Math.random()*items.length)
                newArr.push(items[random])
                items.splice(random,1)
                row.children[b].children[1].getElementsByTagName("div")[0].innerHTML=newArr[b].replace(";","")
            }
        }
    }
}
main()
