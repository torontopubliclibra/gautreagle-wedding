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
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email");
      if (emailParam) {
        localStorage.setItem("rsvp_email", emailParam);
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
    { key: "weekend", label: "Weekend" },
    { key: "wedding", label: "Wedding" },
    { key: "directions", label: "Directions" },
    { key: "rsvp", label: "R.S.V.P." },
  ];

  return (
    <>
      <Header onTitleClick={() => setTab("home")} />
      <nav className="tabs">
        <button
            className={`tab home ${tab === "home" ? " active" : ""}`}
            onClick={() => setTab("home")}
            type="button"
          >
            Home
          </button>
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
              Only {getDaysUntilWedding()} days to go!
            </h2>
            <p>We would love to have you at our wedding ceremony on <strong>Sunday, September 6th, 2026.</strong></p>
            <br />
            <p>In the tabs above, you&apos;ll find all the information you need about <a onClick={() => setTab("wedding")}>our big day</a>, some <a onClick={() => setTab("weekend")}>optional events on the Friday and Saturday</a>, the <a onClick={() => setTab("directions")}>directions and accommodation recommendations</a>, and <a onClick={() => setTab("rsvp")}>our R.S.V.P. form</a>.</p>
            <br />
            <p>Please fill out the form by <strong>May 15 at the latest.</strong></p>
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
            <br />
            <p>The dress code is end-of-summer casual (think summer dresses and short sleeve button-downs). Ties and jackets are not required (but don&apos;t let us stop you if that&apos;s your sartorial preference). Wear or bring comfy shoes!</p>
            <br />
            <p>All drinks will be free, but please bring cash to tip our beloved bartenders. Also, your presence is present enough for us, but if you feel so inclined, we welcome you to donate to our honeymoon fund.</p>
            <br />
            <Image src="/taproom.webp" alt="True History Brewing taproom" width={800} height={500} className="venue-image" />
            <br /><hr /><br />
            <h3 className="date" style={{marginBottom: '1rem'}}>Order of Operations</h3>
            <div className="order">
              <p><strong>Arrive at 4:30pm.</strong></p>
              <p>Grab a drink and get comfy. There will be plenty of non-alcoholic options on offer in addition to wine and THB&apos;s delicious beers. And of course, there will be White Claws.</p>
              <br />
              <p><strong>Ceremony at 5pm.</strong></p>
              <p>Performed by our beloved friend, Meg Hubley, this one will be short and sweet! After the ceremony, drink, eat snacks, and mingle. Our photographer will be capturing your beautiful faces. </p>
              <br />
              <p><strong>Food at 6pm.</strong></p>
              <p>No formal sit-down: Grab a veggie dog and grab a seat.</p>
              <br />
              <p><strong>Intermittent speeches from 6pm to 7pm.</strong></p>
              <p>A few people will say some nice things about us while you eat your hot dogs.</p>
              <br />
              <p><strong>Cake at 7pm.</strong></p>
              <p>It will be a vegan and gluten-free cheesecake. Don&apos;t worry, it&apos;s good. </p>
              <br />
              <p><strong>Dancing at 7:30pm.</strong></p>
              <p>Bring comfy shoes! We know it&apos;s conventional to ask people to submit songs they want to hear on the dancefloor but we&apos;ll be radically honest with you and say that Dana already has that covered.</p>
              <br />
              <p><strong>Late night pizza at 10pm.</strong></p>
              <p><a href="https://pizzaiolo.ca/" target="_blank" rel="noopener noreferrer">Pizzaiolo</a> is next door and will fuel the last couple hours of dancing.</p>
              <br />
              <p><strong>Winding down at midnight!</strong></p>
              <p>If you want to keep the ball rolling, hop the <a href="https://www.ttc.ca/routes-and-schedules/29/0" target="_blank" rel="noopener noreferrer">29 Dufferin bus</a> down to Geary and head to <a href="https://www.thegreatergoodbar.com/" target="_blank" rel="noopener noreferrer">The Greater Good</a> or <a href="https://www.paradisegrapevine.com/" target="_blank" rel="noopener noreferrer">Paradise Grapevine</a>.</p>
            </div>
          </div>
        )}
        {tab === "weekend" && (
          <div>
            <h2 className="section-title">
              The Weekend
            </h2>
            <p>We know that many of you are travelling great distances to celebrate with us. To maximize our time together while you&apos;re here, we&apos;re organizing <strong>optional events on the Friday evening and Saturday afternoon for out-of-towners</strong>. These events are listed as part of your official RSVP so we can send an email with details once they are finalized!</p>
            <br />
            <p>Although our <a onClick={() => setTab("wedding")}>wedding day</a> will be adults only, <strong>kids are very much welcome to both the Friday and Saturday events</strong>!</p>
            <br /><hr />
            <h3 id="friday">Friday, September 4th, 2026</h3>
            <p className="text-center">We&apos;re currently looking at booking a boat trip around the harbour. We&apos;re deciding between two companies so we will have details finalized in the next month or so. The tour will likely start around 7pm and last until 9:30–10. There will be a ticket cost associated with this activity of around $40 CAD.</p>
            <br /><hr />
            <h3 id="saturday">Saturday, September 5th, 2026</h3>
            <p className="text-center">Syd&apos;s parents, Tannis and Pierre, have graciously agreed to host an afternoon snacks-and-drinks social in their beautiful backyard. This will likely start around 2pm.</p>
            <br /><hr />
            <h3 id="sunday">Sunday, September 6th, 2026</h3>
            <p className="text-center"><a onClick={() => setTab("wedding")}>We&apos;re getting married.</a></p>
            <br /><hr />
            <h3 id="monday">Monday, September 7th, 2026</h3>
            <p className="text-center">Nothing! We haven&apos;t planned anything for this day because in our experience most people have sore feet and/or heads. Sleep in and take it easy. We love you. </p>
          </div>
        )}
        {tab === "directions" && (
          <div>
            <h2 className="section-title">
              Directions & Accommodation
            </h2>
            <p><a href="https://truehistorybeer.com" target="_blank" rel="noopener noreferrer">True History</a> is located at <a href="https://maps.app.goo.gl/uyUZFimEhq7YmVrD8" target="_blank" rel="noopener noreferrer">1154 St. Clair Avenue West</a>, near the intersection of Dufferin Street and St. Clair Avenue West.</p>
            <iframe src="https://www.google.com/maps?q=True+History+Brewing,+Toronto,+ON&output=embed" width="100%" height="400" style={{border: "solid #9fa696 3px", borderRadius: '8px', marginTop: '1.5rem', marginBottom: '0.5rem', maxWidth: '900px'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <br /><br />
            <p>Those travelling by TTC can connect from Line 2 Dufferin station via the <a href="https://www.ttc.ca/routes-and-schedules/29/0" target="_blank" rel="noopener noreferrer">29</a> or  <a href="https://www.ttc.ca/routes-and-schedules/929/0" target="_blank" rel="noopener noreferrer">929</a> Dufferin buses, or from Line 1 St. Clair and St. Clair West stations via the <a href="https://www.ttc.ca/routes-and-schedules/512/0" target="_blank" rel="noopener noreferrer">512</a> St. Clair streetcar, but make sure to check the latest <a href="https://www.ttc.ca/service-alerts" target="_blank" rel="noopener noreferrer">service alerts</a>.</p>
            <br />
            <hr />
            <h3>Accommodation Recommendations</h3>
            <p>Many of you are coming from out-of-town and may need somewhere to stay. While we don&apos;t have specific hotel or AirBnb/Vrbo recommendations, we recommend staying east of Keele Street, west of Yonge Street, and south of Eglinton Avenue, to ensure ease of transit to <a onClick={() => setTab("wedding")}>the venue</a> and <a onClick={() => setTab("weekend")}>other events during the weekend</a>.</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27499.802796781627!2d-79.41729178395096!3d43.661943389999344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca!4v1775589726939!5m2!1sen!2sca"  width="100%" height="400" style={{border: "solid #9fa696 3px", borderRadius: '8px', marginTop: '1.5rem', marginBottom: '0.5rem', maxWidth: '900px'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        )}
        {tab === "rsvp" && <RSVPSection />}
      </div>
    </section>
    </>
  );
}
