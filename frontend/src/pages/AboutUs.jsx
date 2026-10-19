import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";

function AboutUs() {
    const navigate = useNavigate();
const [isLeaving, setIsLeaving] = useState(false);
const timerRef = useRef(null);

useEffect(() => {
  return () => clearTimeout(timerRef.current);
}, []);

function handleBuildTeam() {
  if (isLeaving) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    navigate("/build");
    return;
  }

  setIsLeaving(true);

  // Open the next page once the red wipe covers the screen.
  timerRef.current = setTimeout(() => {
    navigate("/build");
  }, 1100);
}
  return (
    <main className="about-page">
      <header className="about-heading">
        <span className="about-label">Your season starts here</span>
        <h1>
          How to <span>Play</span>
        </h1>
        <p>Three steps. Your team. Your race.</p>
      </header>

      <div className="about-steps">
        <section className="about-card about-step-one">
          <span className="about-number">01</span>
          <h2>Free</h2>

          <p>
            F1® Fantasy is free to play. Simply log in with your F1®
            account credentials or register with F1®.
          </p>

          <p>Please read the Terms &amp; Conditions for more details.</p>

          <span className="about-card-tag">Join the grid</span>
        </section>

        <section className="about-card about-step-two">
          <span className="about-number">02</span>
          <h2>Create</h2>

          <p>
            Each team consists of <strong>5 drivers</strong> and{" "}
            <strong>2 constructors</strong>.
          </p>

          <p>
            Stay within the cost cap of <strong>$100m</strong>.
          </p>

          <span className="about-card-tag">Make your picks</span>
        </section>

        <section className="about-card about-step-three">
          <span className="about-number">03</span>
          <h2>Leagues</h2>

          <p>
            F1® Fantasy is more fun when played with your friends and family.
          </p>

          <p>
            Compete in the Global League and Mini-Leagues throughout the
            season. Join or create a public or private league and invite
            your friends.
          </p>

          <p>
            Share the access code using the link in your league settings
            via email or social media.
          </p>

          <p>
            Challenge a friend race-by-race in Head-To-Head Battlemode leagues.
          </p>

          <span className="about-card-tag">Race together</span>
        </section>
      </div>

      <div className="about-action">
  <button
    type="button"
    className="btn-race"
    onClick={handleBuildTeam}
    disabled={isLeaving}
  >
    <span>
      {isLeaving ? "Heading to the grid…" : "Build Your Team →"}
    </span>
  </button>
</div>

{isLeaving && (
  <div className="race-transition" aria-hidden="true">
    <div className="race-transition-wipe" />

    <div className="race-transition-car">
      <img src="/f1-car.png" alt="" />
    </div>
  </div>
)}
    </main>
  );
}

export default AboutUs;
