import express from 'express';
import displayInvoice from './controller/invoiceController.js'; 
import getInvoiceById from './service/invoiceService.js'
import generatePDF from './service/pdfService.js'
import cors from 'cors';
const app = express();
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:10000',
  methods: 'GET,POST,PUT,DELETE', 
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 5001;
app.get('/invoice/:id', displayInvoice);
app.get('/pdf/invoice/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
      const invoiceData = await getInvoiceById(id);
  
      // Generate PDF
      const filePath = await generatePDF(invoiceData, id);
  
      // Serve the PDF
      await res.download(filePath, `invoice_${id}.pdf`, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Internal Server Error');
        }
        // Clean up the file after sending
        // fs.remove(filePath);
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Internal Server Error');
    }
  });
// Route to handle the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
