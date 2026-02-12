import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePDF = async (parish, koottayma, purpose, entries, totalAmount) => {
    try {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        // Center align title
        doc.text(parish, 105, 20, { align: 'center' });

        // Subtitle
        doc.setFontSize(16);
        doc.setTextColor(60, 60, 60);
        doc.text(koottayma, 105, 30, { align: 'center' });

        // Purpose & Date
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        doc.text(`Purpose: ${purpose}`, 14, 45);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 52);

        // Table
        const tableColumn = ["Change", "Name", "Amount"];
        const tableRows = entries.map((entry, index) => [
            index + 1,
            entry.name,
            `Rs ${entry.amount}`
        ]);

        autoTable(doc, {
            startY: 60,
            head: [['No.', 'Name', 'Amount']],
            body: entries.map((e, i) => [i + 1, e.name, `Rs ${e.amount}`]),
            styles: {
                fontSize: 11,
                cellPadding: 3,
            },
            headStyles: {
                fillColor: [79, 70, 229], // Indigo-600
                textColor: 255,
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [249, 250, 251], // Gray-50
            },
            columnStyles: {
                0: { cellWidth: 20 },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 40, halign: 'right' },
            },
            foot: [['', 'Total', `Rs ${totalAmount}`]],
            footStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontStyle: 'bold',
                fontSize: 12,
                lineColor: [200, 200, 200],
                lineWidth: { top: 0.1 },
            },
            didParseCell: function (data) {
                // Alignment for Amount column in body
                if (data.column.index === 2 && data.section === 'body') {
                    data.cell.styles.halign = 'right';
                }
            }
        });

        // Save
        doc.save(`Church_Fund_${purpose.replace(/\s+/g, '_')}_${Date.now()}.pdf`);

    } catch (error) {
        console.error('PDF Generation Error:', error);
    }
};
