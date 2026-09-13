/* Shared interactions; project calculations remain in their original pages. */
(function(){
 'use strict';
 const byId=id=>document.getElementById(id),body=document.body;
 const projectId=APP.id;
 PortfolioMaps.connect(map,bm,{active:()=>activeBm,fallback:()=>{if(activeBm&&map.hasLayer(activeBm))map.removeLayer(activeBm);activeBm=bm.local;byId('basemap').value='local';if(typeof layerState==='undefined'||layerState.basemap!==false)activeBm.addTo(map)}});
 if(map.zoomControl)map.zoomControl.setPosition('topright');
 const full=byId('fullscreenBtn');
 full.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else toast('Full screen is not available in this browser')}catch{toast('Use your browser full-screen control')}});
 const panel=byId('contextPanel'),detail=byId('detailDrawer'),drawer=byId('dataDrawer');
 function closePanel(){panel.classList.remove('mobile-open');body.classList.remove('panel-visible')}
 function panelState(){panel.inert=window.innerWidth<=820&&!panel.classList.contains('mobile-open');body.classList.toggle('panel-visible',panel.classList.contains('mobile-open')&&window.innerWidth<=820);byId('panelDismiss').hidden=!body.classList.contains('panel-visible')}
 byId('panelDismiss').addEventListener('click',closePanel);
 byId('togglePanelBtn').addEventListener('click',()=>{body.classList.toggle('panel-collapsed');byId('togglePanelBtn').setAttribute('aria-pressed',String(body.classList.contains('panel-collapsed')));setTimeout(()=>map.invalidateSize(),30)});
 const updateSize=()=>{if(window.innerWidth>820)closePanel();map.invalidateSize();panelState()};window.addEventListener('resize',updateSize);
 new MutationObserver(panelState).observe(panel,{attributes:true,attributeFilter:['class']});
 function decoratePanel(){
  const head=byId('panelHead');if(head&&!head.querySelector('.panel-close')){const btn=document.createElement('button');btn.className='icon-btn panel-close';btn.type='button';btn.setAttribute('aria-label','Close panel');btn.innerHTML='<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>';btn.addEventListener('click',closePanel);head.append(btn)}
  const h=head.querySelector('h2');if(h&&h.textContent==='ProjectDetails')h.textContent='Project Details';
  document.querySelectorAll('.nav-btn').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.classList.contains('active'))));
  const lists=byId('panelBody').querySelectorAll('.entity-list');lists.forEach(list=>{if(!list.children.length)list.innerHTML='<div class="empty-results">No matching records.<br>Try a broader search or reset the filters.</div>'});
  document.querySelectorAll('.entity-row').forEach(row=>{if(row.dataset.keyboardReady)return;row.dataset.keyboardReady='true';row.tabIndex=0;row.setAttribute('aria-label','View '+(row.querySelector('b')?.textContent||'record'));row.addEventListener('keydown',ev=>{if(ev.target===row&&(ev.key==='Enter'||ev.key===' ')){ev.preventDefault();row.click()}})});
  if(activeNav==='overview'&&!byId('panelBody').querySelector('.map-hint')){const hint=document.createElement('p');hint.className='map-hint';hint.textContent='Click a map feature to inspect it. Use checkboxes to compare several records. Press / to search and Esc to close a panel.';byId('panelBody').append(hint)}
  if(activeNav==='projectDetails'&&!byId('panelBody').querySelector('.app-signature')){const sig=document.createElement('div');sig.className='app-signature';sig.textContent='Developed and Designed by Md. Ashaduzzaman';byId('panelBody').append(sig)}
 }
 let panelJob;new MutationObserver(()=>{clearTimeout(panelJob);panelJob=setTimeout(decoratePanel,0)}).observe(byId('panelHead'),{childList:true});
 let lastFocus=null;
 new MutationObserver(()=>{const isOpen=detail.classList.contains('open');detail.setAttribute('aria-hidden',String(!isOpen));detail.inert=!isOpen;if(isOpen){closePanel();lastFocus=document.activeElement;if(!detail.contains(document.activeElement))byId('detailClose').focus({preventScroll:true})}else if(lastFocus?.isConnected){lastFocus.focus({preventScroll:true});lastFocus=null}decorateTable()}).observe(detail,{attributes:true,attributeFilter:['class']});
 detail.inert=!detail.classList.contains('open');
 new MutationObserver(()=>{const open=drawer.classList.contains('open')||drawer.classList.contains('full');byId('drawerHandle').setAttribute('aria-expanded',String(open));byId('expandData').textContent=drawer.classList.contains('full')?'Restore':open?'Expand':'Open';drawer.querySelector('.drawer-body').inert=!open;byId('closeDataBtn').hidden=!open;if(open)closePanel()}).observe(drawer,{attributes:true,attributeFilter:['class']});
 byId('closeDataBtn').addEventListener('click',ev=>{ev.stopPropagation();drawer.classList.remove('full');if(typeof drawerFull!=='undefined')drawerFull=false;toggleDrawer(false)});
 byId('csvMini').addEventListener('click',ev=>{ev.stopImmediatePropagation();ev.preventDefault();let rows=typeof tableDefs!=='undefined'?[...tableDefs[activeTableTab].rows()]:[...tableRows(activeTableTab)];if(!rows.length){toast('There are no records to export');return}const sort=byId('dataHead').querySelector('th[aria-sort="ascending"],th[aria-sort="descending"]');if(sort){const key=sort.textContent,direction=sort.getAttribute('aria-sort')==='ascending'?1:-1;rows.sort((a,b)=>String(a[key]??'').localeCompare(String(b[key]??''),undefined,{numeric:true})*direction)}const cols=Object.keys(rows[0]).filter(k=>!k.startsWith('__'));const quote=v=>'"'+String(v??'').replaceAll('"','""')+'"';const csv='\uFEFF'+[cols.map(quote).join(','),...rows.map(row=>cols.map(k=>quote(row[k])).join(','))].join('\r\n');downloadBlob(projectId+'_'+activeTableTab+'.csv',csv,'text/csv;charset=utf-8')},true);
 byId('drawerHandle').addEventListener('keydown',ev=>{if(ev.target===byId('drawerHandle')&&(ev.key==='Enter'||ev.key===' ')){ev.preventDefault();toggleDrawer()}});
 byId('expandData').addEventListener('click',()=>{if(!drawer.classList.contains('open'))toggleDrawer(true)});
 document.addEventListener('keydown',ev=>{
  const input=/INPUT|SELECT|TEXTAREA/.test(ev.target.tagName)||ev.target.isContentEditable;
  if(ev.key==='/'&&!input){ev.preventDefault();byId('globalSearch').focus()}
  if(ev.key==='Escape'){if(detail.classList.contains('open')){detail.classList.remove('open')}else if(panel.classList.contains('mobile-open'))closePanel();else if(drawer.classList.contains('open')||drawer.classList.contains('full')){drawer.classList.remove('full');if(typeof drawerFull!=='undefined')drawerFull=false;toggleDrawer(false)}else byId('globalSearch').blur()}
 });
 const find=(a,k,r)=>Array.isArray(a)?a.find(x=>String(x[k])===String(r[k])):null;
 function actionFor(r){
  let obj;
  if(/^P0[1-5]$/.test(projectId)){const id=r[APP.fields.id];obj=id&&entityById(id);if(obj)return()=>selectEntity(obj,true)}
  if(projectId==='P06'){obj=find(APP.parcels,'parcel_id',r);if(obj)return()=>selectEntity(obj,true)}
  if(projectId==='P07'){obj=find(APP.assets,'asset_id',r);if(obj)return()=>selectEntity(obj,true)}
  if(['P08','P09','P10'].includes(projectId)){for(const [key,value] of Object.entries(r)){if(key.endsWith('_id')){obj=APP.entities.find(x=>String(x.entity_id)===String(value));if(obj)return()=>selectEntity(obj,true)}}}
  if(projectId==='P11'){obj=find(APP.assets,'asset_id',r);if(obj)return()=>selectAsset(obj,true)}
  if(projectId==='P12'){obj=find(APP.cells,'cell_id',r);if(obj)return()=>selectCell(obj,true)}
  if(projectId==='P13'){obj=find(APP.assets,'asset_id',r);if(obj)return()=>selectAsset(obj,true);obj=find(APP.wards,'ward_id',r);if(obj)return()=>openWard(obj)}
  if(projectId==='P14'){const a=allocation();obj=find(a.rows,'cell_id',r);if(obj)return()=>selectDemand(obj,true);obj=find(a.candidateRanking,'candidate_id',r);if(obj)return()=>openCandidate(obj);obj=find(a.activeFacilities,'facility_id',r);if(obj)return()=>selectFacility(obj,true)}
  if(projectId==='P15'){const c=calculate();obj=c.tmap[r.transformer_id];if(obj)return()=>selectTransformer(obj,true);obj=c.smap[r.segment_id];if(obj)return()=>openSegment(obj);obj=c.fmap[r.feeder_id];if(obj)return()=>openFeeder(obj)}
  if(projectId==='P16'){obj=find(APP.customerClusters,'cluster_id',r);if(obj)return()=>openCustomer(obj);obj=find(APP.devices,'device_id',r);if(obj)return()=>openDevice(obj);obj=find(APP.ties,'tie_id',r);if(obj)return()=>openTie(trace().options.find(x=>x.tie_id===obj.tie_id)||obj);obj=find(APP.segments,'segment_id',r);if(obj)return()=>openSegment(obj);obj=find(APP.transformers,'transformer_id',r);if(obj)return()=>openTransformer(obj)}
  return null;
 }
 function decorateTable(){
  const keys=[...byId('dataHead').querySelectorAll('th')].map(x=>x.textContent);
  byId('dataBody').querySelectorAll('tr').forEach(row=>{const r=Object.fromEntries([...row.cells].map((cell,i)=>[keys[i],cell.textContent]));const action=actionFor(r);const primaryId=Object.entries(r).find(([k])=>k.endsWith('_id'));const sel=!!primaryId&&((typeof selected!=='undefined'&&selected.has(primaryId[1]))||(typeof activeEntity!=='undefined'&&activeEntity&&String(activeEntity[primaryId[0]])===primaryId[1]));row.classList.toggle('is-selected',sel);row.setAttribute('aria-selected',String(sel));row.dataset.linked=String(!!action);if(action&&!row.dataset.enhanced){row.dataset.enhanced='true';row.tabIndex=0;row.title='Open linked map details';row.addEventListener('click',()=>{action();decorateTable()});row.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();row.click()}})}});
  byId('dataHead').querySelectorAll('th').forEach((th,index)=>{if(th.dataset.enhanced)return;th.dataset.enhanced='true';th.tabIndex=0;th.title='Sort by '+th.textContent;th.setAttribute('aria-sort','none');const sort=()=>{const asc=th.getAttribute('aria-sort')!=='ascending';byId('dataHead').querySelectorAll('th').forEach(x=>x.setAttribute('aria-sort','none'));th.setAttribute('aria-sort',asc?'ascending':'descending');const rows=[...byId('dataBody').rows];rows.sort((a,b)=>(a.cells[index]?.textContent||'').localeCompare(b.cells[index]?.textContent||'',undefined,{numeric:true})*(asc?1:-1));byId('dataBody').append(...rows)};th.addEventListener('click',sort);th.addEventListener('keydown',ev=>{if(ev.key==='Enter')sort()})});
 }
 let tableJob;new MutationObserver(()=>{clearTimeout(tableJob);tableJob=setTimeout(decorateTable,0)}).observe(byId('dataBody'),{childList:true});
 document.addEventListener('change',ev=>{if(ev.target.matches('.row-check'))setTimeout(decorateTable,0)});
 const nativeNav=setNav;setNav=function(...args){body.classList.remove('panel-collapsed');nativeNav(...args);decoratePanel();panelState();setTimeout(()=>map.invalidateSize(),30)};
 byId('globalSearch').addEventListener('input',()=>{if(typeof renderDrawer==='function')renderDrawer()});
 decoratePanel();decorateTable();panelState();drawer.querySelector('.drawer-body').inert=true;
 body.dataset.portfolioVersion='6';body.dataset.mapRuntime='leaflet-local';
})();
