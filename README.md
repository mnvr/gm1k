This repository contains two pieces of music using plain JS - *410*, and *Cycling
with Euclid*.

---

### 410 - Generative music in 410 bytes of Javascript

The prompt for day 14 of Genuary 2024 was to produce a generative piece that
uses less than 1K of source code. This one uses standard browser audio APIs to
produce a soundscape.

Live version is at https://mnvr.github.io/gm1k.

Source code for the demo is in [index.html](index.html) – it is a standalone,
410 character, HTML file. The song it plays is a remix of _Sierpinski Harmony_
by viznut (the creator of bytebeat).

See [x](x) for a longer version with more comments and explanations.

---

### Cycling with Euclid – A song in E(3, 8)

The prompt for day 31 of Genuary 2024 was to produce a generative piece of
music. I made a neverending song using only HTML/JS/CSS without using any
dependencies or libraries. While code size was not a concern, the resulting
files is just 250 lines too.

Live version is at https://mnvr.github.io/gm1k/e.

Source code is in [e/index.html](e/index.html) – a standalone HTML file (you can
just open it in your browser and play it directly too). The song it plays is a
composition using Euclidean rhythms. The bassline and the trill rhythms are
`E(3,8)` and `E(7, 8)`, around which totters around the main Euclidean rhythm
that cycles through `E(3,4)` to `E(11, 12)`.

I also wrote a tutorial about [Euclidean rhythms](https://mrmr.io/mj/euclid)
that explains the code behind the song.

---

Rest of my (visual) Genuary 2024 artworks are at
[mrmr.io/gen24](https://mrmr.io/gen24).
