import"./assets/modulepreload-polyfill-ec808ebb.js";import{i as o}from"./assets/vendor-3029c4a4.js";const r=document.querySelector("form");r.addEventListener("submit",u);const i=document.querySelector('input[name="delay"]'),c=document.querySelectorAll('input[name="state"]');function u(m){m.preventDefault();const t=Number(i.value);let s;c.forEach(e=>{e.checked&&(s=e.value)}),new Promise((e,n)=>{setTimeout(()=>{s==="fulfilled"?e(t):n(t)},t)}).then(e=>{o.success({message:`Fulfilled promise in ${e}ms`})}).catch(e=>{o.error({message:`Rejected promise in ${e}ms`})}),l()}function l(){r.reset()}
//# sourceMappingURL=commonHelpers2.js.map