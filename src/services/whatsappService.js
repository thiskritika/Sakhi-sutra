// services/whatsappService.js
export const sendWhatsAppMessage = (phoneNumber, message) => {
  // Format phone number (remove any non-digit characters)
  const formattedPhone = phoneNumber.replace(/\D/g, '');
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
  
  // Open in new tab
  window.open(whatsappUrl, '_blank');
};

export const generateOrderMessage = (orderDetails) => {
  const {
    orderId,
    customerName,
    products,
    total,
    deliveryAddress,
    estimatedDelivery
  } = orderDetails;

  let message = `🛍️ *Sakhi Sutra Order #${orderId}*\n\n`;
  message += `Hello ${customerName},\n\n`;
  message += `*Order Summary:*\n`;
  
  products.forEach((product, index) => {
    message += `${index + 1}. ${product.name} x${product.quantity} - ₹${product.price * product.quantity}\n`;
  });
  
  message += `\n*Total Amount:* ₹${total}\n`;
  message += `*Delivery Address:* ${deliveryAddress}\n`;
  message += `*Estimated Delivery:* ${estimatedDelivery}\n\n`;
  message += `Track your order: https://sakhisutra.com/track/${orderId}\n\n`;
  message += `Thank you for choosing handmade! ❤️`;
  
  return message;
};

export const generateOrderTrackingMessage = (orderId, status, updates) => {
  let message = `📦 *Order #${orderId} Status Update*\n\n`;
  message += `*Current Status:* ${status}\n\n`;
  message += `*Updates:*\n`;
  
  updates.forEach(update => {
    message += `✅ ${update.date}: ${update.description}\n`;
  });
  
  message += `\nFor any queries, reply to this message or call us at +91 98765 43210\n`;
  message += `Thank you for supporting women artisans! 🌸`;
  
  return message;
};