
document.addEventListener('DOMContentLoaded', () => {
    const changeTemplateBtn = document.getElementById('change-template');
    const templateStyle = document.getElementById('template-style');
    const cvPreview = document.getElementById('cv-preview');

    // CV Data Object
    let cvData = {
        profileImage: '',
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        skills: [''],
        languages: [''],
        workExperience: [],
        education: [],
        achievements: [''],
        references: [''],
        mode: 'professional'
    };

    const templateNames = [
        "Classic Professional", "Modern Minimalist", "Creative Bold", "Elegant Chronological", "Corporate Clean",
        "Simple & Neat", "Tech-focused", "Academic Standard", "Functional Resume", "Visual Infographic",
        "Executive Formal", "Portfolio Style", "Crisp & Clear", "Entry-Level Friendly", "Artistic Showcase",
        "Midnight Blue", "Minty Fresh", "Sunset Coral", "Two-Column Pro", "Typewriter Classic"
    ];

    // Load data from localStorage
    function loadData() {
        const savedData = localStorage.getItem('cvData');
        if (savedData) {
            cvData = JSON.parse(savedData);
        }
        populateForm();
        updatePreview();
    }

    // Save data to localStorage
    function saveData() {
        localStorage.setItem('cvData', JSON.stringify(cvData));
    }

    // Populate form with data from cvData
    function populateForm() {
        document.getElementById('name').value = cvData.name;
        document.getElementById('title').value = cvData.title;
        document.getElementById('email').value = cvData.email;
        document.getElementById('phone').value = cvData.phone;
        document.getElementById('location').value = cvData.location;
        document.getElementById('summary').value = cvData.summary;
        document.getElementById('switch-mode').value = cvData.mode;

        // Populate dynamic sections
        populateDynamicSection('skills-container', 'skill', cvData.skills);
        populateDynamicSection('languages-container', 'language', cvData.languages);
        populateDynamicSection('achievements-container', 'achievement', cvData.achievements, true);
        populateDynamicSection('references-container', 'reference', cvData.references, true);
        populateWorkExperience();
        populateEducation();
    }

    function populateDynamicSection(containerId, inputClass, dataArray, isTextarea = false) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        dataArray.forEach((item, index) => {
            const itemWrapper = document.createElement('div');
            itemWrapper.classList.add('dynamic-item-wrapper');

            const input = document.createElement(isTextarea ? 'textarea' : 'input');
            if (!isTextarea) {
                input.type = 'text';
            }
            input.classList.add(inputClass);
            input.value = item;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');
            removeBtn.addEventListener('click', () => {
                dataArray.splice(index, 1);
                saveData();
                populateForm();
                updatePreview();
            });

            itemWrapper.appendChild(input);
            itemWrapper.appendChild(removeBtn);
            container.appendChild(itemWrapper);
        });
    }

    function populateWorkExperience() {
        const container = document.getElementById('work-experience-container');
        container.innerHTML = '';
        cvData.workExperience.forEach(exp => {
            const item = document.createElement('div');
            item.classList.add('experience-item');
            item.innerHTML = `
                <input type="text" class="job-title" placeholder="Job Title" value="${exp.title}">
                <input type="text" class="company" placeholder="Company" value="${exp.company}">
                <input type="text" class="job-location" placeholder="Location" value="${exp.location}">
                <input type="text" class="start-date" placeholder="Start Date" value="${exp.startDate}">
                <input type="text" class="end-date" placeholder="End Date" value="${exp.endDate}">
                <textarea class="job-description" placeholder="Job Description">${exp.description}</textarea>
                <button class="remove-experience">Remove</button>
            `;
            container.appendChild(item);
        });
    }

    function populateEducation() {
        const container = document.getElementById('education-container');
        container.innerHTML = '';
        cvData.education.forEach(edu => {
            const item = document.createElement('div');
            item.classList.add('education-item');
            item.innerHTML = `
                <input type="text" class="degree" placeholder="Degree" value="${edu.degree}">
                <input type="text" class="school" placeholder="School/University" value="${edu.school}">
                <input type="text" class="school-location" placeholder="Location" value="${edu.location}">
                <input type="text" class="grad-year" placeholder="Graduation Year" value="${edu.year}">
                <button class="remove-education">Remove</button>
            `;
            container.appendChild(item);
        });
    }

    // Update preview with data from cvData
    function updatePreview() {
        // Basic Info
        document.getElementById('preview-name').textContent = cvData.name || 'Your Name';
        document.getElementById('preview-title').textContent = cvData.title || 'Your Title';
        document.getElementById('preview-email').textContent = cvData.email || 'your.email@example.com';
        document.getElementById('preview-phone').textContent = cvData.phone || '123-456-7890';
        document.getElementById('preview-location').textContent = cvData.location || 'City, Country';
        document.getElementById('preview-summary').textContent = cvData.summary || 'A brief summary about yourself.';
        document.getElementById('preview-image').src = cvData.profileImage || 'https://via.placeholder.com/150';

        // Skills and Languages
        updatePreviewList('preview-skills', cvData.skills);
        updatePreviewList('preview-languages', cvData.languages);
        updatePreviewList('achievements-preview', cvData.achievements, true);
        updatePreviewList('references-preview', cvData.references, true);

        // Work Experience
        const workExperiencePreview = document.getElementById('work-experience-preview');
        workExperiencePreview.innerHTML = '<h2>Work Experience</h2>';
        cvData.workExperience.forEach(exp => {
            if (exp.title || exp.company) {
                const previewItem = document.createElement('div');
                previewItem.classList.add('preview-experience-item');
                previewItem.innerHTML = `
                    <h3>${exp.title}</h3>
                    <h4>${exp.company} | ${exp.location}</h4>
                    <p>${exp.startDate} - ${exp.endDate}</p>
                    <p>${exp.description}</p>
                `;
                workExperiencePreview.appendChild(previewItem);
            }
        });

        // Education
        const educationPreview = document.getElementById('education-preview');
        educationPreview.innerHTML = '<h2>Education</h2>';
        cvData.education.forEach(edu => {
            if (edu.degree || edu.school) {
                const previewItem = document.createElement('div');
                previewItem.classList.add('preview-education-item');
                previewItem.innerHTML = `
                    <h3>${edu.degree}</h3>
                    <h4>${edu.school} | ${edu.location}</h4>
                    <p>${edu.year}</p>
                `;
                educationPreview.appendChild(previewItem);
            }
        });
        
        // Switch Mode
        const professionalSections = ['achievements-preview', 'references-preview'];
        const mode = cvData.mode;
        if (mode === 'basic') {
            professionalSections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if(section) section.style.display = 'none';
            });
        } else {
            professionalSections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if(section) section.style.display = 'block';
            });
        }
    }

    function updatePreviewList(previewId, dataArray, isAchievementOrReference = false) {
        const previewList = document.getElementById(previewId);
        if (isAchievementOrReference) {
            previewList.innerHTML = `<h2>${previewId.charAt(0).toUpperCase() + previewId.slice(1).replace('-preview', '')}</h2>`;
        } else {
            previewList.innerHTML = '';
        }
        const ul = document.createElement('ul');
        dataArray.forEach(item => {
            if (item) {
                const li = document.createElement('li');
                li.textContent = item;
                ul.appendChild(li);
            }
        });
        previewList.appendChild(ul);
    }

    // Event Listeners for live preview and data saving
    document.getElementById('name').addEventListener('input', (e) => { cvData.name = e.target.value; saveData(); updatePreview(); });
    document.getElementById('title').addEventListener('input', (e) => { cvData.title = e.target.value; saveData(); updatePreview(); });
    document.getElementById('email').addEventListener('input', (e) => { cvData.email = e.target.value; saveData(); updatePreview(); });
    document.getElementById('phone').addEventListener('input', (e) => { cvData.phone = e.target.value; saveData(); updatePreview(); });
    document.getElementById('location').addEventListener('input', (e) => { cvData.location = e.target.value; saveData(); updatePreview(); });
    document.getElementById('summary').addEventListener('input', (e) => { cvData.summary = e.target.value; saveData(); updatePreview(); });
    document.getElementById('profile-image').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                cvData.profileImage = event.target.result;
                saveData();
                updatePreview();
            };
            reader.readAsDataURL(file);
        }
    });
    document.getElementById('switch-mode').addEventListener('change', (e) => {
        cvData.mode = e.target.value;
        saveData();
        updatePreview();
    });

    // Event listeners for dynamic sections
    document.getElementById('skills-container').addEventListener('input', () => {
        cvData.skills = Array.from(document.querySelectorAll('#skills-container .skill')).map(input => input.value);
        saveData();
        updatePreview();
    });
    document.getElementById('languages-container').addEventListener('input', () => {
        cvData.languages = Array.from(document.querySelectorAll('#languages-container .language')).map(input => input.value);
        saveData();
        updatePreview();
    });
    document.getElementById('achievements-container').addEventListener('input', () => {
        cvData.achievements = Array.from(document.querySelectorAll('#achievements-container .achievement')).map(input => input.value);
        saveData();
        updatePreview();
    });
    document.getElementById('references-container').addEventListener('input', () => {
        cvData.references = Array.from(document.querySelectorAll('#references-container .reference')).map(input => input.value);
        saveData();
        updatePreview();
    });
    document.getElementById('work-experience-container').addEventListener('input', () => {
        cvData.workExperience = Array.from(document.querySelectorAll('#work-experience-container .experience-item')).map(item => ({
            title: item.querySelector('.job-title').value,
            company: item.querySelector('.company').value,
            location: item.querySelector('.job-location').value,
            startDate: item.querySelector('.start-date').value,
            endDate: item.querySelector('.end-date').value,
            description: item.querySelector('.job-description').value,
        }));
        saveData();
        updatePreview();
    });
    document.getElementById('education-container').addEventListener('input', () => {
        cvData.education = Array.from(document.querySelectorAll('#education-container .education-item')).map(item => ({
            degree: item.querySelector('.degree').value,
            school: item.querySelector('.school').value,
            location: item.querySelector('.school-location').value,
            year: item.querySelector('.grad-year').value,
        }));
        saveData();
        updatePreview();
    });

    // Add/Remove buttons
    document.getElementById('add-skill').addEventListener('click', () => { cvData.skills.push(''); populateForm(); });
    document.getElementById('add-language').addEventListener('click', () => { cvData.languages.push(''); populateForm(); });
    document.getElementById('add-achievement').addEventListener('click', () => { cvData.achievements.push(''); populateForm(); });
    document.getElementById('add-reference').addEventListener('click', () => { cvData.references.push(''); populateForm(); });
    document.getElementById('add-experience').addEventListener('click', () => { 
        cvData.workExperience.push({ title: '', company: '', location: '', startDate: '', endDate: '', description: '' });
        populateForm();
    });
    document.getElementById('add-education').addEventListener('click', () => {
        cvData.education.push({ degree: '', school: '', location: '', year: '' });
        populateForm();
    });

    document.getElementById('work-experience-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-experience')) {
            const item = e.target.closest('.experience-item');
            const index = Array.from(item.parentElement.children).indexOf(item);
            cvData.workExperience.splice(index, 1);
            saveData();
            populateForm();
            updatePreview();
        }
    });
    document.getElementById('education-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-education')) {
            const item = e.target.closest('.education-item');
            const index = Array.from(item.parentElement.children).indexOf(item);
            cvData.education.splice(index, 1);
            saveData();
            populateForm();
            updatePreview();
        }
    });


    if (changeTemplateBtn) {
        changeTemplateBtn.addEventListener('click', () => {
            openTemplateModal();
        });
    }

    // Load template CSS from localStorage or defaults
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
        templateStyle.href = savedTemplate;
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const templateId = urlParams.get('template');
        if (templateId) {
            const newTemplate = `templates/${templateId}/style.css`;
            templateStyle.href = newTemplate;
            localStorage.setItem('selectedTemplate', newTemplate);
        }
    }
    
    loadData();

    function openTemplateModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2>Choose a Template</h2>
                <div class="template-list">
                    </div>
            </div>
        `;
        document.body.appendChild(modal);

        const templateList = modal.querySelector('.template-list');
        for (let i = 0; i < templateNames.length; i++) {
            const templateItem = document.createElement('div');
            templateItem.classList.add('template-item');
            templateItem.dataset.template = `templates/template${i + 1}/style.css`;
            templateItem.innerHTML = templateNames[i];
            templateList.appendChild(templateItem);
        }

        modal.querySelector('.close-button').addEventListener('click', () => {
            modal.remove();
        });

        templateList.addEventListener('click', (e) => {
            const templateItem = e.target.closest('.template-item');
            if (templateItem) {
                const newTemplate = templateItem.dataset.template;
                templateStyle.href = newTemplate;
                localStorage.setItem('selectedTemplate', newTemplate);
                modal.remove();
            }
        });
    }
});
