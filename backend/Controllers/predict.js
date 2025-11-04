

const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
const path = require('path');
const Account = require("../models/Account");
const dotenv = require('dotenv');

//const Transaction = require("../models/Transaction"); // Assuming Mongoose model
const TransactionDetails = require("../models/TransactionDetails");

dotenv.config();
// process.env.GOOGLE_APPLICATION_CREDENTIALS= path.join(__dirname, "../secret/frauddetectionss.json"); // Ensure this path is correct

process.env.GOOGLE_APPLICATION_CREDENTIALS="/frauddetectionss.json"
async function getAccessToken() {
    try {
        const auth = new GoogleAuth({
            scopes: ["https://www.googleapis.com/auth/cloud-platform"]
        });
        const client = await auth.getClient();
        const tokenResponse = await client.getAccessToken();

        const token = typeof tokenResponse === "string"
            ? tokenResponse
            : tokenResponse?.token;

        if (!token) throw new Error("Access token not received");

        console.log("✅ Access Token obtained.");
        return token;
    } catch (error) {
        console.error("❌ Error obtaining access token:", error);
        return null;
    }
}

const dummy_data = true;
 
const prediction = async (req, res) => {
    try {
         const userId = req.body.userId;
        //  const user = await User.findById(userId);
       
        let is_fraud = 0;
        let confidence = { "0": 0.95, "1": 0.05 };
        let prediction_source = "dummy";

        if (!dummy_data) {
            const accessToken = await getAccessToken();

           const input = { ...req.body };
           input.amt = (input.amt ?? '').toString();
           input.zip = (input.zip ?? '').toString();
           input.city_pop = (input.city_pop ?? '').toString();
           input.unix_time = (input.unix_time ?? '').toString();
           input.lat = (input.lat ?? '').toString();
           input.long = (input.long ?? '').toString();
           input.merch_lat = (input.merch_lat ?? '').toString();
           input.merch_long = (input.merch_long ?? '').toString();

            const inputData = { instances: [input] };
            // console.log("Input Data:", JSON.stringify(inputData, null, 2));
            // console.log("Input Data:", inputData);
            const response = await axios.post(
                `https://us-central1-aiplatform.googleapis.com/v1/projects/498542289749/locations/us-central1/endpoints/${process.env. ENDPOINT_ID}:predict`,
                inputData,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const predictionOutput = response.data?.predictions?.[0];

            if (!predictionOutput || !predictionOutput.scores || !predictionOutput.classes) {
                return res.status(500).json({ error: "Prediction format is invalid." });
            }

            const scoresMap = {};
            predictionOutput.classes.forEach((label, idx) => {
                scoresMap[label] = predictionOutput.scores[idx];
            });

            is_fraud = scoresMap["1"] > 0.9 ? 1 : 0;
            confidence = {
                "0": (scoresMap["0"]),
                "1": (scoresMap["1"])
            };
            prediction_source = "vertex-ai";
        }

        const transactionToStore = {
            ...req.body,
            is_fraud,
            confidence,
            prediction_source,
            trans_date_trans_time: new Date(req.body.trans_date_trans_time)
        };

        const saved = await TransactionDetails.create(transactionToStore);

        res.json({
            is_fraud,
            confidence,
            stored_id: saved._id,
            message: dummy_data ? "Dummy data used for testing ( GCP credits are over)." : "Predicted and stored."
        });

       
    } catch (error) {
    if (error.response) {
        console.error("❌ Vertex AI error response:", error.response.data);
    }
    console.error("❌ Error in prediction:", error.message);
    res.status(500).json({ error: "An error occurred during prediction." });
}
};

module.exports = prediction;
