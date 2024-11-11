import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Car, Mail, User, MessageSquare } from "lucide-react";
// import './Contact.css';
// import './media.css';

const ContactUs = () => {
  document.title = "Contact | Mohit";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');
  const [validFields, setValidFields] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const validateField = (name, value) => {
    let isValid = true;
    switch (name) {
      case 'name':
        isValid = value.trim() !== '';
        break;
      case 'email':
        isValid = /\S+@\S+\.\S+/.test(value);
        break;
      case 'subject':
        isValid = value.trim() !== '';
        break;
      case 'message':
        isValid = value.trim() !== '';
        break;
      default:
        break;
    }
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const isValid = validateField(name, value);
    setValidFields({ ...validFields, [name]: isValid });

    setFormErrors({ ...formErrors, [name]: isValid ? '' : formErrors[name] });
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((field) => {
      const isValid = validateField(field, formData[field]);
      if (!isValid) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is invalid.`;
      }
    });
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormStatus('Submitting...');

    emailjs.send('service_isfonxb', 'template_zc2fn7i', formData, '89pcl6Blv6ZJ33wZk')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormStatus('');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setFormErrors({});
        setValidFields({
          name: false,
          email: false,
          subject: false,
          message: false
        });
        toast.success('Your message was sent, thank you!');
        toast.success('I will soon contact you');
      }, (error) => {
        console.log('FAILED...', error);
        setFormStatus('');
        toast.error('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-black text-white p-8">
          <div className="flex items-center space-x-4 mb-4">
            <Car size={36} />
            <div>
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p className="text-blue-100">We're here to assist you with your automotive needs</p>
            </div>
          </div>
        </div>
        <div className="p-8">
          {formStatus && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-md">
              {formStatus}
            </div>
          )}
          <form onSubmit={handleSubmit} id="contactForm" name="contactForm" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
                  <User size={18} className="mr-2" /> Name
                </label>
                <div className="relative">
                  <input type="text" name="name" id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} autoComplete="off" className={`w-full pl-10 py-2 px-3 border rounded-md ${formErrors.name ? 'border-red-500' : validFields.name ? 'border-green-500' : 'border-gray-300'}`}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail size={18} className="mr-2" /> Email
                </label>
                <div className="relative">
                  <input type="email" name="email" id="email" placeholder="Your Email" value={formData.email} onChange={handleChange} autoComplete="off" className={`w-full pl-10 py-2 px-3 border rounded-md ${formErrors.email ? 'border-red-500' : validFields.email ? 'border-green-500' : 'border-gray-300'}`} />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-gray-700 flex items-center">
                <Car size={18} className="mr-2" /> Subject
              </label>
              <div className="relative">
                <input type="text" name="subject" id="subject" placeholder="e.g., Inquiry about a specific car" value={formData.subject} onChange={handleChange} autoComplete="off" className={`w-full pl-10 py-2 px-3 border rounded-md ${formErrors.subject ? 'border-red-500' : validFields.subject ? 'border-green-500' : 'border-gray-300'}`} />
                <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {formErrors.subject && <p className="mt-1 text-sm text-red-500">{formErrors.subject}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center">
                <MessageSquare size={18} className="mr-2" /> Message
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  placeholder="Please provide details about your inquiry or request"
                  value={formData.message}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`w-full pl-10 py-2 px-3 border rounded-md ${formErrors.message ? 'border-red-500' : validFields.message ? 'border-green-500' : 'border-gray-300'}`}
                />
                <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
              </div>
              {formErrors.message && <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>}
            </div>
            <div>
              <button type="submit" className="w-full bg-black hover:bg-black text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default ContactUs;