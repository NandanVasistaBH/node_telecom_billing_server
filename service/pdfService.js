import PDFDocument from 'pdfkit';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatePDF = async (invoiceData, id) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, '..', 'static', `invoice_${id}.pdf`);
  
  // Pipe the PDF into a file
  doc.pipe(fs.createWriteStream(filePath));

  // Add content to the PDF
  doc.fontSize(25).text('Invoice', { align: 'center' });
  doc.moveDown();
  
  doc.fontSize(18).text(`Invoice ID: ${id}`);
  doc.fontSize(14).text(`Customer Name: ${invoiceData.customerDTO.name}`);
  doc.text(`Customer Email: ${invoiceData.customerDTO.custEmail}`);
  doc.text(`Customer Phone: ${invoiceData.customerDTO.custPhoneNo}`);
  doc.moveDown();

  doc.text(`Supplier: ${invoiceData.supplierDTO.name}`);
  doc.text(`Branch Location: ${invoiceData.supplierDTO.branchLoc}`);
  doc.text(`Branch Manager: ${invoiceData.supplierDTO.branchManager}`);
  doc.text(`Branch Email: ${invoiceData.supplierDTO.branchEmail}`);
  doc.text(`Branch Phone: ${invoiceData.supplierDTO.branchPhoneNo}`);
  doc.moveDown();

  doc.text(`Subscription Type: ${invoiceData.subscription.type}`);
  doc.text(`Description: ${invoiceData.subscription.description}`);
  doc.text(`Price: $${invoiceData.subscription.price}`);
  doc.text(`Number of Days: ${invoiceData.subscription.noOfDays}`);
  doc.moveDown();

  doc.text(`Amount Paid: $${invoiceData.amountPaid}`);
  doc.text(`Tax: $${invoiceData.tax}`);
  doc.text(`Invoice Issue Date: ${invoiceData.invoiceIssueDate}`);
  doc.text(`Last Updated At: ${invoiceData.lastUpdatedAt}`);

  // Finalize the PDF and end the stream
  doc.end();
  
  return filePath;
};

export default generatePDF;
