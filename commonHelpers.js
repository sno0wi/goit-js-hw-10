import"./assets/modulepreload-polyfill-ec808ebb.js";import{f as y,i as p}from"./assets/vendor-3029c4a4.js";const o=document.querySelector("[data-start]"),v=document.querySelector("[data-days]"),C=document.querySelector("[data-hours]"),D=document.querySelector("[data-minutes]"),S=document.querySelector("[data-seconds]");let r;const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){r=t[0],console.log(t[0]),k(r)}};y("#datetime-picker",b);function k(t){const n=t instanceof Date?t:new Date(t),e=new Date;n<e?(p.show({message:"Please choose a date in the future"}),o.disabled=!0):o.disabled=!1}let a=!1,i;function q(){const t=u(0);d(t)}function u(t){const l=Math.floor(t/864e5),f=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),h=Math.floor(t%864e5%36e5%6e4/1e3);return{days:l,hours:f,minutes:m,seconds:h}}function w(){a||(q(),a=!0,i=setInterval(()=>{const t=Date.now(),n=r-t,e=u(n);d(e),e.days===0&&e.hours===0&&e.minutes===0&&e.seconds===0&&E()},1e3),o.disabled=!0)}function E(){a&&(a=!1,clearInterval(i),o.disabled=!1)}function s(t){return String(t).padStart(2,"0")}function d({days:t,hours:n,minutes:e,seconds:c}){v.textContent=s(t),C.textContent=s(n),D.textContent=s(e),S.textContent=s(c)}o.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map
