
document.addEventListener('DOMContentLoaded', () => {
    const templateGrid = document.querySelector('.template-grid');
    const totalTemplates = 20;

    const templateNames = [
        "Classic Professional", "Modern Minimalist", "Creative Bold", "Elegant Chronological", "Corporate Clean",
        "Simple & Neat", "Tech-focused", "Academic Standard", "Functional Resume", "Visual Infographic",
        "Executive Formal", "Portfolio Style", "Crisp & Clear", "Entry-Level Friendly", "Artistic Showcase",
        "Midnight Blue", "Minty Fresh", "Sunset Coral", "Two-Column Pro", "Typewriter Classic"
    ];

    for (let i = 1; i <= totalTemplates; i++) {
        const templateCard = document.createElement('div');
        templateCard.classList.add('template-card');

        const link = document.createElement('a');
        link.href = `builder.html?template=template${i}`;
        link.style.textDecoration = 'none';
        link.style.color = 'inherit';

        const cardContent = document.createElement('div');
        cardContent.classList.add('template-card-content');
        cardContent.innerHTML = `<h3>${templateNames[i - 1]}</h3>`;

        link.appendChild(cardContent);
        templateCard.appendChild(link);
        templateGrid.appendChild(templateCard);
    }
});
