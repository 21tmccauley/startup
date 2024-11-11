export default function Footer() {
  return (
    <footer className="container py-3">
      <div className="text-center">
        <p>© 2024 CyberInsight Hub. Created by Tate McCauley. All rights reserved.</p>
        <div className="d-flex justify-content-center gap-3">
          <a 
            href="https://github.com/21tmccauley/startup" 
            className="text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
          <a 
            href="https://github.com/21tmccauley" 
            className="text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            My GitHub Profile
          </a>
        </div>
      </div>
    </footer>
  );
}