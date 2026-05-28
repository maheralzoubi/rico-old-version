import { useState, useEffect, useRef } from "react";

const G = "#00C957";

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

const APPS = [
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

const MERCHANT_TYPES = ["🍽️ مطعم","☕ كافيه","🏥 عيادة طبية","🦷 عيادة أسنان","💊 صيدلية","✂️ صالون حلاقة","💆 مركز تجميل","🏋️ نادي رياضي","🛒 سوبرماركت","🚗 تأجير سيارات","🔧 ورشة سيارات","📦 شحن ونقل","🏡 استراحة / شاليه","✈️ سفر وسياحة","🛡️ تأمين","💳 تقسيط","👷 استقدام","🧹 تنظيف","👕 مغسلة","📱 صيانة جوالات","📱 إلكترونيات","🛋️ أثاث","🏗️ تأجير معدات","💼 خدمات أخرى"];

const CITIES = ["الرياض","جدة","الدمام","مكة المكرمة","المدينة المنورة","الخبر","الطائف","تبوك","أبها","القصيم","حائل","جازان"];

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

const SYS = `أنت ريكو، مساعد ذكاء اصطناعي تجاري متخصص في المملكة العربية السعودية.
صاحب الفكرة: طراد راكان الزبن، محلل نظم معلومات عربي سوري. إذا سُئلت عن هويتك قل: "أنا ريكو 🟢 فكرتي من إبداع المحلل طراد راكان الزبن، محلل نظم معلومات".
مهامك: ١. أفضل الأماكن مع التقييم والسعر وأوقات العمل ٢. العروض والخصومات من المتاجر السعودية ٣. مقارنة الأسعار ٤. التوصية بالتطبيقات المناسبة.
تعليمات: نظّم بإيموجي، 3-5 خيارات مرتبة، اقترح سؤالاً متابعاً، بالعربية دائماً.`;

const WELCOME = `مرحباً! أنا <strong style="color:#00C957">ريكو</strong> 👋<br/>مساعدك الذكي للتجارة في المملكة العربية السعودية 🇸🇦<br/><br/>📍 <strong>أفضل الأماكن القريبة</strong> — مطاعم، عيادات، ورش، كافيهات<br/>🔥 <strong>العروض والخصومات</strong> — أحدث تخفيضات المتاجر<br/>💰 <strong>مقارنة الأسعار</strong> — ابحث عن أرخص سعر<br/>🛒 <strong>سلة البقالة الذكية</strong> — 120+ صنف من كل الفئات<br/>📲 <strong>التطبيقات</strong> — هنقرستيشن، جاهز، كريم، نون وأكثر<br/><br/><span style="background:rgba(0,100,40,.12);border:1px solid rgba(0,201,87,.18);border-radius:20px;padding:3px 12px;font-size:11px;color:#00C957">💡 فكرة م. طراد راكان الزبن | محلل نظم معلومات</span>`;

function fmt(t) {
  return t
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/#{1,3} (.*?)(\n|$)/g, "<strong>$1</strong><br/>")
    .replace(/\n/g, "<br/>");
}

export default function Rico() {
  const [msgs, setMsgs] = useState([{ r: "a", html: WELCOME }]);
  const [inp, setInp] = useState("");
  const [busy, setBusy] = useState(false);
  const [cat, setCat] = useState(null);
  const [showSugs, setShowSugs] = useState(true);
  const [modal, setModal] = useState(null);
  const [basket, setBasket] = useState([]);
  const [bProd, setBProd] = useState("");
  const [bSize, setBSize] = useState("");
  const [mDone, setMDone] = useState(false);
  const feedRef = useRef(null);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [msgs, busy]);

  const addMsg = (r, html) => setMsgs(p => [...p, { r, html }]);

  const send = async (text) => {
    if (busy || !text.trim()) return;
    const txt = text.trim();
    setInp(""); setBusy(true); setShowSugs(false);
    addMsg("u", txt);
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: SYS }, { role: "user", content: txt }],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });
      const d = await res.json();
      if (!res.ok) addMsg("a", `⚠️ خطأ: ${d.error?.message || res.statusText}`);
      else addMsg("a", fmt(d.choices?.[0]?.message?.content || "عذراً لم أتمكن من الرد."));
    } catch {
      addMsg("a", "عذراً، حدث خطأ في الاتصال. حاول مرة أخرى. 🙏");
    }
    setBusy(false);
  };

  const sizes = () => {
    for (const g of PRODS) for (const [nm, sz] of g.items) if (nm === bProd) return sz.split(",");
    return [];
  };

  const addToBasket = () => {
    if (!bProd || !bSize) return;
    setBasket(p => [...p, { nm: bProd, sz: bSize, id: Date.now() }]);
    setBProd(""); setBSize("");
  };

  const searchBasket = () => {
    if (!basket.length) return;
    const q = `قارن أسعار هذه المنتجات في الرياض بين بنده وكارفور والعثيم ونون وهايبر باندا:\n${basket.map((it, n) => `${n + 1}. ${it.nm} ${it.sz}`).join("\n")}\n\nاجمع التكلفة الإجمالية لكل متجر وحدد الأرخص ومقدار التوفير.`;
    setModal(null);
    send(q);
  };

  const openApp = (url, nm) => {
    setModal(null);
    addMsg("u", "افتح تطبيق " + nm);
    addMsg("a", `جارٍ فتح <strong>${nm}</strong> 🚀<br/><a href="${url}" target="_blank" style="color:${G};font-weight:800">اضغط هنا لفتح ${nm} ←</a>`);
  };

  return (
    <div className="app">

      {/* ══ Header ══ */}
      <header className="hdr">
        <div className="hdr-inner">
          <div className="brand">
            <div className="brand-logo">
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                <rect x="18.5" y="17" width="3" height="13" rx="1.2" fill="white"/>
                <path d="M20 17 Q13 11 7 13"  stroke="white" strokeWidth="2.3" strokeLinecap="round"/>
                <path d="M20 17 Q20 9 20 3"   stroke="white" strokeWidth="2.3" strokeLinecap="round"/>
                <path d="M20 17 Q27 11 33 13" stroke="white" strokeWidth="2.3" strokeLinecap="round"/>
                <path d="M7 33 L31 33"        stroke="white" strokeWidth="2.3" strokeLinecap="round"/>
                <path d="M29.5 31 L33 33.5 L29.5 35.5" fill="white"/>
              </svg>
            </div>
            <div>
              <div className="brand-name">ريكو</div>
              <div className="brand-badge">
                <span className="badge-dot"/>
                متاح الآن
              </div>
            </div>
          </div>

          <div className="hdr-btns">
            {[["🛒","سلة","basket"],["📲","تطبيقات","apps"],["🏪","سجّل","merchant"]].map(([ic, lbl, m]) => (
              <button key={m} className={`hbtn${m === "merchant" ? " hbtn-gold" : ""}`}
                onClick={() => { setModal(m); setMDone(false); }}>
                <span>{ic}</span>
                <span className="hbtn-text">{lbl}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ══ Categories ══ */}
      <div className="cats-wrap">
        <div className="cats-bar">
          {CATS.map(([ic, lb, q], i) => (
            <button key={i} className={`ccat${cat === i ? " active" : ""}`}
              onClick={() => { setCat(i); send(q); }}>
              <span>{ic}</span>
              <span>{lb}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ══ Messages ══ */}
      <div className="feed" ref={feedRef}>
        {msgs.map((m, i) => (
          <div key={i} className={`mrow ${m.r}`}>
            <div className={`av ${m.r}`}>{m.r === "a" ? "ر" : "👤"}</div>
            <div className={`bub ${m.r}`} dangerouslySetInnerHTML={{ __html: m.html }}/>
          </div>
        ))}

        {busy && (
          <div className="typing-row">
            <div className="av a">ر</div>
            <div className="typing-bub">
              <span className="dot"/><span className="dot"/><span className="dot"/>
            </div>
          </div>
        )}
      </div>

      {/* ══ Suggestions ══ */}
      {showSugs && (
        <div className="sugs-wrap">
          <div className="sugs">
            {[
              ["🍽️","أفضل مطعم قريب مني"],
              ["🔥","عروض اليوم"],
              ["📱","أرخص سعر iPhone الآن"],
              ["🛒","عروض بنده وكارفور"],
            ].map(([ic, txt], i) => (
              <button key={i} className="sug" onClick={() => send(`${ic} ${txt}`)}>
                <span>{ic}</span>
                <span>{txt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ══ Composer ══ */}
      <div className="composer">
        <input
          className="composer-input"
          value={inp}
          onChange={e => setInp(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send(inp)}
          placeholder="اسألني عن مطعم، عرض، سعر، ورشة..."
        />
        <button className="send" onClick={() => send(inp)} disabled={busy}>🚀</button>
      </div>
      <p className="credit">💡 فكرة م. طراد راكان الزبن • محلل نظم معلومات</p>

      {/* ══ Modal ══ */}
      {modal && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="mbox" onClick={e => e.stopPropagation()}>

            {/* ── Basket ── */}
            {modal === "basket" && <>
              <div className="mhdr green">
                <div className="mhdr-info">
                  <div className="mhdr-title">🛒 مصمّم السلة الغذائية</div>
                  <div className="mhdr-sub">أضف منتجاتك وريكو يبحث عن أرخص الأسعار</div>
                </div>
                <button className="mclose" onClick={() => setModal(null)}>✕</button>
              </div>
              <div className="mbody">
                <div className="fgrid fgrid3">
                  <div>
                    <label className="flabel">المنتج</label>
                    <select className="fselect" value={bProd} onChange={e => { setBProd(e.target.value); setBSize(""); }}>
                      <option value="">-- اختر المنتج --</option>
                      {PRODS.map(g => (
                        <optgroup key={g.g} label={g.g}>
                          {g.items.map(([nm]) => <option key={nm} value={nm}>{nm}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flabel">الحجم / الكمية</label>
                    <select className="fselect" value={bSize} onChange={e => setBSize(e.target.value)}>
                      <option value="">-- اختر --</option>
                      {sizes().map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <button className="addbtn" onClick={addToBasket} title="أضف">+</button>
                </div>

                {basket.length === 0
                  ? <div className="bkempty">🛒 السلة فارغة — أضف منتجات للمقارنة</div>
                  : <div className="bklist">
                      <div className="bklhdr">🛒 السلة ({basket.length} منتجات)</div>
                      {basket.map(it => (
                        <div key={it.id} className="bkitem">
                          <span>
                            {it.nm} —{" "}
                            <span style={{ color: G, fontWeight: 800 }}>{it.sz}</span>
                          </span>
                          <button className="bkrm" onClick={() => setBasket(p => p.filter(i => i.id !== it.id))}>✕</button>
                        </div>
                      ))}
                    </div>
                }

                <button className="btnfull green" onClick={searchBasket}>
                  🔍 ابحث عن أرخص الأسعار
                </button>
                <p className="btnnote">يقارن بين بنده • كارفور • العثيم • نون • هايبر باندا</p>
              </div>
            </>}

            {/* ── Apps ── */}
            {modal === "apps" && <>
              <div className="mhdr gold">
                <div className="mhdr-info">
                  <div className="mhdr-title gold">📲 التطبيقات المتاحة</div>
                  <div className="mhdr-sub">اضغط على أي تطبيق لفتحه مباشرة</div>
                </div>
                <button className="mclose" onClick={() => setModal(null)}>✕</button>
              </div>
              <div className="mbody">
                {APPS.map((a, i) => a.sec
                  ? <div key={i} className="asec">{a.sec}</div>
                  : <div key={i} className="aitem" onClick={() => openApp(a.url, a.nm)}>
                      <div className="aicon" style={{ background: a.bg, color: a.tc || "#fff" }}>{a.ic}</div>
                      <div style={{ flex: 1 }}>
                        <div className="aname">{a.nm}</div>
                        <div className="ads">{a.ds}</div>
                      </div>
                      <span className="aarr">←</span>
                    </div>
                )}
                <button className="btnfull green" style={{ marginTop: 10 }}
                  onClick={() => { setModal(null); send("قارن بين هنقرستيشن وجاهز وكريم من حيث السرعة والسعر والمطاعم المتاحة"); }}>
                  🤖 اسأل ريكو يقارن بين التطبيقات
                </button>
              </div>
            </>}

            {/* ── Merchant ── */}
            {modal === "merchant" && <>
              <div className="mhdr gold">
                <div className="mhdr-info">
                  <div className="mhdr-title gold">🏪 سجّل نشاطك التجاري</div>
                  <div className="mhdr-sub">أضف متجرك لقاعدة بيانات ريكو</div>
                </div>
                <button className="mclose" onClick={() => setModal(null)}>✕</button>
              </div>

              {mDone
                ? <div className="success">
                    <div className="s-emoji">🎉</div>
                    <div className="s-title">تم التسجيل بنجاح!</div>
                    <div className="s-text">
                      تم إضافة نشاطك لقاعدة بيانات ريكو.<br/>
                      سيظهر في النتائج خلال 24 ساعة.
                    </div>
                    <button className="btnfull green"
                      style={{ maxWidth: 200, margin: "0 auto", display: "block" }}
                      onClick={() => setModal(null)}>
                      حسناً ✓
                    </button>
                  </div>

                : <div className="mbody">
                    <label className="flabel">🏷️ اسم النشاط *</label>
                    <input className="finput" type="text" placeholder="مثال: مطعم الأصيل"/>

                    <label className="flabel">📂 نوع النشاط *</label>
                    <select className="fselect">
                      <option value="">-- اختر النوع --</option>
                      {MERCHANT_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>

                    <div className="fgrid fgrid2">
                      <div>
                        <label className="flabel">🏙️ المدينة</label>
                        <select className="fselect">
                          {CITIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="flabel">📍 الحي</label>
                        <input className="finput" type="text" placeholder="حي النرجس"/>
                      </div>
                    </div>

                    <div className="fgrid fgrid2">
                      <div>
                        <label className="flabel">📞 الهاتف *</label>
                        <input className="finput fltr" type="tel" placeholder="05XXXXXXXX"/>
                      </div>
                      <div>
                        <label className="flabel">💬 واتساب</label>
                        <input className="finput fltr" type="tel" placeholder="05XXXXXXXX"/>
                      </div>
                    </div>

                    <label className="flabel">🕐 أوقات العمل</label>
                    <input className="finput" type="text" placeholder="السبت - الخميس 9ص - 11م"/>

                    <label className="flabel">🔥 العروض والخصومات</label>
                    <textarea className="ftextarea" placeholder="مثال: خصم 20% على وجبات الغداء"/>

                    <label className="flabel">📝 وصف النشاط</label>
                    <textarea className="ftextarea" placeholder="اكتب وصفاً مختصراً يجذب العملاء..."/>

                    <button className="btnfull gold"
                      onClick={() => {
                        setMDone(true);
                        setTimeout(() => addMsg("a", "تم تسجيل نشاطك في ريكو! 🎉 سيظهر في نتائج البحث خلال 24 ساعة."), 500);
                      }}>
                      ✅ تسجيل النشاط في ريكو
                    </button>
                  </div>
              }
            </>}

          </div>
        </div>
      )}
    </div>
  );
}
