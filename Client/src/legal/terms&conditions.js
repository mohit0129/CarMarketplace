// TermsAndConditions.js
import React from 'react';
import { X } from 'lucide-react';

export default function TermsAndConditions({ isOpen, onClose }) {
  if (!isOpen) return null; // Return nothing if modal is closed

  return (
    <div className="fixed inset-0 bg-white text-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Terms & Conditions</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="overflow-y-auto p-4">
              <h3 className="text-lg font-semibold mb-2">Last Updated: Aug 30, 2024</h3>

              <h4 className="text-lg font-semibold mt-4">1. Acceptance of Terms</h4>
              <p>
                By using ©CarConnect, you agree to these Terms & Conditions. If you do not agree, you should not use our services.
              </p>

              <h4 className="text-lg font-semibold mt-4">2. Services Provided</h4>
              <p>
                CarConnect provides a platform for buying, selling, and renting second-hand vehicles. We act as an intermediary, connecting buyers, sellers, and renters. The specific terms of transactions are between users.
              </p>

              <h4 className="text-lg font-semibold mt-4">3. User Responsibilities</h4>
              <ul className="list-disc pl-5">
                <li>Accuracy of Information: Users agree to provide accurate and complete information when registering, listing, or transacting on the platform.</li>
                <li>Compliance: Users must comply with all applicable laws when using our services.</li>
                <li>No Unauthorized Use: Users are prohibited from using the platform for illegal activities or attempting to interfere with the platform's functionality.</li>
              </ul>

              <h4 className="text-lg font-semibold mt-4">4. Account Registration and Security</h4>
              <p>
                Users must register to use certain features. Users are responsible for maintaining the security of their accounts and notifying us of any unauthorized use.
              </p>

              <h4 className="text-lg font-semibold mt-4">5. Fees and Payment</h4>
              <p>
                We may charge fees for specific services, such as vehicle listings or rental transactions. Users agree to pay any applicable fees and understand that fees may change with notice.
              </p>

              <h4 className="text-lg font-semibold mt-4">6. Limitation of Liability</h4>
              <p>
                [Website Name] is not liable for any damages resulting from transactions, including vehicle conditions or user actions. All vehicles are sold or rented "as is," and users should independently verify vehicle quality.
              </p>

              <h4 className="text-lg font-semibold mt-4">7. Intellectual Property</h4>
              <p>
                All content on the website, including text, graphics, logos, and software, is the property of [Website Name] and protected by copyright and other laws. Users may not reproduce or distribute any content without permission.
              </p>

              <h4 className="text-lg font-semibold mt-4">8. Termination of Services</h4>
              <p>
                We reserve the right to suspend or terminate user accounts that violate our Terms & Conditions or for other reasons at our discretion.
              </p>

              <h4 className="text-lg font-semibold mt-4">9. Dispute Resolution</h4>
              <p>
                In case of disputes between users, we may offer mediation but are not responsible for resolving disputes. Legal disputes related to the platform will be subject to the laws and jurisdiction of [specified location].
              </p>

              <h4 className="text-lg font-semibold mt-4">10. Changes to Terms</h4>
              <p>
                We may revise these Terms & Conditions at any time. Continued use of our services constitutes acceptance of the updated terms.
              </p>

              <h4 className="text-lg font-semibold mt-4">11. Contact Us</h4>
              <p>
                If you have questions about these Terms & Conditions, please reach out to us at <a href="mailto:contact@carconnect.com"  className="text-black font-semibold hover:underline">contact@carconnect.com</a>.
              </p>
            </div>
      </div>
    </div>
  );
}
