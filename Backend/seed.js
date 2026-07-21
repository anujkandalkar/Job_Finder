import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Job from "./models/Job.js";

dotenv.config();

const sampleJobs = [
  {
    title: "Senior Full Stack Engineer",
    company: "TechNova Solutions",
    location: "Remote",
    category: "IT",
    type: "Full Time",
    salary: "$120,000 - $140,000",
    experience: "3-5 Years",
    description: "We are seeking an experienced Full Stack Engineer proficient in React, Node.js, and MongoDB to build high-scale web applications."
  },
  {
    title: "Frontend React Developer",
    company: "PixelCraft Studios",
    location: "New York, NY",
    category: "IT",
    type: "Full Time",
    salary: "$95,000 - $110,000",
    experience: "2-4 Years",
    description: "Join our vibrant creative team building responsive, user-friendly frontend interfaces with React 19, Vite, and Tailwind CSS."
  },
  {
    title: "UI/UX Product Designer",
    company: "Designify",
    location: "San Francisco, CA",
    category: "Design",
    type: "Remote",
    salary: "$105,000 - $125,000",
    experience: "2+ Years",
    description: "Craft beautiful user journeys, wireframes, and interactive prototypes for leading enterprise SaaS platforms."
  },
  {
    title: "Digital Marketing Specialist",
    company: "GrowthX Agency",
    location: "Chicago, IL",
    category: "Marketing",
    type: "Full Time",
    salary: "$70,000 - $85,000",
    experience: "1-3 Years",
    description: "Drive multi-channel SEO, PPC campaigns, and content strategies to maximize brand visibility and user acquisition."
  },
  {
    title: "Backend Node.js Architect",
    company: "DataCloud Inc.",
    location: "Austin, TX",
    category: "IT",
    type: "Full Time",
    salary: "$130,000 - $155,000",
    experience: "5+ Years",
    description: "Architect robust REST and GraphQL microservices, optimize Mongoose queries, and maintain cloud infrastructure."
  },
  {
    title: "Content & Copywriter Intern",
    company: "MediaHive",
    location: "Remote",
    category: "Marketing",
    type: "Internship",
    salary: "$25/hr",
    experience: "Entry Level",
    description: "Write engaging blog posts, newsletter content, and social media copy alongside senior marketing strategists."
  },
  {
    title: "Financial Analyst",
    company: "Apex Capital",
    location: "Boston, MA",
    category: "Finance",
    type: "Full Time",
    salary: "$85,000 - $100,000",
    experience: "2-4 Years",
    description: "Perform financial modeling, quarterly reporting, and market research for growth-stage tech startups."
  },
  {
    title: "HR & Talent Acquisition Lead",
    company: "PeopleFirst Tech",
    location: "Seattle, WA",
    category: "HR",
    type: "Part Time",
    salary: "$50,000 - $65,000",
    experience: "3+ Years",
    description: "Oversee end-to-end recruitment, developer candidate screening, and employee onboarding processes."
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing jobs & users
    await Job.deleteMany({});
    await User.deleteMany({});
    console.log("Cleared existing jobs and users collection.");

    // Create default Admin User
    const adminPasswordHash = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      name: "Admin Lead",
      email: "admin@jobfinder.com",
      password: adminPasswordHash,
      role: "admin"
    });
    console.log(`Created Admin account: ${adminUser.email} (Password: admin123)`);

    // Create default Job Seeker User
    const userPasswordHash = await bcrypt.hash("user123", 10);
    const seekerUser = await User.create({
      name: "Alex Johnson",
      email: "user@jobfinder.com",
      password: userPasswordHash,
      role: "user"
    });
    console.log(`Created Job Seeker account: ${seekerUser.email} (Password: user123)`);

    // Insert sample jobs
    const insertedJobs = await Job.insertMany(sampleJobs);
    console.log(`Successfully seeded ${insertedJobs.length} sample jobs into database!`);

    mongoose.connection.close();
    console.log("Database seed complete.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
