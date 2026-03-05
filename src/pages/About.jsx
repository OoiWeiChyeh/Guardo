import Navbar from '../components/Navbar';
import './About.css';

export default function About() {
  return (
    <div className="about-root">
      <Navbar />
      <div className="about-wrap">
        <div className="card about-card">
          <h1 className="about-title">About Guardo</h1>
          <p className="about-sub">
            Guardo is a friendly, school-first online safety companion designed to help primary school students
            recognise cyberbullying, build good digital habits, and know when to ask for help.
          </p>

          <div className="about-grid">
            <div className="about-item">
              <div className="about-ico">🛡️</div>
              <div>
                <div className="about-h">Safety by design</div>
                <div className="about-p">Clear guidance, age-appropriate language, and privacy-aware UX.</div>
              </div>
            </div>
            <div className="about-item">
              <div className="about-ico">🎯</div>
              <div>
                <div className="about-h">Learn by doing</div>
                <div className="about-p">Scenario quizzes and progress feedback help turn knowledge into habits.</div>
              </div>
            </div>
            <div className="about-item">
              <div className="about-ico">🤝</div>
              <div>
                <div className="about-h">Support network</div>
                <div className="about-p">Encourages reporting to trusted adults and healthy digital boundaries.</div>
              </div>
            </div>
          </div>

          <div className="about-note">
            <span className="badge badge-gold">Testing build</span>
            <span className="text-muted" style={{ marginLeft: 10 }}>
              This demo uses local, non-production accounts for showcasing the experience.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

