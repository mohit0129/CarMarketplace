import React, { useState } from 'react';
import axios from 'axios';
import AdminAuth from './AdminAuth'; // Import the new AdminAuth component
import API_BASE_URL from '../config/apiConfig';

const ReportDesign = () => {
  const [reportScope, setReportScope] = useState('monthly'); // Added report scope state
  const [reportType, setReportType] = useState('overall');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const generateReport = async () => {
    try {
      const params = { 
        year, 
        reportType, 
        reportScope 
      };
  
      if (reportScope === 'monthly') {
        params.month = month;
      }
  
      // Ensure this is the correct endpoint
      const response = await axios.get(`${API_BASE_URL}/api/reports`, {
        params,
        responseType: 'blob', // Expecting a PDF file as the response
      });
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      const filename =
        reportScope === 'yearly'
          ? `yearly_report_${year}.pdf`
          : `monthly_report_${month}_${year}.pdf`;
  
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Failed to generate report. Please try again.');
    }
  };
  

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Generate Report
        </h2>

        {/* Report Scope */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Report Scope</label>
          <select
            value={reportScope}
            onChange={(e) => setReportScope(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Report Type */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="overall">Overall Report</option>
            <option value="sales">Sales Report</option>
            <option value="rentals">Rental Report</option>
            <option value="financials">Financial Report</option>
            <option value="customerfeedback">Customer Feedback Report</option>
          </select>
        </div>

        {/* Month Selection - Shown only for Monthly Reports */}
        {reportScope === 'monthly' && (
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Year Selection */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          >
            {[...Array(5)].map((_, i) => {
              const currentYear = new Date().getFullYear();
              return (
                <option key={currentYear - i} value={currentYear - i}>
                  {currentYear - i}
                </option>
              );
            })}
          </select>
        </div>

        {/* Generate Report Button */}
        <button
          onClick={generateReport}
          className="w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default AdminAuth(ReportDesign);
