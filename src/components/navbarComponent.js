class NavbarCustom extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initializeBootstrap();
  }

  render() {
    this.innerHTML = `
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid px-lg-5">
              <a href="#" class="navbar-brand">
                <img class="w-50" src="./image/logo.png" alt="...">
              </a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse flex-grow-0" id="navbarNav">
                <ul class="navbar-nav gap-4">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="cuaca.html">Cuaca</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="detail-bencana.html">Bencana alam</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="donasi.html">Donasi</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="aboutus.html">About Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        `;
  }

  initializeBootstrap() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
    script.defer = true;
    this.appendChild(script);
  }
}

customElements.define('navbar-custom', NavbarCustom);
