var q = new URLSearchParams(location.search);
runtime.view="course"; runtime.sectionId=7; runtime.coursePage=q.get('page')||"theory"; renderMain();
setTimeout(function(){
  var out=[];
  document.querySelectorAll('.theory-block figure.lesson-figure').forEach(function(f,i){
    var fr=f.getBoundingClientRect(); var sibs=[]; var el=f.nextElementSibling;
    var lastBottom=fr.top, nextTop=null;
    while(el){ var r=el.getBoundingClientRect();
      if(el.matches('figure')){ if(r.top>=fr.bottom-1){nextTop=r.top;break;} el=el.nextElementSibling; continue;}
      if(r.height===0 && !el.matches('div')){el=el.nextElementSibling;continue;}
      if(r.top < fr.bottom-1 && r.height>0){ lastBottom=Math.max(lastBottom,r.bottom); }
      else if(r.top>=fr.bottom-1){ nextTop=r.top; break; }
      el=el.nextElementSibling; }
    var gap = lastBottom<fr.bottom ? Math.round((nextTop||fr.bottom)-lastBottom - 0) : 0;
    out.push((f.querySelector('img').getAttribute('src'))+': fig '+Math.round(fr.height)+'px, textEnd '+Math.round(lastBottom-fr.top)+', gap '+Math.round(fr.bottom-lastBottom));
  });
  document.body.setAttribute('data-gaps', out.join(' | '));
}, 1500);
