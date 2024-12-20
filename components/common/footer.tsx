import Link from "next/link";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-900/50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link
              href="/"
              className="text-[#CCFF00] font-bold text-2xl mb-6 block"
            >
              CRYPTO.
            </Link>
            <p className="text-gray-400 text-sm">
              Transforming the way cryptocurrency is accessed.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Bitcoin
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Alt Coins
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  NFTs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for updates
            </p>
            <Button className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
