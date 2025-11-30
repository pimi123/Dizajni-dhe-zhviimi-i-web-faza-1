class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header> 
            <div class="top-bar">
                <div class="left">
                    <span>+383 44 000 000</span>
                    <span>info@bankredmilky.com</span>
                </div>
                <div class="right">
                    <a href="#">Shqip</a>
                    <a href="#">English</a>
                    <a href="login.html">Login</a>
                    <a href="register.html">Regjistrohu</a>
                </div>
            </div>

            <div class="header-main">
                <div class="logo">
                    <a href="index.html">BANKA RED & MILKY</a>
                </div>
                <nav>
                    <ul>
                        <li><a href="index.html">Ballina</a></li>
                        <li><a href="/pages/about.html">Rreth nesh</a></li>
                        <li><a href="services.html">Shërbimet</a></li>
                        <li><a href="contact.html">Kontakti</a></li>
                    </ul>
                </nav>
                <div class="cta">
                    <a href="ebanking.html">e-Banking</a>
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
        link.style.color = "#e4002b"; // The red color used in the site
      }
    });
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer>
            <p>&copy; 2025 Banka Red & Milky. Të gjitha të drejtat e rezervuara.</p>
        </footer>
        `;
  }
}

customElements.define("special-header", SpecialHeader);
customElements.define("special-footer", SpecialFooter);
