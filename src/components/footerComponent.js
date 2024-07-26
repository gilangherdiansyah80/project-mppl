class footerCustom extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <footer class="mt-5 py-5 color1 text-white">
            <div class="container">
            <div class="row">
                <div class="footer-text col-md-5 text-center text-md-start">
                    <h3 class="fw-bold">EcoSync</h3><br>
                    <p class="mt-3">Dengan fokus pada keberlanjutan dan inovasi, EcoSync memberikan pemahaman yang
                        mendalam kepada pengguna tentang tantangan lingkungan saat ini. Platform ini tidak hanya
                        menggabungkan data, tetapi juga menyediakan solusi praktis untuk perbaikan ekosistem dan
                        pemantauan cuaca.
                    </p>
                </div>
                <div class="footer-text  col-md-3 offset-md-2">
                    <h5 class="text-center text-md-start">Contact</h5><br>
                    <div class="contact">
                        <div class="contact-details d-flex flex-column gap-1">
                            <div class="d-flex gap-3">
                                <i class="fa fa-envelope" style="font-size:24px;"></i>
                                <p>ecosync@gmail.com</p>
                            </div>
                            <div class="d-flex gap-3">
                                <i class="fa fa-phone" style="font-size:24px"></i>
                                <p>+62855648139</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-text col-md-2">
                    <h5 class="text-center text-md-start">Social Media</h5><br>
                    <div class="contact">
                        <div class="contact-details d-flex flex-column gap-1">
                            <div class="d-flex gap-3">
                                <i class="fa fa-instagram" style="color: white; font-size:24px;"></i>
                                <p>ecosync_official</p>
                            </div>
                            <div class="d-flex gap-3">
                                <i class="fa fa-whatsapp" style="color: white; font-size:24px"></i>
                                <p>+62855648139</p>
                            </div>
                            <div class="d-flex gap-3">
                                <i class="fa fa-youtube" style="color: white; font-size:24px"></i>
                                <p>EcoSync_Official</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="bg-white">
            <div class="row">
                <!-- copyright -->
                <div class="text-white footer-text">
                    <p>&copy; 2021 EcoSync. All rights reserved.</p>
                </div>
            </div>
    </footer>
        `;
  }
}

customElements.define('footer-custom', footerCustom);
