// Initialize data arrays
let projects = [
    {
        title: "CSEL 302",
        description: "Computer Systems Engineering Laboratory coursework featuring various programming exercises and projects.",
        link: "https://github.com/iiCellxx/CSEL-302",
        image: "📊"
    },
    {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website showcasing my projects and skills.",
        link: "https://iicellxx.github.io",
        image: "💻"
    }
];

let socialLinks = [
    {
        name: "Facebook",
        link: "https://web.facebook.com/profile.php?id=61558985755118",
        icon: "📘"
    },
    {
        name: "Instagram",
        link: "https://www.instagram.com/cellrhick/",
        icon: "📷"
    },
    {
        name: "GitHub",
        link: "https://github.com/iiCellxx",
        icon: "💻"
    }
];

// Load data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    loadSocialLinks();
    smoothScroll();
});

// Function to load projects
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const isImageUrl = project.image.startsWith('http') || project.image.startsWith('IMG/');
        const imageContent = isImageUrl 
            ? `<img src="${project.image}" alt="${project.title}" class="project-image">`
            : `<div class="project-emoji">${project.image}</div>`;
        
        projectCard.innerHTML = `
            ${imageContent}
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="project-link">View Project</a>
                <button class="delete-project-btn" onclick="deleteProject(${index})">Delete</button>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Function to add new project
function addProject() {
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDesc').value.trim();
    const link = document.getElementById('projectLink').value.trim();
    const image = document.getElementById('projectImage').value.trim();
    
    if (!title || !description || !link) {
        alert('Please fill in all required fields (Title, Description, and Link)');
        return;
    }
    
    const newProject = {
        title: title,
        description: description,
        link: link,
        image: image || '🚀'
    };
    
    projects.push(newProject);
    loadProjects();
    
    // Clear form
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDesc').value = '';
    document.getElementById('projectLink').value = '';
    document.getElementById('projectImage').value = '';
    
    alert('Project added successfully!');
}

// Function to delete project
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects.splice(index, 1);
        loadProjects();
    }
}

// Function to load social links
function loadSocialLinks() {
    const socialLinksContainer = document.getElementById('socialLinks');
    socialLinksContainer.innerHTML = '';
    
    socialLinks.forEach((social, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="${social.link}" target="_blank">${social.icon} ${social.name}</a>
            <span class="delete-btn" onclick="deleteSocialLink(${index})">✖</span>
        `;
        socialLinksContainer.appendChild(listItem);
    });
}

// Function to add new social link
function addSocialLink() {
    const name = document.getElementById('socialName').value.trim();
    const link = document.getElementById('socialLink').value.trim();
    const icon = document.getElementById('socialIcon').value.trim();
    
    if (!name || !link) {
        alert('Please fill in Platform Name and URL');
        return;
    }
    
    const newSocialLink = {
        name: name,
        link: link,
        icon: icon || '🔗'
    };
    
    socialLinks.push(newSocialLink);
    loadSocialLinks();
    
    // Clear form
    document.getElementById('socialName').value = '';
    document.getElementById('socialLink').value = '';
    document.getElementById('socialIcon').value = '';
    
    alert('Social link added successfully!');
}

// Function to delete social link
function deleteSocialLink(index) {
    if (confirm('Are you sure you want to delete this social link?')) {
        socialLinks.splice(index, 1);
        loadSocialLinks();
    }
}

// Smooth scrolling for navigation
function smoothScroll() {
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add animation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Initialize section animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
    });
});