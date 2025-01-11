/* eslint-disable prettier/prettier */
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';

import { Invoice } from '~/schema/invoice';


const generateHtml = (invoice: Invoice, subtotal: number, total: number) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playwrite+AU+SA:wght@100..400&display=swap" rel="stylesheet">
  <style>
  @page { size: A4; margin: 4mm 5mm 5mm 4mm;}
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .invoice-container {
      width: 800px;
      margin: 20px auto;
      background: #fff;
      padding: 20px;
      border: 1px solid #ddd;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #000;
      padding-bottom: 10px;
    }
    .header .logo {
      font-size: 24px;
      font-weight: bold;
      display: flex;
      align-items: center;
    }
      .header .logo .img-logo {
      width: 60px;
      height: 60px;
      border-radius: 25px;
    }
    .header .logo span {
      display: block;
      font-size: 14px;
      color: #666;
    }
    .header .invoice-title {
      font-size: 36px;
      color: #fff;
      background: #000;
      padding: 10px 20px;
    }
    .details {
      margin: 20px 0;
    }
    .details .client-info,
    .details .invoice-info {
      width: 48%;
    }
    .details div {
      margin-bottom: 10px;
    }
    .details .client-info {
      float: left;
    }
    .details .invoice-info {
      float: right;
      text-align: right;
    }
    .clear {
      clear: both;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    table th,
    table td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    table th {
      background: #000;
      color: #fff;
      font-weight: bold;
    }
    table tbody tr:nth-child(even) {
      background: #f9f9f9;
    }
    .totals {
      margin-top: 20px;
      text-align: right;
    }
    .totals div {
      margin-bottom: 5px;
    }
    .totals .grand-total {
      font-size: 20px;
      font-weight: bold;
      background: #000;
      color: #fff;
      padding: 10px;
      display: inline-block;
    }
    .additional-info {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      background-color: #f1f1f1;
      font-size: 14px;
    }
    .footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-top: 20px;
    }
    .footer .thank-you {
      font-family: "Playwrite AU SA", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-size: 40px; /* Adjust size as per your preference */
  }
    .footer .qr-code img {
      width: 100px;
      height: 100px;
    }
        .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      color: rgba(0, 0, 0, 0.1);
      white-space: nowrap;
      pointer-events: none;
      user-select: none;
      opacity: 1;
    }

    .watermark img {
      max-width: 100%;
      max-height: 100%;
      opacity: 0.2;
      /* Reduce the opacity of the image */
      pointer-events: none;
      user-select: none;
    }
  </style>
</head>
<body>
  <div class="invoice-container">
  <div class="watermark">
      <img src="https://i.ibb.co/cYTtT5B/hk-logo.png">
    </div>
    <div class="header">
      <div class="logo">
        <div class="logoContainer">
        <img src="https://i.ibb.co/cYTtT5B/hk-logo.png" class="img-logo"/>
      </div>
      <div class="company-info">
        HK Enterprises
        <span>Tagline Here</span>
      </div>
      </div>
      <div class="invoice-title">Invoice</div>
    </div>

    <div class="details">
      <div class="client-info">
        <p>${invoice.recipient.name}</p>
        // <p>(00) 000-000</p>
        // <p>youremail@example.com</p>
        <p>Tax Id: ${invoice.recipient?.taxID}</p>
        <p>${invoice.recipient.address}</p>
      </div>
      <div class="invoice-info">
        <p>INVOICE NO #${invoice.invoiceNumber}</p>
        <p>Date: ${invoice.date}</p>
      </div>
      <div class="clear"></div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Qty</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
      ${invoice.items.map(
        (item) => `
        <tr>
          <td>${item.quantity}</td>
          <td>${item.name}</td>
          <td>₹${item.price}</td>
          <td>₹${Number(item.price) * Number(item.quantity)}</td>
        </tr>
        `
      )}
      </tbody>
    </table>

    <div class="totals">
      <div>SUBTOTAL: ₹${subtotal}</div>
      <!-- <div>TAX: 12%</div> -->
      <div class="grand-total">TOTAL: ₹${total}</div>
    </div>

    <div class="additional-info">
      <strong>Additional Notes:</strong>
      <p>You can add any extra details or information here.</p>
    </div>

    <div class="footer">
      <div class="thank-you">Thank You!</div>
      <div class="qr-code">
        <a href="https://www.qr-code-generator.com/solutions/text-qr-code/" target="_blank">
          <img src="https://media.gettyimages.com/id/828088276/vector/qr-code-illustration.jpg?s=612x612&w=0&k=20&c=FnA7agr57XpFi081ZT5sEmxhLytMBlK4vzdQxt8A70M=" alt="QR Code">
        </a>
      </div>
    </div>
  </div>
</body>
</html>

`;
  return html;
};

export const generateInvoicePdf = async (invoice: Invoice, subtotal: number, total: number) => {
  try {
    const { uri } = await Print.printToFileAsync({ html: generateHtml(invoice, subtotal, total) });

    const targetPath = FileSystem.documentDirectory + `invoice-${invoice.invoiceNumber}.pdf`;

    await FileSystem.moveAsync({
      from: uri,
      to: targetPath,
    });
    console.log(targetPath);

    return targetPath;
  } catch (error) {
    console.error('Error:', error);
  }
};
