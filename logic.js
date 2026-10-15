(function(root){
 const dayKey=d=>{d=new Date(d);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
 const shift=(d,n)=>{d=new Date(d);d.setDate(d.getDate()+n);return d};
 function summary(history,now=new Date()){const today=dayKey(now),start=new Date(now);start.setHours(0,0,0,0);start.setDate(start.getDate()-((start.getDay()+6)%7));const days=Array.from({length:7},(_,i)=>{const date=shift(start,i);return {key:dayKey(date),label:['M','T','W','T','F','S','S'][i],minutes:0}});let minutes=0;history.forEach(s=>{const k=dayKey(s.at);if(k===today)minutes+=s.minutes;const d=days.find(d=>d.key===k);if(d)d.minutes+=s.minutes});const keys=new Set(history.map(s=>dayKey(s.at)));let cursor=keys.has(today)?new Date(now):shift(now,-1),streak=0;while(keys.has(dayKey(cursor))){streak++;cursor=shift(cursor,-1)}return {today:minutes,week:days.reduce((n,d)=>n+d.minutes,0),days,streak}}
 function nextPhase(mode,completed){return mode==='focus'?(completed%4===0?'long':'short'):'focus'}
 function remaining(end,now){return Math.max(0,Math.ceil((end-now)/1000))}
 const api={dayKey,shift,summary,nextPhase,remaining};if(typeof module!=='undefined')module.exports=api;else root.FocusLogic=api;
})(typeof window!=='undefined'?window:globalThis);
