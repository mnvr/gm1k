// Our custom generator needs to be defined in a separate file.
class Generator extends AudioWorkletProcessor {
    // Keep track of time
    t = 0;

    // It will be called with each 128 frames (per channel).
    process(_, outputs) {
        // It'll have one output (and since this is a generator, no inputs).
        const channels = outputs[0];

        // - The single output will have multiple channels, by default 2.
        // - Each channel is a Float32Array containing 128 samples.
        // - Each sample is in the range [-1, 1].

        let t = this.t;
        for (const ch of channels) {
            t = this.t;
            for (let i = 0; i < ch.length; i++) {
                ch[i] = 2 * (this.gen(t) / 256) - 1;
                t++;
            }
        }
        this.t = t;

        // Return true to let the AudioContext know that we're still generating.
        return true;
    }

    // Bytebeat generator
    //
    // Input is the time t, a monotonically increasing integral value.
    // Outputs should be a value betwen 0 and 256.
    gen(t) {
        // From http://viznut.fi/demos/unix/bytebeat_formulas.txt
        //
        // This is the "original" bytebeat formulation that viznut discovered.
        // http://countercomplex.blogspot.com/2011/10/algorithmic-symphonies-from-one-line-of.html
        // Kiitos!
        return t * (((t >> 12) | (t >> 8)) & (63 & (t >> 4)));
    }
}

registerProcessor("1k-gen", Generator);
