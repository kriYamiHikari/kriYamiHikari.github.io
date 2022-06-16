function main(){
    setInterval(events,1)
    let isInputMode = true
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
    //点击生成红包按钮
    document.getElementById('send').onclick=function () {
        let error = false
        let items = []
        //添加物品到数组
        if (isInputMode === true) {
            let text=document.getElementById('redEnvelopeInputTextarea').value
            items = text.match(/(.*?)[|]/g)
            if (items.length < 400){
                for (let a=0; a<items.length; a++){
                    items[a] = items[a].replace(/[|]/g,"")
                }
            }else{
                alert("物品数量不能大于400个！")
            }
        }
        if (isInputMode === false) {
            let minNumber = parseInt(document.getElementById('redEnvelopeRangeMinTextarea').value)
            let maxNumber = parseInt(document.getElementById('redEnvelopeRangeMaxTextarea').value)
            if (isNaN(minNumber)){
                alert("最小值输入错误")
                error = true
            }
            if (isNaN(maxNumber)){
                alert("最大值输入错误")
                error = true
            }
            if (minNumber > maxNumber){
                alert("最小值不可以超过最大值")
                error = true
            }
            if (error !== true){
                let itemCount = maxNumber - minNumber
                if (itemCount < 1000){
                    for (let n = minNumber; n < maxNumber+1;n++){
                        items.push(n.toString())
                    }
                }else{
                    alert("物品数量不能大于400个！")
                }
            }
        }
        //根据数组元素生成红包
        if (items != null){
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

    document.getElementById('inputItemMode').onclick = function () {
        isInputMode = true
        document.getElementById('redEnvelopeRangeMode').className = "hidden"
        document.getElementById('redEnvelopeInputMode').className = "showAnimation"
        document.getElementById('envelopeContainer').innerHTML = ""
    }
    document.getElementById('rangeNumberItemMode').onclick = function () {
        isInputMode = false
        document.getElementById('redEnvelopeRangeMode').className = "showAnimation"
        document.getElementById('redEnvelopeInputMode').className = "hidden"
        document.getElementById('envelopeContainer').innerHTML = ""
    }
}
main()
