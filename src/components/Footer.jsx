export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-black/70 border-t border-outline mt-10">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="text-white/90 font-semibold mb-2">StreamFlix</h3>
            <ul className="space-y-1 text-muted">
              <li><a className="hover:text-white" href="#">Centre d'aide</a></li>
              <li><a className="hover:text-white" href="#">Nous contacter</a></li>
              <li><a className="hover:text-white" href="#">À propos</a></li>
              <li><a className="hover:text-white" href="#">Emplois</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white/90 font-semibold mb-2">Informations légales</h3>
            <ul className="space-y-1 text-muted">
              <li><a className="hover:text-white" href="#">Conditions d'utilisation</a></li>
              <li><a className="hover:text-white" href="#">Politique de confidentialité</a></li>
              <li><a className="hover:text-white" href="#">Mentions légales</a></li>
              <li><a className="hover:text-white" href="#">Gestion des cookies</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white/90 font-semibold mb-2">Support</h3>
            <ul className="space-y-1 text-muted">
              <li><a className="hover:text-white" href="#">FAQ</a></li>
              <li><a className="hover:text-white" href="#">Appareils compatibles</a></li>
              <li><a className="hover:text-white" href="#">Qualité vidéo</a></li>
              <li><a className="hover:text-white" href="#">Accessibilité</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white/90 font-semibold mb-2">Suivez-nous</h3>
            <ul className="space-y-1 text-muted">
              <li><a className="hover:text-white" href="#" aria-label="Facebook">📘 Facebook</a></li>
              <li><a className="hover:text-white" href="#" aria-label="Twitter">🐦 Twitter</a></li>
              <li><a className="hover:text-white" href="#" aria-label="Instagram">📷 Instagram</a></li>
              <li><a className="hover:text-white" href="#" aria-label="YouTube">📺 YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-6 pt-3 text-xs text-muted">
          <p>© 2025 StreamFlix. Tous droits réservés.</p>
          <p>Service de streaming de vidéos à la demande</p>
        </div>
      </div>
    </footer>
  );
}
