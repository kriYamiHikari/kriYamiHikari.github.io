setInterval(mains,1)
let b=document.getElementById('audio2').getElementsByTagName('audio')[0]
let h,s=0
function mains() {
    h=Math.floor(b.currentTime/60)
    s=Number(b.currentTime%60).toFixed(2)
    document.getElementById('testhaha').innerHTML=h+":"+s
}