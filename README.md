# CV Builder - Professional Resume Creator

CV Builder is a purely client-side application that allows users to create, preview, and export professional-looking resumes with ease. Built with standard web technologies, it requires no backend or database, making it incredibly easy to deploy and maintain.

## Key Features

*   **Live Preview:** See your resume update in real-time as you type.
*   **20 Professional Templates:** Choose from a wide variety of modern, stylish, and functional templates.
*   **Client-Side Storage:** All data is saved securely in the user's local browser storage (`localStorage`), ensuring privacy and a seamless experience across sessions.
*   **PDF & Export:** Download your finished resume as a high-quality PDF .
*   **Dynamic Template Switching:** Change templates at any time without losing your entered data.
*   **Zero Dependencies:** The project uses vanilla HTML, CSS, and JavaScript, with no complex frameworks or build steps required.
*   **No Running Costs:** As a completely client-side application, it can be hosted on any static web host, including free options like GitHub Pages, Netlify, or Vercel.

## Technology Stack

*   **HTML5:** For the structure of the web pages.
*   **CSS3:** For styling the application and the resume templates.
*   **JavaScript (ES6):** For all the application logic, including data handling and live previews.
*   **html2pdf.js:** A third-party library used for generating PDF documents from HTML.

## How to Use

1.  Open the `index.html` file in your web browser.
2.  Choose a template to get started.
3.  You will be redirected to the `builder.html` page.
4.  Fill in your personal information, skills, work experience, and other details in the sidebar.
5.  Your resume will update in the main panel as you type.
6.  Use the "Change Template" button to switch between different styles at any time.
7.  Once you are satisfied, use the "Download PDF" button to export your resume.

## How to Add New Templates

Adding a new template is straightforward:

1.  Create a new folder inside the `templates` directory (e.g., `templates/template21/`).
2.  Inside the new folder, create a `style.css` file. This file will contain all the CSS rules for your new template.
3.  Update the `templateNames` array in both `script.js` and `builder.js` to include the name of your new template.
4.  That's it! The application will automatically pick up the new template.
