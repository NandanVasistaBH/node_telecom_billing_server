// invoiceController.js
import  getInvoiceById  from '../service/invoiceService.js';

const displayInvoice = async (req, res) => {
  const id = req.params.id; 

  try {
    const invoice = await getInvoiceById(id);
    res.json(invoice); 
  } catch (error) {
    console.error('Error displaying invoice:', error);
    res.status(500).send('Internal Server Error');
  }
};

export default displayInvoice;
