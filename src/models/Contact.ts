import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,  // Changed to String to match the type
  },
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
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);