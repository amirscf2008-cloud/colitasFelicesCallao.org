/* ============================================================
   1) BASE DE AVISTAMIENTOS
   Reemplaza esta lista por los datos reales de tu sistema
   (puedes cargarla con fetch() desde tu API / base de datos).
   - foto: pon la ruta de la imagen real ("img/perro1.jpg").
           Si lo dejas vacío, se dibuja una ilustración con sus colores.
   - colores: color de cada parte del animal (hex).
   - manchas: (opcional) color de manchas.
   - tamano: 'pequeno' | 'mediano' | 'grande'
   - nota: comentario breve de quien lo vio (se compara con la descripción del cliente).
   - colores.nariz y colores.patitas son opcionales.
   ============================================================ */
const AVISTAMIENTOS = [
  { id:1, tipo:'perro', tamano:'mediano', nota:'Collar rojo, muy tranquilo, se acercó a la gente.', zona:'Ventanilla', fecha:'22/Octubre/2026', lugar:'Afuera de Plaza Vea', foto:'',
    colores:{cuerpo:'#d9a441',cabeza:'#d9a441',oreja:'#b9812b',hocico:'#c48f36',cola:'#d9a441',pata:'#d9a441',anca:'#d9a441',ojo:'#3b2a1a'} },
  { id:2, tipo:'perro', tamano:'mediano', nota:'Pelo corto, cola larga, parecía perdido y con sed.', zona:'Bellavista', fecha:'22/Octubre/2026', lugar:'Afuera del Simón Bolívar', foto:'',
    colores:{cuerpo:'#d8b27a',cabeza:'#d8b27a',oreja:'#c49a5f',hocico:'#c9a165',cola:'#d8b27a',pata:'#d8b27a',anca:'#d8b27a',ojo:'#3b2a1a'} },
  { id:3, tipo:'perro', tamano:'grande', nota:'Muy amistoso, sin collar, orejas caídas.', zona:'Ventanilla', fecha:'22/Octubre/2026', lugar:'Afuera de Plaza Vea', foto:'',
    colores:{cuerpo:'#e0a030',cabeza:'#e0a030',oreja:'#cf8f20',hocico:'#e0a030',cola:'#e0a030',pata:'#e8b650',anca:'#e0a030',ojo:'#2b1c10'} },
  { id:4, tipo:'perro', tamano:'mediano', nota:'Hocico oscuro y mirada atenta, anda solo.', zona:'Bellavista', fecha:'22/Octubre/2026', lugar:'Afuera del Simón Bolívar', foto:'',
    colores:{cuerpo:'#b9833f',cabeza:'#b9833f',oreja:'#8a5a24',hocico:'#5b3b1e',cola:'#b9833f',pata:'#b9833f',anca:'#b9833f',ojo:'#2b1c10'} },
  { id:5, tipo:'perro', tamano:'grande', nota:'Todo negro, collar azul, ladra poco.', zona:'Callao', fecha:'21/Octubre/2026', lugar:'Parque de la Reserva', foto:'',
    colores:{cuerpo:'#1f1f24',cabeza:'#1f1f24',oreja:'#1f1f24',hocico:'#3a3a42',cola:'#1f1f24',pata:'#1f1f24',anca:'#1f1f24',ojo:'#7a4b1a'} },
  { id:6, tipo:'perro', tamano:'pequeno', nota:'Blanco con una oreja café, pequeño y juguetón.', zona:'San Miguel', fecha:'20/Octubre/2026', lugar:'Cerca del Plaza San Miguel', foto:'', manchas:'#8a5a24',
    colores:{cuerpo:'#ffffff',cabeza:'#ffffff',oreja:'#8a5a24',hocico:'#ffffff',cola:'#ffffff',pata:'#ffffff',anca:'#ffffff',ojo:'#2b1c10'} },
  { id:7, tipo:'gato', tamano:'mediano', nota:'Naranja con el pecho cremita, muy cariñoso.', zona:'Miraflores', fecha:'22/Octubre/2026', lugar:'Parque Kennedy', foto:'',
    colores:{cuerpo:'#e8742a',cabeza:'#e8742a',oreja:'#d9631a',hocico:'#f3e2bf',cola:'#e8742a',pata:'#e8742a',anca:'#e8742a',ojo:'#3f8f4f'} },
  { id:8, tipo:'gato', tamano:'mediano', nota:'Gris, ojos amarillos, collar con cascabel.', zona:'San Isidro', fecha:'21/Octubre/2026', lugar:'Bosque El Olivar', foto:'',
    colores:{cuerpo:'#8d939c',cabeza:'#8d939c',oreja:'#6d737c',hocico:'#b9bec6',cola:'#8d939c',pata:'#8d939c',anca:'#8d939c',ojo:'#d6a21c'} },
  { id:9, tipo:'gato', tamano:'pequeno', nota:'Negro con ojos amarillos, se esconde bajo autos.', zona:'Barranco', fecha:'19/Octubre/2026', lugar:'Cerca del Puente de los Suspiros', foto:'',
    colores:{cuerpo:'#1f1f24',cabeza:'#1f1f24',oreja:'#1f1f24',hocico:'#2d2d35',cola:'#1f1f24',pata:'#1f1f24',anca:'#1f1f24',ojo:'#d6c21c'} },
  { id:10, tipo:'gato', tamano:'pequeno', nota:'Blanco con manchas naranjas y cola naranja.', zona:'Surco', fecha:'20/Octubre/2026', lugar:'Afuera del Jockey Plaza', foto:'', manchas:'#e8742a',
    colores:{cuerpo:'#ffffff',cabeza:'#ffffff',oreja:'#e8742a',hocico:'#ffffff',cola:'#e8742a',pata:'#ffffff',anca:'#ffffff',ojo:'#3f8f4f'} },
];

/* ============================================================
   2) DIBUJOS (formas SVG por parte del cuerpo)
   ============================================================ */
const NOMBRES = {cola:'Cola',cuerpo:'Cuerpo',anca:'Anca',pata:'Pata delantera',patitas:'Patitas',cabeza:'Cabeza',oreja:'Orejas',hocico:'Hocico',nariz:'Nariz',ojo:'Ojo'};
const ORDEN = ['cola','cuerpo','anca','pata','patitas','cabeza','oreja','hocico'];
const PESOS = {cuerpo:3,cabeza:2.5,anca:1.5,oreja:1.2,hocico:1.2,cola:1,pata:1,patitas:1,nariz:.5,ojo:.5};
const ESCALA = {pequeno:.72,mediano:.86,grande:1};
const ETIQ = {pequeno:'Pequeño',mediano:'Mediano',grande:'Grande'};
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const FORMAS = {
  perro:{
    cola:  [['path','d="M125 385 C30 395 5 300 55 245 C75 235 85 255 70 280 C65 310 90 335 135 335 Z"']],
    cuerpo:[['path','d="M150 165 C105 215 100 330 120 395 L255 395 C268 330 252 245 232 170 Z"']],
    anca:  [['ellipse','cx="150" cy="335" rx="62" ry="58"']],
    pata:  [['rect','x="212" y="245" width="42" height="155" rx="18"']],
    patitas:[['ellipse','cx="240" cy="399" rx="33" ry="13"'],['ellipse','cx="150" cy="398" rx="56" ry="13"']],
    cabeza:[['ellipse','cx="245" cy="118" rx="64" ry="56"']],
    oreja: [['path','d="M196 78 C150 82 142 160 188 178 C216 158 218 110 206 80 Z"']],
    hocico:[['rect','x="282" y="100" width="88" height="52" rx="26"']],
    ojo:   [['circle','cx="278" cy="98" r="7"']],
    nariz: [['circle','cx="364" cy="114" r="12"']],
    detalles:'<path d="M300 140 Q330 152 358 138" fill="none" stroke="#1b1b2f" stroke-width="4" stroke-linecap="round"/>'
  },
  gato:{
    cola:  [['path','d="M122 392 C25 405 0 300 60 262 C82 252 92 275 76 292 C60 325 90 355 140 350 Z"']],
    cuerpo:[['path','d="M150 195 C105 245 100 340 120 395 L258 395 C272 335 255 255 235 195 Z"']],
    anca:  [['ellipse','cx="150" cy="338" rx="60" ry="56"']],
    pata:  [['rect','x="215" y="262" width="38" height="138" rx="17"']],
    patitas:[['ellipse','cx="238" cy="399" rx="31" ry="13"'],['ellipse','cx="150" cy="398" rx="54" ry="13"']],
    cabeza:[['ellipse','cx="245" cy="140" rx="62" ry="52"']],
    oreja: [['path','d="M192 112 L196 48 L242 92 Z"'],['path','d="M250 92 L296 48 L300 118 Z"']],
    hocico:[['ellipse','cx="292" cy="156" rx="26" ry="18"']],
    ojo:   [['circle','cx="272" cy="128" r="8"']],
    nariz: [['path','d="M283 143 L301 143 L292 156 Z"']],
    detalles:'<path d="M296 168 Q300 176 310 170 M296 168 Q290 176 282 170" fill="none" stroke="#1b1b2f" stroke-width="3" stroke-linecap="round"/><path d="M310 150 l45 -10 M310 158 l48 4 M310 166 l40 16" stroke="#1b1b2f" stroke-width="2.5" stroke-linecap="round"/>'
  }
};

function trazosSVG(strokes){
  return strokes.map(s=>{
    const d = s.pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ') + (s.pts.length===1?' l0 0':'');
    return `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="${s.size}" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');
}

function mascotaSVG(pet, fills, strokes, pre, tamano='grande'){
  const F = FORMAS[pet];
  let cuerpo = '', clip = '';
  const dibujar = part => F[part].forEach((e,i)=>{
    const id = `${pre}-${part}-${i}`;
    cuerpo += `<${e[0]} id="${id}" class="region" data-part="${part}" ${e[1]} fill="${fills[part]||(part==='nariz'?(pet==='perro'?'#1b1b2f':'#e0707f'):'#ffffff')}"/>`;
    clip += `<use href="#${id}"/>`;
  });
  ORDEN.forEach(dibujar);
  const pincel = `<g id="${pre}-trazos" clip-path="url(#${pre}-clip)" style="pointer-events:none">${trazosSVG(strokes)}</g>`;
  const ojoStart = cuerpo.length;
  dibujar('nariz'); dibujar('ojo');
  const ojo = cuerpo.slice(ojoStart);
  cuerpo = cuerpo.slice(0, ojoStart);
  return `<svg viewBox="0 0 400 430" xmlns="http://www.w3.org/2000/svg" style="scale:${ESCALA[tamano]};transform-origin:50% 96%" role="img" aria-label="Dibujo de ${pet} para colorear">
    <defs><clipPath id="${pre}-clip">${clip}</clipPath></defs>
    <ellipse cx="200" cy="410" rx="170" ry="12" fill="rgba(27,27,47,.08)"/>
    ${cuerpo}${pincel}${ojo}
    <g style="pointer-events:none">${F.detalles}</g>
  </svg>`;
}

/* ============================================================
   3) ESTADO Y CONTROLES
   ============================================================ */
const $ = s => document.querySelector(s);
const PALETA = [
  ['#e0a030','Dorado'],['#ffc61a','Amarillo'],['#c58f35','Canela'],['#d8b27a','Arena'],['#f3e2bf','Crema'],['#e8742a','Naranja'],['#8a5a24','Café'],
  ['#4e3118','Chocolate'],['#1f1f24','Negro'],['#8d939c','Gris'],['#ffffff','Blanco'],['#f4a6b8','Rosado'],['#3f8f4f','Verde'],['#4aa3df','Celeste']
];

const estado = { pet:'perro', tamano:'mediano', media:null, fills:{}, strokes:[], color:'#e0a030', tool:'fill', size:16, dibujando:false };
let historial = [];

function guardarHistorial(){
  historial.push(JSON.stringify({fills:estado.fills, strokes:estado.strokes}));
  if(historial.length>60) historial.shift();
}
function deshacer(){
  const h = historial.pop();
  if(!h) return toast('No hay nada que deshacer');
  const e = JSON.parse(h); estado.fills = e.fills; estado.strokes = e.strokes; pintar();
}
function pintar(animar){
  const cont = $('#lienzo');
  cont.innerHTML = mascotaSVG(estado.pet, estado.fills, estado.strokes, 'main', estado.tamano);
  if(animar){ cont.firstElementChild.classList.add('pop'); }
}

/* paleta */
function crearPaleta(){
  const p = $('#paleta');
  PALETA.forEach(([hex,nombre])=>{
    const b = document.createElement('button');
    b.className='color'; b.style.background=hex; b.title=nombre; b.setAttribute('aria-label',nombre);
    b.dataset.hex=hex; b.setAttribute('aria-pressed', hex===estado.color);
    b.onclick=()=>elegirColor(hex);
    p.appendChild(b);
  });
}
function elegirColor(hex){
  estado.color = hex;
  document.querySelectorAll('.color').forEach(c=>c.setAttribute('aria-pressed', c.dataset.hex===hex));
  $('#colorCustom').value = hex;
}
$('#colorCustom').addEventListener('input', e=>{
  estado.color = e.target.value;
  document.querySelectorAll('.color').forEach(c=>c.setAttribute('aria-pressed','false'));
});

/* herramientas */
function elegirHerramienta(t){
  estado.tool = t;
  $('#herrRellenar').setAttribute('aria-pressed', t==='fill');
  $('#herrPincel').setAttribute('aria-pressed', t==='brush');
  $('#cajaTamano').hidden = t!=='brush';
  $('#caja').classList.toggle('pincel', t==='brush');
}
$('#herrRellenar').onclick=()=>elegirHerramienta('fill');
$('#herrPincel').onclick=()=>elegirHerramienta('brush');
$('#tamano').oninput=e=>estado.size=+e.target.value;
$('#btnDeshacer').onclick=deshacer;
$('#btnLimpiar').onclick=()=>{ guardarHistorial(); estado.fills={}; estado.strokes=[]; pintar(true); };
$('#btnQuitarPincel').onclick=()=>{ if(!estado.strokes.length) return; guardarHistorial(); estado.strokes=[]; pintar(); };

/* cambiar de mascota */
document.querySelectorAll('.btn-mascota').forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll('.btn-mascota').forEach(x=>x.setAttribute('aria-pressed', x===b));
    estado.pet=b.dataset.pet; estado.fills={}; estado.strokes=[]; historial=[]; pintar(true);
  };
});

/* interacción con el lienzo */
const caja = $('#caja');
function puntoSVG(e){
  const svg = caja.querySelector('svg');
  const pt = svg.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY;
  const r = pt.matrixTransform(svg.getScreenCTM().inverse());
  return [r.x, r.y];
}
caja.addEventListener('pointerdown', e=>{
  if(caja.classList.contains('buscando')) return;
  if(estado.tool==='fill'){
    const reg = e.target.closest('.region');
    if(!reg) return;
    guardarHistorial();
    estado.fills[reg.dataset.part] = estado.color;
    pintar(true);
  } else {
    guardarHistorial();
    estado.strokes.push({color:estado.color, size:estado.size, pts:[puntoSVG(e)]});
    estado.dibujando = true;
    caja.setPointerCapture(e.pointerId);
    actualizarTrazos();
  }
});
caja.addEventListener('pointermove', e=>{
  if(estado.dibujando){
    estado.strokes[estado.strokes.length-1].pts.push(puntoSVG(e));
    actualizarTrazos();
  }
  const reg = e.target.closest && e.target.closest('.region');
  const et = $('#etiquetaParte');
  if(reg && estado.tool==='fill'){ et.textContent = NOMBRES[reg.dataset.part]; et.classList.add('visible'); }
  else et.classList.remove('visible');
});
['pointerup','pointercancel'].forEach(ev=>caja.addEventListener(ev,()=>estado.dibujando=false));
caja.addEventListener('pointerleave',()=>$('#etiquetaParte').classList.remove('visible'));
function actualizarTrazos(){ const g=$('#main-trazos'); if(g) g.innerHTML = trazosSVG(estado.strokes); }

/* ============================================================
   4) MOTOR DE COINCIDENCIAS
   ============================================================ */
const rgb = h => { h=h.replace('#',''); return [0,2,4].map(i=>parseInt(h.substr(i,2),16)); };
const dist = (a,b) => { const A=rgb(a),B=rgb(b); return Math.hypot(A[0]-B[0],A[1]-B[1],A[2]-B[2])/441.67; };

function colorPromedioPincel(){
  let r=0,g=0,b=0,t=0;
  estado.strokes.forEach(s=>{ const w=s.pts.length*s.size, c=rgb(s.color); r+=c[0]*w; g+=c[1]*w; b+=c[2]*w; t+=w; });
  const h = v => Math.round(v/t).toString(16).padStart(2,'0');
  return '#'+h(r)+h(g)+h(b);
}

const SIZES=['pequeno','mediano','grande'];
const PARADAS=new Set(['tiene','tienen','esta','estaba','muy','pero','para','como','unos','unas','sobre','desde','cuando','donde','tambien','siempre']);
const palabras = txt => new Set((txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').match(/[a-z]{4,}/g)||[]).filter(w=>!PARADAS.has(w)));

/* colores que usará la búsqueda: lo que pintó + color detectado en la foto/video */
function coloresUsuario(){
  const f = {...estado.fills};
  if(estado.media && estado.media.color){
    ['cuerpo','cabeza','anca','cola','pata'].forEach(p=>{ if(!f[p]) f[p]=estado.media.color; });
  }
  return f;
}

function puntuar(av){
  const f = coloresUsuario();
  let suma=0, pesos=0;
  Object.keys(PESOS).forEach(parte=>{
    const ref = av.colores[parte] || (parte==='patitas' ? av.colores.pata : null);
    if(!f[parte] || !ref) return;           // lo que no coloreó no cuenta
    suma += PESOS[parte]*dist(f[parte], ref);
    pesos += PESOS[parte];
  });
  if(estado.strokes.length){
    suma += 1.5*dist(colorPromedioPincel(), av.manchas || av.colores.cuerpo); pesos += 1.5;
  } else if(av.manchas){
    suma += 0.25; pesos += 1;
  }
  if(av.tamano){                              // tamaño: cada escalón de diferencia resta
    suma += 2*0.3*Math.abs(SIZES.indexOf(estado.tamano)-SIZES.indexOf(av.tamano)); pesos += 2;
  }
  if(!pesos) return 0;
  const d = suma/pesos;
  let pct = Math.round(Math.pow(1-Math.min(1,d*1.8),1.3)*100);
  const mio = palabras($('#comentario').value);   // descripción: pequeño bonus por palabras en común
  if(mio.size && av.nota){
    const suyo = palabras(av.nota); let c=0; mio.forEach(w=>{ if(suyo.has(w)) c++; });
    pct += Math.min(8, c*4);
  }
  return Math.min(100,pct);
}

const PIN = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#e8212e" d="M12 1.5C7.6 1.5 4.2 4.9 4.2 9.2c0 5.6 6.4 12 7.2 12.8.3.3.7.3 1 0 .8-.8 7.2-7.2 7.2-12.8 0-4.3-3.4-7.7-7.6-7.7z"/><circle cx="12" cy="9.2" r="3.1" fill="#fff"/></svg>`;

function fichaHTML(av, pct, i){
  const manchas = av.manchas ? [[160,300],[205,330],[235,105],[130,365],[250,240]].map(p=>({color:av.manchas,size:26,pts:[p]})) : [];
  const foto = av.foto
    ? `<img src="${av.foto}" alt="${av.tipo} visto en ${av.zona}" loading="lazy">`
    : mascotaSVG(av.tipo, av.colores, manchas, 'av'+av.id, av.tamano||'grande');
  const nivel = pct>=75?'alto':pct>=45?'medio':'bajo';
  const q = encodeURIComponent(`${av.lugar}, ${av.zona}, Lima, Perú`);
  return `<article class="ficha" style="animation-delay:${i*.12}s">
    ${i===0 && pct>=45 ? '<span class="cinta">Mejor coincidencia</span>' : ''}
    <div class="foto-ficha">${foto}</div>
    <div class="info">
      <span class="zona">Visto en ${av.zona}</span>
      <span class="fecha">${av.fecha}</span>
      <span>${esc(av.lugar)}</span>
      ${av.tamano?`<span class="chip">${ETIQ[av.tamano]}</span>`:''}
      ${av.nota?`<span class="nota-av">${esc(av.nota)}</span>`:''}
      <div class="pie-ficha">
        <a class="pin" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener" title="Ver en el mapa" aria-label="Ver ${av.lugar} en el mapa">${PIN}</a>
        <span class="porcentaje ${nivel}">${pct}% parecido</span>
      </div>
    </div>
  </article>`;
}

const pasos = ['Analizando colores…','Comparando con avistamientos…','Revisando zonas cercanas…'];
$('#btnBuscar').onclick = ()=>{
  const sinColor = !Object.keys(estado.fills).length && !estado.strokes.length && !estado.media;
  if(sinColor){
    const b=$('#btnBuscar'); b.classList.remove('sacudir'); void b.offsetWidth; b.classList.add('sacudir');
    return toast('Colorea a tu mascota o sube una foto 🎨');
  }
  const btn=$('#btnBuscar'); btn.disabled=true;
  caja.classList.add('buscando');
  let k=0; $('#estadoBusqueda').textContent=pasos[0];
  const t = setInterval(()=>{ k=(k+1)%pasos.length; $('#estadoBusqueda').textContent=pasos[k]; },800);

  setTimeout(()=>{
    clearInterval(t);
    caja.classList.remove('buscando'); btn.disabled=false;
    const lista = AVISTAMIENTOS.filter(a=>a.tipo===estado.pet)
      .map(a=>({a, pct:puntuar(a)})).sort((x,y)=>y.pct-x.pct).slice(0,4);
    const nombre = $('#nombre').value.trim();
    $('#tituloResultados').textContent = nombre ? `Coincidencias para ${nombre}:` : 'Coincidencias encontradas:';
    $('#subResultados').textContent = lista[0].pct>=45
      ? 'Estos avistamientos se parecen más a tu mascota. Toca el pin para ver el lugar.'
      : 'No hay coincidencias fuertes todavía, pero estos son los más cercanos. Prueba ajustando los colores.';
    renderResumen();
    $('#rejilla').innerHTML = lista.map((x,i)=>fichaHTML(x.a,x.pct,i)).join('');
    $('#resultados').scrollIntoView({behavior:'smooth',block:'start'});
  }, 2600);
};

/* ============================================================
   5) EXTRAS
   ============================================================ */
let tt;
function toast(msg){
  const t=$('#toast'); t.textContent=msg; t.classList.add('ver');
  clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('ver'),2200);
}

/* tamaño */
document.querySelectorAll('.btn-tam').forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll('.btn-tam').forEach(x=>x.setAttribute('aria-pressed', x===b));
    estado.tamano=b.dataset.tam;
    const svg=$('#lienzo svg'); if(svg) svg.style.scale=ESCALA[estado.tamano];
  };
});

/* comentario */
$('#comentario').addEventListener('input',e=>{ $('#contador').textContent=e.target.value.length; });

/* foto o video:
   Se queda en el navegador (estado.media.archivo). Para enviarlo a tu servidor usa:
   const fd = new FormData(); fd.append('archivo', estado.media.archivo); fetch('/api/mascotas', {method:'POST', body:fd}); */
function colorDesde(el){
  const c=document.createElement('canvas'); c.width=c.height=48;
  const x=c.getContext('2d',{willReadFrequently:true}); x.drawImage(el,0,0,48,48);
  const d=x.getImageData(12,12,24,24).data; let r=0,g=0,b=0,n=d.length/4;
  for(let i=0;i<d.length;i+=4){ r+=d[i]; g+=d[i+1]; b+=d[i+2]; }
  const h=v=>Math.round(v/n).toString(16).padStart(2,'0');
  return '#'+h(r)+h(g)+h(b);
}
function fijarColorMedia(hex){ estado.media.color=hex; $('#colorMedia').value=hex; }
function detectarColor(url,tipo){
  const fallo=()=>{ if(estado.media){ fijarColorMedia('#d9a441'); toast('No pudimos leer el color, elígelo tú'); } };
  if(tipo==='img'){
    const im=new Image(); im.onload=()=>{ try{ fijarColorMedia(colorDesde(im)); }catch(e){ fallo(); } }; im.onerror=fallo; im.src=url;
  } else {
    const v=document.createElement('video'); v.muted=true; v.playsInline=true; v.preload='auto';
    v.onloadeddata=()=>{ v.currentTime=Math.min(1,(v.duration||2)/2); };
    v.onseeked=()=>{ try{ fijarColorMedia(colorDesde(v)); }catch(e){ fallo(); } };
    v.onerror=fallo; v.src=url;
  }
}
function quitarMedia(){
  if(estado.media){ URL.revokeObjectURL(estado.media.url); estado.media=null; }
  $('#previa').hidden=true; $('#miniatura').innerHTML=''; $('#archivo').value='';
}
$('#archivo').addEventListener('change',e=>{
  const f=e.target.files[0]; if(!f) return;
  const img=f.type.startsWith('image/'), vid=f.type.startsWith('video/');
  if(!img && !vid){ e.target.value=''; return toast('Sube una foto o un video'); }
  if(f.size>50*1024*1024){ e.target.value=''; return toast('El archivo pesa más de 50 MB'); }
  quitarMedia();
  const url=URL.createObjectURL(f), tipo=img?'img':'video';
  estado.media={url,tipo,archivo:f,color:'#d9a441'};
  $('#miniatura').innerHTML = img ? `<img src="${url}" alt="Foto de tu mascota">` : `<video src="${url}" muted playsinline></video>`;
  $('#nombreArchivo').textContent=f.name;
  $('#previa').hidden=false;
  detectarColor(url,tipo);
  toast('Archivo listo. Ya puedes buscar 🐾');
});
$('#colorMedia').addEventListener('input',e=>{ if(estado.media) estado.media.color=e.target.value; });
$('#btnQuitarMedia').onclick=quitarMedia;

/* resumen de lo que pidió el cliente, arriba de los resultados */
function renderResumen(){
  const r=$('#resumen'), c=$('#comentario').value.trim(), nombre=$('#nombre').value.trim();
  let h='';
  if(estado.media) h+=`<div class="miniatura">${estado.media.tipo==='img'?`<img src="${estado.media.url}" alt="Tu mascota">`:`<video src="${estado.media.url}" muted playsinline></video>`}</div>`;
  h+=`<div><b>${nombre?esc(nombre)+': ':''}${estado.pet} ${ETIQ[estado.tamano].toLowerCase()}</b>${c?`<p>“${esc(c)}”</p>`:''}</div>`;
  r.innerHTML=h; r.hidden=false;
}

crearPaleta();
pintar();