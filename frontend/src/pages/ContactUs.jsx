import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";

const countryCodes = [
  { label: "Lebanon (+961)", value: "+961" },
  { label: "UAE (+971)", value: "+971" },
  { label: "Saudi Arabia (+966)", value: "+966" },
  { label: "Qatar (+974)", value: "+974" },
  { label: "France (+33)", value: "+33" },
  { label: "United Kingdom (+44)", value: "+44" },
  { label: "USA / Canada (+1)", value: "+1" },
];

function ContactUs() {
    const navigate = useNavigate();
const [isClosing, setIsClosing] = useState(false);
const timerRef = useRef(null);

useEffect(() => {
  return () => clearTimeout(timerRef.current);
}, []);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    countryCode: "+961",
    phone: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {};
    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    // Allow letters from any language and spaces.
    if (!fullName) {
      newErrors.fullName = "Please enter your full name.";
    } else if (!/^\p{L}[\p{L}\p{M} ]*$/u.test(fullName)) {
      newErrors.fullName = "Your name must contain letters and spaces only.";
    }

    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email, such as name@example.com.";
    }

    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[0-9]+$/.test(phone)) {
      newErrors.phone = "Your phone number must contain digits only.";
    } else if (phone.length < 4) {
      newErrors.phone = "Please enter at least 4 digits.";
    } else if (
      `${form.countryCode.slice(1)}${phone}`.length > 15
    ) {
      newErrors.phone = "The full number cannot exceed 15 digits.";
    }

    return newErrors;
  }

    function handleSubmit(event) {
  event.preventDefault();

  if (isClosing) return;

  const newErrors = validate();
  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    const firstField = Object.keys(newErrors)[0];
    event.currentTarget.elements.namedItem(firstField)?.focus();
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    navigate("/");
    return;
  }

  setIsClosing(true);

  timerRef.current = setTimeout(() => {
    navigate("/");
  }, 850);
}

  return (
    <main className="contact-page">
      <header className="contact-heading">
        <span className="contact-label">Get in touch</span>
        <h1>
          Contact <span>Us</span>
        </h1>
        <p>Have a question? Send us a note from the pit lane.</p>
      </header>

      <section className="contact-card" aria-labelledby="contact-title">
        <h2 id="contact-title">Let’s talk racing</h2>
        <p className="contact-intro">
          Complete the fields below. All fields are required except the note.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="contact-grid">
            <div className="contact-field">
              <label htmlFor="fullName">Full Name</label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={form.fullName}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
              />

              {errors.fullName && (
                <p className="contact-error" id="fullName-error">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="contact-field">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />

              {errors.email && (
                <p className="contact-error" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="contact-field contact-full">
              <label htmlFor="phone">Phone Number</label>

              <div className="contact-phone">
                <select
                  name="countryCode"
                  aria-label="Country calling code"
                  autoComplete="tel-country-code"
                  value={form.countryCode}
                  onChange={handleChange}
                >
                  {countryCodes.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone ? "phone-error" : undefined
                  }
                />
              </div>

              {errors.phone && (
                <p className="contact-error" id="phone-error">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="contact-field contact-full">
              <label htmlFor="note">
                Note <span className="contact-optional">(optional)</span>
              </label>

              <textarea
                id="note"
                name="note"
                rows={4}
                placeholder="Write your message here..."
                value={form.note}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="contact-actions">
            <button
  type="submit"
  className="contact-submit"
  disabled={isClosing}
>
  <span>{isClosing ? "Finishing…" : "Submit →"}</span>
</button>
          </div>

        </form>
      </section>

      {isClosing && (
  <div className="flags-transition" aria-hidden="true">
    <div className="closing-flag closing-flag-left" />
    <div className="closing-flag closing-flag-right" />
  </div>
)}

    </main>
  );
}

export default ContactUs;