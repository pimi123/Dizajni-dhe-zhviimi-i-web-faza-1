class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header> 
            <div class="header-main ">
                <div class="logo">
                    <a href="index.html">BANKA RED & MILKY</a>
                </div>
                <nav>
                    <ul>
                        <li><a href="index.html">Ballina</a></li>
                        <li><a href="about.html">Rreth nesh</a></li>
                        <li><a href="services.html">Shërbimet</a></li>
                        <li><a href="contact.html">Kontakti</a></li>
                    </ul>
                </nav>
                <div class="cta">
                <div>
                <a href="./login.html" class="profile-pic" > <img src="../images/profile.png" class="profile-pic" /></a>
                </div>
                <a href="ebanking.html" class="ebanking-link">e-Banking</a>
                </div>
            </div>
        </header>
        `;

    this.highlightActiveLink();
  }

  highlightActiveLink() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const links = this.querySelectorAll("nav a");

    links.forEach((link) => {
      const linkPage = link.getAttribute("href");
      if (linkPage === currentPage) {
        link.style.color = " #D4A017"; 
      }
    });
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer class="site-footer">
          <div class="footer-top">
            <div class="brand">
              <span class="brand-name">Banka Red & Milky</span>
              <span class="mascot" title="Milo the penguin">🐧</span>
            </div>
            <div class="fun-cta">Got questions? Say hi to Milo — he loves helping! 💬</div>
          </div>

          <div class="footer-grid">
            <div class="footer-col">
              <h4>About</h4>
              <p>We make banking simple and a little bit playful — safe, fast, and friendly.</p>
            </div>

            <div class="footer-col">
              <h4>Quick Links</h4>
              <ul class="footer-links">
                <li><a href="index.html">Ballina</a></li>
                <li><a href="about.html">Rreth nesh</a></li>
                <li><a href="services.html">Shërbimet</a></li>
                <li><a href="contact.html">Kontakti</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Stay in the loop</h4>
              <form id="newsletter-form" class="newsletter-form">
                <input id="newsletter-email" type="email" placeholder="Your email" required />
                <button type="submit">Join ✨</button>
              </form>
              <div id="newsletter-msg" class="newsletter-msg" aria-live="polite"></div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="social-icons" aria-label="social links">
              <a href="#" class="si" title="Facebook">👍</a>
              <a href="#" class="si" title="Twitter">🐦</a>
              <a href="#" class="si" title="Instagram">📸</a>
            </div>
            <p class="copyright">&copy; ${new Date().getFullYear()} Banka Red & Milky • Made with ❤️ and ☕</p>
          </div>
        </footer>
        `;

    // Newsletter form behaviour: show a friendly message and a little emoji burst
    const form = this.querySelector("#newsletter-form");
    const emailInput = this.querySelector("#newsletter-email");
    const msg = this.querySelector("#newsletter-msg");

    if (form && emailInput && msg) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (!email) return;
        const name = email.split("@")[0];
        msg.textContent = `Faleminderit, ${name}! You’re on the list 🎉`;
        emailInput.value = "";

        const burst = document.createElement("div");
        burst.className = "emoji-burst";
        burst.textContent = "🎉✨";
        this.appendChild(burst);
        setTimeout(() => burst.remove(), 1500);
      });
    }

    // simple hover/click sparkle on social icons
    const socials = this.querySelectorAll(".social-icons .si");
    socials.forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        el.classList.add("si-pop");
        setTimeout(() => el.classList.remove("si-pop"), 600);
      });
    });
  }
}

customElements.define("special-header", SpecialHeader);
customElements.define("special-footer", SpecialFooter);
