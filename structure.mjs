import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { API_BASE_URL, API_KEY, generateRandomFileName } from "./utils.mjs";
const payload = {
    image: fs.createReadStream("./cat-statue.png"),
    prompt: "enter a digital canvas blending oil paint with surreal resin, pulsating with neon hues and mystical illumination, a colossal crescent moon melts into the river, leaving a luminous yellow trail, fishing boats glide under the moon's glow, while pink blossoms shower the water, the star-studded sky completes this surreal scene, reminiscent of leonid afremov's vibrant strokes ",
    control_strength: 0.6,
    output_format: "webp",
};
console.log("🚀 ~ payload.prompt:", payload.prompt)

const response = await axios.postForm(
    `${API_BASE_URL}/control/structure`,
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

if (response.status === 200) {
    const fileName = generateRandomFileName(payload.output_format)
    fs.writeFileSync(fileName, Buffer.from(response.data));
} else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
}