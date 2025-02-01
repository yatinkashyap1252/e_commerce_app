import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-auto bg-black text-white py-6 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: About Us */}
        <div>
          <h3 className="text-lg font-bold mb-3">About Us</h3>
          <p className="text-sm">
            We are committed to delivering the best quality products and
            services. Our mission is to ensure customer satisfaction through
            excellence and innovation.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact Us</h3>
          <p className="text-sm">
            Email:{" "}
            <a href="mailto:support@example.com" className="hover:underline">
              support@example.com
            </a>
          </p>
          <p className="text-sm">
            Phone:{" "}
            <a href="tel:+123456789" className="hover:underline">
              +1 234 567 89
            </a>
          </p>
          <p className="text-sm">Address: 1234 Main St, Anytown, USA</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center border-t border-slate-500 pt-4 mt-6 text-sm">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;