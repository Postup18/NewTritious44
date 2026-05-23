import React from "react";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">


          <p className="font-body text-sm text-background/50 text-center">
            © {new Date().getFullYear()} NewTritious. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="font-body text-xs text-background/50 hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <a href="#" className="font-body text-xs text-background/50 hover:text-background transition-colors">
              Terms
            </a>
            <Link to="/medical-disclaimer" className="font-body text-xs text-background/50 hover:text-background transition-colors">
              Medical Disclaimer
            </Link>
            <Link to="/refund-policy" className="font-body text-xs text-background/50 hover:text-background transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}