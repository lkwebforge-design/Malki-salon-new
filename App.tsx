import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Feather,
  Flower2,
  Gem,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scissors,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import "./index.css";

const WHATSAPP_URL = "https://wa.me/94772780838";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=107+Ampitiya+Road+Kandy+Sri+Lanka";

const images = {
  hero: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",
  intro: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1000&q=85",
  detail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1100&q=85",
  kandyan: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
  hair: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1100&q=85",
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Bridal", href: "#bridal" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const bridalLooks = [
  {
    number: "01",
    title: "Traditional Kandyan",
    kicker: "TIMELESS GRANDEUR",
    copy: "A considered bridal story inspired by the elegance of Kandyan ceremony and detail.",
    image: images.kandyan,
    alt: "Temporary editorial portrait of a fictional bride in Kandyan-inspired styling",
    className: "bridal-look--tall",
  },
  {
    number: "02",
    title: "Modern Bridal",
    kicker: "QUIET RADIANCE",
    copy: "Soft structure, luminous skin and a modern sense of romance shaped around your style.",
    image: images.hero,
    alt: "Temporary editorial portrait of a fictional bride with refined modern makeup",
    className: "bridal-look--wide",
  },
  {
    number: "03",
    title: "Bridal Makeup",
    kicker: "YOUR FEATURES, ELEVATED",
    copy: "Thoughtful makeup that lets you feel unmistakably yourself in every photograph.",
    image: images.detail,
    alt: "Temporary close-up editorial image showing fictional bridal makeup details",
    className: "bridal-look--detail",
  },
  {
    number: "04",
    title: "Hair & Dressing",
    kicker: "THE FINISHING TOUCH",
    copy: "A polished final silhouette, from the first pin to the last delicate detail.",
    image: images.hair,
    alt: "Temporary editorial image of fictional bridal hair styling with floral pins",
    className: "bridal-look--hair",
  },
];

const serviceItems = [
  { number: "01", title: "Bridal Dressing & Makeup", copy: "Bridal styling and makeup for a memorable wedding-day look.", icon: Sparkles },
  { number: "02", title: "Hair Styling", copy: "Haircuts, colouring and styling for individual preferences and special occasions.", icon: Scissors },
  { number: "03", title: "Nails & Beauty Care", copy: "Nail services and selected beauty treatments.", icon: Feather },
  { number: "04", title: "Skin & Body Care", copy: "Beauty and personal-care services offered by the salon.", icon: Flower2 },
  { number: "05", title: "Special-Occasion Makeovers", copy: "Makeup and styling for engagements, pre-shoots, wedding guests, graduations and other events.", icon: Heart },
  { number: "06", title: "Bridal Accessories", copy: "Customized bridal jewellery hire and artificial bouquets.", icon: Gem },
];

type GalleryCategory = "Bridal" | "Soft Glam" | "Hair" | "Bridal Details";
type GalleryItem = {
  id: number;
  category: GalleryCategory;
  title: string;
  caption: string;
  image: string;
  alt: string;
  className: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, category: "Bridal", title: "Quietly Regal", caption: "A study in luminous bridal beauty.", image: images.kandyan, alt: "Temporary editorial image of a fictional bride in ivory and blush styling", className: "gallery-item--portrait" },
  { id: 2, category: "Soft Glam", title: "Soft Focus", caption: "Romance, kept beautifully understated.", image: images.intro, alt: "Temporary editorial image of a fictional woman with soft romantic makeup", className: "gallery-item--portrait gallery-item--offset" },
  { id: 3, category: "Hair", title: "The Finishing Touch", caption: "Texture, shape and a little floral detail.", image: images.hair, alt: "Temporary editorial image of fictional bridal hair styling with floral pins", className: "gallery-item--landscape" },
  { id: 4, category: "Bridal Details", title: "In Every Detail", caption: "The close-up moments that complete the story.", image: images.detail, alt: "Temporary close-up editorial image showing fictional bridal makeup and jewelry details", className: "gallery-item--square" },
  { id: 5, category: "Bridal", title: "A Modern Heirloom", caption: "A contemporary mood with timeless poise.", image: images.hero, alt: "Temporary editorial portrait of a fictional bride with tasteful jewelry", className: "gallery-item--portrait gallery-item--wide" },
];

function FloralMark({ className = "" }: { className?: string }) {
  return (
    <svg className={`floral-mark ${className}`} viewBox="0 0 160 160" aria-hidden="true">
      <path d="M79 149c2-32 6-60 24-89 10-16 24-27 42-37M79 124c-17-17-30-29-48-38M99 87c-2-18 1-34 12-48M70 111c-16-3-28-12-37-25" />
      <path d="M114 40c-6 1-13-3-16-10 6-2 13 2 16 10ZM125 27c0-7 5-13 12-15 1 7-4 13-12 15ZM43 87c-7 0-13-4-16-10 7-2 14 2 16 10ZM61 111c-2-7 1-14 7-18 3 7 0 14-7 18ZM100 63c-7-3-10-10-9-16 7 2 11 8 9 16Z" />
    </svg>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label"><span className="section-label__line" />{children}</p>;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"All" | GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    whatsapp: "",
    service: "",
    date: "",
    time: "",
    occasion: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formNotice, setFormNotice] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((current) => current === null ? null : (current + 1) % filteredGallery.length);
      if (event.key === "ArrowLeft") setLightboxIndex((current) => current === null ? null : (current - 1 + filteredGallery.length) % filteredGallery.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const filteredGallery = useMemo(
    () => activeFilter === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter),
    [activeFilter],
  );
  const lightboxItem = lightboxIndex === null ? null : filteredGallery[lightboxIndex];

  const handleNavClick = () => setMenuOpen(false);

  const handleFormChange = (field: string, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
    if (formErrors[field]) setFormErrors((current) => ({ ...current, [field]: "" }));
    setFormNotice("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (!formState.name.trim()) errors.name = "Please add your full name.";
    if (!formState.service) errors.service = "Please choose a service.";
    if (!formState.date) errors.date = "Please choose a preferred date.";
    if (!formState.time) errors.time = "Please choose a preferred time.";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const optionalNotes = [
      formState.whatsapp ? `WhatsApp number: ${formState.whatsapp}` : "",
      formState.occasion ? `Occasion: ${formState.occasion}` : "",
      formState.message ? `Additional message: ${formState.message}` : "",
    ].filter(Boolean).join("\n");
    const message = [
      "Hello Malki Bridal & Beauty,",
      "",
      "I would like to enquire about an appointment.",
      `Full name: ${formState.name.trim()}`,
      `Service of interest: ${formState.service}`,
      `Preferred date: ${formState.date}`,
      `Preferred time: ${formState.time}`,
      optionalNotes,
      "",
      "I understand availability is confirmed by the salon and advance payment is required to secure a confirmed appointment.",
    ].filter(Boolean).join("\n");
    const url = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setFormNotice("Your enquiry is ready in WhatsApp. Please review it and tap Send; the salon will confirm availability and next steps.");
  };

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a className="wordmark" href="#home" onClick={handleNavClick} aria-label="Malki Bridal & Beauty home">
          <span className="wordmark__name">MALKI</span>
          <span className="wordmark__descriptor">BRIDAL <i /> BEAUTY</span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "desktop-nav--open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={handleNavClick}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={15} /> <span>Enquire on WhatsApp</span></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {menuOpen && <div className="mobile-menu"><nav aria-label="Mobile navigation">{navItems.map((item) => <a key={item.href} href={item.href} onClick={handleNavClick}>{item.label}<ArrowUpRight size={16} /></a>)}<a className="mobile-menu__cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={handleNavClick}>Enquire on WhatsApp <MessageCircle size={17} /></a></nav></div>}

      <main>
        <section className="hero" id="home">
          <div className="hero__wash" />
          <div className="hero__floral"><FloralMark /></div>
          <div className="hero__copy-wrap page-width">
            <Reveal className="hero__copy">
              <SectionLabel>Bridal artistry <span className="section-label__dot">•</span> Kandy, Sri Lanka</SectionLabel>
              <h1>Your beauty.<br /><em>Your story.</em><br />Your special day.</h1>
              <p className="hero__lede">Bridal artistry and personalised beauty, thoughtfully created for your most meaningful moments.</p>
              <div className="hero__actions"><a className="button button--dark" href="#bridal">Explore bridal looks <ArrowDownRight size={17} /></a><a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={16} /></a></div>
            </Reveal>
            <div className="hero__image-frame"><img src={images.hero} alt="Temporary editorial portrait of a fictional Sri Lankan bride with refined styling" fetchPriority="high" /><span className="image-note">Temporary concept image · replace with authorized salon work</span></div>
          </div>
          <div className="hero__bottom page-width"><span>Scroll to discover</span><span className="hero__scroll-line" /></div>
        </section>

        <section className="intro section-pad page-width">
          <Reveal className="intro__visual"><div className="image-frame image-frame--intro"><img src={images.intro} alt="Temporary editorial portrait of a fictional South Asian woman with soft romantic makeup" loading="lazy" /><span className="image-note">Editorial concept image</span></div><div className="intro__seal"><span>MM</span><small>PERSONALISED<br />BEAUTY</small></div></Reveal>
          <Reveal className="intro__copy"><SectionLabel>A considered approach</SectionLabel><h2>Beauty, thoughtfully <em>personalised.</em></h2><p>Every look is an opportunity to celebrate your individuality. From meaningful bridal moments to special occasions, discover beauty services designed around your style.</p><a className="text-link text-link--rose" href="#services">Discover the services <ArrowUpRight size={16} /></a><div className="intro__rule" /><p className="microcopy">Temporary imagery is used for this concept presentation. Approved salon photography can replace it before launch.</p></Reveal>
        </section>

        <section className="bridal-section section-pad" id="bridal">
          <div className="page-width">
            <Reveal className="section-heading section-heading--split"><div><SectionLabel>The signature bridal experience</SectionLabel><h2>Made for your most <em>meaningful</em> moments.</h2></div><p>From first inspiration to final detail, a bridal look should feel like an extension of you — considered, graceful and entirely your own.</p></Reveal>
            <div className="bridal-grid">{bridalLooks.map((look) => <Reveal key={look.number} className={`bridal-look ${look.className}`}><div className="bridal-look__image"><img src={look.image} alt={look.alt} loading="lazy" /><span className="image-note">Temporary concept image</span></div><div className="bridal-look__meta"><span>{look.number}</span><div><p className="eyebrow">{look.kicker}</p><h3>{look.title}</h3><p>{look.copy}</p></div></div></Reveal>)}</div>
            <div className="section-end-link"><a className="text-link" href="#gallery">View the visual story <ArrowUpRight size={16} /></a></div>
          </div>
        </section>

        <section className="services-section section-pad page-width" id="services">
          <Reveal className="section-heading section-heading--services"><div><SectionLabel>Beauty, beyond the bridal look</SectionLabel><h2>Designed around <em>your</em> occasion.</h2></div><p>Selected beauty services for the moments you want to remember — with wording and details ready to be tailored as the salon evolves.</p></Reveal>
          <div className="services-list">{serviceItems.map(({ number, title, copy, icon: Icon }) => <div className="service-row" key={title}><span className="service-row__number">{number}</span><Icon className="service-row__icon" size={21} strokeWidth={1.3} /><h3>{title}</h3><p>{copy}</p><a href="#enquire" aria-label={`Enquire about ${title}`}><ArrowUpRight size={19} /></a></div>)}</div>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="page-width"><Reveal className="section-heading section-heading--gallery"><div><SectionLabel>The transformation gallery</SectionLabel><h2>Every look tells <em>a story.</em></h2></div><p>Temporary editorial imagery shown for the initial concept. Replace with genuine, authorized photographs of Malki’s work before launch.</p></Reveal>
            <div className="gallery-toolbar"><div className="filter-list" role="group" aria-label="Filter gallery">{["All", ...Array.from(new Set(galleryItems.map((item) => item.category)))].map((filter) => <button key={filter} className={activeFilter === filter ? "filter-button filter-button--active" : "filter-button"} type="button" onClick={() => { setActiveFilter(filter as "All" | GalleryCategory); setLightboxIndex(null); }}>{filter}</button>)}</div><span className="gallery-count">{filteredGallery.length.toString().padStart(2, "0")} images</span></div>
            <div className="gallery-grid">{filteredGallery.map((item, index) => <button type="button" className={`gallery-item ${item.className}`} key={item.id} onClick={() => setLightboxIndex(index)} aria-label={`Open ${item.title} image in lightbox`}><img src={item.image} alt={item.alt} loading="lazy" /><span className="gallery-item__veil"><span>{item.category}</span><strong>{item.title}</strong><small>{item.caption}</small></span></button>)}</div>
          </div>
        </section>

        <section className="philosophy section-pad page-width">
          <Reveal className="philosophy__image"><img src={images.detail} alt="Temporary close-up editorial image showing fictional bridal makeup and jewelry details" loading="lazy" /><span className="image-note">Temporary concept image</span></Reveal>
          <Reveal className="philosophy__copy"><span className="philosophy__mark"><CircleDot size={23} strokeWidth={1.1} /></span><SectionLabel>A personal beauty philosophy</SectionLabel><h2>Beautifully you,<br /><em>in every detail.</em></h2><p>Thoughtful makeup, considered styling and a personal approach to beauty — with looks designed to complement your natural features, skin tone and individual style.</p><a className="text-link text-link--rose" href="#enquire">Start a conversation <ArrowUpRight size={16} /></a></Reveal>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="page-width about-section__inner"><Reveal className="about-section__copy"><SectionLabel>The artist behind the look</SectionLabel><h2>Meet <em>Malki.</em></h2><p>Malki Rajapaksha is the artist behind Malki Bridal & Beauty. This concept keeps the story intentionally open, creating space for an approved biography, portrait and personal words to be added when confirmed.</p><p>What remains at the heart of the experience is a thoughtful, individual approach to beauty — creating room for every client’s style, occasion and sense of self.</p><a className="button button--outline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Enquire with Malki <MessageCircle size={16} /></a></Reveal><Reveal className="about-section__portrait"><div className="image-frame"><img src={images.hero} alt="Temporary editorial portrait reserved for a future approved artist or salon image" loading="lazy" /><span className="image-note">Reserved for approved artist portrait</span></div><FloralMark className="about-section__floral" /></Reveal></div>
        </section>

        <section className="enquire-section section-pad page-width" id="enquire">
          <Reveal className="enquire-intro"><SectionLabel>Appointment enquiries</SectionLabel><h2>Let’s plan your<br /><em>perfect look.</em></h2><p>Tell us about your occasion, your preferred service and your desired date. The salon will help you enquire about availability and the next steps.</p><div className="enquire-steps"><div><span>01</span><strong>Choose your service</strong><small>Select the service you are interested in.</small></div><div><span>02</span><strong>Send your enquiry</strong><small>Provide your preferred date and time.</small></div><div><span>03</span><strong>Confirm with the salon</strong><small>The salon confirms availability and shares advance-payment instructions.</small></div></div><p className="booking-note"><Sparkles size={15} /> All appointments must be booked in advance. Availability is confirmed by the salon, and advance payment is required to secure a confirmed appointment.</p></Reveal>
          <Reveal className="enquire-form-wrap"><form className="enquire-form" onSubmit={handleSubmit} noValidate><div className="form-intro"><span>Send a WhatsApp enquiry</span><MessageCircle size={20} /></div><div className="form-grid"><label className="field field--full"><span>Full name <b>*</b></span><input value={formState.name} onChange={(event) => handleFormChange("name", event.target.value)} placeholder="Your name" autoComplete="name" aria-invalid={Boolean(formErrors.name)} />{formErrors.name && <small className="field-error">{formErrors.name}</small>}</label><label className="field"><span>WhatsApp number</span><input value={formState.whatsapp} onChange={(event) => handleFormChange("whatsapp", event.target.value)} placeholder="Optional" autoComplete="tel" /></label><label className="field"><span>Service of interest <b>*</b></span><select value={formState.service} onChange={(event) => handleFormChange("service", event.target.value)} aria-invalid={Boolean(formErrors.service)}><option value="">Choose a service</option>{serviceItems.map((item) => <option value={item.title} key={item.title}>{item.title}</option>)}</select>{formErrors.service && <small className="field-error">{formErrors.service}</small>}</label><label className="field"><span>Preferred date <b>*</b></span><input type="date" min={today} value={formState.date} onChange={(event) => handleFormChange("date", event.target.value)} aria-invalid={Boolean(formErrors.date)} />{formErrors.date && <small className="field-error">{formErrors.date}</small>}</label><label className="field"><span>Preferred time <b>*</b></span><input type="time" value={formState.time} onChange={(event) => handleFormChange("time", event.target.value)} aria-invalid={Boolean(formErrors.time)} />{formErrors.time && <small className="field-error">{formErrors.time}</small>}</label><label className="field field--full"><span>Occasion details</span><input value={formState.occasion} onChange={(event) => handleFormChange("occasion", event.target.value)} placeholder="Wedding, engagement, event…" /></label><label className="field field--full"><span>Additional message</span><textarea value={formState.message} onChange={(event) => handleFormChange("message", event.target.value)} placeholder="Tell us anything helpful about your look or occasion…" rows={3} /></label></div><button className="button button--dark form-submit" type="submit">Prepare WhatsApp enquiry <Send size={16} /></button>{formNotice && <p className="form-notice" role="status"><Check size={16} /> {formNotice}</p>}<p className="form-footnote">Your details are placed into a WhatsApp message for you to review. The salon confirms availability directly.</p></form></Reveal>
        </section>

        <section className="contact-section" id="contact"><div className="page-width contact-section__inner"><Reveal className="contact-section__heading"><SectionLabel>Find your way to us</SectionLabel><h2>Let’s make something<br /><em>beautiful.</em></h2><a className="button button--light" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Enquire on WhatsApp <MessageCircle size={16} /></a></Reveal><Reveal className="contact-details"><div className="contact-detail"><MapPin size={20} /><div><span>Visit</span><a href={MAPS_URL} target="_blank" rel="noreferrer">No. 107, Ampitiya Road<br />Kandy 20000, Sri Lanka</a></div></div><div className="contact-detail"><Phone size={19} /><div><span>Call</span><a href="tel:+94772780838">+94 77 278 0838</a></div></div><div className="contact-detail"><MessageCircle size={19} /><div><span>WhatsApp</span><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Start an enquiry</a></div></div></Reveal></div></section>
      </main>

      <footer className="site-footer"><div className="page-width site-footer__top"><a className="wordmark" href="#home"><span className="wordmark__name">MALKI</span><span className="wordmark__descriptor">BRIDAL <i /> BEAUTY</span></a><p>A bridal and beauty experience<br />for your most meaningful moments.</p><a className="footer-arrow" href="#home" aria-label="Back to top"><ArrowUpRight size={20} /></a></div><div className="page-width site-footer__bottom"><span>© {new Date().getFullYear()} Malki Bridal & Beauty</span><div><a href="#contact">Contact</a><a href={MAPS_URL} target="_blank" rel="noreferrer">Location</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a></div><span>Website concept by WebForge Signature.</span></div></footer>

      {lightboxItem && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${lightboxItem.title} image`} onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxIndex(null); }}><button ref={closeButtonRef} className="lightbox__close" type="button" onClick={() => setLightboxIndex(null)} aria-label="Close image viewer"><X size={23} /></button><button className="lightbox__prev" type="button" onClick={() => setLightboxIndex((current) => current === null ? null : (current - 1 + filteredGallery.length) % filteredGallery.length)} aria-label="Previous image"><ChevronLeft size={25} /></button><div className="lightbox__content"><img src={lightboxItem.image} alt={lightboxItem.alt} /><div><span>{lightboxItem.category}</span><h2>{lightboxItem.title}</h2><p>{lightboxItem.caption}</p></div></div><button className="lightbox__next" type="button" onClick={() => setLightboxIndex((current) => current === null ? null : (current + 1) % filteredGallery.length)} aria-label="Next image"><ChevronRight size={25} /></button></div>}
    </div>
  );
}

export default App;
