import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-csblack text-[#f5f3f0] py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold mb-4">LOTOSIA</h3>
            <p className="text-sm opacity-80">L&T tərəfindən dizayn edilib. Lüks və zərifliyin simvolu.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Keçid et</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Məhsullar
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Haqqımızda
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Əlaqə
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Müşteri Hizmetleri</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faqs" className="opacity-80 hover:opacity-100 transition">
                  FAQs
                </Link>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Məxfiyyət siyasəti
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Təklif və şikayətlər
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Əlaqə</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Email: info@lotsia.com</li>
              <li>Telefon: +90 (555) 123-4567</li>
              <li>Adres: xxx, xxx</li>
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
