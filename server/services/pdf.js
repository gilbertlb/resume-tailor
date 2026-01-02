const PDFDocument = require('pdfkit');

function generatePDF(resume) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'LETTER',
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      // Header with contact info
      doc.fontSize(24).font('Helvetica-Bold').text(resume.contactInfo.name, { align: 'center' });
      doc.moveDown(0.3);

      const contactLine = [
        resume.contactInfo.email,
        resume.contactInfo.phone,
        resume.contactInfo.location
      ].filter(Boolean).join(' | ');
      doc.fontSize(10).font('Helvetica').text(contactLine, { align: 'center' });

      if (resume.contactInfo.linkedin || resume.contactInfo.github) {
        const links = [
          resume.contactInfo.linkedin,
          resume.contactInfo.github
        ].filter(Boolean).join(' | ');
        doc.fontSize(9).text(links, { align: 'center' });
      }

      doc.moveDown(1);

      // Professional Summary
      if (resume.summary) {
        addSectionHeader(doc, 'PROFESSIONAL SUMMARY');
        doc.fontSize(10).font('Helvetica').text(resume.summary, {
          align: 'justify',
          lineGap: 2
        });
        doc.moveDown(0.8);
      }

      // Experience
      if (resume.experience && resume.experience.length > 0) {
        addSectionHeader(doc, 'PROFESSIONAL EXPERIENCE');
        resume.experience.forEach((exp, index) => {
          doc.fontSize(11).font('Helvetica-Bold').text(exp.position, { continued: false });
          doc.fontSize(10).font('Helvetica-Oblique').text(
            `${exp.company}${exp.location ? ' | ' + exp.location : ''}`,
            { continued: true }
          );
          doc.font('Helvetica').text(
            `    ${exp.startDate} - ${exp.endDate}`,
            { align: 'right' }
          );
          doc.moveDown(0.3);

          if (exp.bullets && exp.bullets.length > 0) {
            exp.bullets.forEach(bullet => {
              doc.fontSize(10).font('Helvetica')
                .text('• ', { continued: true, indent: 20 })
                .text(bullet, { indent: 30, lineGap: 1 });
              doc.moveDown(0.2);
            });
          }

          if (index < resume.experience.length - 1) {
            doc.moveDown(0.5);
          }
        });
        doc.moveDown(0.8);
      }

      // Education
      if (resume.education && resume.education.length > 0) {
        addSectionHeader(doc, 'EDUCATION');
        resume.education.forEach((edu) => {
          doc.fontSize(11).font('Helvetica-Bold').text(edu.institution, { continued: true });
          doc.font('Helvetica').text(`    ${edu.graduationDate || ''}`, { align: 'right' });

          let degreeLine = edu.degree;
          if (edu.field) degreeLine += ` in ${edu.field}`;
          if (edu.gpa) degreeLine += ` | GPA: ${edu.gpa}`;

          doc.fontSize(10).font('Helvetica').text(degreeLine);
          doc.moveDown(0.5);
        });
        doc.moveDown(0.3);
      }

      // Skills
      if (resume.skills) {
        addSectionHeader(doc, 'SKILLS');
        if (resume.skills.technical && resume.skills.technical.length > 0) {
          doc.fontSize(10).font('Helvetica-Bold').text('Technical: ', { continued: true });
          doc.font('Helvetica').text(resume.skills.technical.join(', '));
          doc.moveDown(0.3);
        }
        if (resume.skills.soft && resume.skills.soft.length > 0) {
          doc.fontSize(10).font('Helvetica-Bold').text('Soft Skills: ', { continued: true });
          doc.font('Helvetica').text(resume.skills.soft.join(', '));
        }
        doc.moveDown(0.8);
      }

      // Projects
      if (resume.projects && resume.projects.length > 0) {
        addSectionHeader(doc, 'PROJECTS');
        resume.projects.forEach((project, index) => {
          doc.fontSize(11).font('Helvetica-Bold').text(project.name);
          if (project.technologies && project.technologies.length > 0) {
            doc.fontSize(9).font('Helvetica-Oblique').text(
              `Technologies: ${project.technologies.join(', ')}`
            );
          }
          doc.moveDown(0.2);

          if (project.description) {
            doc.fontSize(10).font('Helvetica').text(project.description);
            doc.moveDown(0.2);
          }

          if (project.bullets && project.bullets.length > 0) {
            project.bullets.forEach(bullet => {
              doc.fontSize(10).font('Helvetica')
                .text('• ', { continued: true, indent: 20 })
                .text(bullet, { indent: 30, lineGap: 1 });
              doc.moveDown(0.2);
            });
          }

          if (index < resume.projects.length - 1) {
            doc.moveDown(0.5);
          }
        });
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

function addSectionHeader(doc, title) {
  doc.fontSize(12).font('Helvetica-Bold').text(title);
  doc.moveTo(50, doc.y).lineTo(562, doc.y).stroke();
  doc.moveDown(0.5);
}

module.exports = { generatePDF };
