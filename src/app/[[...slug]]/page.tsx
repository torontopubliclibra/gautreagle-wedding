"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import RSVPSection from "../RSVPSection";

const PASSWORD = "alldressed";
const WEDDING_DATE = new Date(2026, 8, 6); // September 6, 2026
const VALID_TABS = ["home", "weekend", "wedding", "directions", "rsvp"];

const getDaysUntilWedding = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weddingDate = new Date(WEDDING_DATE);
  weddingDate.setHours(0, 0, 0, 0);
  const timeDiff = weddingDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const Header = ({ onTitleClick }: { onTitleClick?: () => void }) => (
  <header className="wrapper">
    <Image src="/pigeons-2.png" className="pigeons" alt="pigeons" width={100} height={50} />
    <h1 className="header-title" onClick={onTitleClick}>
      Syd &amp; Dana get hitched
    </h1>
  </header>
);

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  const [entered, setEntered] = useState(() => {
    if (typeof window !== "undefined") {
      const unlocked = localStorage.getItem("wedding_unlocked");
      return unlocked === "true";
    }
    return false;
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const slug = pathname === "/" ? "home" : pathname.slice(1);
  const tab = VALID_TABS.includes(slug) ? slug : "home";

  const setTab = (newTab: string) => {
    router.push(newTab === "home" ? "/" : `/${newTab}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      if (search.includes("email=") || search.includes("email:")) {
        router.push("/rsvp");
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setEntered(true);
      setError("");
      if (typeof window !== "undefined") {
        localStorage.setItem("wedding_unlocked", "true");
      }
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (!entered) {
    return (
      <>
      <Header />
      <section id="protected">
        <div className="wrapper">
          <form onSubmit={handleSubmit} className="password-form">
           <input
             type="password"
             placeholder="Enter password"
             value={input}
             onChange={e => setInput(e.target.value)}
           />
           <button>
            Enter
            <Image src="/icons/lock-unlock.svg" alt="unlock" width={20} height={30} />
          </button>
           {error && <span className="error-text">{error}</span>}
         </form>
        </div>
      </section>
      </>
    );
  }

  const tabs = [
    { key: "weekend", label: "Weekend" },
    { key: "wedding", label: "Wedding" },
    { key: "directions", label: "Directions" },
    { key: "rsvp", label: "R.S.V.P." },
  ];

  return (
    <>
      <Header onTitleClick={() => setTab("home")} />
      <nav className="tabs">
          {tabs.map(t => (
          <button
            key={t.key}
            className={`tab${tab === t.key ? " active" : ""}`}
            onClick={() => setTab(t.key)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </nav>
      <section id="content">
      <div>
        {tab === "home" && (
          <div>
            <h2 className="section-title">
              Only {getDaysUntilWedding()} weddings to go!
            </h2>
            <p>We would love to have you at our wedding ceremony on <span className="strong">Sunday, September 6th, 2026.</span></p>
            <br />
            <p>In the tabs above, you&apos;ll find all the information you need about <a onClick={() => setTab("wedding")}>our big day</a>, some <a onClick={() => setTab("weekend")}>events on the Friday and Saturday</a>, as well as the <a onClick={() => setTab("directions")}>directions and accommodation recommendations</a>, and <a onClick={() => setTab("rsvp")}>our R.S.V.P. form</a>. Please fill out the form by <span className="strong">May 15 at the latest.</span></p>
            <br />
            <Image src="/boat-2.jpeg" alt="Syd & Dana on a boat at sunset, with the CN Tower in the background" width={795} height={1200} className="syd-dana-image" />
          </div>
        )}
        {tab === "wedding" && (
          <div>
            <h2 className="section-title">
              The Big Day
            </h2>
            <p className="date">Sunday, September 6th, 2026</p>
            <p className="venue-details"><a href="https://truehistorybeer.com" target="_blank" rel="noopener noreferrer">True History Brewing</a>, Toronto, Ontario (<a onClick={() => setTab("directions")}>directions</a>)</p>
            <hr />
            <p>The whole event will take place at our beloved True History Brewing. We ask that you please arrive for 4:30pm as the ceremony will begin around 5. You can watch us get married and then we&apos;ll all eat veggie hot dogs and potato chips and dance the night away.</p>
            <br />
            <Image src="/taproom.webp" alt="True History Brewing taproom" width={800} height={500} className="venue-image" />
          </div>
        )}
        {tab === "weekend" && (
          <div>
            <h2 className="section-title">
              Friday & Saturday Events
            </h2>
            <h3>Friday Evening Boat Ride</h3>
            <p className="text-center">Information about the Friday evening boat ride will go here.</p>
            <hr />
            <h3>Saturday Backyard BBQ</h3>
            <p className="text-center">Information about the Saturday backyard BBQ will go here.</p>
          </div>
        )}
        {tab === "directions" && (
          <div>
            <h2 className="section-title">
              Directions & Accommodation
            </h2>
            <h3>Directions to T.H.B.</h3>
            <p><a href="https://truehistorybeer.com" target="_blank" rel="noopener noreferrer">True History Brewing</a> is located at <a href="https://maps.app.goo.gl/uyUZFimEhq7YmVrD8" target="_blank" rel="noopener noreferrer">1154 St. Clair Avenue West</a>, near the intersection of Dufferin Street and St. Clair Avenue West.</p>
            <br />
            <p>Those travelling by TTC can connect from Line 2 Dufferin station via the <a href="https://www.ttc.ca/routes-and-schedules/29/0" target="_blank" rel="noopener noreferrer">29</a> or  <a href="https://www.ttc.ca/routes-and-schedules/929/0" target="_blank" rel="noopener noreferrer">929</a> Dufferin buses, or from Line 1 St. Clair and St. Clair West stations via the <a href="https://www.ttc.ca/routes-and-schedules/512/0" target="_blank" rel="noopener noreferrer">512</a> St. Clair streetcar, but make sure to check the latest <a href="https://www.ttc.ca/service-alerts" target="_blank" rel="noopener noreferrer">service alerts</a>.</p>
            <iframe src="https://www.google.com/maps?q=True+History+Brewing,+Toronto,+ON&output=embed" width="100%" height="400" style={{border: "solid #9fa696 3px", borderRadius: '8px', marginTop: '1.5rem', marginBottom: '0.5rem', maxWidth: '900px'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <hr />
            <h3>Accommodation recommendations</h3>
            <p>Many of you are coming from out-of-town and may need somewhere to stay. While we don&apos;t have specific hotel or AirBnb/Vrbo recommendations, we recommend staying east of the Humber River, west of the Don Valley, and south of Eglinton Avenue, to ensure ease of transit to <a onClick={() => setTab("wedding")}>the venue</a> and <a onClick={() => setTab("weekend")}>other events during the weekend</a>.</p>
          </div>
        )}
        {tab === "rsvp" && <RSVPSection />}
      </div>
    </section>
    </>
  );
}
