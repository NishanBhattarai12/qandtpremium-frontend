import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { FaEdit } from 'react-icons/fa';
import { setTokens } from '@/store/authSlice';
import { FaUser, FaPlane, FaCalendarAlt, FaEnvelope, FaComment, FaCheckCircle, FaExclamationCircle, FaHourglassHalf, FaTimesCircle, FaCreditCard, FaMapMarkerAlt, FaBriefcase, FaIdCard, FaEye, FaUpload, FaFileAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Dashboard = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [flightsData, setFlightsData] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [currentTaxReturnId, setCurrentTaxReturnId] = useState(null);

  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const [activeContent, setActiveContent] = useState("profile");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });

  const fetchTaxReturnsData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/taxreturn/user-tax-return-requests`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tax returns data');
      }

      const taxReturnsData = await response.json();
      setTaxReturnsData(taxReturnsData);
    } catch (error) {
      console.error('An error occurred while fetching flights data:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    let err = false;
    if ((formData.password || formData.confirmPassword) && (formData.password !== formData.confirmPassword)) {
      setPasswordError('Passwords do not match');
      err = true;
    }
    if (formData.name == '') {
      err = true;
      setNameError('Name is required');
    }
    if (err) {
      return;
    }

    setNameError('');
    setPasswordError('');
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/change-profile-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        dispatch(setTokens({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
              name: formData.name,
              email: user.email,
              id: user.id
            }
          }));
        setSuccessMessage('Profile updated successfully');
      } else {
        setErrorMessage('Profile update failed');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Profile update failed');
    }
  };

  const [taxReturnsData, setTaxReturnsData] = useState([]);

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };

  const handleCloseModal = () => {
    setSelectedEntry(null);
  };

  const handleOpenUploadModal = (tax_return_id) => {
    setCurrentTaxReturnId(tax_return_id)
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    setFile(null);
    setCurrentTaxReturnId(null);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
  
    const fileFormData = new FormData();
    fileFormData.append('file', file);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/files/file-upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: fileFormData
      });
  
      const data = await response.json();
      setFile(data.fileid);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileSubmit = async (e) => {
    console.log(currentTaxReturnId);
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file_id', file);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/taxreturn/update-tax-return-file/${currentTaxReturnId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          body: formData
        });
    
        const data = await response.json();
        setSuccessMessage('File uploaded successfully');
        fetchTaxReturnsData();
        handleCloseUploadModal();
      } catch (error) {
        setErrorMessage('File upload failed');
        console.error('Error uploading file:', error);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="text-green-500" />;
      case "in_progress":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "pending":
        return <FaExclamationCircle className="text-orange-500" />;
      case "invalid_file":
        return <FaTimesCircle className="text-red-500" />;
      case "new_file_uploaded":
        return <FaUpload className="text-blue-500" />;
      default:
        return null;
    }
  }

  const getStatusText = (status) => {
    return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  };

  const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  useEffect(() => {
    const fetchFlightsData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/flights/user-flights`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch flights data');
        }

        const flightsData = await response.json();
        setFlightsData(flightsData);
      } catch (error) {
        console.error('An error occurred while fetching flights data:', error);
      }
    };

    fetchFlightsData();
    fetchTaxReturnsData();
  }, []);

  useEffect(() => {
    const { content } = router.query;
    if(content != 'flights' && content != 'tax' && content != 'profile' && content != 'change-profile-details') {
      setActiveContent('profile');
    } else {
      setActiveContent(content);
    }
  }, [router.query]);

  const renderContent = () => {
    switch (activeContent) {
      case "profile":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl text-gray-700 font-bold">My Profile</h2>
            <p className="text-gray-600">Name: {user?.name}</p>
            <p className="text-gray-600">Email: {user?.email}</p>
            <button
              className="bg-[#33AE64] hover:bg-[#299755] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
              onClick={() => {
                setActiveContent("change-profile-details");
              }}
            >
              <FaEdit className="text-white" />
              <span>Change Profile Details</span>
            </button>
          </div>
        );
        case "change-profile-details":
          return (
            <div className="space-y-4">
              <h2 className="text-2xl text-gray-700 font-bold">Change Profile Details</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {nameError && <p className="text-red-500 mt-2">{nameError}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="password">
                    New Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="New password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-[#33AE64] hover:bg-[#299755] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Update Profile
                  </button>
                </div>
              </form>

              {errorMessage && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  {successMessage}
                </div>
              )}
            </div>
          );
      case "flights":
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedFlights = flightsData.slice(startIndex, startIndex + itemsPerPage);
        return (
          <div className="space-y-4">
            <h2 className="text-2xl text-gray-700 font-bold">My Flights Booking</h2>
            {paginatedFlights.length === 0 ? (
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-center text-gray-700 font-semibold">No bookings</p>
              </div>
            ) : (
              paginatedFlights.map((flight, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between flex-wrap">
                      <img src={flight.logo_url} alt={flight.airline} className="h-8 mb-2 sm:mb-0" />
                      <span className="text-lg text-gray-700 font-semibold mb-2 sm:mb-0">{flight.airline}</span>
                      <span className={`px-2 py-1 rounded-full text-sm ${flight.status === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
                        {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="mb-2 sm:mb-0">
                        <p className="text-sm text-gray-500">From</p>
                        <p className="font-medium text-gray-600">{flight.departure_location}</p>
                      </div>
                      <FaPlane className="text-blue-500 my-2 sm:my-0 transform rotate-90 sm:rotate-0" />
                      <div>
                        <p className="text-sm text-gray-500">To</p>
                        <p className="font-medium text-gray-600">{flight.arrival_location}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="mb-2 sm:mb-0">
                        <p className="text-sm text-gray-500">Departure</p>
                        <p className="font-medium text-gray-600">{new Date(flight.departure_time).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Arrival</p>
                        <p className="font-medium text-gray-600">{new Date(flight.arrival_time).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="mb-2 sm:mb-0">
                        <p className="text-sm text-gray-500">Flight</p>
                        <p className="font-medium text-gray-600">{flight.flight_number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Aircraft</p>
                        <p className="font-medium text-gray-600">{flight.airplane_name}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="mb-2 sm:mb-0">
                        <p className="text-sm text-gray-500">Booking Date</p>
                        <p className="font-medium text-gray-600">{new Date(flight.booking_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium text-green-600">${flight.price}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Payment ID: {flight.stripe_payment_id}</p>
                  </div>
                </div>
              ))
            )}
            {renderPagination(flightsData.length)}
          </div>
        );
      case "tax":
        const taxStartIndex = (currentPage - 1) * itemsPerPage;
        const paginatedTaxReturns = taxReturnsData.slice(taxStartIndex, taxStartIndex + itemsPerPage);
        return (
          <>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">My Tax Returns</h2>
              {paginatedTaxReturns.length === 0 ? (
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-center text-gray-700 font-semibold">No Tax Returns</p>
                </div>
              ): (
                paginatedTaxReturns.map((entry, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                    role="article"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold">{`${entry.first_name} ${entry.last_name}`}</h2>
                      <div className="flex items-center">
                        {getStatusIcon(entry.status)}
                        <span className="ml-2 text-sm font-medium">{getStatusText(entry.status)}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2 flex items-center"><FaCalendarAlt className="mr-2" /><span className="font-medium">Date of Birth:</span> {entry.dob}</p>
                    <p className="text-gray-600 mb-2 flex items-center"><FaMapMarkerAlt className="mr-2" /><span className="font-medium">Address:</span> {entry.address}</p>
                    <p className="text-gray-600 mb-2 flex items-center"><FaIdCard className="mr-2" /><span className="font-medium">Tax Number:</span> {entry.tax_number}</p>
                    <p className="text-gray-600 mb-2 flex items-center"><FaBriefcase className="mr-2" /><span className="font-medium">Job Title:</span> {entry.job_title}</p>
                    <p className="text-gray-600 mb-4 flex items-center"><FaCreditCard className="mr-2" /><span className="font-medium">Payment ID:</span> {entry.payment_id}</p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleEntryClick(entry)}
                        className="bg-[#33AE64] hover:bg-[#299755] text-white px-4 py-2 rounded transition-colors duration-300 flex items-center"
                        aria-label="View details"
                      >
                        <FaEye className="mr-2" /> View Details
                      </button>
                      {entry.status === 'invalid_file' && (
                        <button
                          onClick={() => handleOpenUploadModal(entry.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center"
                          aria-label="Upload new file"
                        >
                          <FaUpload className="mr-2" /> Upload New File
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
              {renderPagination(taxReturnsData.length)}
            </div>
            {selectedEntry && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
                <div className="bg-white rounded-lg p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                  <h2 className="text-2xl font-bold mb-4 flex items-center"><FaIdCard className="mr-2" /> Detailed Information</h2>
                  <p className="mb-2 flex items-center"><FaIdCard className="mr-2" /><span className="font-medium">Name:</span> {`${selectedEntry.first_name} ${selectedEntry.last_name}`}</p>
                  <p className="mb-2 flex items-center"><FaCalendarAlt className="mr-2" /><span className="font-medium">Date of Birth:</span> {selectedEntry.dob}</p>
                  <p className="mb-2 flex items-center"><FaMapMarkerAlt className="mr-2" /><span className="font-medium">Address:</span> {selectedEntry.address}</p>
                  <p className="mb-2 flex items-center"><FaIdCard className="mr-2" /><span className="font-medium">Tax Number:</span> {selectedEntry.tax_number}</p>
                  <p className="mb-2 flex items-center"><FaBriefcase className="mr-2" /><span className="font-medium">Job Title:</span> {selectedEntry.job_title}</p>
                  <p className="mb-2 flex items-center"><FaEnvelope className="mr-2" /><span className="font-medium">Message:</span> {selectedEntry.message}</p>
                  <p className="mb-2 flex items-center"><FaFileAlt className="mr-2" /><span className="font-medium">File Url:</span> <a className="hover:underline text-blue-800" target="_blank" href={selectedEntry.file['filepath']}>Link</a></p>
                  <p className="mb-2 flex items-center"><FaCreditCard className="mr-2" /><span className="font-medium">Payment ID:</span> {selectedEntry.payment_id}</p>
                  <p className="mb-2 flex items-center"><FaComment className="mr-2" /><span className="font-medium">Remarks:</span> {selectedEntry.remarks ? selectedEntry.remarks : '-'}</p>
                  <p className="mb-4 flex items-center">
                    {getStatusIcon(selectedEntry.status)}
                    <span className="ml-2 font-medium">Status:</span> {getStatusText(selectedEntry.status)}
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {isUploadModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={handleCloseUploadModal}>
                <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                  <h2 className="text-2xl font-bold mb-4 flex items-center"><FaUpload className="mr-2" /> Upload New File</h2>
                  <form onSubmit={handleFileSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaFileAlt className="mr-2" /> Choose a file
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={handleCloseUploadModal}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300 flex items-center"
                      >
                        <FaEye className="mr-2" /> Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center"
                        disabled={!file}
                      >
                        <FaUpload className="mr-2" /> Upload
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">Welcome! Select a topic to view details.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3 bg-gray-50 p-6 space-y-4">
            <button
              className={`w-full flex items-center justify-start space-x-3 p-3 rounded-lg transition duration-300 ${
                activeContent === "profile" || activeContent == "change-profile-details"
                  ? "bg-[#64AF33] text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveContent("profile");
                setCurrentPage(1);
              }}
              aria-label="View My Profile"
            >
              <FaUser className="text-xl" />
              <span className="text-gray-700">My Profile</span>
            </button>
            <button
              className={`w-full flex items-center justify-start space-x-3 p-3 rounded-lg transition duration-300 ${
                activeContent === "flights"
                  ? "bg-[#64AF33] text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveContent("flights");
                setCurrentPage(1);
              }}
              aria-label="View My Flights Booking"
            >
              <FaPlane className="text-xl" />
              <span className="text-gray-700">My Flights Booking</span>
            </button>
            <button
              className={`w-full flex items-center justify-start space-x-3 p-3 rounded-lg transition duration-300 ${
                activeContent === "tax"
                  ? "bg-[#64AF33] text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveContent("tax");
                setCurrentPage(1);
              }}
              aria-label="View My Tax Returns"
            >
              <FaFileAlt className="text-xl" />
              <span className="text-gray-700">My Tax Returns</span>
            </button>
          </div>
          <div className="w-full sm:w-2/3 p-6 transition-all duration-300 ease-in-out">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;