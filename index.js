import{a as L,S as Y}from"./assets/vendor-B6rRA8qT.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const f=document.querySelector(".description-wrapper"),g=document.querySelector(".modal-title"),w=document.querySelector(".modal"),h=document.querySelector(".albums-list"),M=document.querySelector(".loader"),F=document.querySelector(".artists-gallery"),l=document.querySelector(".backdrop"),T=document.querySelector(".modal-close-button"),$=document.querySelector(".albums-title");let A;function _(){M.classList.remove("visually-hidden")}function R(){M.classList.add("visually-hidden")}async function G(t){return(await L.get(`https://sound-wave.b.goit.study/api/artists/${t}`)).data}async function V(t){f.innerHTML="",h.innerHTML="",g.innerHTML="",$.innerHTML="",w.style.display="none",_();try{const e=await G(t);$.innerHTML="Albums",T.addEventListener("click",u),l.addEventListener("click",B),document.addEventListener("keydown",q),X(e),te(e),w.style.display="block"}catch(e){console.error("Error loading artist data:",e)}finally{R()}}function K(t){const e=Math.floor(t/1e3),s=Math.floor(e/60),o=e%60;return`${s}:${o.toString().padStart(2,"0")}`}function U({strTrack:t,intDuration:e,movie:s}){return`
<li class="tracks-item">
              <p class="track-name">${t}</p>
              <p class="track-length">${K(e)}</p>
              <div class="track-link-space">
                ${s?`<a class="track-link" href='${s}' target="_blank" rel="noopener noreferrer"
                  ><svg class="track-link-icon" width="24" height="24">
                    <use
                      href="./img/sprite.svg#icon-youtube"
                    ></use></svg
                ></a>`:""} 
              </div>
            </li>
    `}function z(t){return t.map(U).join("")}function J({tracksList:t}){const e={},s=Math.min(100,t.length);for(let o=0;o<s;o++){const n=t[o],r=n.strAlbum;e[r]||(e[r]=[]),e[r].push(n)}return e}function Q(t,e){return`
        <li class="albums-item">
          <h5 class="album-title">${t}</h5>
          <div class="tracks-heading">
            <p class="tracks-heading-text">Track</p>
            <p class="tracks-heading-text">Time</p>
            <p class="tracks-heading-text">Link</p>
          </div>
          <ul class="tracks">
          ${z(e[t])}
          </ul>
        </li>
    `}function W(t){return Object.keys(t).map(e=>Q(e,t)).join("")}function X(t){const e=J(t);h&&h.insertAdjacentHTML("beforeend",W(e))}function d(t,e){return`
    <li class="artist-desc-item">
      <h4 class="artist-desc-title">${t}</h4>
      <p class="artist-desc-text">${e}</p>
    </li>
  `}function Z(t){return`
    <li class="artist-genres-item">
      <p class="artist-genres-text">${t}</p>
    </li>
  `}function ee(t){const{intDiedYear:e,intFormedYear:s,intMembers:o,strArtist:n,strArtistThumb:r,strBiographyEN:a,strCountry:m,strGender:D}=t;g&&(g.textContent=n);const N=A;return`
      <img class="modal-img" src="${r}" alt="${n}" />
      <div class="description-text-wrapper">
        <ul class="artist-description">
          ${d("Years active",`${s} - ${e||"present"}`)}
          ${d("Sex",D)}
          ${d("Members",o)}
          ${d("Country",m)}
        </ul>
        <div class="artist-biography">
          <h4 class="artist-desc-title">Biography</h4>
          <p class="artist-desc-text">${a}</p>
        </div>
        <ul class="artist-genres">
          ${N.map(Z).join("")}
        </ul>
      </div>
    `}function te(t){f&&f.insertAdjacentHTML("beforeend",ee(t))}F.addEventListener("click",t=>{const e=t.target.closest("button");e&&(l.classList.add("is-open"),document.body.style.overflowY="hidden",A=e.dataset.genres.split(","),V(e.dataset.id))});function u(){l.classList.remove("is-open"),document.body.style.overflowY="auto",T.removeEventListener("click",u),l.removeEventListener("click",B),document.removeEventListener("keydown",q)}function B(t){t.target===l&&u()}function q(t){t.key==="Escape"&&u()}const se="https://sound-wave.b.goit.study/api",ne="/artists";function x(t=1){const e={limit:8,page:t};return L.get(`${se}${ne}`,{params:e}).then(s=>s.data).catch(s=>{throw console.error("Error fetching artists:",s),s})}const re="/js_116_AlofBronco/img/sprite.svg",b=document.querySelector(".load-more-btn"),H=document.querySelector(".loader-artists");function oe({_id:t,genres:e,strArtist:s,strBiographyEN:o,strArtistThumb:n}){return`<li class="artists-item">
        <img class="artists-img" src="${n}" alt="${s}" width="288"/>
        <ul class="artists-genres">${e.map(r=>`<li class="artists-genres-item"><p class="artists-genres-text">${r}</p></li>`).join(`
`)}</ul>
                  <h3 class="artsits-name">${s}</h3>
        <p class="artists-descr">${o}</p>
        <button class="learn-btn" type="button" data-id="${t}" data-genres="${e}">Learn More<svg class="learn-more-svg" width="24" height="24">
        <use href="${re}#icon-triangle-right"></use>
      </svg></button>
      </li>`}function P(t){return t.map(oe).join(`
`)}function ie(){b.classList.remove("visually-hidden")}function k(){b.classList.add("visually-hidden")}function I(t,e){if(t<e){ie();return}else k()}function O(){H.classList.remove("visually-hidden")}function j(){H.classList.add("visually-hidden")}b.addEventListener("click",ae);let c=1,y=null;const C=document.querySelector(".artists-gallery");O();k();x(c).then(t=>{const e=P(t.artists);y=Math.ceil(t.totalArtists/t.limit),C.insertAdjacentHTML("beforeend",e),j(),I(c,y)});function ae(){k(),O(),c++,x(c).then(t=>{const e=P(t.artists);C.insertAdjacentHTML("beforeend",e),j(),I(c,y)})}const E=document.getElementById("feedback-wrapper"),S=document.getElementById("pagination");let i;async function ce(){try{let e=(await L.get("https://sound-wave.b.goit.study/api/feedbacks",{params:{limit:3,page:1}})).data.data;console.log(e),!e||e.length,console.log(le(e)),ue()}catch(t){console.error("Feedback loading error",t)}}function le(t){E.innerHTML="",t.forEach(e=>{const s=Math.round(e.rating),o=document.createElement("div");o.className="swiper-slide",o.innerHTML=`
            <div class="rating">
                ${de(s)}
            </div>
            <div class="text">"${e.descr}"</div>
            <div class="user">${e.name}</div>
        `,E.appendChild(o)})}function de(t){let e="";for(let s=1;s<=5;s++)s<=t?e+='<i class="fas fa-star star"></i>':e+='<i class="fas fa-star star-empty"></i>';return e}function ue(){i&&i.destroy(!0,!0),i=new Y(".swiper-container",{loop:!0,slidesPerView:1,spaceBetween:0,centeredSlides:!0,autoHeight:!0,speed:700,observer:!0,observeParents:!0,watchOverflow:!0,slidesOffsetBefore:0,slidesOffsetAfter:0,on:{slideChange:p,init:p}}),document.getElementById("prevBtn").addEventListener("click",()=>{i&&i.slidePrev()}),document.getElementById("nextBtn").addEventListener("click",()=>{i&&i.slideNext()}),me(3),p()}function me(t){S.innerHTML="";for(let e=0;e<t;e++){const s=document.createElement("span");s.id=`pag-${e}`,s.classList.add("pagination-dot"),s.addEventListener("click",()=>{i&&i.slideToLoop(e)}),S.appendChild(s)}}function p(){if(!i||i.slides.length===0)return;const t=i.realIndex;document.querySelectorAll(".pagination span").forEach((e,s)=>{e.classList.remove("active"),s===t&&e.classList.add("active")})}document.addEventListener("DOMContentLoaded",ce);const v=document.querySelector(".backdrop-header"),pe=document.querySelector(".js-toggle-menu");pe.addEventListener("click",()=>{const t=v.classList.toggle("is-open");document.body.classList.toggle("menu-open",t)});document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const s=t.getAttribute("href").substring(1),o=document.getElementById(s);if(o){const r=document.querySelector(".header").offsetHeight,m=o.getBoundingClientRect().top+window.scrollY-r;window.scrollTo({top:m,behavior:"smooth"})}v.classList.contains("is-open")&&(v.classList.remove("is-open"),document.body.classList.remove("menu-open"))})});function fe(){const t=document.querySelector("#btn");t&&t.addEventListener("click",()=>{const e=document.querySelector("#artists");e&&e.scrollIntoView({behavior:"smooth",block:"start"})})}document.addEventListener("DOMContentLoaded",()=>{fe()});
//# sourceMappingURL=index.js.map
