(function(){
  const modal = document.getElementById('serviceModal');
  const form = document.getElementById('serviceModalForm');
  const title = document.getElementById('serviceModalTitle');
  const desc = document.getElementById('serviceModalDesc');
  const modalService = document.getElementById('modalService');
  const confirmEl = document.getElementById('serviceConfirm');
  const accountType = document.getElementById('modalAccountType');
  const loanFields = document.getElementById('loanFields');
  const consultFields = document.getElementById('consultFields');
  const companyInput = form ? form.querySelector('input[name="company"]') : null;
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  const serviceMeta = {
    "Llogari Rrjedhëse": { desc: "Krijoni llogari të re me kartë dhe akses online.", showAccountType:true, submitText: "Krijo llogari" },
    "Kredi Personale":   { desc: "Aplikoni për kredi personale.<br/>Shkruani shumën dhe kohëzgjatjen.", showLoan:true, submitText: "Apliko për kredi" },
    "Kartela Bankare":   { desc: "Porosit kartelë debit/kredit. Zgjidhni tipin në mesazh nëse keni preferencë.", submitText: "Porosit kartelë" },
    "Shërbime për Biznese": { desc: "Shërbime korporative dhe financim. Plotësoni emrin e kompanisë.", showCompany:true, submitText: "Kontakt për biznes" },
    "e-Banking":         { desc: "Aktivizoni e-Banking; vendosni email/telefon dhe mesazh për ndihmë.", submitText: "Aktivizo e-Banking" },
    "Konsultim Financiar": { desc: "Rezervoni takim me një këshilltar (zgjidhni datën dhe kohën).", showConsult:true, submitText: "Rezervo takim" }
  };

  function resetModalFields(){
    if(accountType) accountType.hidden = true;
    if(loanFields) loanFields.hidden = true;
    if(consultFields) consultFields.hidden = true;
    if(companyInput) companyInput.hidden = true;

    // clear 'required' for all possible conditional inputs
    const conditionalNames = ['loanAmount','loanTerm','date','time','company','accountType'];
    conditionalNames.forEach(name=>{
      const el = form.querySelector(`[name="${name}"]`);
      if(el) el.required = false;
    });

    // ensure form visible and confirmation hidden
    form.hidden = false;
    if(confirmEl) confirmEl.hidden = true;
  }

  document.body.addEventListener('click', function(e){
    const btn = e.target.closest && e.target.closest('.open-service-btn');
    if(!btn) return;
    const svc = btn.getAttribute('data-service') || 'Shërbim';
    openModalFor(svc);
  });

  function openModalFor(serviceName){
    if(!modal || !form) return;
    const meta = serviceMeta[serviceName] || {};
    title.textContent = serviceName;
    desc.innerHTML = meta.desc || '';
    modalService.value = serviceName;

    resetModalFields();

    if(meta.showAccountType && accountType){ accountType.hidden = false; accountType.required = true; }
    if(meta.showLoan && loanFields){
      loanFields.hidden = false;
      const la = loanFields.querySelector('[name="loanAmount"]');
      const lt = loanFields.querySelector('[name="loanTerm"]');
      if(la) la.required = true;
      if(lt) lt.required = true;
    }
    if(meta.showConsult && consultFields){
      consultFields.hidden = false;
      const d = consultFields.querySelector('[name="date"]');
      const t = consultFields.querySelector('[name="time"]');
      if(d) d.required = true;
      if(t) t.required = true;
    }
    if(meta.showCompany && companyInput){ companyInput.hidden = false; companyInput.required = true; }

    // custom submit button text if provided
    if(submitBtn && meta.submitText) submitBtn.textContent = meta.submitText;

    // reset values and show modal
    form.reset();
    modal.classList.add('show');
    const first = form.querySelector('input[name="name"]');
    if(first) first.focus();
  }

  document.addEventListener('click', function(e){
    if(e.target.closest && e.target.closest('[data-close]')) {
      if(modal) modal.classList.remove('show');
    }
  });

  if(form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      const fd = new FormData(form);
      const payloadService = fd.get('service') || 'Shërbim';
      form.hidden = true;
      if(confirmEl){
        confirmEl.textContent = `Faleminderit. Kërkesa juaj për "${payloadService}" u regjistrua. Ne do t'ju kontaktojmë.`;
        confirmEl.hidden = false;
      }
    });
  }
})();