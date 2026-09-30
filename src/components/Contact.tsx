"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    product: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, company, email, phone, country, product, message } = formData;
    
    // Construct WhatsApp message
    const text = `*New Business Enquiry from Website*%0A%0A*Name:* ${name}%0A*Company:* ${company}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Country:* ${country}%0A*Product Requirement:* ${product}%0A%0A*Message:* ${message}`;
    
    // ZAFR WhatsApp Number
    const whatsappNumber = "917012281423";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    
    // Open in new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white text-charcoal relative z-10">
      <div className="container mx-auto px-6 md:px-12 mb-24">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
            Let's Build a Reliable <br /><span className="text-forest">Trade Partnership</span>
          </h2>
          <p className="text-lg text-charcoal/70 leading-relaxed font-sans">
            Tell us what you are looking for. Our team will connect with you regarding product availability, sourcing, and international trade requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <h4 className="text-forest font-bold text-sm tracking-widest uppercase mb-4">Head Office</h4>
              <div className="flex items-start gap-4">
                <MapPin className="text-charcoal/50 mt-1 shrink-0" size={20} />
                <address className="not-italic text-charcoal/80 leading-relaxed">
                  <strong>ZAFR Global Exports</strong><br />
                  43/2684-A2, Suite No. F1<br />
                  Kolathara Road, Rahiman Bazar<br />
                  Kozhikode, Kerala<br />
                  PIN 673655<br />
                  India
                </address>
              </div>
            </div>

            <div>
              <h4 className="text-forest font-bold text-sm tracking-widest uppercase mb-4">Direct Contact</h4>
              <div className="space-y-4">
                <a href="tel:+917012281423" className="flex items-center gap-4 text-charcoal/80 hover:text-forest transition-colors group">
                  <Phone className="text-charcoal/50 group-hover:text-forest transition-colors" size={20} />
                  +91 70122 81423
                </a>
                <a href="mailto:info@zafrglobalexports.com" className="flex items-center gap-4 text-charcoal/80 hover:text-forest transition-colors group">
                  <Mail className="text-charcoal/50 group-hover:text-forest transition-colors" size={20} />
                  info@zafrglobalexports.com
                </a>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-2 bg-[#F5F3E9] p-8 md:p-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-charcoal/60 uppercase tracking-wider font-semibold">Name *</label>
                  <input type="text" id="name" required value={formData.name} onChange={handleChange} className="w-full bg-white border border-charcoal/10 p-3 text-charcoal focus:outline-none focus:border-forest transition-colors" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm text-charcoal/60 uppercase tracking-wider font-semibold">Company</label>
                  <input type="text" id="company" value={formData.company} onChange={handleChange} className="w-full bg-white border border-charcoal/10 p-3 text-charcoal focus:outline-none focus:border-forest transition-colors" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-charcoal/60 uppercase tracking-wider font-semibold">Email *</label>
                  <input type="email" id="email" required value={formData.email} onChange={handleChange} className="w-full bg-white border border-charcoal/10 p-3 text-charcoal focus:outline-none focus:border-forest transition-colors" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm text-charcoal/60 uppercase tracking-wider font-semibold">Phone (WhatsApp) *</label>
                  <input type="tel" id="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-white border border-charcoal/10 p-3 text-charcoal focus:outline-none focus:border-forest transition-colors" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm text-charcoal/60 uppercase tracking-wider font-semibold">Country *</label>
                  <input type="text" id="country" required value={formData.country} onChange={handleChange} className="w-full bg-white border border-charcoal/10 p-3 text-charcoal focus:outline-none focus:border-forest transition-colors" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="product" className="text-sm text-charcoal/60 uppercase tracking-wider font-semibold">Product / Requirement *</label>
                  <input type="text" id="product" required value={formData.product} onChange={handleChange} className="w-full bg-white border border-charcoal/10 p-3 text-charcoal focus:outline-none focus:border-forest transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <label htmlFor="message" className="text-sm text-charcoal/60 uppercase tracking-wider font-semibold">Message & Quantity *</label>
                <textarea id="message" rows={4} required value={formData.message} onChange={handleChange} className="w-full bg-white border border-charcoal/10 p-3 text-charcoal focus:outline-none focus:border-forest transition-colors resize-none"></textarea>
              </div>
              
              <div className="pt-6">
                <button type="submit" className="group flex items-center justify-center gap-3 w-full md:w-auto px-10 py-4 bg-forest text-white font-bold tracking-wide uppercase text-sm hover:bg-forest/90 transition-colors">
                  Send via WhatsApp
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
