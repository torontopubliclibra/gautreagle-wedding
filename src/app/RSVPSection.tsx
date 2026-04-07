"use client";

import { useState, useEffect } from "react";
import guests from "./guests.json";

interface Guest {
  email: string[];
  guests: string[];
  submitted?: boolean;
}

interface FormEntry {
  name: string;
  attending: string;
  allergies?: boolean;
  allergiesList?: string;
  celiac?: boolean;
  sober?: boolean;
  friday?: boolean;
  saturday?: boolean;
}

export default function RSVPSection() {
  const [step, setStep] = useState<"email"|"form"|"error">("email");
  const [email, setEmail] = useState("");
  const [guest, setGuest] = useState<Guest | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormEntry[]>([]);
  const [message, setMessage] = useState("");

  const lookupEmail = (emailAddress: string) => {
    const found = guests.find(g => g.email.some(e => e.toLowerCase() === emailAddress.trim().toLowerCase()));
    if (found) {
      setGuest(found);
      if (typeof window !== "undefined") {
        localStorage.setItem("rsvp_guest", JSON.stringify(found));
      }
      setStep("form");
      setError("");
    } else {
      setError("Email not found. Please check your invitation or contact us.");
      setStep("error");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedGuest = localStorage.getItem("rsvp_guest");
      if (savedGuest) {
        setGuest(JSON.parse(savedGuest));
        setStep("form");
        return;
      }
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email") || localStorage.getItem("rsvp_email");
      if (emailParam) {
        setEmail(emailParam);
        lookupEmail(emailParam);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    lookupEmail(email);
  };

  if (step === "email") {
    return (
      <div>
        <h2 className="rsvpTitle">R.S.V.P.</h2>
        <form onSubmit={handleEmail} className="rsvpEmailForm">
          <label htmlFor="rsvp-email">Please enter your email address below.</label>
          <input
            id="rsvp-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="rsvpInput"
          />
          <button type="submit" className="rsvpButton">Continue</button>
        </form>
      </div>
    );
  }
  if (step === "form" && guest) {
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvwwdjp";

    if (form.length === 0) {
      setForm(guest.guests.map((g: string) => ({ name: g, attending: "", allergies: false, allergiesList: "", celiac: false, sober: false, friday: false, saturday: false })));
    }

    const handleFormChange = (idx: number, field: string, value: string | boolean) => {
      setForm(f => f.map((entry, i) => i === idx ? { ...entry, [field]: value } : entry));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setMessage("");
      const data: Record<string, string> = {
        email: guest.email[0],
        emails: guest.email.join(", "),
      };
      form.forEach((g, i) => {
        data[`guest${i+1}`] = g.name;
        data[`guest${i+1}_attending`] = g.attending;
        if (g.allergies) data[`guest${i+1}_allergiesList`] = g.allergiesList || "";
        if (g.celiac) data[`guest${i+1}_celiac`] = g.celiac ? "yes" : "no";
        if (g.sober) data[`guest${i+1}_sober`] = g.sober ? "yes" : "no";
        if (g.friday) data[`guest${i+1}_friday`] = g.friday ? "yes" : "no";
        if (g.saturday) data[`guest${i+1}_saturday`] = g.saturday ? "yes" : "no";
      });
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          setSubmitted(true);
        } else {
          setMessage("There was a problem submitting your R.S.V.P. Please try again later.");
        }
      } catch {
        setMessage("There was a problem submitting your R.S.V.P. Please try again later.");
      }
      setSubmitting(false);
    };

    if (submitted) {
      return (
        <div>
          <h2>Thank you for your R.S.V.P.!</h2>
          <br />
          <p>We look forward to seeing you.</p>
        </div>
      );
    }

    let guestHeading = guest.guests[0];
    if (guest.guests.length === 2) {
      guestHeading = `${guest.guests[0]} & ${guest.guests[1]}`;
    }

    if (guest.submitted) {
      return (
        <>
          <h2 className="rsvpTitle">R.S.V.P. for {guestHeading}</h2>
          <small>Not you? Click here to <a href="#" onClick={() => { setStep("email"); setGuest(null); setForm([]); setEmail(""); setSubmitted(false); setMessage(""); localStorage.removeItem("rsvp_guest"); localStorage.removeItem("rsvp_email"); const url = new URL(window.location.href); url.searchParams.delete("email"); window.history.replaceState({}, "", url); }}>enter a different email</a>.</small>
          <div className="rsvpGuestBlock submitted">
            <p>We&apos;ve already received your R.S.V.P.</p>
            <p>If you need to make any changes, please <a href="mailto:gautreagle@gmail.com">send us an email</a>.</p>
          </div>
        </>
      );
    }

    return (
      <div>
        <h2 className="rsvpTitle">R.S.V.P. for {guestHeading}</h2>
        <small>Not you? Click here to <a href="#" onClick={() => { setStep("email"); setGuest(null); setForm([]); setEmail(""); setSubmitted(false); setMessage(""); localStorage.removeItem("rsvp_guest"); localStorage.removeItem("rsvp_email"); const url = new URL(window.location.href); url.searchParams.delete("email"); window.history.replaceState({}, "", url); }}>enter a different email</a>.</small>
        <form onSubmit={handleSubmit} className="rsvpForm">
          {form.map((g, i) => (
            <div key={i} className="rsvpGuestBlock">
              <p className="rsvpGuestName">{g.name}</p>
              <div className="rsvpSelectWrap">
                <label>
                  Attending?
                  <select
                    value={g.attending}
                    onChange={e => handleFormChange(i, "attending", e.target.value)}
                  >
                    <option value=""></option>
                    <option value="yes">Yes, I&apos;ll be there</option>
                    <option value="no">No, I won&apos;t be able to attend</option>
                  </select>
                </label>
              </div>
              {g.attending === "yes" && (
                <>
                  <div className="rsvpDietaryBlock">
                    <label className="rsvpDietaryLabel">
                      <input
                        type="checkbox"
                        checked={g.celiac || false}
                        onChange={e => handleFormChange(i, "celiac", e.target.checked)}
                      />
                      Celiac/gluten intolerant
                    </label>
                    <label className="rsvpDietaryLabel">
                      <input
                        type="checkbox"
                        checked={g.sober || false}
                        onChange={e => handleFormChange(i, "sober", e.target.checked)}
                      />
                      Not drinking alcohol
                    </label>
                    <label className="rsvpDietaryLabel">
                      <input
                        type="checkbox"
                        checked={g.allergies || false}
                        onChange={e => handleFormChange(i, "allergies", e.target.checked)}
                      />
                      Food allergies
                      {g.allergies && (
                        <input
                          type="text"
                          placeholder="Enter allergies"
                          value={g.allergiesList || ""}
                          onChange={e => handleFormChange(i, "allergiesList", e.target.value)}
                          className="rsvpAllergyInput"
                        />
                      )}
                    </label>
                  </div>
                  <hr />
                  <div className="rsvpOtherActivities" style={{marginTop: 0}}>
                      <label className="rsvpOtherActivity">
                      <input
                        type="checkbox"
                        checked={g.friday || false}
                        onChange={e => {
                          const activity = e.target.checked ? true : false;
                          handleFormChange(i, "friday", activity);
                        }}
                      />
                      Also attending Friday evening activity
                    </label>
                    <label className="rsvpOtherActivity">
                      <input
                        type="checkbox"
                        checked={g.saturday || false}
                        onChange={e => {
                          const activity = e.target.checked ? true : false;
                          handleFormChange(i, "saturday", activity);
                        }}
                      />
                      Also attending Saturday afternoon activity
                    </label>
                  </div>
                  { guest.guests.length === 1 && (
                    <><hr/><small>Due to venue capacity, we aren&apos;t able to accommodate plus ones. We appreciate your understanding!</small></>
                  )}
                </>
              )}
            </div>
          ))}
          <button type="submit" disabled={submitting} className="rsvpButton">
            {submitting ? "Submitting..." : "Submit your R.S.V.P."}
          </button>
          {message && <p className="rsvpError">{message}</p>}
        </form>
      </div>
    );
  }
  if (step === "error") {
    return (
      <div>
        <h2 className="rsvpTitle">R.S.V.P.</h2>
        <div className="rsvpGuestBlock submitted">
          <p className="rsvpError">{error}</p>
          <button onClick={() => { setStep("email"); setError(""); setEmail(""); localStorage.removeItem("rsvp_guest"); localStorage.removeItem("rsvp_email"); }} className="rsvpButton" style={{ marginTop: "0.5rem" }}>Enter a different email</button>
        </div>
      </div>
    );
  }
  return null;
}