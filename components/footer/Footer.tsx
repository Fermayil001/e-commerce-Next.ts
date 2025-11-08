export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#2d5a3d] text-[#f5f3f0] py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold mb-4">LOTSIA</h3>
            <p className="text-sm opacity-80">Tasarlanmış L&T tarafından. Lüks ve elegans yaşamın sembolü.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Ürünlerimiz
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  İletişim
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Müşteri Hizmetleri</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Sık Sorulan Sorular
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Kargo Takibi
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  İade Politikası
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Gizlilik Politikası
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">İletişim</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Email: info@lotsia.com</li>
              <li>Telefon: +90 (555) 123-4567</li>
              <li>Adres: İstanbul, Türkiye</li>
              <li className="pt-2 flex gap-3">
                <a href="#" className="hover:opacity-100 transition">
                  Instagram
                </a>
                <a href="#" className="hover:opacity-100 transition">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#c9a961] opacity-30 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left">
          <p className="opacity-80">© {currentYear} LOTSIA. Tüm hakları saklıdır.</p>
          <p className="opacity-80 text-xs">Designed with elegance by L&T</p>
        </div>
      </div>
    </footer>
  )
}
