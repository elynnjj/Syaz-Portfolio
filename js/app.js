/* ==========================================================================
   SYAZREEN ELYNA - INTERACTIVE PORTFOLIO APP LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTimelineFilter();
  initSkillSearchAndFilter();
  initActivityFilter();
  initModals();
  initToast();
});

/* Navbar Scrolling Effect & Active Section Marker */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* Timeline Interactive Filtering (All, Work, Education) */
function initTimelineFilter() {
  const filterBtns = document.querySelectorAll('.timeline-filters .filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      timelineItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* Skill Interactive Search & Tab Filtering */
function initSkillSearchAndFilter() {
  const searchInput = document.getElementById('skillSearchInput');
  const skillCards = document.querySelectorAll('.skill-card');
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');

  function filterSkills() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeTab = document.querySelector('.skill-tab-btn.active')?.dataset.tab || 'all';

    skillCards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const cat = card.dataset.category.toLowerCase();

      const matchesSearch = name.includes(query) || cat.includes(query);
      const matchesTab = (activeTab === 'all' || cat === activeTab);

      if (matchesSearch && matchesTab) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterSkills);
  }

  skillTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterSkills();
    });
  });
}

/* Activity Category Filtering */
function initActivityFilter() {
  const actFilterBtns = document.querySelectorAll('.activity-filter-btn');
  const actCards = document.querySelectorAll('.activity-card');

  actFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      actFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      actCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Modal Windows & Project Lightbox */
function initModals() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  if (!modalOverlay || !modalClose) return;

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Project details trigger
  window.openProjectModal = function (projectId) {
    const projectData = {
      'exactasset': {
        title: 'ExactAsset — IT Asset Management System',
        subtitle: 'Final Year Project (Bachelor Degree, UMPSA)',
        tech: ['Laravel (PHP)', 'JavaScript', 'CSS3', 'MySQL', 'SMTP Email API'],
        summary: 'Developed a comprehensive web-based IT Asset Management System streamlining company asset operations. Managed laptop/desktop checkout flows, automated employee-to-HOD asset request approvals, maintenance logs, and asset disposal records.',
        highlights: [
          'Digitalized manual IT request paperwork into a structured multi-level email notification and approval workflow.',
          'Built an IT asset tracking lifecycle covering new asset registration, check-in/check-out, assignment, maintenance, and end-of-life disposal.',
          'Designed relational MySQL database schemas to support asset records, assignment history, maintenance tracking, and equipment auditing.'
        ],
        images: ['assets/ea2.png', 'assets/ea1.png', 'assets/ea4.png', 'assets/ea3.png']
      },
      'worklance': {
        title: 'WorkLance — Freelance Services Management System',
        subtitle: 'Final Year Project (Diploma in Computer Science, UMPSA)',
        tech: ['HTML5', 'PHP', 'JavaScript', 'CSS3', 'MySQL'],
        summary: 'Created a centralized web platform enabling digital freelancers to publish services, upload resumes, and connect directly with potential employers looking for technical talent.',
        highlights: [
          'Built full employer job posting and freelancer profile management system.',
          'Implemented search & filter algorithms to match project criteria with skill sets.',
          'Created secure resume vault for employer review and direct communication.'
        ],
        images: ['assets/wl1.png', 'assets/wl2.png', 'assets/wl3.png', 'assets/wl4.png']
      },
      'onboarding': {
        title: 'Intern Task Progression Platform (InternSpect)',
        subtitle: 'Internship Mini-Project @ Entomo Digital',
        tech: ['Workflow Design', 'Process Analysis', 'HTML5', 'CSS3', 'JavaScript'],
        summary: 'Designed and proposed a structured onboarding workflow and task management tool for incoming QA and software interns to reduce onboarding ramp-up time.',
        highlights: [
          'Contributed to the design and development of a centralized intern task management platform for organizing onboarding activities, assigned tasks, deadlines, and progress.',
          'Supported the implementation of a structured task submission and review workflow to facilitate task completion, supervisor feedback, and approval.',
          'Collaborated with team members to develop progress tracking features that provide interns and supervisors with an overview of task status and internship progress.'
        ],
        images: ['assets/intern1.png', 'assets/intern2.png', 'assets/intern5.png', 'assets/intern3.png', 'assets/intern4.png']
      }
    };

    const data = projectData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="project-tag-badge" style="position:static; margin-bottom:8px; display:inline-block;">Project Spotlight</span>
        <h2 style="font-size:1.8rem; margin-top:6px;">${data.title}</h2>
        <p style="color:var(--accent-gold); font-family:var(--font-code); font-size:0.9rem;">${data.subtitle}</p>
      </div>

      <div class="carousel-container" style="position:relative; border-radius:var(--radius-sm); overflow:hidden; margin-bottom:20px; border:1px solid var(--card-border);">
        <div class="carousel-track" style="display:flex; transition: transform 0.4s ease; width: ${data.images.length * 100}%;">
          ${data.images.map(img => `<div style="width: ${100 / data.images.length}%; flex-shrink:0; background:var(--bg-main); display:flex; align-items:center; justify-content:center; aspect-ratio:16/9;"><img src="${img}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover; display:block;"></div>`).join('')}
        </div>
        ${data.images.length > 1 ? `
        <button class="carousel-prev" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.6); color:white; border:none; border-radius:50%; width:32px; height:32px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s;">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="carousel-next" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.6); color:white; border:none; border-radius:50%; width:32px; height:32px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s;">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <div class="carousel-indicators" style="position:absolute; bottom:12px; left:50%; transform:translateX(-50%); display:flex; gap:8px;">
          ${data.images.map((_, i) => `<div class="indicator" data-index="${i}" style="width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.4); cursor:pointer; transition:background 0.2s;"></div>`).join('')}
        </div>
        ` : ''}
      </div>

      <h4 style="margin-bottom:8px;">System Overview</h4>
      <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:20px;">${data.summary}</p>

      <h4 style="margin-bottom:8px;">Key Contributions &amp; Implementation</h4>
      <ul style="list-style:none; margin-bottom:24px; color:var(--text-secondary);">
        ${data.highlights.map(h => `<li style="margin-bottom:8px; padding-left:20px; position:relative;"><span style="position:absolute; left:0; color:var(--accent-gold);">▹</span> ${h}</li>`).join('')}
      </ul>

      <h4 style="margin-bottom:10px;">Technologies Applied</h4>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
    `;

    modalOverlay.classList.add('active');

    // Init carousel if multiple images
    if (data.images && data.images.length > 1) {
      const track = modalBody.querySelector('.carousel-track');
      const prevBtn = modalBody.querySelector('.carousel-prev');
      const nextBtn = modalBody.querySelector('.carousel-next');
      const indicators = modalBody.querySelectorAll('.indicator');
      let currentIndex = 0;

      function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * (100 / data.images.length)}%)`;
        indicators.forEach((ind, i) => {
          ind.style.background = i === currentIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)';
        });
      }

      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : data.images.length - 1;
        updateCarousel();
      });

      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < data.images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
      });

      indicators.forEach(ind => {
        ind.addEventListener('click', (e) => {
          currentIndex = parseInt(e.target.dataset.index);
          updateCarousel();
        });
      });

      updateCarousel();
    }
  };

  // Open Full Resume Modal
  window.openResumeModal = function () {
    modalBody.innerHTML = `
      <div class="resume-modal-container" style="color: var(--text-primary); font-family: var(--font-body); padding: 10px;">
        <!-- Resume Header -->
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom: 2px solid var(--accent-gold); padding-bottom: 16px; margin-bottom: 20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size: 1.8rem; font-weight: 800; color: #ffffff; margin-bottom: 4px;">Syazreen Elyna Binti Muhammad Rajab</h2>
            <div style="color: var(--accent-gold); font-family: var(--font-code); font-size: 0.95rem; font-weight: 600;">
              Computer Science (Software Engineering)
            </div>
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 6px;">
              Selangor | syaz.elyna@gmail.com | +6019-9894987 | <a href="https://www.linkedin.com/in/syazreenelyna" target="_blank" style="color: var(--accent-neon-cyan); text-decoration: underline;">linkedin.com/in/syazreenelyna</a>
            </div>
          </div>
          <div style="display:flex; gap:10px;">
            <button onclick="window.print()" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">
              <i class="fa-solid fa-print"></i> Print / Save PDF
            </button>
          </div>
        </div>

        <!-- SUMMARY -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.1rem; color: var(--accent-gold); border-bottom: 1px solid var(--card-border); padding-bottom: 4px; margin-bottom: 10px; font-family: var(--font-head); text-transform: uppercase;">Summary</h3>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
            Fresh Computer Science graduate majoring in Software Engineering, seeking an opportunity to begin my career in the technology industry. Equipped with hands-on experience in software development, IT support, business analysis, and quality assurance through academic projects and industry internships. Adaptable and detail-oriented, with strong collaboration skills and the ability to work effectively across teams, along with a keen interest in learning new technologies and delivering reliable, high-quality software solutions.
          </p>
        </div>

        <!-- EDUCATION -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.1rem; color: var(--accent-gold); border-bottom: 1px solid var(--card-border); padding-bottom: 4px; margin-bottom: 12px; font-family: var(--font-head); text-transform: uppercase;">Education</h3>

          <div style="margin-bottom: 18px;">
            <div style="display:flex; justify-content:space-between; flex-wrap:wrap; font-weight: 700; color: #ffffff; font-size:1.02rem;">
              <span>Bachelor of Computer Science (Software Engineering) with Honours</span>
              <span style="font-family: var(--font-code); color: var(--text-muted); font-size: 0.85rem;">October 2023 - August 2026</span>
            </div>
            <div style="color: var(--accent-gold-light); font-size: 0.88rem; margin-bottom: 4px;">Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA), Pekan, Pahang</div>
            <div style="font-size: 0.85rem; color: var(--accent-neon-green); font-weight: 600; margin-bottom: 6px;">Dean's List: 4 out of 5 semesters | CGPA: 3.70</div>
            <div style="font-size: 0.88rem; color: #ffffff; font-weight: 600;">Final Year Project: IT Asset Management System (ExactAsset)</div>
            <div style="font-size: 0.82rem; color: var(--accent-neon-cyan); font-family: var(--font-code); margin-bottom: 6px;">Technologies Used: Laravel (PHP), JavaScript, CSS, MySQL</div>
            <ul style="font-size: 0.88rem; color: var(--text-secondary); padding-left: 18px; line-height: 1.5;">
              <li>Developed a web-based IT Asset Management System focusing on laptop and desktop asset flow (check-in to IT, check-out to user, IT request &amp; maintenance, and asset disposal).</li>
              <li>Digitalized IT Asset Request for employee and HOD which includes email notification.</li>
            </ul>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; flex-wrap:wrap; font-weight: 700; color: #ffffff; font-size:1.02rem;">
              <span>Diploma in Computer Science</span>
              <span style="font-family: var(--font-code); color: var(--text-muted); font-size: 0.85rem;">August 2021 - August 2023</span>
            </div>
            <div style="color: var(--accent-gold-light); font-size: 0.88rem; margin-bottom: 4px;">Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA), Pekan, Pahang</div>
            <div style="font-size: 0.85rem; color: var(--accent-neon-green); font-weight: 600; margin-bottom: 6px;">Dean's List: 4 out of 5 semesters | CGPA: 3.69</div>
            <div style="font-size: 0.88rem; color: #ffffff; font-weight: 600;">Final Year Project: Freelance Services Management System (WorkLance)</div>
            <div style="font-size: 0.82rem; color: var(--accent-neon-cyan); font-family: var(--font-code); margin-bottom: 6px;">Technologies Used: HTML, PHP, JavaScript, CSS, MySQL</div>
            <ul style="font-size: 0.88rem; color: var(--text-secondary); padding-left: 18px; line-height: 1.5;">
              <li>Developed a web-based freelance services management system that enables freelancers to showcase their skills and services on a centralized platform.</li>
              <li>Implemented job posting and search features that allow employers to advertise projects and connect with suitable freelancers across various fields.</li>
              <li>Enabled freelancers to create professional profiles and upload resumes for employer reference.</li>
            </ul>
          </div>
        </div>

        <!-- WORK EXPERIENCE -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.1rem; color: var(--accent-gold); border-bottom: 1px solid var(--card-border); padding-bottom: 4px; margin-bottom: 12px; font-family: var(--font-head); text-transform: uppercase;">Work Experience</h3>

          <div style="margin-bottom: 18px;">
            <div style="display:flex; justify-content:space-between; flex-wrap:wrap; font-weight: 700; color: #ffffff; font-size:1.02rem;">
              <span>Quality Assurance Intern Trainee</span>
              <span style="font-family: var(--font-code); color: var(--text-muted); font-size: 0.85rem;">May 2026 - August 2026</span>
            </div>
            <div style="color: var(--accent-gold-light); font-size: 0.88rem; margin-bottom: 6px;">Entomo Digital Sdn. Bhd.</div>
            <ul style="font-size: 0.88rem; color: var(--text-secondary); padding-left: 18px; line-height: 1.5;">
              <li>Executed functional, regression, and user acceptance testing (UAT) for MySejahtera and MyVAS modules by validating new features, enhancements, and bug fixes against business requirements and acceptance criteria.</li>
              <li>Created and maintained test cases, executed test scenarios, logged and tracked software defects in the team's shared tracking sheet, and worked closely with developers and product owners to verify bug fixes and ensure software quality.</li>
              <li>Performed UI validation, workflow testing, and data verification across web and mobile applications, while participating in Agile sprint activities including requirement walkthroughs, daily stand-ups, sprint testing, and retesting to support successful feature releases.</li>
              <li>Completed additional internship assignments and developed a mini project to improve intern onboarding and task management processes, involving process analysis, and proposing a structured workflow solution for future interns.</li>
            </ul>
          </div>

          <div style="margin-bottom: 18px;">
            <div style="display:flex; justify-content:space-between; flex-wrap:wrap; font-weight: 700; color: #ffffff; font-size:1.02rem;">
              <span>Business Analyst Intern Trainee</span>
              <span style="font-family: var(--font-code); color: var(--text-muted); font-size: 0.85rem;">March 2026 - April 2026</span>
            </div>
            <div style="color: var(--accent-gold-light); font-size: 0.88rem; margin-bottom: 6px;">Ark Digital Technologies Sdn. Bhd.</div>
            <ul style="font-size: 0.88rem; color: var(--text-secondary); padding-left: 18px; line-height: 1.5;">
              <li>Supported the product team in gathering and analyzing business requirements, identifying system needs, and preparing documentation to support software development processes.</li>
              <li>Participated in client and internal team discussions to gain exposure to stakeholder communication, requirement clarification, and alignment between business objectives and technical solutions.</li>
              <li>Gained practical knowledge of OAuth 2.0 authentication concepts and its implementation flow, while supporting discussions related to system integration and application requirements.</li>
            </ul>
          </div>

          <div style="margin-bottom: 18px;">
            <div style="display:flex; justify-content:space-between; flex-wrap:wrap; font-weight: 700; color: #ffffff; font-size:1.02rem;">
              <span>IT Intern Trainee</span>
              <span style="font-family: var(--font-code); color: var(--text-muted); font-size: 0.85rem;">August 2024 - September 2024</span>
            </div>
            <div style="color: var(--accent-gold-light); font-size: 0.88rem; margin-bottom: 6px;">Exact Automation Sdn. Bhd.</div>
            <ul style="font-size: 0.88rem; color: var(--text-secondary); padding-left: 18px; line-height: 1.5;">
              <li>Guided a new intern in handling 1st-level IT support activities, including troubleshooting basic hardware and software issues while ensuring proper resolution procedures were followed.</li>
              <li>Provided guidance on device setup, maintenance, and troubleshooting procedures for desktops and laptops to support daily IT operations.</li>
              <li>Assisted in managing daily IT support tasks while sharing knowledge on IT asset management processes, equipment handling, and standard IT practices with the new intern.</li>
            </ul>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; flex-wrap:wrap; font-weight: 700; color: #ffffff; font-size:1.02rem;">
              <span>IT Intern Trainee</span>
              <span style="font-family: var(--font-code); color: var(--text-muted); font-size: 0.85rem;">March 2023 - September 2023</span>
            </div>
            <div style="color: var(--accent-gold-light); font-size: 0.88rem; margin-bottom: 6px;">Exact Automation Sdn. Bhd.</div>
            <ul style="font-size: 0.88rem; color: var(--text-secondary); padding-left: 18px; line-height: 1.5;">
              <li>Provided 1st-level IT support to assist staff with basic hardware and software issues, including troubleshooting, device setup, and maintaining desktops and laptops.</li>
              <li>Assisted in IT asset management activities by updating and organizing asset records, conducting internal audits, and ensuring accurate tracking of company equipment.</li>
              <li>Supported hardware maintenance and disposal processes by refurbishing and repairing desktops and laptops, as well as updating records for disposed IT equipment.</li>
            </ul>
          </div>
        </div>

        <!-- SKILLS -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.1rem; color: var(--accent-gold); border-bottom: 1px solid var(--card-border); padding-bottom: 4px; margin-bottom: 10px; font-family: var(--font-head); text-transform: uppercase;">Skills</h3>
          <div style="font-size: 0.88rem; line-height: 1.7; color: var(--text-secondary);">
            <div><strong>Technical:</strong> Laravel (PHP), JavaScript, HTML, CSS, MySQL, Git/GitHub, Java, Python, C, C++, C#</div>
            <div><strong>Software &amp; Tools:</strong> Microsoft Office (Word, PowerPoint, Excel), VS Code, Figma, Postman, Jira</div>
            <div><strong>Interpersonal:</strong> Teamwork, Problem-Solving, Adaptability, Communication, Thoroughness</div>
            <div><strong>Language:</strong> Bahasa Melayu, English</div>
          </div>
        </div>

        <!-- EXTRACURRICULAR ACTIVITIES -->
        <div>
          <h3 style="font-size: 1.1rem; color: var(--accent-gold); border-bottom: 1px solid var(--card-border); padding-bottom: 4px; margin-bottom: 10px; font-family: var(--font-head); text-transform: uppercase;">Extracurricular Activities</h3>
          <ul style="font-size: 0.88rem; color: var(--text-secondary); padding-left: 18px; line-height: 1.6;">
            <li>2nd Place in Shot Put and Discus Throw, Temasya Olahraga, UMPSA 2026.</li>
            <li>1st Place in Escape Room - "Code Break, Escape The Lab", Faculty of Computing 2025.</li>
            <li>2nd Place in Tenpin Bowling, Kejohanan Sukan Antara Fakulti (SukFac), UMPSA 2025.</li>
            <li>2nd Place in Volleyball, Pekan Night Games 2025, UMPSA 2025.</li>
            <li>3rd Place in Volleyball, Annual Residential Colleges Athletics (ARENA), UMPSA 2025.</li>
            <li>1st Place in Volleyball and Handball, 2nd Place in Netball, Computing Battle of Athletic Talent (COMBAT), UMPSA 2025.</li>
            <li>Participant in Muse Ecopark at Gua Musang, Kelantan, Extreme Club UMPSA 2025.</li>
            <li>2nd Place in Netball, Sukan Komputeran (SUKOM) 2024.</li>
            <li>Participant in Caving and Zipline at Gua Kota Gelanggi, Pahang, Extreme Club UMPSA 2024.</li>
            <li>Cisco Networking Academy, CCNAv7: Introduction to Networks, 2022.</li>
          </ul>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
  };
}

/* Toast Notifications */
function initToast() {
  const toast = document.getElementById('toast');

  window.showToast = function (msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  window.copyText = function (text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label} to clipboard!`);
    }).catch(err => {
      showToast(`Contact: ${text}`);
    });
  };
}
