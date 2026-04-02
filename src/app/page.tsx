"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import RSVPSection from "./RSVPSection";

const PASSWORD = "alldressed";
const WEDDING_DATE = new Date(2026, 8, 6); // September 6, 2026

const getDaysUntilWedding = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weddingDate = new Date(WEDDING_DATE);
  weddingDate.setHours(0, 0, 0, 0);
  const timeDiff = weddingDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const Header = ({ onTitleClick }: { onTitleClick?: () => void }) => (
  <div className="wrapper">
    <Image src="/pigeons-2.png" className="pigeons" alt="pigeons" width={100} height={50} />
    <h1 className="header-title" onClick={onTitleClick}>
      Syd &amp; Dana get hitched
    </h1>
  </div>
);

export default function Home() {
  const [entered, setEntered] = useState(() => {
    if (typeof window !== "undefined") {
      const unlocked = localStorage.getItem("wedding_unlocked");
      return unlocked === "true";
    }
    return false;
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("home");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      if (search.includes("email=") || search.includes("email:")) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTab("rsvp");
      }
    }
  }, []);

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
    { key: "home", label: "Home" },
    { key: "weekend", label: "Weekend" },
    { key: "day", label: "Wedding" },
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
              Join us in celebrating our special day! Only {getDaysUntilWedding()} days to go!
            </h2>
            <Image src="/boat-2.jpeg" alt="Syd & Dana on a boat at sunset, with the CN Tower in the background" width={795} height={1200} className="syd-dana-pic" />
          </div>
        )}
        {tab === "day" && (
          <div>
            <h2 className="section-title">
              The Big Day
            </h2>
            <p className="venue-details">Sunday, September 6th, 2026<br/><a href="https://truehistorybeer.com" target="_blank" rel="noopener noreferrer">True History Brewing</a><br/>Toronto, Ontario</p>
            <Image src="/taproom.webp" alt="venue" width={800} height={500} className="venue-image" />
          </div>
        )}
        {tab === "weekend" && (
          <div>
            <h2 className="section-title">
              The Weekend
            </h2>
            <p className="text-center">Information about the weekend events will go here.</p>
          </div>
        )}
        {tab === "directions" && (
          <div>
            <h2 className="section-title">
              Directions & Accommodation
            </h2>
            <p><a href="https://truehistorybeer.com" target="_blank" rel="noopener noreferrer">True History Brewing</a> is located at <a href="https://maps.app.goo.gl/uyUZFimEhq7YmVrD8" target="_blank" rel="noopener noreferrer">1154 St. Clair Avenue West</a>, near the intersection of Dufferin and St. Clair. Those travelling by TTC can connect from subway lines via the <a href="https://www.ttc.ca/routes-and-schedules/29/0" target="_blank" rel="noopener noreferrer">29</a> or  <a href="https://www.ttc.ca/routes-and-schedules/929/0" target="_blank" rel="noopener noreferrer">929</a> Dufferin buses, or the <a href="https://www.ttc.ca/routes-and-schedules/512/0" target="_blank" rel="noopener noreferrer">512</a> St. Clair streetcar.</p>
            <iframe src="https://www.google.com/maps?q=True+History+Brewing,+Toronto,+ON&output=embed" width="100%" height="400" style={{border: "solid #9fa696 3px", borderRadius: '8px', marginTop: '1.5rem', marginBottom: '0.5rem'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        )}
        {tab === "rsvp" && <RSVPSection />}
      </div>
    </section>
    </>
  );
}
