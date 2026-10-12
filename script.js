window.addEventListener("load",()=>setTimeout(()=>document.body.classList.add("loaded"),350));
const menu=document.querySelector(".menu"),nav=document.querySelector("nav");menu.onclick=()=>{menu.classList.toggle("open");nav.classList.toggle("open")};
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>{menu.classList.remove("open");nav.classList.remove("open")});
const modal=document.querySelector("#modal"),img=document.querySelector("#mi"),title=document.querySelector("#mtitle"),desc=document.querySelector("#mdesc"),tag=document.querySelector("#mtag");
function openCard(e){img.src=e.dataset.image;img.alt=e.dataset.title;title.textContent=e.dataset.title;desc.textContent=e.dataset.desc;tag.textContent=e.dataset.tag||"BILLO STORY";modal.classList.add("open");document.body.style.overflow="hidden"}
function close(){modal.classList.remove("open");document.body.style.overflow=""}
document.querySelectorAll("[data-title]").forEach(x=>x.onclick=()=>openCard(x));document.querySelector(".close").onclick=close;document.querySelector(".backdrop").onclick=close;document.onkeydown=e=>{if(e.key==="Escape")close()};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.1});document.querySelectorAll(".reveal").forEach(x=>io.observe(x));
document.querySelectorAll(".loc").forEach(x=>x.addEventListener("pointermove",e=>{if(matchMedia("(pointer:fine)").matches){let r=x.getBoundingClientRect();x.style.backgroundPosition=`calc(50% + ${(e.clientX-r.left-r.width/2)/30}px) calc(50% + ${(e.clientY-r.top-r.height/2)/30}px)`}}));
