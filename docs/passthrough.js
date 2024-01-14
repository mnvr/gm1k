// Our custom processor needs to be defined in a separate file.
//
// There seems to be a workaround here:
// https://github.com/WebAudio/web-audio-api-v2/issues/109#issuecomment-756634198

class PassthroughProcessor extends AudioWorkletProcessor {
    // This will be called with each 128 frames (per channel).
    process(inputs, outputs) {
        // This is all very generic, but usually we'll have one input and one
        // output. Each of the inputs / outputs will have multiple channels.
        const input = inputs[0];
        const output = outputs[0];

        // Each channel is a Float32Array containing 128 samples (currently a
        // fixed size, but future versions of WebAudio may make this
        // configurable too).
        //
        // Each sample is in the range [-1, 1]

        // Passthrough
        for (let c = 0; c < input.length; c++) {
            const ich = input[c];
            const och = output[c];
            for (let i = 0; i < ich.length; i++) {
                och[i] = ich[i];
            }
        }

        // Return true to let the AudioContext know that we're still running.
        return true;
    }
}

registerProcessor("passthrough", PassthroughProcessor);
