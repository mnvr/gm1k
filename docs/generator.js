// Our custom generator needs to be defined in a separate file.
class Generator extends AudioWorkletProcessor {
    // It will be called with each 128 frames (per channel).
    process(_, outputs) {
        // It'll have one output (and since this is a generator, no inputs).
        const channels = outputs[0];

        // - The single output will have multiple channels, by default 2.
        // - Each channel is a Float32Array containing 128 samples.
        // - Each sample is in the range [-1, 1].

        for (const ch of channels) {
            for (let i = 0; i < ch.length; i++) {
                ch[i] = (2 * i) / ch.length - 1;
            }
        }

        // Return true to let the AudioContext know that we're still generating.
        return true;
    }
}

registerProcessor("1k-gen", Generator);
