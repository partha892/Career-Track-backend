import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyDescription: {
      type: String,
      trim: true,
    },

    companyLink: {
      type: String,
      trim: true,
    },

    jobPosition: {
      type: String,
      trim: true,
      required: true,
    },

    jobCriteria: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      trim: true,
      required: true,
    },

    skills: {
      type: [String],
      required: true,
      trim: true,
    },

    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: Number,
    },


    joinLocation: {
      type: String,
      trim: true,
    },

    selectionProcess: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Interview", "Selected", "Rejected", "Offer"],
      default: "Applied",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Application = mongoose.model("Application", applicationSchema);