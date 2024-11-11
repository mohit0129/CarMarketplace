import React from 'react';
import { X } from 'lucide-react';

export default function PrivacyPolicy({ isOpen, onClose }) {
  if (!isOpen) return null; // Return nothing if modal is closed

  return (
    <div className="fixed inset-0 bg-white text-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Privacy Policy</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="overflow-y-auto p-4">
              <h3 className="text-lg font-semibold mb-2">Last Updated: Aug 30, 2024</h3>

              <h4 className="text-lg font-semibold mt-4">1. Introduction</h4>
              <p>
                At ©CarConnect, we prioritize your privacy and are committed to protecting your personal data. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your personal information when you use our services, including purchasing, selling, or renting vehicles through our platform.
              </p>

              <h4 className="text-lg font-semibold mt-4">2. Information We Collect</h4>
              <ul className="list-disc pl-5">
                <li>Personal Identification Information: Name, contact details, address, payment information, and government-issued identification (if required for verification).</li>
                <li>Usage Data: Information on how you interact with our website, including pages visited, features used, and time spent on the platform.</li>
                <li>Device Information: Data about the devices you use to access our platform, such as IP address, browser type, and operating system.</li>
                <li>Location Data: With your consent, we may collect geolocation data for certain features, like showing nearby rental options.</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4">3. How We Use Your Information</h4>
              <ul className="list-disc pl-5">
                <li>To process transactions, including vehicle purchases, sales, and rentals.</li>
                <li>To improve and personalize your experience, including through tailored recommendations and support.</li>
                <li>For security purposes, to detect and prevent fraud, and to ensure compliance with our Terms & Conditions.</li>
                <li>To communicate with you about updates, promotions, and relevant information related to our services (with your consent).</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4">4. How We Share Your Information</h4>
              <p>We may share your data:</p>
              <ul className="list-disc pl-5">
                <li>With our trusted partners for transaction processing, customer support, and site analytics.</li>
                <li>With regulatory authorities or as required by law, such as in response to a subpoena or other legal process.</li>
                <li>In connection with a business transfer, such as a merger or acquisition.</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4">5. Security Measures</h4>
              <p>We implement industry-standard security measures to protect your data. However, no online platform can guarantee complete security.</p>

              <h4 className="text-lg font-semibold mt-4">6. Your Rights and Choices</h4>
              <ul className="list-disc pl-5">
                <li>Access and Correction: You may access and correct your personal information in your account settings.</li>
                <li>Deletion: You can request the deletion of your data where legally permissible.</li>
                <li>Opt-Out: You may opt out of marketing communications at any time.</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4">7. Data Retention</h4>
              <p>We retain personal data as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>

              <h4 className="text-lg font-semibold mt-4">8. Changes to this Privacy Policy</h4>
              <p>We may update this Privacy Policy periodically. We will notify you of any significant changes by posting the new policy on our website.</p>

              <h4 className="text-lg font-semibold mt-4">9. Contact Us</h4>
              <p>For any questions regarding this Privacy Policy, please contact us at [contact email or phone number].</p>
            </div>
          </div>
        </div>
  );
}
