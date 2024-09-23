import mongoose from 'mongoose';

const DocSchema = new mongoose.Schema({
  doc_title: { type: String, required: true },
  pb_username: String,
  pb_email: String,
  labels: [String],
  notes: String,
  documents: [{
    name: String,
    url: String,
    label: String
  }],
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
}, { timestamps: true });

export default mongoose.models.Doc || mongoose.model('Doc', DocSchema);