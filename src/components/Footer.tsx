import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Vehicles",
      links: [
        "Model S",
        "Model 3",
        "Model X",
        "Model Y",
        "Cybertruck",
        "Roadster"
      ]
    },
    {
      title: "Energy",
      links: [
        "Solar Panels",
        "Solar Roof",
        "Powerwall",
        "Megapack",
        "Commercial"
      ]
    },
    {
      title: "Charging",
      links: [
        "Charging",
        "Supercharger",
        "Destination Charging",
        "Mobile Charging"
      ]
    },
    {
      title: "Discover",
      links: [
        "Demo Drive",
        "Insurance",
        "Fleet",
        "Commercial Energy",
        "Utilities"
      ]
    },
    {
      title: "Support",
      links: [
        "Help",
        "Vehicle Guides",
        "Contact",
        "Service",
        "Careers"
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={section.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="font-semibold mb-4 text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground tesla-transition-fast"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo and Copyright */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="text-2xl font-bold">TESLA</div>
              <div className="text-sm text-primary-foreground/60">
                © 2024 Tesla, Inc. All rights reserved.
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent tesla-transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-primary-foreground tesla-transition-fast">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-foreground tesla-transition-fast">
                Terms of Use
              </a>
              <a href="#" className="hover:text-primary-foreground tesla-transition-fast">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-primary-foreground tesla-transition-fast">
                Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;