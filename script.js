const nav=document.querySelector(".navbar-nav");
const hamburger=document.querySelector("#hamburger-menu");
const searchForm=document.querySelector("#search-form");
const searchButton=document.querySelector("#search-button");
const searchBox=document.querySelector("#search-box");

hamburger.addEventListener("click",e=>{e.preventDefault();nav.classList.toggle("active");});
document.querySelectorAll(".navbar-nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("active")));

searchButton.addEventListener("click",e=>{e.preventDefault();searchForm.classList.toggle("active");if(searchForm.classList.contains("active"))searchBox.focus();});
document.addEventListener("click",e=>{
  if(!searchForm.contains(e.target)&&!searchButton.contains(e.target))searchForm.classList.remove("active");
});

const sections=[...document.querySelectorAll("section[id]")];
const links=[...document.querySelectorAll(".navbar-nav a")];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>observer.observe(s));

function openModal(){document.querySelector("#detail-modal").classList.add("show")}
function closeModal(){document.querySelector("#detail-modal").classList.remove("show")}
function openQR(){document.querySelector("#qr-modal").classList.add("show")}
function closeQR(){document.querySelector("#qr-modal").classList.remove("show")}

const insights=[
  ["Produksi","Periksa kondisi produk sebelum dikemas agar kualitas tetap terjaga."],
  ["Penjemputan","Prioritaskan permintaan penjemputan yang masuk agar alur limbah tetap berjalan."],
  ["Tanaman","Gunakan informasi QR Plant Guide sebagai acuan perawatan tanaman."],
  ["Pengguna","Pastikan panduan pada QR mudah dipahami oleh pengguna baru."]
];
function changeInsight(label,text){
  document.querySelector("#dash-focus").textContent=label;
  document.querySelector("#dash-service").textContent="Aktif dipantau";
  document.querySelector("#dash-plant").textContent=label==="Tanaman"?"Perlu perhatian":"Siap";
  document.querySelector("#insight-text").textContent=text;
}
function randomInsight(){
  const x=insights[Math.floor(Math.random()*insights.length)];
  changeInsight(x[0],x[1]);
}

const answers=[
  {keys:["apa itu","biosprout"],answer:"BioSprout Pack adalah polybag berbenih ramah lingkungan dengan bahan utama limbah kertas dan dilengkapi fitur digital untuk membantu pengguna."},
  {keys:["bahan","material"],answer:"Bahan utamanya adalah limbah kertas. Dalam proses pembuatannya digunakan bahan tambahan seperti pati tapioka, kitosan, dan gliserol."},
  {keys:["cara","gunakan","pakai"],answer:"BioSprout Pack digunakan sebagai polybag untuk membantu proses penanaman. Ikuti panduan penggunaan dan langkah menanam melalui QR Plant Guide."},
  {keys:["qr","plant guide"],answer:"QR Plant Guide berisi panduan penggunaan, langkah menanam, informasi bahan, edukasi pengolahan limbah, penjemputan, dan informasi perkembangan tanaman."},
  {keys:["jemput","limbah","sampah"],answer:"Untuk penjemputan limbah kertas, buka bagian Penjemputan lalu tekan Ajukan Penjemputan. Permintaan diarahkan ke WhatsApp BioSprout Pack."},
  {keys:["rawat","siram","tanaman"],answer:"Gunakan panduan pada QR Plant Guide sebagai acuan dasar untuk membantu merawat tanaman selama proses pertumbuhan."},
  {keys:["dashboard","ai dashboard"],answer:"AI Dashboard ditujukan untuk tim BioSprout. Fitur ini membantu melihat fokus, status, dan insight sederhana untuk mendukung pemantauan kegiatan."},
  {keys:["terurai","biodegradasi"],answer:"Material BioSprout Pack dirancang agar dapat terurai secara biologis setelah digunakan."}
];

function getAnswer(q){
  const s=q.toLowerCase();
  const hit=answers.find(x=>x.keys.some(k=>s.includes(k)));
  return hit?hit.answer:"Saya bisa membantu menjelaskan BioSprout Pack, bahan, cara penggunaan, QR Plant Guide, perawatan tanaman, AI Dashboard, atau penjemputan limbah.";
}
function addMessage(text,type){
  const box=document.querySelector("#messages");
  const div=document.createElement("div");
  div.className=`msg ${type}`;
  div.textContent=text;
  box.appendChild(div);
  box.scrollTop=box.scrollHeight;
}
function askAI(){
  const input=document.querySelector("#question");
  const q=input.value.trim();
  if(!q)return;
  addMessage(q,"user");
  setTimeout(()=>addMessage(getAnswer(q),"bot"),250);
  input.value="";
}
function quickAsk(q){document.querySelector("#question").value=q;askAI();}
document.querySelector("#chat-form").addEventListener("submit",e=>{e.preventDefault();askAI();});

document.querySelector("#search-submit").addEventListener("click",()=>{
  const q=searchBox.value.toLowerCase().trim();
  const map={produk:"#produk","cara kerja":"#cara","qr":"#qr","ai":"#ai","dashboard":"#ai","customer":"#ai","penjemputan":"#penjemputan","kontak":"#kontak","home":"#home"};
  const key=Object.keys(map).find(k=>q.includes(k));
  if(key){document.querySelector(map[key]).scrollIntoView({behavior:"smooth"});searchForm.classList.remove("active");}
  else alert("Coba cari: produk, cara kerja, QR, AI, penjemputan, atau kontak.");
});

document.querySelector("#contact-form").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.querySelector("#contact-name").value;
  alert(`Terima kasih, ${name}! Pesanmu sudah dicatat dalam prototype BioSprout.`);
  e.target.reset();
});

feather.replace();

const productSlides=[...document.querySelectorAll(".product-slide")];
const productTrack=document.querySelector(".product-slides");
const productDots=[...document.querySelectorAll(".product-slider .dot")];
let productIndex=0;

function showProductSlide(index){
  productIndex=(index+productSlides.length)%productSlides.length;
  productTrack.style.transform=`translateX(-${productIndex*100}%)`;
  productSlides.forEach((slide,i)=>slide.classList.toggle("active",i===productIndex));
  productDots.forEach((dot,i)=>dot.classList.toggle("active",i===productIndex));
}
document.querySelector("#product-next").addEventListener("click",()=>showProductSlide(productIndex+1));
document.querySelector("#product-prev").addEventListener("click",()=>showProductSlide(productIndex-1));
productDots.forEach((dot,i)=>dot.addEventListener("click",()=>showProductSlide(i)));

let touchStartX=0;
productTrack.addEventListener("touchstart",e=>{touchStartX=e.touches[0].clientX},{passive:true});
productTrack.addEventListener("touchend",e=>{
  const diff=touchStartX-e.changedTouches[0].clientX;
  if(Math.abs(diff)>45) showProductSlide(productIndex+(diff>0?1:-1));
});
