const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl text-foreground" style={{ fontFamily: "\"Charlie Don't Surf\", cursive" }}>Armtemiy</span>
            <span className="text-muted-foreground">© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://t.me/armtemiy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Telegram-канал
            </a>
            <a
              href="https://t.me/assistemiy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Написать
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
