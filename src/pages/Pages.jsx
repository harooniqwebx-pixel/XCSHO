import React from "react";

const properties = [
  {
    name: "The Glass House",
    place: "Rosedale, Toronto",
    price: "$4,850,000",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Lakefront Residence",
    place: "The Bridle Path, Toronto",
    price: "$7,200,000",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Modern Pavilion",
    place: "Forest Hill, Toronto",
    price: "$3,950,000",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=90",
  },
];

function Shell() {
  return (
    <header className="site-nav">
      <a href="/" className="nav-logo">
        ATELIER
        <span>/ ESTATES</span>
      </a>

      <nav className="nav-links">
        <a href="/properties">Properties</a>
        <a href="/walkthrough">Walkthrough</a>
        <a href="/toronto">Toronto</a>
        <a href="/journal">Journal</a>
      </nav>

      <a href="/contact" className="nav-inquire">
        Inquire ↗
      </a>
    </header>
  );
}

function PageIntro({ number, eyebrow, title, text }) {
  return (
    <section className="page-intro">
      <div className="page-number">{number}</div>

      <div>
        <div className="eyebrow">{eyebrow}</div>

        <h1>{title}</h1>

        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <div className="footer-brand">ATELIER / ESTATES</div>
        <p>PRIVATE RESIDENCES · TORONTO</p>
      </div>

      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/properties">Properties</a>
        <a href="/walkthrough">Walkthrough</a>
        <a href="/contact">Inquire</a>
      </div>

      <div className="footer-copy">
        © 2026 Atelier Estates
      </div>
    </footer>
  );
}

export function Home() {
  return (
    <>
      <Shell />

      <main className="home-page">

        <section className="hero">
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2600&q=90"
            alt="Toronto luxury residence"
          />

          <div className="hero-shade" />

          <div className="hero-content">
            <div className="hero-kicker">
              TORONTO PRIVATE RESIDENCES · 2026
            </div>

            <h1>
              Spaces
              <br />
              <em>with presence.</em>
            </h1>

            <a className="hero-button" href="/properties">
              Explore collection <span>↗</span>
            </a>
          </div>

          <div className="hero-meta">
            <span>43°39′N</span>
            <span>79°23′W</span>
            <span>SCROLL TO DISCOVER ↓</span>
          </div>
        </section>

        <section className="statement-section">
          <div className="eyebrow">01 / THE ATELIER APPROACH</div>

          <h2>
            Real estate,
            <br />
            <em>considered differently.</em>
          </h2>

          <p>
            We represent exceptional homes for people who care about
            architecture, light, material and the way a place feels.
          </p>
        </section>

        <section className="featured-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">02 / SELECTED RESIDENCES</div>
              <h2>Current collection</h2>
            </div>

            <a href="/properties">View all ↗</a>
          </div>

          <div className="property-grid">
            {properties.map((property, index) => (
              <a
                href="/properties"
                className={`property-card ${
                  index === 0 ? "property-card-large" : ""
                }`}
                key={property.name}
              >
                <div className="property-image">
                  <img src={property.image} alt={property.name} />
                  <span>0{index + 1}</span>
                </div>

                <div className="property-details">
                  <div>
                    <h3>{property.name}</h3>
                    <p>{property.place}</p>
                  </div>

                  <strong>{property.price}</strong>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="experience-banner">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90"
            alt=""
          />

          <div>
            <div className="eyebrow">03 / THE EXPERIENCE</div>
            <h2>
              Don't just
              <br />
              <em>view the home.</em>
            </h2>

            <a href="/walkthrough">
              Enter the walkthrough ↗
            </a>
          </div>
        </section>

        <section className="city-strip">
          <div>
            <span>TORONTO</span>
            <strong>43°39′N / 79°23′W</strong>
          </div>

          <a href="/toronto">Discover the city ↗</a>
        </section>

      </main>

      <Footer />
    </>
  );
}

export function Properties() {
  return (
    <>
      <Shell />

      <main className="inner-page">
        <PageIntro
          number="01"
          eyebrow="PRIVATE RESIDENCES"
          title={
            <>
              The
              <br />
              collection.
            </>
          }
          text="A small selection of exceptional Toronto residences, chosen for architecture, setting and character."
        />

        <section className="all-properties">
          {properties.map((property, index) => (
            <article className="large-property" key={property.name}>
              <div className="large-property-image">
                <img src={property.image} alt={property.name} />
                <span>0{index + 1}</span>
              </div>

              <div className="large-property-info">
                <div>
                  <div className="eyebrow">
                    {property.place}
                  </div>

                  <h2>{property.name}</h2>

                  <p>
                    A considered private residence with generous
                    proportions, natural light and a strong connection
                    between architecture and landscape.
                  </p>
                </div>

                <div className="property-price">
                  <strong>{property.price}</strong>
                  <a href="/contact">Request details ↗</a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="dark-callout">
          <div className="eyebrow">LOOK CLOSER</div>

          <h2>
            Walk through
            <br />
            <em>your next address.</em>
          </h2>

          <a href="/walkthrough">Begin experience ↗</a>
        </section>
      </main>

      <Footer />
    </>
  );
}

export function Toronto() {
  return (
    <>
      <Shell />

      <main className="city-page">

        <section className="city-hero">
          <img
            src="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=2600&q=90"
            alt="Toronto skyline"
          />

          <div className="city-overlay" />

          <div className="city-title">
            <div className="eyebrow">03 / TORONTO</div>
            <h1>
              A city
              <br />
              <em>with layers.</em>
            </h1>
          </div>
        </section>

        <section className="city-content">
          <div className="eyebrow">THE NEIGHBOURHOODS</div>

          <h2>
            From quiet streets
            <br />
            to the city centre.
          </h2>

          <div className="neighborhoods">
            <div>
              <span>01</span>
              <h3>Rosedale</h3>
              <p>Tree-lined streets · Heritage · Privacy</p>
            </div>

            <div>
              <span>02</span>
              <h3>Forest Hill</h3>
              <p>Architecture · Schools · Village character</p>
            </div>

            <div>
              <span>03</span>
              <h3>The Bridle Path</h3>
              <p>Estate living · Landscape · Seclusion</p>
            </div>

            <div>
              <span>04</span>
              <h3>Yorkville</h3>
              <p>Culture · Dining · The city at its best</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export function Journal() {
  const articles = [
    ["01", "Why architecture matters in a home", "THE ATELIER JOURNAL"],
    ["02", "A guide to Toronto's quietest streets", "CITY NOTES"],
    ["03", "Inside the new language of luxury", "PERSPECTIVES"],
    ["04", "The art of arriving home", "THE ATELIER JOURNAL"],
  ];

  return (
    <>
      <Shell />

      <main className="inner-page">
        <PageIntro
          number="04"
          eyebrow="THE ATELIER JOURNAL"
          title={
            <>
              Ideas
              <br />
              worth living.
            </>
          }
          text="Architecture, neighbourhoods, design and the details that make a residence feel like home."
        />

        <section className="journal-list">
          {articles.map(([number, title, category]) => (
            <article key={number}>
              <span>{number}</span>

              <div>
                <small>{category}</small>
                <h2>{title}</h2>
              </div>

              <span>↗</span>
            </article>
          ))}
        </section>

        <section className="journal-image">
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=90"
            alt=""
          />
        </section>
      </main>

      <Footer />
    </>
  );
}

export function About() {
  return (
    <>
      <Shell />

      <main className="inner-page about-page">
        <PageIntro
          number="05"
          eyebrow="ABOUT ATELIER"
          title={
            <>
              Fewer homes.
              <br />
              <em>More attention.</em>
            </>
          }
        />

        <section className="about-layout">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=90"
              alt=""
            />
          </div>

          <div className="about-copy">
            <div className="eyebrow">OUR PHILOSOPHY</div>

            <h2>
              We believe a home should feel
              <em> inevitable.</em>
            </h2>

            <p>
              Atelier Estates is an independent Toronto real-estate
              practice focused on exceptional residential property.
            </p>

            <p>
              We combine editorial storytelling, local knowledge and
              highly personal service to present homes with clarity
              and intention.
            </p>

            <a href="/contact">Work with us ↗</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export function Contact() {
  return (
    <>
      <Shell />

      <main className="contact-page">
        <div className="eyebrow">07 / PRIVATE INQUIRIES</div>

        <h1>
          Let's find
          <br />
          <em>your place.</em>
        </h1>

        <div className="contact-layout">
          <div>
            <p>
              Tell us what you're looking for and we'll be in touch
              personally.
            </p>

            <div className="contact-detail">
              <span>TORONTO</span>
              <span>hello@atelierestates.com</span>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Your name" />
            <input placeholder="Email address" />
            <input placeholder="Phone" />

            <textarea
              rows="5"
              placeholder="Tell us about the property you're looking for..."
            />

            <button type="submit">
              Send inquiry <span>↗</span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

export function Experience() {
  return (
    <>
      <Shell />

      <main className="experience-page">

        <section className="experience-hero">
          <div className="eyebrow">08 / THE ATELIER EXPERIENCE</div>

          <h1>
            Beyond
            <br />
            <em>the listing.</em>
          </h1>

          <p>
            A more immersive way to discover exceptional homes.
          </p>
        </section>

        <section className="experience-grid">
          <div>
            <span>01</span>
            <h2>Discover</h2>
            <p>
              Curated residences selected around your priorities,
              not an endless catalogue.
            </p>
          </div>

          <div>
            <span>02</span>
            <h2>Experience</h2>
            <p>
              Explore spaces through photography, motion and
              immersive walkthroughs before you arrive.
            </p>
          </div>

          <div>
            <span>03</span>
            <h2>Acquire</h2>
            <p>
              Personal guidance from first conversation through
              closing and beyond.
            </p>
          </div>
        </section>

        <section className="experience-image">
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=90"
            alt=""
          />

          <div>
            <h2>
              Your next
              <br />
              address is
              <br />
              <em>closer than you think.</em>
            </h2>

            <a href="/contact">Begin a conversation ↗</a>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
