import emailjs from "@emailjs/browser";

/**
 * ส่ง email ผ่าน EmailJS
 * @param {Object} data - ข้อมูลจากฟอร์ม
 * @returns {Promise}
 */
export async function sendEmail(data) {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      from_name: data.name     || "",
      company:   data.company  || "",
      tel:       data.tel      || "",
      reply_to:  data.email    || "",
      product:   data.product  || "",
      qty:       data.qty      || "",
      message:   data.detail   || data.message || "",
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}