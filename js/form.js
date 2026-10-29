(function () {
  const form = document.querySelector(".lead-form");
  const display = document.getElementById("captcha-display");
  const refreshBtn = document.querySelector(".captcha-row__refresh");

  function randomCaptcha() {
    return String(Math.floor(1000 + Math.random() * 9000));
  }

  function setCaptcha(value) {
    if (display) display.textContent = value;
    if (form) form.dataset.expectedCaptcha = value;
  }

  function validateLead(fd) {
    const mobile = (fd.get("mobile") || "").toString();
    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }

    if (!fd.get("consent")) {
      alert("Please accept the terms to continue.");
      return false;
    }

    return true;
  }

  setCaptcha(display?.textContent?.trim() || "1514");

  refreshBtn?.addEventListener("click", () => setCaptcha(randomCaptcha()));

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const captcha = (fd.get("captcha") || "").toString().trim();

    if (captcha !== form.dataset.expectedCaptcha) {
      alert("Captcha does not match. Please try again.");
      setCaptcha(randomCaptcha());
      return;
    }

    if (!validateLead(fd)) return;

    console.log("Lead submitted", Object.fromEntries(fd));
    alert("Thank you! We will contact you shortly.");
    form.reset();
    setCaptcha(randomCaptcha());
  });

  document.querySelectorAll(".membership-form").forEach((membershipForm) => {
    membershipForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(membershipForm);
      if (!validateLead(fd)) return;

      console.log("Membership lead submitted", Object.fromEntries(fd));
      alert("Thank you! We will contact you shortly.");
      membershipForm.reset();
    });
  });

  document.querySelectorAll('a[href="#consultation-form"]').forEach((link) => {
    link.addEventListener("click", (ev) => {
      const target = document.getElementById("consultation-form");
      if (target) {
        ev.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
