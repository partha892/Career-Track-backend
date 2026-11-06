import { Application } from "../models/Application.js";


export const addApplication = async (req, res) => {
    try {
        const {
            companyName,
            companyDescription,
            companyLink,
            jobPosition,
            jobCriteria,
            role,
            skills,
            jobDescription,
            salary,
            joinLocation,
            selectionProcess,
            status
        } = req.body;

        // Required field validation
        if (
            !companyName ||
            !jobPosition ||
            !role ||
            !skills ||
            !jobDescription
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided.",
            });
        }

        // Skills validation
        if (
            !Array.isArray(skills) ||
            skills.length === 0 ||
            skills.some(skill => typeof skill !== "string" || !skill.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid skills.",
            });
        }

        // Create new application
        const newApplication = new Application({
            companyName,
            companyDescription,
            companyLink,
            jobPosition,
            jobCriteria,
            role,
            skills,
            jobDescription,
            salary,
            joinLocation,
            selectionProcess,
            status,
            user: req.user.id
        });

        await newApplication.save();

        return res.status(201).json({
            success: true,
            message: "Application added successfully.",
            data: newApplication
        });

    } catch (error) {
        console.error("Add Application Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedApplication = await Application.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({
                success: false,
                message: "Application not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Application updated successfully.",
            data: updatedApplication
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedApplication = await Application.findOneAndDelete({
            _id: id,
            user: req.user.id
        });

        if (!deletedApplication) {
            return res.status(404).json({
                success: false,
                message: "Application not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Application deleted successfully."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getApplication = async (req, res) => {
    try {
        const { id } = req.params;

        const application = await Application.findOne({
            _id: id,
            user: req.user.id
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: application
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const allApplication = async (req, res) => {
    try {
        const applications = await Application.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            total: applications.length,
            data: applications
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatus = [
            "Applied",
            "Shortlisted",
            "Interview",
            "Selected",
            "Rejected",
            "Offer"
        ];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status."
            });
        }

        const application = await Application.findOneAndUpdate(
            {
                _id: id,
                user: req.user.id
            },
            { status },
            { new: true, runValidators: true }
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Application status updated successfully.",
            data: application
        });

    } catch (error) {
        console.error("Update Application Status Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};