import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import {generateRandomFileName} from "./utils.mjs"
const payload = {
    image: fs.createReadStream("./cat-statue.png"),
    prompt: "retro-inspired lounge with shaggy rugs, vintage stereo, mid-century furniture, using a color palette of teal, orange, brown, in a clean, minimalist illustration style --ar 9:16 --v 6.1",
    control_strength: 0.6,
    output_format: "webp",
};
console.log("🚀 ~ payload.prompt:", payload.prompt)

const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/control/structure`,
    axios.toFormData(payload, new FormData()),
    {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
            Authorization: `Bearer sk-2A5PJk5AzXXGuGZe7C2YxmDxOfGPlY5nmwjVBsxU8APxppWr`,
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