import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal pt-24 pb-8 border-t border-white/5 relative z-10 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-1">
            <Link href="#home" className="flex items-center mb-6">
              <Image 
                src="/logo-exact.png" 
                alt="ZAFR Global Exports" 
                width={260} 
                height={80} 
                className="h-14 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-white/60 text-sm max-w-sm font-medium">
              Rooted in Quality. Trusted Worldwide. Value Delivered.
            </p>
          </div>

          <div>
            <h4 className="text-forest font-bold font-sans mb-6 uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'About', 'Products', 'Process', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-white/70 hover:text-forest transition-colors text-sm font-semibold uppercase tracking-wide"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-forest font-bold font-sans mb-6 uppercase tracking-widest text-sm">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="tel:+917012281423" className="flex items-start gap-3 text-white/70 hover:text-forest transition-colors text-sm font-semibold group">
                  <Phone size={16} className="mt-0.5 group-hover:text-forest" />
                  +91 70122 81423
                </a>
              </li>
              <li>
                <a href="mailto:info@zafrglobalexports.com" className="flex items-start gap-3 text-white/70 hover:text-forest transition-colors text-sm font-semibold group">
                  <Mail size={16} className="mt-0.5 group-hover:text-forest" />
                  info@zafrglobalexports.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-forest font-bold font-sans mb-6 uppercase tracking-widest text-sm">Head Office</h4>
            <div className="flex items-start gap-3 text-white/70 text-sm font-medium">
              <MapPin size={16} className="mt-1 shrink-0 text-forest" />
              <address className="not-italic leading-relaxed">
                43/2684-A2, Suite No. F1,<br />
                Kolathara Road, Rahiman Bazar,<br />
                Kozhikode, Kerala - 673655,<br />
                India
              </address>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs font-semibold tracking-widest uppercase">
            © {new Date().getFullYear()} ZAFR Global Exports. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
