import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TickerTape } from "./ticker-tape";
// import CryptoTicker from "./crypto-ticker";

export function Footer() {
  return (
    <footer className="bg-[#20446F] py-10">
      {/* <CryptoTicker /> */}
      <TickerTape />
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link
              href="/"
              className="text-[#DFEAF8] font-bold text-2xl mb-6 block"
            >
              CRYPTO<span className="text-[#186CCC]">FLOW</span>
            </Link>
            <p className="text-[#849EC0] text-sm">
              Transforming the way cryptocurrency is accessed.
            </p>
          </div>

          <div>
            <h4 className="text-[#DFEAF8] font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-[#849EC0] hover:text-[#DFEAF8] transition-colors text-sm"
                >
                  Bitcoin
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#849EC0] hover:text-[#DFEAF8] transition-colors text-sm"
                >
                  Alt Coins
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#849EC0] hover:text-[#DFEAF8] transition-colors text-sm"
                >
                  NFTs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#DFEAF8] font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-[#849EC0] hover:text-[#DFEAF8] transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#849EC0] hover:text-[#DFEAF8] transition-colors text-sm"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#849EC0] hover:text-[#DFEAF8] transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#DFEAF8] font-semibold mb-4">Newsletter</h4>
            <p className="text-[#849EC0] text-sm mb-4">
              Subscribe to our newsletter for updates
            </p>
            <Button className="w-full bg-[#186CCC] text-[#DFEAF8] hover:bg-[#186CCC]/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
