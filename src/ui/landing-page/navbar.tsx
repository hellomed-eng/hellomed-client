"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.css";

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const primaryLink = {
    href: "/make-appointment",
    label: "Make an appointment now",
  };
  const navLinks = [
    { href: "/locations", label: "Locations" },
    { href: "/urgent-care", label: "Urgent Care" },
    { href: "/primary-care", label: "Primary Care" },
    { href: "/immigration-medical-exam", label: "Immigration Medical Exam" },
    { href: "/future-employee", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandLogo}>
            <Image src="/logo.png" alt="HELLOMED logo" fill />
          </span>
        </Link>
        <div className={styles.navActions}>
          <div className={styles.navLinksDesktop}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </div>
          <Link href={primaryLink.href} className={styles.navCtaDesktop}>
            {primaryLink.label}
          </Link>
          <button
            className={styles.menuButton}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </button>
        </div>
      </div>
      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <Link
          href={primaryLink.href}
          className={`${styles.mobileLink} ${styles.mobileCta}`}
          onClick={() => setMenuOpen(false)}
        >
          {primaryLink.label}
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
