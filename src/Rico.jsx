import { useState, useEffect, useRef } from "react";

const G = "#006C35", GB = "#00A94F", GOLD = "#C8A84C", GLDL = "#E8C86A", DARK = "#03100A", D2 = "#071A0F";

const CATS = [
  ["🍽️","مطاعم","أفضل مطعم في الرياض بتقييم عالي مع الأسعار وأوقات العمل"],
  ["🔥","عروض","أحدث عروض وخصومات المتاجر السعودية هذا الأسبوع 2025"],
  ["🛒","سوبرماركت","عروض بنده كارفور العثيم هايبر باندا هذا الأسبوع"],
  ["🏥","عيادات","أفضل عيادة طبية في الرياض مع التقييم والأسعار"],
  ["☕","كافيهات","أفضل كافيه هادي في الرياض مع الأسعار"],
  ["🚗","تأجير سيارات","أفضل مكاتب تأجير سيارات في الرياض مع الأسعار اليومية"],
  ["🔧","ورش","أفضل ورشة سيارات في الرياض"],
  ["🏡","استراحات","استراحات وشاليهات للإيجار في الرياض مع الأسعار"],
  ["📱","إلكترونيات","أفضل أسعار الجوالات في السعودية جرير إكسترا"],
  ["✈️","سفر","أفضل عروض السفر والسياحة من السعودية"],
  ["🧹","تنظيف","أفضل شركات تنظيف المنازل في الرياض مع الأسعار"],
  ["🛋️","أثاث","عروض الأثاث ايكيا وهوم سنتر في السعودية"],
  ["💳","تقسيط","أفضل شركات التقسيط في السعودية"],
  ["🛡️","تأمين","أفضل شركات التأمين في السعودية"],
];

const PRODS = [
  {g:"🥬 خضار",items:[["🍅 طماطم","250غ,500غ,1كغ,2كغ"],["🥒 خيار","250غ,500غ,1كغ,2كغ"],["🧅 بصل","500غ,1كغ,2كغ"],["🥔 بطاطس","500غ,1كغ,2كغ,3كغ"],["🥕 جزر","250غ,500غ,1كغ"],["🧄 ثوم","250غ,500غ,1كغ"],["🥦 بروكلي","250غ,500غ,1كغ"],["🌽 ذرة","1حبة,2حبة,3حبة"],["🌿 كوسا","250غ,500غ,1كغ"]]},
  {g:"🍎 فواكه",items:[["🍎 تفاح","500غ,1كغ,2كغ,3كغ"],["🍊 برتقال","500غ,1كغ,2كغ"],["🍌 موز","500غ,1كغ,2كغ"],["🥭 مانجو","500غ,1كغ,2كغ"],["🌴 تمر","500غ,1كغ,2كغ,5كغ"],["🍉 بطيخ","1حبة,2حبة"],["🍓 فراولة","250غ,500غ,1كغ"],["🍋 ليمون","500غ,1كغ"]]},
  {g:"🥩 لحوم ودواجن",items:[["🐔 دجاج كامل","500غ,1كغ,1.5كغ,2كغ,3كغ"],["🍗 صدور دجاج","500غ,1كغ,1.5كغ,2كغ"],["🍗 أفخاذ دجاج","500غ,1كغ,1.5كغ,2كغ"],["🥩 لحم بقري مفروم","500غ,1كغ,1.5كغ"],["🥩 لحم خروف","500غ,1كغ,1.5كغ"],["🌭 نقانق","250غ,500غ"],["🥩 مرتديلا","250غ,500غ"]]},
  {g:"🐟 أسماك",items:[["🐟 سمك طازج","500غ,1كغ,1.5كغ"],["🦐 روبيان","500غ,1كغ"],["🐟 تونة معلبة","علبة,2علبة,4علبة,كرتون"]]},
  {g:"🥛 ألبان وبيض",items:[["🥛 حليب","1لتر,2لتر,6عبوات"],["🥚 بيض","كرتون6,كرتون12,كرتون30"],["🧀 جبن أبيض","200غ,500غ,1كغ"],["🧀 جبن شيدر","200غ,500غ"],["🧈 زبدة","100غ,200غ,400غ"],["🥛 قشطة","100مل,200مل,500مل"],["🧀 لبنة","200غ,500غ,1كغ"]]},
  {g:"🌾 حبوب وبقوليات",items:[["🌾 رز","1كغ,2كغ,5كغ,10كغ,25كغ,50كغ"],["🌾 طحين","1كغ,2كغ,5كغ,10كغ,25كغ"],["🫘 عدس","500غ,1كغ,2كغ"],["🫘 فول","500غ,1كغ,2كغ,5كغ"],["🫘 حمص","500غ,1كغ,2كغ"],["🌾 شوفان","500غ,1كغ"]]},
  {g:"🫒 زيوت ودهون",items:[["🫒 زيت نباتي","500مل,1لتر,2لتر,3لتر,5لتر"],["🫒 زيت زيتون","250مل,500مل,1لتر,2لتر"],["🧈 سمن حيواني","250غ,500غ,1كغ,2كغ"],["🧈 سمن نباتي","250غ,500غ,1كغ"]]},
  {g:"🍬 سكر وتوابل",items:[["🍬 سكر أبيض","1كغ,2كغ,5كغ,10كغ"],["🧂 ملح","500غ,1كغ,2كغ"],["🍯 عسل","250مل,500مل,1كغ"],["🌶️ بهارات مشكلة","100غ,250غ,500غ"],["🌶️ كمون","100غ,250غ"],["🍅 كاتشب","100مل,250مل,500مل"],["🫙 مايونيز","100مل,250مل,500مل"]]},
  {g:"🥫 معلبات",items:[["🍅 طماطم معلبة","علبة,2علبة,كرتون"],["🫘 فول معلب","علبة,2علبة,كرتون"],["🌽 ذرة معلبة","علبة,2علبة,4علبة"]]},
  {g:"❄️ مجمدات",items:[["🍗 دجاج مجمد","500غ,1كغ,1.5كغ,2كغ"],["🐟 سمك مجمد","500غ,1كغ"],["🌽 خضار مجمدة","250غ,500غ,1كغ"],["🥔 بطاطس مجمدة","500غ,1كغ"]]},
  {g:"🥤 مشروبات",items:[["💧 مياه معدنية","500مل,1لتر,1.5لتر,2لتر"],["🧃 عصير برتقال","250مل,500مل,1لتر,2لتر"],["🧃 عصير مانجو","250مل,500مل,1لتر,2لتر"],["🥤 مشروب غازي","250مل,500مل,1لتر,1.5لتر,2لتر"]]},
  {g:"☕ شاي وقهوة",items:[["🍵 شاي أكياس","25كيس,50كيس,100كيس"],["🍵 شاي سائب","100غ,200غ,500غ,1كغ"],["☕ نسكافيه","100غ,250غ,500غ"],["☕ قهوة عربية","100غ,250غ,500غ,1كغ"]]},
  {g:"🧹 منظفات",items:[["🧴 سائل جلي","500مل,1لتر,2لتر,5لتر"],["🧺 مسحوق غسيل","1كغ,2كغ,3كغ,5كغ,7كغ,10كغ"],["🧺 سائل غسيل","500مل,1لتر,2لتر,3لتر"],["🧴 منعم ملابس","500مل,1لتر,2لتر"],["🧹 منظف أرضيات","500مل,1لتر,2لتر"],["🧻 ورق حمام","8لفة,12لفة,24لفة,48لفة"],["🧻 مناديل","علبة,2علبة,كيس"],["🛍️ أكياس قمامة","كيس,كرتون"]]},
  {g:"🧴 عناية شخصية",items:[["🧴 شامبو","200مل,400مل,600مل,1لتر"],["🧼 صابون سائل","200مل,400مل,600مل"],["🪥 معجون أسنان","75مل,100مل,150مل,200مل"],["💨 مزيل عرق","150مل,200مل,250مل"],["🧴 كريم مرطب","100مل,200مل,400مل"]]},
  {g:"👶 أطفال",items:[["👶 حفاضات","صغير S,وسط M,كبير L,XL,XXL"],["👶 مناديل أطفال","علبة صغيرة,علبة كبيرة,كيس"],["🍼 حليب أطفال","200غ,400غ,900غ"]]},
];

const APPS_LIST = [
  {sec:"🍽️ توصيل الطعام"},
  {ic:"🍔",nm:"هنقرستيشن",ds:"توصيل من آلاف المطاعم",url:"https://www.hungerstation.com",bg:"linear-gradient(135deg,#E8001C,#FF4444)"},
  {ic:"🛵",nm:"جاهز",ds:"أسرع توصيل في السعودية",url:"https://www.jahez.net",bg:"linear-gradient(135deg,#FF6B00,#FF9500)"},
  {ic:"🚗",nm:"كريم",ds:"طعام + توصيل + نقل",url:"https://www.careem.com",bg:"linear-gradient(135deg,#00B14F,#00D461)"},
  {sec:"🛒 تسوق وبقالة"},
  {ic:"🛍️",nm:"نون",ds:"تسوق إلكتروني",url:"https://www.noon.com/saudi-ar",bg:"linear-gradient(135deg,#FEEE00,#FFD700)",tc:"#000"},
  {ic:"📦",nm:"أمازون السعودية",ds:"ملايين المنتجات",url:"https://www.amazon.sa",bg:"linear-gradient(135deg,#FF9900,#FFB84D)"},
  {ic:"🐼",nm:"هايبر باندا",ds:"بقالة وتوصيل منزلي",url:"https://www.panda.com.sa",bg:"linear-gradient(135deg,#006C35,#00A94F)"},
  {sec:"💊 صحة وعناية"},
  {ic:"💊",nm:"النهدي",ds:"توصيل دواء للمنزل",url:"https://www.nahdi.sa",bg:"linear-gradient(135deg,#005B99,#0077CC)"},
  {sec:"🚗 نقل ومواصلات"},
  {ic:"🚖",nm:"أوبر",ds:"توصيل وتنقل",url:"https://www.uber.com/sa/ar",bg:"linear-gradient(135deg,#000,#333)"},
  {ic:"🟣",nm:"جيني",ds:"تاكسي ذكي",url:"https://www.jeeny.com",bg:"linear-gradient(135deg,#7B2FBE,#9B59B6)"},
];

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

const MERCHANT_TYPES = ["🍽️ مطعم","☕ كافيه","🏥 عيادة طبية","🦷 عيادة أسنان","💊 صيدلية","✂️ صالون حلاقة","💆 مركز تجميل","🏋️ نادي رياضي","🛒 سوبرماركت","🚗 تأجير سيارات","🔧 ورشة سيارات","📦 شحن ونقل","🏡 استراحة / شاليه","✈️ سفر وسياحة","🛡️ تأمين","💳 تقسيط","👷 استقدام","🧹 تنظيف","👕 مغسلة","📱 صيانة جوالات","📱 إلكترونيات","🛋️ أثاث","🏗️ تأجير معدات","💼 خدمات أخرى"];



export default function Rico() {
  const [msgs, setMsgs] = useState([{r:"a",html:`مرحباً! أنا <strong style="color:${GB}">ريكو</strong> 👋<br/>مساعدك الذكي للتجارة في المملكة العربية السعودية 🇸🇦<br/><br/>📍 <strong>أفضل الأماكن القريبة</strong> — مطاعم، عيادات، ورش، كافيهات<br/>🔥 <strong>العروض والخصومات</strong> — أحدث تخفيضات المتاجر<br/>💰 <strong>مقارنة الأسعار</strong> — ابحث عن أرخص سعر<br/>🛒 <strong>سلة البقالة الذكية</strong> — 120+ صنف من كل الفئات<br/>📲 <strong>التطبيقات</strong> — هنقرستيشن، جاهز، كريم، نون وأكثر<br/><br/><span style="background:rgba(0,108,53,0.1);border:1px solid rgba(0,140,65,0.2);border-radius:18px;padding:3px 10px;font-size:11px;color:${GB}">💡 فكرة م. طراد راكان الزبن | محلل نظم معلومات</span>`}]);
  const [inp,setInp] = useState("");
  const [busy,setBusy] = useState(false);
  const [cat,setCat] = useState(null);
  const [showSugs,setShowSugs] = useState(true);
  const [modal,setModal] = useState(null);
  const [basket,setBasket] = useState([]);
  const [bProd,setBProd] = useState("");
  const [bSize,setBSize] = useState("");
  const [mDone,setMDone] = useState(false);
  const ref = useRef(null);

  useEffect(()=>{ if(ref.current) ref.current.scrollTop=ref.current.scrollHeight; },[msgs,busy]);

  const addMsg=(r,html)=>setMsgs(p=>[...p,{r,html}]);

  const send=async(text)=>{
    if(busy||!text.trim()) return;
    const txt=text.trim();
    setInp(""); setBusy(true); setShowSugs(false);
    addMsg("u",txt);
    const sys=`أنت ريكو، مساعد ذكاء اصطناعي تجاري متخصص في المملكة العربية السعودية.
صاحب الفكرة: طراد راكان الزبن، محلل نظم معلومات عربي سوري. إذا سُئلت عن هويتك قل: "أنا ريكو 🟢 فكرتي من إبداع المحلل طراد راكان الزبن، محلل نظم معلومات".
مهامك: ١. أفضل الأماكن مع التقييم والسعر وأوقات العمل ٢. العروض والخصومات من المتاجر السعودية ٣. مقارنة الأسعار ٤. التوصية بالتطبيقات المناسبة.
تعليمات: ابحث في الإنترنت أولاً، نظّم بإيموجي، 3-5 خيارات مرتبة، اقترح سؤالاً متابعاً، بالعربية دائماً.`;
    try{
      const res=await fetch("https://api.groq.com/openai/v1/chat/completions",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${GROQ_API_KEY}`
        },
        body:JSON.stringify({
          model:"llama-3.3-70b-versatile",
          messages:[
            {role:"system",content:sys},
            {role:"user",content:txt}
          ],
          max_tokens:1024,
          temperature:0.7
        })
      });
      const d=await res.json();
      if(!res.ok){ addMsg("a",`⚠️ خطأ: ${d.error?.message||res.statusText}`); setBusy(false); return; }
      const rep=d.choices?.[0]?.message?.content||"عذراً لم أتمكن من الرد.";
      const fmt=rep.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/#{1,3} (.*?)(\n|$)/g,"<strong>$1</strong><br/>").replace(/\n/g,"<br/>");
      addMsg("a",fmt);
    }catch{ addMsg("a","عذراً، حدث خطأ. حاول مرة أخرى. 🙏"); }
    setBusy(false);
  };

  const sizes=()=>{ for(const g of PRODS) for(const [nm,sz] of g.items) if(nm===bProd) return sz.split(","); return []; };
  const addToBasket=()=>{ if(!bProd||!bSize) return; setBasket(p=>[...p,{nm:bProd,sz:bSize,id:Date.now()}]); setBProd(""); setBSize(""); };
  const searchBasket=()=>{ if(!basket.length) return; const q=`قارن أسعار هذه المنتجات في الرياض بين بنده وكارفور والعثيم ونون وهايبر باندا:\n${basket.map((i,n)=>`${n+1}. ${i.nm} ${i.sz}`).join("\n")}\n\nأجمع التكلفة الإجمالية في كل متجر وحدد الأرخص ومقدار التوفير.`; setModal(null); send(q); };
  const openApp=(url,nm)=>{ setModal(null); addMsg("u","افتح تطبيق "+nm); addMsg("a",`جارٍ فتح <strong>${nm}</strong> 🚀<br/><a href="${url}" target="_blank" style="color:${GB};font-weight:700">اضغط هنا لفتح ${nm} ←</a>`); };

  const inp_style={width:"100%",background:"rgba(255,255,255,0.04)",border:`1px solid rgba(0,140,65,0.18)`,borderRadius:8,padding:"8px 11px",color:"#E8F0EA",fontSize:12,fontFamily:"inherit",outline:"none",direction:"rtl",marginBottom:10};
  const sel_style={...inp_style,background:D2};

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:DARK,fontFamily:"'Tajawal',sans-serif",direction:"rtl",color:"#E8F0EA",overflow:"hidden"}}>

      {/* HDR */}
      <div style={{flexShrink:0,background:"rgba(3,16,10,0.98)",borderBottom:"1px solid rgba(0,140,65,0.2)",padding:"8px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${G},${GB})`,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none"><rect x="18.5" y="17" width="3" height="13" rx="1.2" fill="white"/><path d="M20 17 Q13 11 7 13" stroke="white" strokeWidth="2.2" strokeLinecap="round"/><path d="M20 17 Q20 9 20 3" stroke="white" strokeWidth="2.2" strokeLinecap="round"/><path d="M20 17 Q27 11 33 13" stroke="white" strokeWidth="2.2" strokeLinecap="round"/><path d="M7 33 L31 33" stroke="white" strokeWidth="2.2" strokeLinecap="round"/><path d="M29.5 31 L33 33.5 L29.5 35.5" fill="white"/></svg>
          </div>
          <div>
            <div style={{fontSize:17,fontWeight:900}}>ريكو <span style={{width:6,height:6,background:GB,borderRadius:"50%",display:"inline-block",marginLeft:2}}></span></div>
            <div style={{fontSize:8,color:"#6B9E76",letterSpacing:1}}>RICO AI • تجاري</div>
          </div>
        </div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {[["🛒 سلة","basket"],["📲 تطبيقات","apps"],["🏪 سجّل نشاطك","merchant"]].map(([l,m])=>(
            <button key={m} onClick={()=>{setModal(m);setMDone(false);}} style={{background:"transparent",border:`1px solid ${m==="merchant"?"rgba(200,168,76,0.3)":"rgba(0,140,65,0.22)"}`,borderRadius:8,padding:"5px 10px",fontSize:11,cursor:"pointer",color:m==="merchant"?GOLD:"#6B9E76",fontFamily:"inherit"}}>{l}</button>
          ))}
        </div>
      </div>

      {/* CATS */}
      <div style={{flexShrink:0,display:"flex",gap:6,padding:"6px 14px",overflowX:"auto",borderBottom:"1px solid rgba(0,140,65,0.07)"}}>
        {CATS.map(([ic,lb,q],i)=>(
          <button key={i} onClick={()=>{setCat(i);send(q);}} style={{background:cat===i?"rgba(0,108,53,0.15)":"rgba(255,255,255,0.04)",border:`1px solid ${cat===i?GB:"rgba(0,140,65,0.18)"}`,color:cat===i?GB:"#6B9E76",borderRadius:18,padding:"4px 12px",fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"}}>
            {ic} {lb}
          </button>
        ))}
      </div>

      {/* MSGS */}
      <div ref={ref} style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:12}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",gap:8,flexDirection:m.r==="u"?"row-reverse":"row",alignItems:"flex-start",animation:"fi .3s ease"}}>
            <div style={{width:28,height:28,borderRadius:8,background:m.r==="a"?`linear-gradient(135deg,${G},${GB})`:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:m.r==="a"?12:14,fontWeight:900,color:"#fff",flexShrink:0}}>{m.r==="a"?"ر":"👤"}</div>
            <div style={{maxWidth:"80%",borderRadius:m.r==="a"?"2px 14px 14px 14px":"14px 2px 14px 14px",padding:"10px 13px",fontSize:13,lineHeight:1.8,background:m.r==="a"?"rgba(255,255,255,0.04)":"rgba(0,108,53,0.18)",border:`1px solid ${m.r==="a"?"rgba(255,255,255,0.07)":"rgba(0,140,65,0.25)"}`}} dangerouslySetInnerHTML={{__html:m.html}}/>
          </div>
        ))}
        {busy&&<div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
          <div style={{width:28,height:28,borderRadius:8,background:`linear-gradient(135deg,${G},${GB})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",flexShrink:0}}>ر</div>
          <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"2px 14px 14px 14px",padding:"12px 14px",display:"flex",gap:5}}>
            {[0,.2,.4].map((d,i)=><span key={i} style={{width:7,height:7,borderRadius:"50%",background:GB,display:"block",animation:`bc 1.2s ${d}s infinite`}}></span>)}
          </div>
        </div>}
      </div>

      {/* SUGS */}
      {showSugs&&<div style={{flexShrink:0,display:"flex",gap:6,flexWrap:"wrap",padding:"4px 14px 10px"}}>
        {["🍽️ أفضل مطعم قريب مني","🔥 عروض اليوم","📱 أرخص سعر iPhone الآن","🛒 عروض بنده وكارفور"].map((s,i)=>(
          <button key={i} onClick={()=>send(s)} style={{background:"rgba(0,108,53,0.1)",border:"1px solid rgba(0,140,65,0.22)",color:GB,borderRadius:18,padding:"5px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{s}</button>
        ))}
      </div>}

      {/* INPUT */}
      <div style={{flexShrink:0,padding:"8px 14px",borderTop:"1px solid rgba(0,140,65,0.2)",background:"rgba(0,0,0,0.15)",display:"flex",gap:8}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send(inp)}
          placeholder="اسألني عن مطعم، عرض، سعر، ورشة... 🔍"
          style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1.5px solid rgba(0,140,65,0.22)",borderRadius:11,padding:"10px 14px",color:"#E8F0EA",fontSize:13,outline:"none",direction:"rtl",fontFamily:"inherit"}}/>
        <button onClick={()=>send(inp)} disabled={busy}
          style={{width:42,height:42,borderRadius:11,background:`linear-gradient(135deg,${G},${GB})`,border:"none",cursor:busy?"not-allowed":"pointer",fontSize:18,opacity:busy?.4:1,flexShrink:0}}>🚀</button>
      </div>
      <div style={{flexShrink:0,textAlign:"center",fontSize:10,color:"#2a5a3a",padding:"3px 0 7px"}}>💡 فكرة م. طراد راكان الزبن • محلل نظم معلومات</div>

      {/* MODAL */}
      {modal&&<div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:99,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"16px 14px",overflowY:"auto",backdropFilter:"blur(8px)"}}>
        <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:500,background:D2,border:"1px solid rgba(0,140,65,0.22)",borderRadius:18,overflow:"hidden"}}>

          {/* BASKET MODAL */}
          {modal==="basket"&&<>
            <div style={{background:"rgba(0,108,53,0.08)",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(0,140,65,0.15)"}}>
              <div><div style={{fontSize:15,fontWeight:900}}>🛒 مصمّم السلة الغذائية</div><div style={{fontSize:10,color:"#6B9E76",marginTop:2}}>أضف المنتجات وريكو يبحث عن أرخص الأسعار</div></div>
              <button onClick={()=>setModal(null)} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:13}}>✕</button>
            </div>
            <div style={{padding:16}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:6,alignItems:"end",marginBottom:10}}>
                <div>
                  <div style={{fontSize:11,color:"#6B9E76",marginBottom:4,fontWeight:700}}>المنتج</div>
                  <select value={bProd} onChange={e=>{setBProd(e.target.value);setBSize("");}} style={sel_style}>
                    <option value="">-- اختر --</option>
                    {PRODS.map(g=><optgroup key={g.g} label={g.g}>{g.items.map(([nm])=><option key={nm} value={nm}>{nm}</option>)}</optgroup>)}
                  </select>
                </div>
                <div>
                  <div style={{fontSize:11,color:"#6B9E76",marginBottom:4,fontWeight:700}}>الحجم</div>
                  <select value={bSize} onChange={e=>setBSize(e.target.value)} style={sel_style}>
                    <option value="">-- اختر --</option>
                    {sizes().map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <button onClick={addToBasket} style={{background:`linear-gradient(135deg,${G},${GB})`,color:"#fff",border:"none",borderRadius:8,width:36,height:36,cursor:"pointer",fontSize:20,marginTop:17}}>+</button>
              </div>
              {basket.length===0?<div style={{textAlign:"center",padding:16,color:"#6B9E76",fontSize:12}}>🛒 السلة فارغة — أضف منتجات</div>:
              <div style={{background:"rgba(0,108,53,0.06)",border:"1px solid rgba(0,140,65,0.15)",borderRadius:10,padding:10,marginBottom:10}}>
                <div style={{fontSize:11,color:GB,fontWeight:700,marginBottom:6}}>🛒 السلة ({basket.length} منتجات)</div>
                {basket.map(it=><div key={it.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:"1px solid rgba(0,140,65,0.1)",fontSize:12}}>
                  <span>{it.nm} — <span style={{color:GB,fontWeight:700}}>{it.sz}</span></span>
                  <button onClick={()=>setBasket(p=>p.filter(i=>i.id!==it.id))} style={{background:"rgba(200,50,50,0.15)",border:"1px solid rgba(200,50,50,0.2)",color:"#ff8080",borderRadius:6,padding:"1px 7px",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>✕</button>
                </div>)}
              </div>}
              <button onClick={searchBasket} style={{width:"100%",background:`linear-gradient(135deg,${G},${GB})`,color:"#fff",border:"none",borderRadius:11,padding:12,fontSize:14,fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>🔍 ابحث عن أرخص الأسعار</button>
              <div style={{textAlign:"center",marginTop:6,fontSize:10,color:"#4a7a5a"}}>يقارن بين بنده • كارفور • العثيم • نون • هايبر باندا</div>
            </div>
          </>}

          {/* APPS MODAL */}
          {modal==="apps"&&<>
            <div style={{background:"rgba(200,168,76,0.07)",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(0,140,65,0.15)"}}>
              <div><div style={{fontSize:15,fontWeight:900,color:GLDL}}>📲 التطبيقات المتاحة</div><div style={{fontSize:10,color:"#6B9E76",marginTop:2}}>اضغط على أي تطبيق لفتحه مباشرة</div></div>
              <button onClick={()=>setModal(null)} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:13}}>✕</button>
            </div>
            <div style={{padding:16,maxHeight:"70vh",overflowY:"auto"}}>
              {APPS_LIST.map((a,i)=>a.sec
                ?<div key={i} style={{fontSize:10,fontWeight:700,color:GB,letterSpacing:1,margin:"10px 0 5px"}}>{a.sec}</div>
                :<div key={i} onClick={()=>openApp(a.url,a.nm)} style={{display:"flex",alignItems:"center",gap:9,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,140,65,0.15)",borderRadius:10,padding:"8px 11px",marginBottom:6,cursor:"pointer"}}>
                  <div style={{width:34,height:34,borderRadius:9,background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0,color:a.tc||"#fff"}}>{a.ic}</div>
                  <div style={{flex:1}}><div style={{fontSize:12,fontWeight:800}}>{a.nm}</div><div style={{fontSize:10,color:"#6B9E76"}}>{a.ds}</div></div>
                  <span style={{color:GB,fontSize:14,fontWeight:700}}>←</span>
                </div>
              )}
              <button onClick={()=>{setModal(null);send("قارن بين هنقرستيشن وجاهز وكريم من حيث السرعة والسعر والمطاعم المتاحة");}}
                style={{width:"100%",background:`linear-gradient(135deg,${G},${GB})`,color:"#fff",border:"none",borderRadius:11,padding:11,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginTop:6}}>
                🤖 اسأل ريكو يقارن بين التطبيقات
              </button>
            </div>
          </>}

          {/* MERCHANT MODAL */}
          {modal==="merchant"&&<>
            <div style={{background:"rgba(200,168,76,0.07)",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(0,140,65,0.15)"}}>
              <div><div style={{fontSize:15,fontWeight:900,color:GLDL}}>🏪 سجّل نشاطك التجاري</div><div style={{fontSize:10,color:"#6B9E76",marginTop:2}}>أضف متجرك لقاعدة بيانات ريكو</div></div>
              <button onClick={()=>setModal(null)} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:13}}>✕</button>
            </div>
            {mDone?<div style={{padding:"36px 20px",textAlign:"center"}}>
              <div style={{fontSize:50,marginBottom:12}}>🎉</div>
              <div style={{fontSize:18,fontWeight:900,color:GLDL,marginBottom:8}}>تم التسجيل بنجاح!</div>
              <div style={{fontSize:13,color:"#6B9E76",marginBottom:20,lineHeight:1.7}}>تم إضافة نشاطك لقاعدة بيانات ريكو.<br/>سيظهر في النتائج خلال 24 ساعة.</div>
              <button onClick={()=>setModal(null)} style={{background:`linear-gradient(135deg,${G},${GB})`,color:"#fff",border:"none",borderRadius:11,padding:"10px 28px",fontSize:14,fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>حسناً ✓</button>
            </div>:
            <div style={{padding:16,maxHeight:"70vh",overflowY:"auto"}}>
              <div style={{fontSize:11,color:"#6B9E76",marginBottom:4,fontWeight:700}}>🏷️ اسم النشاط *</div>
              <input type="text" placeholder="مثال: مطعم الأصيل" style={inp_style}/>
              <div style={{fontSize:11,color:"#6B9E76",marginBottom:4,fontWeight:700}}>📂 نوع النشاط *</div>
              <select style={sel_style}><option value="">-- اختر --</option>{MERCHANT_TYPES.map(t=><option key={t}>{t}</option>)}</select>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div><div style={{fontSize:11,color:"#6B9E76",marginBottom:4,fontWeight:700}}>🏙️ المدينة</div>
                  <select style={sel_style}>{["الرياض","جدة","الدمام","مكة المكرمة","المدينة المنورة","الخبر","الطائف","تبوك","أبها","القصيم","حائل","جازان"].map(c=><option key={c}>{c}</option>)}</select>
                </div>
                <div><div style={{fontSize:11,color:"#6B9E76",marginBottom:4,fontWeight:700}}>📍 الحي</div><input type="text" placeholder="حي النرجس" style={inp_style}/></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div><div style={{fontSize:11,color:"#6B9E76",marginBottom:4,fontWeight:700}}>📞 الهاتف *</div><input type="tel" placeholder="05XXXXXXXX" style={{...inp_style,direction:"ltr",textAlign:"right"}}/></div>
                <div><div style={{fontSize:11,color:"#6B9E76",marginBottom:4,fontWeight:700}}>💬 واتساب</div><input type="tel" placeholder="05XXXXXXXX" style={{...inp_style,direction:"ltr",textAlign:"right"}}/></div>
              </div>
              <div style={{fontSize:11,color:"#6B9E76",marginBottom:4,fontWeight:700}}>🕐 أوقات العمل</div>
              <input type="text" placeholder="السبت - الخميس 9ص - 11م" style={inp_style}/>
              <div style={{fontSize:11,color:"#6B9E76",marginBottom:4,fontWeight:700}}>🔥 العروض والخصومات</div>
              <textarea placeholder="مثال: خصم 20% على وجبات الغداء" style={{...inp_style,resize:"none",height:65}}/>
              <div style={{fontSize:11,color:"#6B9E76",marginBottom:4,fontWeight:700}}>📝 وصف النشاط</div>
              <textarea placeholder="اكتب وصفاً مختصراً..." style={{...inp_style,resize:"none",height:65}}/>
              <button onClick={()=>{setMDone(true);setTimeout(()=>addMsg("a","تم تسجيل نشاطك في ريكو! 🎉 سيظهر في نتائج البحث خلال 24 ساعة."),500);}}
                style={{width:"100%",background:`linear-gradient(135deg,${GOLD},${GLDL})`,color:"#03100A",border:"none",borderRadius:11,padding:12,fontSize:14,fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>✅ تسجيل النشاط في ريكو</button>
            </div>}
          </>}

        </div>
      </div>}

      <style>{`
        @keyframes bc{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
        @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-thumb{background:rgba(0,140,65,0.2);border-radius:2px}
        *{box-sizing:border-box}
      `}</style>
    </div>
  );
}
