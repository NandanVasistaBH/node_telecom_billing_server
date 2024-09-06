import axios from 'axios';

 const getInvoiceById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:10000/invoice/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching invoice:', error);
  }
};
export default getInvoiceById;