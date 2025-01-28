import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import {generateRandomFileName} from "./utils.mjs"
const payload = {
    image: fs.createReadStream("./cat-statue.png"),
    prompt: "visualize a modern luxury bathroom interior from a front-view perspective, features an elegant white marble sink, accompanied by a matte gold faucet, a wall-mounted toilet in a sleek white ceramic enhances the room's luxurious, include a large mirror with a gold filigree frame that reflects the opulent decor of the room, the floor and walls are finished in large, white and grey veined marble tiles, adding to the lavish aesthetic, soft LED lighting is integrated into the ceiling and behind the mirror, casting a warm, glowing light across the space, creating a serene and opulent atmosphere, ensure the image captures the interplay of warm artificial light and natural daylight, emphasizing the polished surfaces and elegant lines typical of a luxury bathroom design --ar 9:16 --style raw",
    control_strength: 0.6,
    output_format: "webp",
};
console.log("🚀 ~ payload:", payload)

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
    const fileName = generateRandomFileName('webp')
    fs.writeFileSync(fileName, Buffer.from(response.data));
} else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
}