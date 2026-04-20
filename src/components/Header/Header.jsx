import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { currencies, useSearch } from "../../context/SearchContext.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Button from "../common/Button.jsx";
import styles from "./Header.module.css";

const languages = ["English (UK)", "English (US)", "Hindi", "Deutsch", "Francais"];
const accountStorageKey = "tripnexus-account";
const accountEventName = "tripnexus-account-change";

function Modal({ title, children, onClose }) {
  return (
    <div className={styles.modalBackdrop} onMouseDown={onClose}>
      <section className={styles.modal} onMouseDown={(event) => event.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close modal">x</button>
        <h2>{title}</h2>
        {children}
      </section>
    </div>
  );
}

export default function Header() {
  const { currency, setCurrency, language, setLanguage } = useSearch();
  const [openMenu, setOpenMenu] = useState(null);
  const [modal, setModal] = useState(null);
  const [signinForm, setSigninForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "" });
  const [account, setAccount] = useState(null);
  const location = useLocation();

  const isCompact = location.pathname !== "/";

  useEffect(() => {
    const savedAccount = window.localStorage.getItem(accountStorageKey);
    if (savedAccount) {
      setAccount(JSON.parse(savedAccount));
    }
  }, []);

  useEffect(() => {
    if (account) {
      window.localStorage.setItem(accountStorageKey, JSON.stringify(account));
      window.dispatchEvent(new CustomEvent(accountEventName, { detail: account }));
    } else {
      window.localStorage.removeItem(accountStorageKey);
      window.dispatchEvent(new CustomEvent(accountEventName, { detail: null }));
    }
  }, [account]);

  const closeMenus = () => {
    setOpenMenu(null);
    setModal(null);
  };

  const createAccountBadge = (name, email) => ({
    name,
    email,
    initials: name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join(""),
  });

  const handleSignin = () => {
    const fallbackName = signinForm.email.split("@")[0] || "Guest User";
    setAccount(createAccountBadge(fallbackName, signinForm.email));
    setSigninForm({ email: "", password: "" });
    closeMenus();
  };

  const handleRegister = () => {
    const name = registerForm.name.trim() || registerForm.email.split("@")[0] || "Guest User";
    setAccount(createAccountBadge(name, registerForm.email));
    setRegisterForm({ name: "", email: "" });
    closeMenus();
  };

  return (
    <header className={`${styles.header} ${isCompact ? styles.compact : ""}`}>
      <div className={styles.inner}>
        <div className={styles.topBar}>
          <Link to="/" className={styles.logo}>TripNexus</Link>
          <div className={styles.actions}>
            <div className={styles.dropdownWrap}>
              <Button variant="ghost" className={styles.headerAction} onClick={() => setOpenMenu(openMenu === "currency" ? null : "currency")}>
                {currency}
              </Button>
              {openMenu === "currency" && (
                <div className={styles.dropdown}>
                  {Object.keys(currencies).map((item) => (
                    <button className={currency === item ? styles.selected : ""} key={item} onClick={() => { setCurrency(item); setOpenMenu(null); }}>
                      <strong>{item}</strong><span>{currencies[item].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.dropdownWrap}>
              <Button variant="ghost" className={styles.headerAction} onClick={() => setOpenMenu(openMenu === "language" ? null : "language")}>
                <span className={styles.globe}></span>{language}
              </Button>
              {openMenu === "language" && (
                <div className={styles.dropdown}>
                  {languages.map((item) => (
                    <button className={language === item ? styles.selected : ""} key={item} onClick={() => { setLanguage(item); setOpenMenu(null); }}>
                      <strong>{item}</strong><span>Interface language</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button variant="ghost" className={styles.propertyButton} onClick={() => setModal("property")}>List your property</Button>
            <Link to="/help-center" className={styles.helpCenterLink} aria-label="Open Help Center">
              <span className={styles.helpCenterBadge}>
                <span className={styles.helpIcon}>?</span>
                <span className={styles.helpLabel}>Help Center</span>
              </span>
            </Link>
            {account ? (
              <div className={styles.dropdownWrap}>
                <button
                  type="button"
                  className={styles.accountButton}
                  onClick={() => setOpenMenu(openMenu === "account" ? null : "account")}
                >
                  <span className={styles.accountAvatar}>{account.initials}</span>
                  <span className={styles.accountMeta}>
                    <strong>{account.name}</strong>
                    <small>{account.email}</small>
                  </span>
                  <span className={styles.accountMore}>...</span>
                </button>
                {openMenu === "account" && (
                  <div className={styles.dropdown}>
                    <button type="button" className={styles.accountMenuItem}>
                      <strong>{account.name}</strong><span>Signed in</span>
                    </button>
                    <button type="button" className={styles.accountMenuItem} onClick={() => setAccount(null)}>
                      <strong>Sign out</strong><span>Switch account</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="secondary" onClick={() => setModal("register")}>Register</Button>
                <Button variant="secondary" onClick={() => setModal("signin")}>Sign in</Button>
              </>
            )}
          </div>
        </div>
        <Navbar />
      </div>

      {modal === "signin" && (
        <Modal title="Sign in" onClose={() => setModal(null)}>
          <form className={styles.form}>
            <input
              placeholder="Email address"
              type="email"
              value={signinForm.email}
              onChange={(event) => setSigninForm((current) => ({ ...current, email: event.target.value }))}
            />
            <input
              placeholder="Password"
              type="password"
              value={signinForm.password}
              onChange={(event) => setSigninForm((current) => ({ ...current, password: event.target.value }))}
            />
            <Button type="button" onClick={handleSignin}>Continue</Button>
          </form>
        </Modal>
      )}
      {modal === "register" && (
        <Modal title="Create your account" onClose={() => setModal(null)}>
          <form className={styles.form}>
            <input
              placeholder="Full name"
              value={registerForm.name}
              onChange={(event) => setRegisterForm((current) => ({ ...current, name: event.target.value }))}
            />
            <input
              placeholder="Email address"
              type="email"
              value={registerForm.email}
              onChange={(event) => setRegisterForm((current) => ({ ...current, email: event.target.value }))}
            />
            <Button type="button" onClick={handleRegister}>Register</Button>
          </form>
        </Modal>
      )}
      {modal === "property" && (
        <Modal title="List your property" onClose={() => setModal(null)}>
          <p className={styles.modalCopy}>Reach millions of travellers with a simple listing flow.</p>
          <form className={styles.form}>
            <input placeholder="Property name" />
            <input placeholder="City" />
            <Button type="button">Start listing</Button>
          </form>
        </Modal>
      )}
    </header>
  );
}
