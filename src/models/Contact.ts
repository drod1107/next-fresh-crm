import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: String,
  phoneNumber: String,
  altPhone: String,
  email: { type: String, required: true, unique: true },
  labels: [String],
  notes: String,
  documents: [{
    name: String,
    url: String,
    label: String
  }],
}, { timestamps: true });  // This adds createdAt and updatedAt fields

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);