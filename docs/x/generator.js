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
                // Convert the output of gen into a number between 0 - 1
                //
                // This decimates the original sound a bit, but for now it is
                // more important to not accidentally produce very loud noises.
                const z = (this.gen3(t) % 256) / 256;
                // Then map it to [-1, 1]. But that's too loud, esp on Safari.
                // So multiply it by 0.02. Maybe too low, but we don't want to
                // blow up in someone's earphones.
                ch[i] = (2 * z - 1) * 0.003;
                t++;
            }
        }
        this.t = t;

        // Return true to let the AudioContext know that we're still generating.
        return true;
    }

    // The original Bytebeat
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

    // Rest of these are alternative bytebeats, taken from
    // From https://dollchan.net/bytebeat

    // The 42 melody, with decay (by Zackx)
    //
    // The original 42 melody is t*(42&t>>10)
    gen2(t) {
        return (((t * (42 & (t >> 10))) % 256) * (-t & 2047)) / 2e3;
    }

    // Long Sierpinski Harmony (by viznut)
    gen3(t) {
        return ((5 * t) & (t >> 7)) | ((3 * t) & (t >> 10));
    }

    // Lost in Space (by xpansive)
    gen4(t) {
        return (
            ((t * ((t >> 8) | (t >> 9))) & 46 & (t >> 8)) ^
            ((t & (t >> 13)) | (t >> 6))
        );
    }

    // Untitled by tejeez
    gen5(t) {
        return (t * ((t >> 5) | (t >> 8))) >> (t >> 16);
    }

    // generic 3/4 buildup (by yumeji)
    gen6(t) {
        return t & 598 ? t >> 4 : t >> 10;
    }

    // High rhythm thing
    gen7(t) {
        return (t >> (((t >> 13) * t) / 127)) | (t >> 4);
    }
}

registerProcessor("1k-gen", Generator);
