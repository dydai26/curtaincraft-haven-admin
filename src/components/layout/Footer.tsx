
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-serif">Елегантні Штори</h3>
            <p className="text-muted-foreground">
              Створюємо затишок у вашій оселі за допомогою високоякісних штор та тюлів.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-medium">Каталог</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/curtains" className="text-muted-foreground hover:text-foreground transition-colors">
                  Штори
                </Link>
              </li>
              <li>
                <Link to="/category/tulle" className="text-muted-foreground hover:text-foreground transition-colors">
                  Тюль
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Аксесуари
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-medium">Інформація</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Про нас
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-muted-foreground hover:text-foreground transition-colors">
                  Доставка та оплата
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Повернення
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Політика конфіденційності
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-medium">Контакти</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
                <span>+380 (50) 123-45-67</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
                <span>info@elegantcurtains.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
                <span>м. Київ, вул. Хрещатик, 1</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Елегантні Штори. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
