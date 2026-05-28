import { useState, useEffect, useRef } from "react";

const GB = "#00A94F";

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

const MERCHANT_TYPES = ["🍽️ مطعم","☕ كافيه","🏥 عيادة طبية","🦷 عيادة أسنان","💊 صيدلية","✂️ صالون حلاقة","💆 مركز تجميل","🏋️ نادي رياضي","🛒 سوبرماركت","🚗 تأجير سيارات","🔧 ورشة سيارات","📦 شحن ونقل","🏡 استراحة / شاليه","✈️ سفر وسياحة","🛡️ تأمين","💳 تقسيط","👷 استقدام","🧹 تنظيف","👕 مغسلة","📱 صيانة جوالات","📱 إلكترونيات","🛋️ أثاث","🏗️ تأجير معدات","💼 خدمات أخرى"];

const CITIES = ["الرياض","جدة","الدمام","مكة المكرمة","المدينة المنورة","الخبر","الطائف","تبوك","أبها","القصيم","حائل","جازان"];

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

const WELCOME = `مرحباً! أنا <strong style="color:#00A94F">ريكو</strong> 👋<br/>مساعدك الذكي للتجارة في المملكة العربية السعودية 🇸🇦<br/><br/>📍 <strong>أفضل الأماكن القريبة</strong> — مطاعم، عيادات، ورش، كافيهات<br/>🔥 <strong>العروض والخصومات</strong> — أحدث تخفيضات المتاجر<br/>💰 <strong>مقارنة الأسعار</strong> — ابحث عن أرخص سعر<br/>🛒 <strong>سلة البقالة الذكية</strong> — 120+ صنف من كل الفئات<br/>📲 <strong>التطبيقات</strong> — هنقرستيشن، جاهز، كريم، نون وأكثر<br/><br/><span style="background:rgba(0,108,53,0.1);border:1px solid rgba(0,140,65,0.2);border-radius:18px;padding:3px 10px;font-size:11px;color:#00A94F">💡 فكرة م. طراد راكان الزبن | محلل نظم معلومات</span>`;

const SYS = `أنت ريكو، مساعد ذكاء اصطناعي تجاري متخصص في المملكة العربية السعودية.
صاحب الفكرة: طراد راكان الزبن، محلل نظم معلومات عربي سوري. إذا سُئلت عن هويتك قل: "أنا ريكو 🟢 فكرتي من إبداع المحلل طراد راكان الزبن، محلل نظم معلومات".
مهامك: ١. أفضل الأماكن مع التقييم والسعر وأوقات العمل ٢. العروض والخصومات من المتاجر السعودية ٣. مقارنة الأسعار ٤. التوصية بالتطبيقات المناسبة.
تعليمات: ابحث في الإنترنت أولاً، نظّم بإيموجي، 3-5 خيارات مرتبة، اقترح سؤالاً متابعاً، بالعربية دائماً.`;

function fmt(text) {
  return text
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
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
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
      if (!res.ok) { addMsg("a", `⚠️ خطأ: ${d.error?.message || res.statusText}`); }
      else {
        const rep = d.choices?.[0]?.message?.content || "عذراً لم أتمكن من الرد.";
        addMsg("a", fmt(rep));
      }
    } catch {
      addMsg("a", "عذراً، حدث خطأ. حاول مرة أخرى. 🙏");
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
    const q = `قارن أسعار هذه المنتجات في الرياض بين بنده وكارفور والعثيم ونون وهايبر باندا:\n${basket.map((it, n) => `${n + 1}. ${it.nm} ${it.sz}`).join("\n")}\n\nأجمع التكلفة الإجمالية في كل متجر وحدد الأرخص ومقدار التوفير.`;
    setModal(null);
    send(q);
  };

  const openApp = (url, nm) => {
    setModal(null);
    addMsg("u", "افتح تطبيق " + nm);
    addMsg("a", `جارٍ فتح <strong>${nm}</strong> 🚀<br/><a href="${url}" target="_blank" style="color:${GB};font-weight:700">اضغط هنا لفتح ${nm} ←</a>`);
  };

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="header">
        <div className="hdr-brand">
          <div className="logo-box">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
              <rect x="18.5" y="17" width="3" height="13" rx="1.2" fill="white"/>
              <path d="M20 17 Q13 11 7 13" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M20 17 Q20 9 20 3"  stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M20 17 Q27 11 33 13" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M7 33 L31 33"        stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M29.5 31 L33 33.5 L29.5 35.5" fill="white"/>
            </svg>
          </div>
          <div>
            <div className="brand-name">ريكو <span className="online-dot"/></div>
            <div className="brand-sub">RICO AI • تجاري</div>
          </div>
        </div>
        <div className="hdr-actions">
          {[["🛒 سلة","basket"],["📲 تطبيقات","apps"],["🏪 سجّل نشاطك","merchant"]].map(([l, m]) => (
            <button key={m} className={`btn-hdr${m === "merchant" ? " gold" : ""}`}
              onClick={() => { setModal(m); setMDone(false); }}>
              {l}
            </button>
          ))}
        </div>
      </header>

      {/* ── Categories ── */}
      <div className="cats-bar">
        {CATS.map(([ic, lb, q], i) => (
          <button key={i} className={`cat-btn${cat === i ? " active" : ""}`}
            onClick={() => { setCat(i); send(q); }}>
            {ic} {lb}
          </button>
        ))}
      </div>

      {/* ── Messages ── */}
      <div className="messages" ref={ref}>
        {msgs.map((m, i) => (
          <div key={i} className={`msg-row ${m.r}`}>
            <div className={`avatar ${m.r}`}>{m.r === "a" ? "ر" : "👤"}</div>
            <div className={`bubble ${m.r}`} dangerouslySetInnerHTML={{ __html: m.html }}/>
          </div>
        ))}
        {busy && (
          <div className="typing">
            <div className="avatar a">ر</div>
            <div className="typing-dots">
              <span className="dot"/><span className="dot"/><span className="dot"/>
            </div>
          </div>
        )}
      </div>

      {/* ── Suggestions ── */}
      {showSugs && (
        <div className="suggestions">
          {["🍽️ أفضل مطعم قريب مني","🔥 عروض اليوم","📱 أرخص سعر iPhone الآن","🛒 عروض بنده وكارفور"].map((s, i) => (
            <button key={i} className="sug-btn" onClick={() => send(s)}>{s}</button>
          ))}
        </div>
      )}

      {/* ── Input ── */}
      <div className="input-area">
        <input
          className="chat-input"
          value={inp}
          onChange={e => setInp(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send(inp)}
          placeholder="اسألني عن مطعم، عرض، سعر، ورشة... 🔍"
        />
        <button className="send-btn" onClick={() => send(inp)} disabled={busy}>🚀</button>
      </div>
      <div className="footer-credit">💡 فكرة م. طراد راكان الزبن • محلل نظم معلومات</div>

      {/* ── Modal ── */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>

            {/* Basket */}
            {modal === "basket" && <>
              <div className="modal-hdr green">
                <div>
                  <div className="modal-title">🛒 مصمّم السلة الغذائية</div>
                  <div className="modal-sub">أضف المنتجات وريكو يبحث عن أرخص الأسعار</div>
                </div>
                <button className="modal-close" onClick={() => setModal(null)}>✕</button>
              </div>
              <div className="modal-body">
                <div className="f-grid f-grid-3">
                  <div>
                    <label className="f-label">المنتج</label>
                    <select className="f-select" value={bProd} onChange={e => { setBProd(e.target.value); setBSize(""); }}>
                      <option value="">-- اختر --</option>
                      {PRODS.map(g => (
                        <optgroup key={g.g} label={g.g}>
                          {g.items.map(([nm]) => <option key={nm} value={nm}>{nm}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="f-label">الحجم</label>
                    <select className="f-select" value={bSize} onChange={e => setBSize(e.target.value)}>
                      <option value="">-- اختر --</option>
                      {sizes().map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <button className="add-btn" onClick={addToBasket}>+</button>
                </div>
                {basket.length === 0
                  ? <div className="basket-empty">🛒 السلة فارغة — أضف منتجات للمقارنة</div>
                  : <div className="basket-list">
                      <div className="basket-list-hdr">🛒 السلة ({basket.length} منتجات)</div>
                      {basket.map(it => (
                        <div key={it.id} className="basket-item">
                          <span>{it.nm} — <span style={{ color: GB, fontWeight: 700 }}>{it.sz}</span></span>
                          <button className="basket-rm" onClick={() => setBasket(p => p.filter(i => i.id !== it.id))}>✕</button>
                        </div>
                      ))}
                    </div>
                }
                <button className="btn-full green" onClick={searchBasket}>🔍 ابحث عن أرخص الأسعار</button>
                <div className="btn-note">يقارن بين بنده • كارفور • العثيم • نون • هايبر باندا</div>
              </div>
            </>}

            {/* Apps */}
            {modal === "apps" && <>
              <div className="modal-hdr gold">
                <div>
                  <div className="modal-title gold">📲 التطبيقات المتاحة</div>
                  <div className="modal-sub">اضغط على أي تطبيق لفتحه مباشرة</div>
                </div>
                <button className="modal-close" onClick={() => setModal(null)}>✕</button>
              </div>
              <div className="modal-body">
                {APPS_LIST.map((a, i) => a.sec
                  ? <div key={i} className="app-section">{a.sec}</div>
                  : <div key={i} className="app-item" onClick={() => openApp(a.url, a.nm)}>
                      <div className="app-icon" style={{ background: a.bg, color: a.tc || "#fff" }}>{a.ic}</div>
                      <div style={{ flex: 1 }}>
                        <div className="app-name">{a.nm}</div>
                        <div className="app-ds">{a.ds}</div>
                      </div>
                      <span className="app-arr">←</span>
                    </div>
                )}
                <button className="btn-full green" style={{ marginTop: 8 }}
                  onClick={() => { setModal(null); send("قارن بين هنقرستيشن وجاهز وكريم من حيث السرعة والسعر والمطاعم المتاحة"); }}>
                  🤖 اسأل ريكو يقارن بين التطبيقات
                </button>
              </div>
            </>}

            {/* Merchant */}
            {modal === "merchant" && <>
              <div className="modal-hdr gold">
                <div>
                  <div className="modal-title gold">🏪 سجّل نشاطك التجاري</div>
                  <div className="modal-sub">أضف متجرك لقاعدة بيانات ريكو</div>
                </div>
                <button className="modal-close" onClick={() => setModal(null)}>✕</button>
              </div>
              {mDone
                ? <div className="success">
                    <div className="success-emoji">🎉</div>
                    <div className="success-title">تم التسجيل بنجاح!</div>
                    <div className="success-txt">تم إضافة نشاطك لقاعدة بيانات ريكو.<br/>سيظهر في النتائج خلال 24 ساعة.</div>
                    <button className="btn-full green" style={{ maxWidth: 200, margin: "0 auto", display: "block" }}
                      onClick={() => setModal(null)}>حسناً ✓</button>
                  </div>
                : <div className="modal-body">
                    <label className="f-label">🏷️ اسم النشاط *</label>
                    <input className="f-input" type="text" placeholder="مثال: مطعم الأصيل"/>

                    <label className="f-label">📂 نوع النشاط *</label>
                    <select className="f-select">
                      <option value="">-- اختر --</option>
                      {MERCHANT_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>

                    <div className="f-grid f-grid-2">
                      <div>
                        <label className="f-label">🏙️ المدينة</label>
                        <select className="f-select">
                          {CITIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="f-label">📍 الحي</label>
                        <input className="f-input" type="text" placeholder="حي النرجس"/>
                      </div>
                    </div>

                    <div className="f-grid f-grid-2">
                      <div>
                        <label className="f-label">📞 الهاتف *</label>
                        <input className="f-input f-ltr" type="tel" placeholder="05XXXXXXXX"/>
                      </div>
                      <div>
                        <label className="f-label">💬 واتساب</label>
                        <input className="f-input f-ltr" type="tel" placeholder="05XXXXXXXX"/>
                      </div>
                    </div>

                    <label className="f-label">🕐 أوقات العمل</label>
                    <input className="f-input" type="text" placeholder="السبت - الخميس 9ص - 11م"/>

                    <label className="f-label">🔥 العروض والخصومات</label>
                    <textarea className="f-textarea" placeholder="مثال: خصم 20% على وجبات الغداء"/>

                    <label className="f-label">📝 وصف النشاط</label>
                    <textarea className="f-textarea" placeholder="اكتب وصفاً مختصراً..."/>

                    <button className="btn-full gold"
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
