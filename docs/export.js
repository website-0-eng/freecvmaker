document.addEventListener('DOMContentLoaded', () => {
    const downloadPdfBtn = document.getElementById('download-pdf');
    const previewPdfBtn = document.getElementById('preview-pdf');
    const cvPreview = document.getElementById('cv-preview');

    const generatePdf = (action) => {
        const element = document.getElementById('cv-preview');
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const opt = {
            margin: 0,
            filename: 'My_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'pt', format: [width, height] }
        };

        cvPreview.style.padding = '0'; // Remove padding for PDF export
        const worker = html2pdf().set(opt).from(cvPreview);

        if (action === 'save') {
            worker.save().then(() => {
                cvPreview.style.padding = '1rem'; // Restore padding
            });
        } else if (action === 'preview') {
            worker.output('blob').then((pdfBlob) => {
                const pdfUrl = URL.createObjectURL(pdfBlob);
                window.open(pdfUrl, '_blank');
                cvPreview.style.padding = '1rem'; // Restore padding
            });
        }
    };

    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            generatePdf('save');
        });
    }

    if (previewPdfBtn) {
        previewPdfBtn.addEventListener('click', () => {
            generatePdf('preview');
        });
    }
});
