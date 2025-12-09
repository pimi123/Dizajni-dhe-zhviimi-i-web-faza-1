
     
     
     (function () {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.setAttribute('autocomplete', 'off');
        const inputs = Array.from(form.querySelectorAll('input, textarea, select'));
        inputs.forEach(i => {
          i.setAttribute('autocomplete', 'off');
          i.setAttribute('autocorrect', 'off');
          i.setAttribute('autocapitalize', 'off');
          i.setAttribute('spellcheck', 'false');
        });

        const phone = form.querySelector('[name="phone"]');
        if (phone) {
          phone.addEventListener('keydown', function (e) {
            const allowedControl = ['Backspace','Tab','Enter','Escape','Delete','Home','End','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];
            if (allowedControl.includes(e.key)) return;
            if (e.ctrlKey || e.metaKey) return;
            const key = e.key;
            const isDigit = key >= '0' && key <= '9';
            const allowed = ['+', '-', '(', ')', ' '];
            if (isDigit || allowed.includes(key)) return;
            e.preventDefault();
          });

          phone.addEventListener('input', function () {
            const cleaned = this.value.replace(/[^0-9+\-\(\)\s]/g, '');
            if (this.value !== cleaned) this.value = cleaned;
          });

          phone.addEventListener('paste', function (e) {
            e.preventDefault();
            const paste = (e.clipboardData || window.clipboardData).getData('text') || '';
            const cleaned = paste.replace(/[^0-9+\-\(\)\s]/g, '');
            const start = this.selectionStart || 0;
            const end = this.selectionEnd || 0;
            const newVal = this.value.slice(0, start) + cleaned + this.value.slice(end);
            this.value = newVal.replace(/[^0-9+\-\(\)\s]/g, '');
            const pos = start + cleaned.length;
            this.setSelectionRange(pos, pos);
          });
        }

        form.addEventListener('submit', function (ev) {
          ev.preventDefault();

          inputs.forEach(i => i.setCustomValidity(''));
          const confirmEl = document.getElementById('contactConfirm');

          const name = (form.querySelector('[name="name"]').value || '').trim();
          const email = (form.querySelector('[name="email"]').value || '').trim();
          const phoneVal = (phone ? phone.value : '').trim();

          if (!name || name.length < 2) {
            form.querySelector('[name="name"]').setCustomValidity('Shkruani emrin (min 2 karaktere).');
          }
          if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            form.querySelector('[name="email"]').setCustomValidity('Shkruani një email të vlefshëm.');
          }
          if (phoneVal) {
            const digits = phoneVal.replace(/\D/g, '');
            if (digits.length < 7 || digits.length > 15) {
              phone.setCustomValidity('Shkruani 7–15 shifra të vlefshme për numrin.');
            }
          }

          if (!form.reportValidity()) return;

          if (confirmEl) {
            confirmEl.hidden = false;
            confirmEl.textContent = 'Faleminderit — mesazhi juaj u dërgua. Ne do t\'ju kontaktojmë së shpejti.';
       
          }
        });
      })();