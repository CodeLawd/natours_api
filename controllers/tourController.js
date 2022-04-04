import Tour from "../model/tourModel.js";

export default {
  getAllTours: async (req, res) => {
    try {
      // BUILD QUERY
      const queryObj = { ...req.query };
      const excludedFields = ["sort", "fields", "page", "limit"];
      excludedFields.forEach((el) => delete queryObj[el]);

      //  Advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      let query = Tour.find(JSON.parse(queryStr));

      // SORTING THE QUERY
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort("-" + sortBy);
      } else {
        query = query.sort("-createdAt");
      }

      // PROJECTING ONLY CERTAIN FIELDS
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }

      const tours = await query;

      // for (const query in req.query) {
      //   tours = await Tour.find().where(query).equals(req.query[query]);
      // }

      res.status(200).json({
        status: "success",
        totalResult: tours.length,
        data: tours,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: err,
      });
    }
  },

  getSingleTour: async (req, res) => {
    try {
      const tour = await Tour.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: tour,
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: `Tour with id '${req.params.id}' not found`,
      });
    }
  },

  createTour: async (req, res) => {
    try {
      const tour = await Tour.create(req.body);
      res.status(201).json({
        status: "success",
        data: tour,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: err,
      });
    }
  },

  updateTour: async (req, res) => {
    try {
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: "success",
        data: tour,
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: `Tour with id '${req.params.id}' not found`,
      });
    }
  },

  deleteTour: async (req, res) => {
    try {
      await Tour.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(404).json({
        status: "failed",
        message: `Tour with id '${id}' not found`,
      });
    }
  },
};
