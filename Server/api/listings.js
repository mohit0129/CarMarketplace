// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const CarListing = require('../models/CarListing'); // Path to CarListing model

// const router = express.Router();

// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // File filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|webp/i;
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (mimetype) {
//     return cb(null, true);
//   }
//   cb(new Error('Error: Images only!'), false);
// };

// // Configure multer upload
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// });

// // Single file upload route
// router.post('/upload/single', (req, res) => {
//   upload.single('photo')(req, res, async (err) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).json({
//         message: 'Multer upload error',
//         error: err.message
//       });
//     }

//     if (err) {
//       return res.status(400).json({
//         message: 'Upload failed',
//         error: err.message
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         message: 'No file uploaded',
//         details: [
//           'Ensure field name is exactly "photo"',
//           'Verify file is selected',
//           'Check content type is multipart/form-data'
//         ]
//       });
//     }

//     try {
//       const fileUrl = `/uploads/${req.file.filename}`;

//       const newPhoto = new CarListing({
//         filename: req.file.filename,
//         url: fileUrl
//       });

//       await newPhoto.save();

//       res.status(200).json({
//         message: 'File uploaded successfully',
//         fileUrl: fileUrl,
//         photoId: newPhoto._id
//       });
//     } catch (error) {
//       console.error('Server Error:', error);
//       res.status(500).json({
//         message: 'Upload processing failed',
//         error: error.message
//       });
//     }
//   });
// });

// // Create a new car listing
// router.post('/listings', async (req, res) => {
//   try {
//     const newCarListing = new CarListing(req.body);
//     const savedListing = await newCarListing.save();

//     const listingResponse = savedListing.toObject();

//     const {
//       listing_id,
//       user_id,
//       owner,
//       RentSell,
//       make,
//       model,
//       year,
//       mileage,
//       price,
//       location,
//       condition,
//       listing_status,
//       date_posted,
//       date_updated,
//       images,
//       filename,
//       url,
//       certified,
//       priceBreakdown,
//       engine,
//       transmission,
//       fuelType,
//       seatingCapacity,
//       interiorColor,
//       exteriorColor,
//       carType,
//       vin,
//       serviceHistory,
//       extraFeatures,
//       certificationReport,
//       description
//     } = listingResponse;

//     res.status(201).json({
//       listing_id,
//       user_id,
//       owner,
//       RentSell,
//       make,
//       model,
//       year,
//       mileage,
//       price,
//       location,
//       condition,
//       listing_status,
//       date_posted,
//       date_updated,
//       images,
//       filename,
//       url,
//       certified,
//       priceBreakdown,
//       engine,
//       transmission,
//       fuelType,
//       seatingCapacity,
//       interiorColor,
//       exteriorColor,
//       carType,
//       vin,
//       serviceHistory,
//       extraFeatures,
//       certificationReport,
//       description
//     });
//   } catch (error) {
//     console.error('Error creating listing:', error);
//     res.status(500).json({
//       message: 'Error creating listing',
//       error: error.message
//     });
//   }
// });

// // Get all car listings
// router.get('/listings', async (req, res) => {
//   try {
//     const listings = await CarListing.find();
//     res.status(200).json(listings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get a single car listing by listing_id
// router.get('/listings/:id', async (req, res) => {
//   try {
//     const listingId = req.params.id; // Get the listing_id from the route parameter

//     // Find the listing by listing_id (not _id)
//     const listing = await CarListing.findOne({ listing_id: listingId });

//     if (!listing) {
//       return res.status(404).json({ message: 'Listing not found' });
//     }

//     res.status(200).json(listing);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// // Update a car listing by ID
// router.put('/listings/:id', async (req, res) => {
//   try {
//     const updatedListing = await CarListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedListing) {
//       return res.status(404).json({ message: 'Listing not found' });
//     }
//     res.status(200).json(updatedListing);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete a car listing by ID
// router.delete('/listings/:id', async (req, res) => {
//   try {
//     const deletedListing = await CarListing.findByIdAndDelete(req.params.id);
//     if (!deletedListing) {
//       return res.status(404).json({ message: 'Listing not found' });
//     }
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const CarListing = require('../models/CarListing'); // Path to CarListing model
const mongoose = require('mongoose');
const Review = require('../models/Review');

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB file size limit
}).array('images', 5);


router.post('/listings', upload, async (req, res) => {
  try {
    const imageFiles = req.files;
    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ message: 'At least one image file is required' });
    }

    const imagePaths = imageFiles.map((file) => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
    }));

    const newCarListing = new CarListing({
      ...req.body,
      images: imagePaths,
    });

    const savedListing = await newCarListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({
      message: 'Error creating listing',
      error: error.message,
    });
  }
});


// Get all car listings
router.get('/listings', async (req, res) => {
  try {
    const listings = await CarListing.find();
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single car listing by listing_id
// router.get('/listings/:id', async (req, res) => {
//   try {
//     const listingId = req.params.id; // Get the listing_id from the route parameter

//     // Find the listing by listing_id (not _id)
//     const listing = await CarListing.findOne({ listing_id: listingId });

//     if (!listing) {
//       return res.status(404).json({ message: 'Listing not found' });
//     }

//     res.status(200).json(listing);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.get('/listings/:id', async (req, res) => {
  try {
    const listingId = req.params.id;

    // Fetch car listing
    const listing = await CarListing.findOne({ listing_id: listingId });
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Calculate average rating
    const reviews = await Review.find({ car_id: listingId });
    const averageRating = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

    res.status(200).json({ ...listing._doc, averageRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.put('/listings/:id', upload, async (req, res) => {
  try {
    const listingId = req.params.id;

    // Find the listing by listing_id (not _id)
    const listing = await CarListing.findOne({ listing_id: listingId });
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // If new images are uploaded, handle them
    const imageFiles = req.files;
    if (imageFiles && imageFiles.length > 0) {
      // Delete old images from the server
      if (listing.images && listing.images.length > 0) {
        listing.images.forEach((image) => {
          const imagePath = path.join(__dirname, '../uploads', image.filename);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        });
      }

      // Update with new image paths
      const newImages = imageFiles.map((file) => ({
        url: `/uploads/${file.filename}`,
        filename: file.filename,
      }));
      req.body.images = newImages;
    }

    // Update listing fields
    const updatedFields = {
      ...req.body,
      date_updated: Date.now(),
    };

    const updatedListing = await CarListing.findOneAndUpdate(
      { listing_id: listingId },
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({
      message: 'Error updating listing',
      error: error.message,
    });
  }
});

// Update Car Status
router.put('/listings/:id', async (req, res) => {
  try {
      const { listing_status } = req.body;

      if (!listing_status) {
          return res.status(400).json({ error: 'Car status is required' });
      }

      const listing = await listing.findByIdAndUpdate(
          req.params.id,
          { listing_status },
          { new: true, runValidators: true }
      );

      if (!listing) {
          return res.status(404).json({ error: 'Listing not found' });
      }

      res.status(200).json({ message: 'Car status updated successfully', listing });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


// Delete a car listing by ID
router.delete('/listings/:id', async (req, res) => {
  try {
    const deletedListing = await CarListing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Delete associated image file if it exists
    if (deletedListing.image && deletedListing.image.filename) {
      const imagePath = path.join(__dirname, '../uploads', deletedListing.image.filename);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;