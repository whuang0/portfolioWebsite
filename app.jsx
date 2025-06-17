const { useState } = React;

function App() {
  const [active, setActive] = useState('about');

  return (
    <div>
      <header>
        <nav>
          <ul id="menu">
            <li><a href="#about" onClick={() => setActive('about')}>About Me</a></li>
            <li><a href="#skills" onClick={() => setActive('skills')}>Skills</a></li>
            <li><a href="#contact" onClick={() => setActive('contact')}>Contact</a></li>
          </ul>
          <div id="social-icons">
            <a href="https://github.com/whuang0" target="_blank"><img src="assets/Github.png"/></a>
            <a href="https://www.linkedin.com/in/whuang0/" target="_blank"><img src="assets/LinkedIn_logo_initials.png"/></a>
          </div>
        </nav>
        <h1>Wilson Huang</h1>
      </header>
      <div id="dot-nav">
        <span className={`dot ${active==='about'?'active':''}`} onClick={() => setActive('about')}></span>
        <span className={`dot ${active==='skills'?'active':''}`} onClick={() => setActive('skills')}></span>
        <span className={`dot ${active==='contact'?'active':''}`} onClick={() => setActive('contact')}></span>
      </div>
      <main>
        {active==='about' && (
          <section id="about" className="page show">
            <h2>About Me</h2>
            <p>My journey in computer science began during my high school years, when I discovered a passion for programming and problem solving.</p>
            <p>I am passionate about using technology to create innovative solutions that improve people's lives.</p>
          </section>
        )}
        {active==='skills' && (
          <section id="skills" className="page show">
            <h2>Skills</h2>
            <ul>
              <li>Java</li>
              <li>Python</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>C/C++</li>
              <li>JavaScript</li>
            </ul>
          </section>
        )}
        {active==='contact' && (
          <section id="contact" className="page show">
            <h2>Contact</h2>
            <p><a href="mailto: whuang88@binghamton.edu">Email</a>: whuang88@binghamton.edu</p>
            <p>Phone: 914-486-8982</p>
            <p>Location: Binghamton, NY</p>
          </section>
        )}
      </main>
      <footer>
        <p>Copyright © 2022 Wilson Huang</p>
      </footer>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
