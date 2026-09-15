import { useState } from "react";
import Walkthrough from "./Walkthrough.jsx";

const properties = [
  {
    id: 1,
    title: "The Yorkville Residence",
    location: "Yorkville, Toronto",
    price: "$2,895,000",
    beds: 3,
    baths: 3,
    type: "Condo",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: 2,
    title: "Forest Hill House",
    location: "Forest Hill, Toronto",
    price: "$3,450,000",
    beds: 4,
    baths: 4,
    type: "House",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: 3,
    title: "King West Loft",
    location: "King West, Toronto",
    price: "$1,395,000",
    beds: 2,
    baths: 2,
    type: "Loft",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: 4,
    title: "Rosedale Modern",
    location: "Rosedale, Toronto",
    price: "$4,250,000",
    beds: 5,
    baths: 4,
    type: "House",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
  },
];

const pages = {
  home: "Home",
  properties: "Properties",
  neighborhoods: "Neighborhoods",
  journal: "Journal",
  services: "Services",
  about: "About",
  team: "Our Team",
  insights: "Insights",
  toronto: "Toronto",
  contact: "Contact",
};

function Header({ navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <div className="mega-menu">
          <div className="mega-menu-top">
            <div className="mega-menu-brand">NORTH/HOUSE</div>
            <button className="menu-close" onClick={() => setMenuOpen(false)}>
              CLOSE <span>×</span>
            </button>
          </div>

          <div className="mega-menu-content">
            <div className="mega-menu-kicker">EXPLORE NORTH/HOUSE</div>

            <nav className="mega-menu-links">
              {[
                ["01", "Home", "home"],
                ["02", "Properties", "properties"],
                ["03", "Neighborhoods", "neighborhoods"],
                ["04", "Journal", "journal"],
                ["05", "Services", "services"],
                ["06", "About", "about"],
                ["07", "Our Team", "team"],
                ["08", "Insights", "insights"],
                ["09", "Toronto", "toronto"],
                ["10", "Contact", "contact"]
              ].map(([number, label, page]) => (
                <button
                  key={page}
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(page);
                  }}
                >
                  <span className="menu-number">{number}</span>
                  <span className="menu-label">{label}</span>
                  <span className="menu-arrow">↗</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mega-menu-footer">
            <span>TORONTO, CANADA</span>
            <span>EST. 2026</span>
            <span>PRIVATE REAL ESTATE</span>
          </div>
        </div>
      )}

      <header className="header">
        <button className="brand" onClick={() => navigate("home")}>
          NORTH<span>/</span>HOUSE
        </button>

        <nav className="nav">
          <button onClick={() => navigate("home")}>Home</button>
          <button onClick={() => navigate("properties")}>Properties</button>
          <button onClick={() => navigate("neighborhoods")}>Neighborhoods</button>
          <button onClick={() => navigate("journal")}>Journal</button>
          <button onClick={() => navigate("about")}>About</button>
        </nav>

        <div className="header-actions">
          <button className="menu-button" onClick={() => setMenuOpen(true)}>
            MENU
            <span className="menu-icon">
              <i></i>
              <i></i>
            </span>
          </button>

          <button className="contact-pill" onClick={() => navigate("contact")}>
            Contact <span>↗</span>
          </button>
        </div>
      </header>
    </>
  );
}

function PropertyCard({ property, favorite, toggleFavorite, navigate }) {
  return (
    <article className="property-card">
      <div className="property-image-wrap">
        <img src={property.image} alt={property.title} />
        <button
          className={`heart ${favorite ? "saved" : ""}`}
          onClick={() => toggleFavorite(property.id)}
        >
          {favorite ? "♥" : "♡"}
        </button>
        <span className="type-badge">{property.type}</span>
      </div>

      <div className="property-info">
        <div>
          <h3>{property.title}</h3>
          <p>{property.location}</p>
        </div>
        <strong>{property.price}</strong>
      </div>

      <div className="property-meta">
        <span>{property.beds} Beds</span>
        <span>{property.baths} Baths</span>
        <button onClick={() => navigate("property-" + property.id)}>
          View property →
        </button>
      </div>
    </article>
  );
}

function Home({ navigate, favorites, toggleFavorite }) {
  return (
    <>
      <section className="hero">
        <img
          src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=90"
          alt="Luxury Toronto residence"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">TORONTO · REAL ESTATE</p>
          <h1>Spaces<br />with presence.</h1>
          <button className="hero-button" onClick={() => navigate("properties")}>
            Explore properties <span>↗</span>
          </button>
        </div>
        <div className="hero-bottom">EST. 2026 — TORONTO, CANADA</div>
      </section>

      <Walkthrough />

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SELECTED PROPERTIES</p>
            <h2>Homes worth<br />coming home to.</h2>
          </div>
          <button className="text-link" onClick={() => navigate("properties")}>
            View all properties →
          </button>
        </div>

        <div className="property-grid">
          {properties.slice(0, 3).map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              favorite={favorites.includes(p.id)}
              toggleFavorite={toggleFavorite}
              navigate={navigate}
            />
          ))}
        </div>
      </section>

      <section className="statement">
        <p className="eyebrow">OUR APPROACH</p>
        <h2>
          Real estate should feel less like a transaction
          <br />and more like discovering somewhere meant for you.
        </h2>
      </section>
    </>
  );
}

function Properties({ navigate, favorites, toggleFavorite }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = properties.filter((p) => {
    const matchesType = filter === "All" || p.type === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <PageShell
      eyebrow="COLLECTION"
      title="Properties"
      intro="A considered collection of distinctive homes across Toronto."
    >
      <div className="filters">
        <input
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-buttons">
          {["All", "House", "Condo", "Loft"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="property-grid">
        {filtered.map((p) => (
          <PropertyCard
            key={p.id}
            property={p}
            favorite={favorites.includes(p.id)}
            toggleFavorite={toggleFavorite}
            navigate={navigate}
          />
        ))}
      </div>
    </PageShell>
  );
}

function Neighborhoods({ navigate }) {
  const areas = [
    ["Yorkville", "Refined, central and effortlessly sophisticated.", "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=85"],
    ["Rosedale", "Tree-lined streets and some of Toronto's most established homes.", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"],
    ["Forest Hill", "Quiet residential streets with timeless architecture.", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"],
    ["King West", "Urban energy, lofts, restaurants and modern living.", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"],
  ];

  return (
    <PageShell
      eyebrow="TORONTO"
      title="Neighborhoods"
      intro="Different streets. Different rhythms. One city."
    >
      <div className="area-grid">
        {areas.map(([name, text, image]) => (
          <article className="area-card" key={name}>
            <img src={image} alt={name} />
            <div>
              <p className="eyebrow">TORONTO</p>
              <h3>{name}</h3>
              <p>{text}</p>
              <button onClick={() => navigate("properties")}>Explore homes →</button>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function Services() {
  const services = [
    ["01", "Buying", "Strategic guidance, private opportunities and a clear path from search to keys."],
    ["02", "Selling", "Thoughtful positioning, exceptional presentation and targeted market exposure."],
    ["03", "Marketing", "Editorial photography, cinematic storytelling and digital campaigns designed to create attention."],
    ["04", "Advisory", "Independent advice for clients navigating Toronto's changing property landscape."],
  ];

  return (
    <PageShell
      eyebrow="WHAT WE DO"
      title="Services"
      intro="A modern approach to buying, selling and understanding exceptional property."
    >
      <div className="service-list">
        {services.map(([number, title, text]) => (
          <div className="service-row" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function Team() {
  const people = [
    ["ALEX MORGAN", "Founder & Broker", "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85"],
    ["MAYA CHEN", "Senior Advisor", "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85"],
    ["NOAH WILLIAMS", "Property Advisor", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85"],
  ];

  return (
    <PageShell
      eyebrow="THE PEOPLE"
      title="Our Team"
      intro="A small, focused team bringing local knowledge and thoughtful advice to every move."
    >
      <div className="team-grid">
        {people.map(([name, role, image]) => (
          <article className="team-card" key={name}>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{role}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function Insights() {
  const articles = [
    ["MARKET", "What Toronto buyers should know this season", "A practical look at the decisions that matter before making an offer."],
    ["GUIDE", "How to evaluate a great home", "The details worth noticing beyond the first impression."],
    ["CITY", "Five neighborhoods shaping Toronto", "A closer look at streets with momentum, character and long-term appeal."],
  ];

  return (
    <PageShell
      eyebrow="KNOWLEDGE"
      title="Insights"
      intro="Useful perspective on property, neighborhoods and the city we call home."
    >
      <div className="article-grid">
        {articles.map(([tag, title, text]) => (
          <article className="article-card" key={title}>
            <span>{tag}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <button>Read article →</button>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function Journal() {
  return (
    <PageShell
      eyebrow="THE JOURNAL"
      title="Stories from the city."
      intro="Architecture, interiors, neighborhoods and the people shaping Toronto."
    >
      <div className="journal-feature">
        <img
          src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2000&q=85"
          alt="Toronto architecture"
        />
        <div>
          <p className="eyebrow">CITY / 01</p>
          <h2>Architecture that gives Toronto its character.</h2>
          <p>
            From Victorian streetscapes to contemporary residences,
            the city is defined by contrast.
          </p>
          <button className="dark-button">Read the journal →</button>
        </div>
      </div>
    </PageShell>
  );
}

function About() {
  return (
    <PageShell
      eyebrow="NORTH/HOUSE"
      title="Less noise.<br />More substance."
      intro="North/House is an independent Toronto real-estate studio built around thoughtful property, clear advice and exceptional presentation."
    >
      <div className="about-block">
        <div>
          <p className="eyebrow">OUR PHILOSOPHY</p>
          <h2>Property is personal.</h2>
        </div>
        <p>
          We believe the best real-estate experience starts by listening.
          Our work combines local knowledge with a considered visual
          approach, helping clients make confident decisions without
          unnecessary noise.
        </p>
      </div>
    </PageShell>
  );
}

function Toronto() {
  return (
    <PageShell
      eyebrow="THE CITY"
      title="Toronto."
      intro="A city of neighborhoods, architecture, culture and constant movement."
    >
      <div className="toronto-feature">
        <img
          src="https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=2200&q=85"
          alt="Toronto skyline"
        />
        <div className="toronto-copy">
          <p className="eyebrow">FROM THE WATER TO THE HILLS</p>
          <h2>Every part of Toronto tells a different story.</h2>
          <p>
            Discover the streets, buildings and communities that make the
            city one of the world's most distinctive places to live.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell
      eyebrow="GET IN TOUCH"
      title="Let's talk."
      intro="Tell us what you're looking for and we'll take it from there."
    >
      {sent ? (
        <div className="success-box">
          <h2>Thank you.</h2>
          <p>Your inquiry has been received. We'll be in touch shortly.</p>
        </div>
      ) : (
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <input required placeholder="Your name" />
          <input required type="email" placeholder="Email address" />
          <select>
            <option>I'm looking to buy</option>
            <option>I'm looking to sell</option>
            <option>I'm looking for an investment</option>
            <option>General inquiry</option>
          </select>
          <textarea required placeholder="Tell us a little about what you're looking for..." />
          <button className="dark-button">Send inquiry →</button>
        </form>
      )}
    </PageShell>
  );
}

function PropertyDetail({ property, navigate }) {
  const [sent, setSent] = useState(false);

  return (
    <PageShell eyebrow={property.type} title={property.title} intro={property.location}>
      <img className="detail-image" src={property.image} alt={property.title} />

      <div className="detail-layout">
        <div>
          <div className="big-price">{property.price}</div>
          <div className="detail-stats">
            <span>{property.beds} Bedrooms</span>
            <span>{property.baths} Bathrooms</span>
            <span>{property.type}</span>
          </div>
          <p className="detail-description">
            A carefully considered Toronto residence with generous living
            spaces, strong architectural character and a location designed
            for city living.
          </p>
        </div>

        <div className="inquiry-card">
          {sent ? (
            <>
              <h3>Inquiry received.</h3>
              <p>We'll be in touch shortly.</p>
            </>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <h3>Interested in this property?</h3>
              <input required placeholder="Name" />
              <input required type="email" placeholder="Email" />
              <button className="dark-button">Request details →</button>
            </form>
          )}
        </div>
      </div>

      <button className="back-link" onClick={() => navigate("properties")}>
        ← Back to properties
      </button>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, intro, children }) {
  return (
    <main className="page">
      <div className="page-intro">
        <p className="eyebrow">{eyebrow}</p>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <p>{intro}</p>
      </div>
      {children}
    </main>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div>
        <div className="footer-brand">NORTH<span>/</span>HOUSE</div>
        <p>Independent Toronto real estate.</p>
      </div>

      <div className="footer-links">
        <button onClick={() => navigate("services")}>Services</button>
        <button onClick={() => navigate("team")}>Our Team</button>
        <button onClick={() => navigate("insights")}>Insights</button>
        <button onClick={() => navigate("contact")}>Contact</button>
      </div>

      <small>© 2026 North/House</small>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [favorites, setFavorites] = useState([]);

  const navigate = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  let content;

  if (page === "home") {
    content = <Home navigate={navigate} favorites={favorites} toggleFavorite={toggleFavorite} />;
  } else if (page === "properties") {
    content = <Properties navigate={navigate} favorites={favorites} toggleFavorite={toggleFavorite} />;
  } else if (page === "neighborhoods") {
    content = <Neighborhoods navigate={navigate} />;
  } else if (page === "services") {
    content = <Services />;
  } else if (page === "team") {
    content = <Team />;
  } else if (page === "insights") {
    content = <Insights />;
  } else if (page === "journal") {
    content = <Journal />;
  } else if (page === "about") {
    content = <About />;
  } else if (page === "toronto") {
    content = <Toronto />;
  } else if (page === "contact") {
    content = <Contact />;
  } else if (page.startsWith("property-")) {
    const id = Number(page.split("-")[1]);
    const property = properties.find((p) => p.id === id);
    content = property ? <PropertyDetail property={property} navigate={navigate} /> : null;
  }

  return (
    <>
      <Header navigate={navigate} />
      {content}
      {favorites.length > 0 && (
        <button className="saved-bar" onClick={() => navigate("properties")}>
          ♥ {favorites.length} saved {favorites.length === 1 ? "property" : "properties"}
        </button>
      )}
      <Footer navigate={navigate} />
    </>
  );
}
