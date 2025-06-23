const AppFooter = () => {
  return (
    <footer className="bg-muted py-8 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p className="font-semibold">&copy; {new Date().getFullYear()} DPSIS. All rights reserved.</p>
        <p className="text-sm mt-1">Empowering young minds for a brighter future.</p>
        <div className="mt-2 text-xs">
          <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
