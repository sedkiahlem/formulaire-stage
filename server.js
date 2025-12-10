const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Servir les fichiers statiques
app.use(express.static(__dirname));

// Route pour afficher le formulaire
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});
require("dotenv").config();
// Mongoose
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

const DemandeSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  universite: String,
  specialite: String,
  sujet: String,
  date_demande: { type: Date, default: Date.now }
});
const Demande = mongoose.model("Demande", DemandeSchema);

// API POST
app.post("/api/demande", async (req, res) => {
  try {
    const demande = new Demande(req.body);
    await demande.save();
    res.json({ message: "Demande enregistrée !" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Serveur lancé")
);

