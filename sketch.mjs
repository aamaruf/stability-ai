import axios from "axios";
import FormData from "form-data";
import fs from "node:fs";
import { API_BASE_URL, API_KEY, generateRandomFileName } from "./utils.mjs";

const payload = {
    image: fs.createReadStream("./sketch3.jpeg"),
    prompt: "Convert this sketch into a realistic modern interior design with soft lighting, marble flooring.",
    control_strength: 0.8,
    output_format: "webp",
};
console.log("🚀 ~ payload.prompt:", payload.prompt)

const response = await axios.postForm(
    `${API_BASE_URL}/control/sketch`,
    axios.toFormData(payload, new FormData()),
    {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "image/*"
        },
    },
);

console.log("🚀 ~ response.status:", response.status)
if (response.status === 200) {
    const fileName = generateRandomFileName(payload.output_format)
    fs.writeFileSync('sketch3-to-reality-'+fileName, Buffer.from(response.data));
} else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
}