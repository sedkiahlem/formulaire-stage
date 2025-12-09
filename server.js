const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// SERVIR LE FORMULAIRE HTML
app.use(express.static(__dirname));

// Connexion MongoDB (tu utiliseras Atlas ensuite)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

// ROUTE POST
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

