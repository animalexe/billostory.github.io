const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>{loader.style.opacity="0";setTimeout(()=>loader.remove(),600)},700));
document.getElementById("year").textContent=new Date().getFullYear();

const menu=document.querySelector(".menu"), nav=document.querySelector(".nav nav");
menu.addEventListener("click",()=>{menu.classList.toggle("active");nav.classList.toggle("mobile-open")});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("active");nav.classList.remove("mobile-open")}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll("[data-count]").forEach(el=>{
  const target=el.dataset.count;
  if(target==="∞")return;
  const obs=new IntersectionObserver(entries=>{
    if(!entries[0].isIntersecting)return;
    let n=0, end=Number(target), step=Math.max(1,Math.ceil(end/30));
    const timer=setInterval(()=>{n+=step;if(n>=end){n=end;clearInterval(timer)}el.textContent=n},35);
    obs.disconnect();
  },{threshold:.7}); obs.observe(el);
});

const modal=document.getElementById("modal"), title=document.getElementById("modal-title");
document.querySelectorAll("[data-modal]").forEach(link=>link.addEventListener("click",e=>{
  e.preventDefault(); title.textContent=link.dataset.modal; modal.classList.add("open");
}));
document.querySelector(".close").onclick=()=>modal.classList.remove("open");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});

window.addEventListener("scroll",()=>{
  document.querySelector(".nav").style.boxShadow=scrollY>30?"0 10px 40px #0008":"none";
});
