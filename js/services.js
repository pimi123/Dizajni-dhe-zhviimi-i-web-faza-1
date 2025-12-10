(function () {
  const modal = document.getElementById("serviceModal");
  const form = document.getElementById("serviceModalForm");
  const title = document.getElementById("serviceModalTitle");
  const desc = document.getElementById("serviceModalDesc");
  const modalService = document.getElementById("modalService");
  const confirmEl = document.getElementById("serviceConfirm");
  const accountType = document.getElementById("modalAccountType");
  const loanFields = document.getElementById("loanFields");
  const consultFields = document.getElementById("consultFields");
  const companyInput = form
    ? form.querySelector('input[name="company"]')
    : null;
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  const serviceMeta = {
    "Llogari Rrjedhëse": {
      desc: "Krijoni llogari të re me kartë dhe akses online.",
      showAccountType: true,
      submitText: "Krijo llogari",
    },
    "Kredi Personale": {
      desc: "Aplikoni për kredi personale.<br/>Shkruani shumën dhe kohëzgjatjen.",
      showLoan: true,
      submitText: "Apliko për kredi",
    },
    "Kartela Bankare": {
      desc: "Porosit kartelë debit/kredit. Zgjidhni tipin në mesazh nëse keni preferencë.",
      submitText: "Porosit kartelë",
    },
    "Shërbime për Biznese": {
      desc: "Shërbime korporative dhe financim. Plotësoni emrin e kompanisë.",
      showCompany: true,
      submitText: "Kontakt për biznes",
    },
    "e-Banking": {
      desc: "Aktivizoni e-Banking; vendosni email/telefon dhe mesazh për ndihmë.",
      submitText: "Aktivizo e-Banking",
    },
    "Konsultim Financiar": {
      desc: "Rezervoni takim me një këshilltar (zgjidhni datën dhe kohën).",
      showConsult: true,
      submitText: "Rezervo takim",
    },
  };

  function resetModalFields() {
    if (accountType) accountType.hidden = true;
    if (loanFields) loanFields.hidden = true;
    if (consultFields) consultFields.hidden = true;
    if (companyInput) companyInput.hidden = true;

    const conditionalNames = [
      "loanAmount",
      "loanTerm",
      "date",
      "time",
      "company",
      "accountType",
    ];
    conditionalNames.forEach((name) => {
      const el = form.querySelector(`[name="${name}"]`);
      if (el) el.required = false;
    });

    form.hidden = false;
    if (confirmEl) confirmEl.hidden = true;
  }

  document.body.addEventListener("click", function (e) {
    const btn = e.target.closest && e.target.closest(".open-service-btn");
    if (!btn) return;
    const svc = btn.getAttribute("data-service") || "Shërbim";
    openModalFor(svc);
  });

  function openModalFor(serviceName) {
    if (!modal || !form) return;
    const meta = serviceMeta[serviceName] || {};
    title.textContent = serviceName;
    desc.innerHTML = meta.desc || "";
    modalService.value = serviceName;

    resetModalFields();

    if (meta.showAccountType && accountType) {
      accountType.hidden = false;
      accountType.required = true;
    }
    if (meta.showLoan && loanFields) {
      loanFields.hidden = false;
      const la = loanFields.querySelector('[name="loanAmount"]');
      const lt = loanFields.querySelector('[name="loanTerm"]');
      if (la) la.required = true;
      if (lt) lt.required = true;
    }
    if (meta.showConsult && consultFields) {
      consultFields.hidden = false;
      const d = consultFields.querySelector('[name="date"]');
      const t = consultFields.querySelector('[name="time"]');
      if (d) d.required = true;
      if (t) t.required = true;
    }
    if (meta.showCompany && companyInput) {
      companyInput.hidden = false;
      companyInput.required = true;
    }

    if (submitBtn && meta.submitText) submitBtn.textContent = meta.submitText;

    form.reset();
    modal.classList.add("show");
    const first = form.querySelector('input[name="name"]');
    if (first) first.focus();
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("[data-close]")) {
      if (modal) modal.classList.remove("show");
    }
  });

  function allowControlKey(e) {
    const allowed = [8, 9, 13, 27, 46, 35, 36, 37, 38, 39, 40];
//  8 = Backspace
//  9 = Tab
// 13 = Enter
// 27 = Escape
// 46 = Delete
// 35 = End
// 36 = Home 
// 37 = ArrowLeft
// 38 = ArrowUp
// 39 = ArrowRight
// 40 = ArrowDown
    if (allowed.indexOf(e.keyCode) !== -1) return true;
    if (e.ctrlKey || e.metaKey) return true;
    return false;
  }

  function attachIntegerOnly(el) {
    if (!el) return;
    el.setAttribute("inputmode", "numeric");
    el.setAttribute("pattern", "\\d*");
    el.addEventListener("keydown", function (e) {
      if (allowControlKey(e)) return;
      const isDigit = (e.key >= "0" && e.key <= "9");
      if (!isDigit) e.preventDefault();
    });
    el.addEventListener("input", function () {
      const cleaned = this.value.replace(/[^\d]/g, "");
      if (this.value !== cleaned) this.value = cleaned;
    });
    el.addEventListener("paste", function (e) {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData("text");
      const cleaned = paste.replace(/[^\d]/g, "");
      const start = this.selectionStart || 0;
      const end = this.selectionEnd || 0;
      const newVal = this.value.slice(0, start) + cleaned + this.value.slice(end);
      this.value = newVal.replace(/[^\d]/g, "");
      const pos = start + cleaned.length;
      this.setSelectionRange(pos, pos);
    });
  }

  function attachDecimalOnly(el) {
    if (!el) return;
    el.setAttribute("inputmode", "decimal");
    el.setAttribute("pattern", "^\\d*\\.?\\d*$");
    el.addEventListener("keydown", function (e) {
      if (allowControlKey(e)) return;
      const key = e.key;
      const isDigit = key >= "0" && key <= "9";
      const isDot = key === ".";
      if (isDigit) return;
      if (isDot) {
        if (this.value.indexOf(".") === -1) return;
      }
      e.preventDefault();
    });
    el.addEventListener("input", function () {
      let v = this.value.replace(/[^0-9.]/g, "");
      const parts = v.split(".");
      if (parts.length > 1) {
        v = parts.shift() + "." + parts.join("");
      }
      if (this.value !== v) this.value = v;
    });
    el.addEventListener("paste", function (e) {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData("text");
      let cleaned = paste.replace(/[^0-9.]/g, "");
      const parts = cleaned.split(".");
      if (parts.length > 1) cleaned = parts.shift() + "." + parts.join("");
      const start = this.selectionStart || 0;
      const end = this.selectionEnd || 0;
      const newVal = this.value.slice(0, start) + cleaned + this.value.slice(end);
      let final = newVal.replace(/[^0-9.]/g, "");
      const finalParts = final.split(".");
      if (finalParts.length > 1) final = finalParts.shift() + "." + finalParts.join("");
      this.value = final;
      const pos = start + (cleaned ? cleaned.length : 0);
      this.setSelectionRange(pos, pos);
    });
  }

  function attachPhoneInput(el) {
    if (!el) return;
    el.setAttribute("inputmode", "tel");
    el.setAttribute("pattern", "[0-9+()\\-\\s]*");
    el.addEventListener("keydown", function (e) {
      if (allowControlKey(e)) return;
      const key = e.key;
      const isDigit = key >= "0" && key <= "9";
      const allowedChars = ["+", "-", "(", ")", " "];
      if (isDigit) return;
      if (allowedChars.indexOf(key) !== -1) return;
      e.preventDefault();
    });
    el.addEventListener("input", function () {
      const cleaned = this.value.replace(/[^0-9+\-\(\)\s]/g, "");
      if (this.value !== cleaned) this.value = cleaned;
    });
    el.addEventListener("paste", function (e) {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData("text");
      const cleaned = paste.replace(/[^0-9+\-\(\)\s]/g, "");
      const start = this.selectionStart || 0;
      const end = this.selectionEnd || 0;
      const newVal = this.value.slice(0, start) + cleaned + this.value.slice(end);
      this.value = newVal.replace(/[^0-9+\-\(\)\s]/g, "");
      const pos = start + cleaned.length;
      this.setSelectionRange(pos, pos);
    });
  }

  function initEnforcement() {
    if (!form) return;
    const loanAmountEl = form.querySelector('[name="loanAmount"]');
    const loanTermEl = form.querySelector('[name="loanTerm"]');
    const phoneEl = form.querySelector('[name="phone"]');
    attachDecimalOnly(loanAmountEl);
    attachIntegerOnly(loanTermEl);
    attachPhoneInput(phoneEl);
  }

  initEnforcement();

  function isEmail(v) {
    if (!v) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function isPhoneValid(v) {
    if (!v) return false;
    const digits = v.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }

  function isPositiveNumberString(v) {
    if (!v) return false;
    const n = Number(v);
    return !Number.isNaN(n) && n > 0;
  }

  function isIntegerString(v) {
    if (!v) return false;
    return /^\d+$/.test(v);
  }

  function isFutureDateTime(dateStr, timeStr) {
    if (!dateStr) return false;
    const timePart = timeStr || "00:00";
    const dt = new Date(dateStr + "T" + timePart);
    if (isNaN(dt.getTime())) return false;
    return dt.getTime() > Date.now();
  }

  function clearValidity(el) {
    if (!el) return;
    el.setCustomValidity("");
  }

  if (form) {
    form.setAttribute('autocomplete', 'off');

    const disableSuggestAttrs = ['autocomplete','autocorrect','autocapitalize','spellcheck'];
    const inputs = Array.from(form.querySelectorAll('input, textarea, select'));
    inputs.forEach((inp) => {
      inp.setAttribute('autocomplete', 'off');
      inp.setAttribute('autocorrect', 'off');
      inp.setAttribute('autocapitalize', 'off');
      inp.setAttribute('spellcheck', 'false');
    });

    const phone = form.querySelector('[name="phone"]');
    if (phone) {
      phone.setAttribute('autocomplete', 'off');
      phone.setAttribute('inputmode', 'tel');
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();

      const allInputs = Array.from(form.querySelectorAll("input, textarea, select"));
      allInputs.forEach(clearValidity);

      let ok = true;

      const nameEl = form.querySelector('[name="name"]');
      if (nameEl) {
        const v = (nameEl.value || "").trim();
        if (!v || v.length < 2) {
          nameEl.setCustomValidity("Shkruani emrin tuaj të plotë (min 2 karaktere).");
          ok = false;
        }
      }

      const emailEl = form.querySelector('[name="email"]');
      if (emailEl) {
        const v = (emailEl.value || "").trim();
        if (v && !isEmail(v)) {
          emailEl.setCustomValidity("Shkruani një email të vlefshëm.");
          ok = false;
        }
      }

      const phoneEl = form.querySelector('[name="phone"]');
      if (phoneEl) {
        const v = (phoneEl.value || "").trim();
        if (v && !isPhoneValid(v)) {
          phoneEl.setCustomValidity("Shkruani një numër telefoni të vlefshëm (7-15 shifra).");
          ok = false;
        }
      }

      const acctEl = form.querySelector('[name="accountType"]');
      if (acctEl && !acctEl.hidden) {
        const v = (acctEl.value || "").trim();
        if (!v) {
          acctEl.setCustomValidity("Zgjidhni llojin e llogarisë.");
          ok = false;
        }
      }

      const loanAmountEl = form.querySelector('[name="loanAmount"]');
      const loanTermEl = form.querySelector('[name="loanTerm"]');
      if (loanAmountEl && !loanAmountEl.hidden) {
        const v = (loanAmountEl.value || "").trim();
        if (!isPositiveNumberString(v)) {
          loanAmountEl.setCustomValidity("Shkruani një shumë kredie të vlefshme (>0).");
          ok = false;
        } else {
          const n = Number(v);
          if (n < 50) {
            loanAmountEl.setCustomValidity("Shuma minimale e kredive është 50.");
            ok = false;
          }
        }
      }
      if (loanTermEl && !loanTermEl.hidden) {
        const v = (loanTermEl.value || "").trim();
        if (!isIntegerString(v) || Number(v) <= 0) {
          loanTermEl.setCustomValidity("Shkruani kohëzgjatje të vlefshme në muaj (numër > 0).");
          ok = false;
        }
      }

      const dateEl = form.querySelector('[name="date"]');
      const timeEl = form.querySelector('[name="time"]');
      if (dateEl && !dateEl.hidden) {
        const d = (dateEl.value || "").trim();
        const t = timeEl ? (timeEl.value || "").trim() : "";
        if (!isFutureDateTime(d, t)) {
          dateEl.setCustomValidity("Zgjidhni datë dhe kohë në të ardhmen.");
          ok = false;
        }
      }

      if (companyInput && !companyInput.hidden) {
        const v = (companyInput.value || "").trim();
        if (!v || v.length < 2) {
          companyInput.setCustomValidity("Shkruani emrin e kompanisë (min 2 karaktere).");
          ok = false;
        }
      }

      const msgEl = form.querySelector('[name="message"], textarea[name="message"]');
      if (msgEl) {
        const v = (msgEl.value || "").trim();
        if (v.length > 1000) {
          msgEl.setCustomValidity("Mesazhi është shumë i gjatë (max 1000 karaktere).");
          ok = false;
        }
      }

      if (!ok) {
        form.reportValidity();
        return;
      }

      const fd = new FormData(form);
      const payloadService = fd.get("service") || "Shërbim";
      form.hidden = true;
      if (confirmEl) {
        confirmEl.textContent = `Faleminderit. Kërkesa juaj për "${payloadService}" u regjistrua. Ne do t'ju kontaktojmë.`;
        confirmEl.hidden = false;
      }
    });
  }
})();
