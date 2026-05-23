import React from "react";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-heading text-lg font-semibold text-background">Nourish</span>
          </div>

          <p className="font-body text-sm text-background/50 text-center">
            © {new Date().getFullYear()} Nourish Nutrition. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="font-body text-xs text-background/50 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-xs text-background/50 hover:text-background transition-colors">
              Terms
            </a>
            <a href="#" className="font-body text-xs text-background/50 hover:text-background transition-colors">
              Medical Disclaimer
            </a>
            <a href="#" className="font-body text-xs text-background/50 hover:text-background transition-colors">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}