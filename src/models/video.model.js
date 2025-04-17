import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  videofile: {
    type: String, // cloudinary url
    required: true,
  },

  thambnail: {
    type: String,
    required: true,
  },

  tital: {
    type: String,
    required: true,
  },
 
  videofile: {
    type: String,
    required: true,
  },

  discription: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  views: {
    type: Number,
    default: 0,
  },

  ispublishad: {
    type: Boolean,
    default: true,
  },

  ownear: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

videoSchema.plugin(mongooseAggrygtepaginate);

export const video = mongoose.model("video", videoSchema);
