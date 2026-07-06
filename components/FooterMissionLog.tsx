import Link from "next/link";

const footerLinks = [
  { href: "#hero", label: "Mission" },
  { href: "#catalogue", label: "Catalogue" },
  { href: "#", label: "Archive" },
];

const socialLinks = [
  { href: "#", label: "X" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "GitHub" },
];

export function FooterMissionLog() {
  return (
    <footer id="mission-log" className="section-gap border-t border-hairline-700">
      <div className="shell-container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <p className="text-label text-text-500">Mission Log</p>
            <p className="mt-3 font-display text-display-l text-text-100">META PLANET</p>
          </div>

          <div className="grid gap-6 md:col-span-7 md:grid-cols-2">
            <div className="grid gap-3">
              {footerLinks.map((link) => (
                <Link key={link.label} className="focus-ring text-body-m text-text-100" href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="grid gap-3">
              {socialLinks.map((link) => (
                <Link key={link.label} className="focus-ring text-body-m text-text-100" href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-hairline-700 pt-6 font-mono text-label text-text-500">
          TRANSMISSION ENDS · © 2026
        </p>
      </div>
    </footer>
  );
}
