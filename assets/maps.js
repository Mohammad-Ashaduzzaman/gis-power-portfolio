/* Local geographic context, optional online imagery, and graceful failure. */
(function(){
 'use strict';
 const source=window.PORTFOLIO_GEOGRAPHY;
 const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const Regional=L.Layer.extend({
  options:{attribution:'Regional context: <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a> · generalized geography'},
  onAdd(map){
   this._map=map;const name='regional-geography';
   if(!map.getPane(name)){map.createPane(name);map.getPane(name).style.zIndex='210';map.getPane(name).style.pointerEvents='none'}
   const renderer=L.svg({pane:name});
   const style={pane:name,renderer,interactive:false};
   const geo=(data,extra)=>L.geoJSON(data,{...style,style:()=>({...style,...extra})});
   this._group=L.layerGroup([
    geo(source.countries,{color:'#a4b4a0',weight:1,fillColor:'#edf1e7',fillOpacity:1}),
    geo(source.urban,{color:'#d6dfce',weight:.5,fillColor:'#dce5d5',fillOpacity:.55}),
    geo(source.roads,{color:'#fffdf6',weight:3.5,opacity:.95}),
    geo(source.roads,{color:'#d2c8a9',weight:1.1,opacity:.9}),
    geo(source.rivers,{color:'#a1c6c6',weight:3,opacity:.9})
   ]).addTo(map);
   this._labels=L.layerGroup();
   source.places.features.forEach(f=>{const [lng,lat]=f.geometry.coordinates;this._labels.addLayer(L.marker([lat,lng],{pane:name,interactive:false,icon:L.divIcon({className:'regional-place',html:'<span>'+e(f.properties.name)+'</span>',iconSize:[110,18],iconAnchor:[55,9]})}))});
   this._labels.addTo(map);map.getContainer().classList.add('regional-map');
   this._update=()=>{const visible=map.getZoom()>=7;this._labels.eachLayer(l=>{if(l.getElement())l.getElement().style.display=visible?'':'none'})};
   map.on('zoomend',this._update);this._update();
  },
  onRemove(map){map.off('zoomend',this._update);map.removeLayer(this._group);map.removeLayer(this._labels);map.getContainer().classList.remove('regional-map')}
 });
 function create(){return {local:new Regional(),imagery:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,noWrap:true,attribution:'Imagery © Esri, Maxar, Earthstar Geographics and the GIS User Community'})}}
 function connect(map,layers,api){
  const status=document.getElementById('mapStatus');let timer,errors=0,loaded=0;
  function show(message,state){if(status){status.textContent=message;status.dataset.state=state||'local'}}
  function fallback(){if(api.active()!==layers.imagery)return;clearTimeout(timer);api.fallback();show('Imagery unavailable · regional map active','fallback')}
  layers.imagery.on('loading',()=>{clearTimeout(timer);errors=0;loaded=0;show('Loading satellite imagery…','loading');timer=setTimeout(()=>{if(!loaded)fallback()},7000)});
  layers.imagery.on('tileload',()=>{loaded++;clearTimeout(timer);show('Satellite imagery · online','online')});
  layers.imagery.on('tileerror',ev=>{if(ev.tile)ev.tile.style.display='none';if(++errors>=2)fallback()});
  map.on('layeradd',ev=>{if(ev.layer===layers.local){clearTimeout(timer);show('Regional map · available offline','local')}});
  map.on('layerremove',ev=>{if(ev.layer===layers.local&&!map.hasLayer(layers.imagery))show('Basemap hidden','hidden')});
  show('Regional map · available offline','local');
  if(map.attributionControl)map.attributionControl.setPosition('bottomleft');
  L.control.scale({position:'bottomleft',imperial:false,maxWidth:120}).addTo(map);
  const coordinates=document.getElementById('mapCoordinates');
  if(coordinates)map.on('mousemove',ev=>coordinates.textContent=ev.latlng.lat.toFixed(4)+'° N  ·  '+ev.latlng.lng.toFixed(4)+'° E');
  return {fallback};
 }
 window.PortfolioMaps={create,connect};
})();
