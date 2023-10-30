---
title: "Custom ASIC"
description: "A small proof-of-concept custom silicon chip design fabbed through Tiny Tapeout."
status: 'completed'
displaydate: "Oct 29, 2023"
date: Oct 29, 2023

image: "https://github.com/gchenfc/Gerrys-Custom-ASIC-tt05/raw/main/screenshots/3d_view.png"
imageAltText: "Screenshot of the custom silicon chip"
---

I stumbled across [Tiny Tapeout](https://tinytapeout.com) this morning on Twitter and, after reading a little bit, thought creating/ordering a design would be a fun Sunday project :)  It only took 3 hours start-to-finish!

I'm excited to see how this turns out! I'll update this post with photos/videos when I get the chip in the mail in hopefully around a year. :)

Tiny Tapeout is like a group-buy for fabbing custom silicon chips.
My [design](https://github.com/gchenfc/Gerrys-Custom-ASIC-tt05) is one of 100 "tiles" that get fabbed on a 130nm process, so that way the cost of getting a chip fabbed can be shared among 100 people. A mux selects your design out of the 100 that exist on the chip (that is, some of the pins are used to select which "tile" is yours so you just run yours and the transistors for every else's designs are not logically active). If you're familiar with OSHpark, I interpret it as the OSHpark equivalent of custom silicon. For just $100 to get a chip in your hand that you designed (part of), I'd say this is very well worth the price for such a cool souvenir!

I mainly created this because I think it would be a cool keepsake, and I have some pre-existing [experience with Verilog](/projects/ece350) so I wanted to see how difficult this type of process for creating custom silicon would be in the future if I ever wanted to do something more serious (e.g. with eFabless.com, $10k for your own order of 100 chips).

This design simply displays several names on a 7-segment display. The names are hardcoded in the Verilog file, and the display cycles through them. It uses the template provided by Tiny Tapeout for automated "compiling", simulation, and testing through github actions, although the entire software pipeline is open source so it's easy to install on ubuntu.  As you can imagine, the logic is very simple so it doesn't take up the entire tile, but it's still a cool proof-of-concept. :)

<!-- Button that redirects to the link -->
<button style="max-width: 100px; width: 75%; margin: auto; display: block;" onclick="window.location.href = 'https://gds-viewer.tinytapeout.com/?model=https://gchenfc.github.io/Gerrys-Custom-ASIC-tt05/tinytapeout.gds.gltf';" markdown=1>
  [3D interactive viewer](https://gds-viewer.tinytapeout.com/?model=https://gchenfc.github.io/Gerrys-Custom-ASIC-tt05/tinytapeout.gds.gltf)
</button>

[![Screenshot of the custom silicon chip design](https://github.com/gchenfc/Gerrys-Custom-ASIC-tt05/raw/main/screenshots/3d_view.png)](https://gds-viewer.tinytapeout.com/?model=https://gchenfc.github.io/Gerrys-Custom-ASIC-tt05/tinytapeout.gds.gltf)
![Screenshot of the custom silicon chip design](https://github.com/gchenfc/Gerrys-Custom-ASIC-tt05/raw/main/screenshots/2d_view.png)
![The names/letters that will be displayed on the 7-segment display](https://github.com/gchenfc/Gerrys-Custom-ASIC-tt05/raw/main/screenshots/7segment_result.png){: width="50%" style="margin: auto;" }

<!-- low-res png is smaller filesize than svg -->
[![Auto-generated "Datasheet" for my tile](/blog/images/TinyTapeoutGerryDatasheet.png)](/blog/images/TinyTapeoutGerryDatasheet.pdf)
