const ErrorResponse = require("../utils/errorResponse");
const Mobile = require("../model/Mobile");
const asyncHandler = require("../middleware/async");
//To get the file name extension line .jpg,.png
const path = require("path");


//--------------------CREATE Mobile------------------

exports.createMobile = asyncHandler(async (req, res, next) => {

  const mobile = await Mobile.create(req.body);

  if (!mobile) {
    return next(new ErrorResponse("Error adding mobile"), 404);
  }

  res.status(201).json({
    success: true,
    data: mobile,
  });
});

//-------------------Display all mobiles

exports.getMobiles = asyncHandler(async (req, res, next) => {
    const mobiles = await Mobile.find({});
  
    res.status(201).json({
      success: true,
      count: mobiles.length,
      data: mobiles,
    });
  });

  // -----------------FIND Mobile BY ID-------------------

exports.getMobileById = asyncHandler(async (req, res, next) => {
    const mobile = await Mobile.findById(req.params.id);
  
    if (!mobile) {
      return next(new ErrorResponse("Mobile not found"), 404);
    }
  
    res.status(200).json({
      success: true,
      data: mobile,
    });
  });

  // -----------------DELETE MOBILE------------------------

exports.deleteMobile = asyncHandler(async (req, res, next) => {
    const mobile = await Mobile.findById(req.params.id);
  
    if (!mobile) {
      return next(new ErrorResponse(`No mobile found `), 404);
    }
  
    await mobile.remove();
  
    res.status(200).json({
      success: true,
      count: mobile.length,
      data: {},
    });
  });

  // ------------------UPLOAD IMAGE-----------------------

exports.MobilePhotoUpload = asyncHandler(async (req, res, next) => {
    const mobile = await Mobile.findById(req.params.id);
  
    console.log(mobile);
    if (!mobile) {
      return next(new ErrorResponse(`No mobile found with ${req.params.id}`), 404);
    }
  
  
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }
  
    const file = req.files.file;
  
    // Make sure the image is a photo and accept any extension of an image
    // if (!file.mimetype.startsWith("image")) {
    //   return next(new ErrorResponse(`Please upload an image`, 400));
    // }
  
    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    file.name = `photo_${mobile.id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.err(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
  
      //insert the filename into database
      await Mobile.findByIdAndUpdate(req.params.id, {
        photo: file.name,
      });
    });
  
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });