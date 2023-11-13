---
title: "Square-1: A Theoretical Perspective"
description: "My journey and technique for solving the Square-1 puzzle from scratch, with no prior knowledge of the puzzle."
status: 'completed'
displaydate: "Nov 12, 2023"
date: Nov 12, 2023

image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Square-1_half-turn.jpg/440px-Square-1_half-turn.jpg"
imageAltText: "The Square-1 puzzle was sold in this shape with instructions for turning it back to a cube. This is halfway through a vertical turn."
---

{% collapsible Table of Contents --expanded %}

- [Preface](#preface)
- [Preliminaries](#preliminaries)
- [Notation](#notation)
- [The strategy](#the-strategy)
  - [Step 1: Solve one half of one face](#step-1-solve-one-half-of-one-face)

{% endcollapsible %}

{% collapsible Preface %}

Something like 10 years ago, my mom got be one of these Square-1 Rubik's cube style puzzles.  At that time, I was already pretty proficient at the standard 3x3 (and some simple variants like 2x2, 4x4, 5x5, pyramid, void) Rubik's cube, but after just a couple minutes, I soon realized I was in way over my head and I completely gave up for many years.

Last Christmas, I just randomly picked it up again for a few minutes and realized that actually it wasn't as bad as I thought all those years ago; seems my logical thinking skills have improved.  I gave it a go for 30 minutes or so and made some progress but was still a little ways off from solving it.

Yesterday, visiting home, I picked it up again and, suddenly started feeling inspired, decided to try to solve it for real this time.

This is a writeup of my journey and technique for solving the Square-1 puzzle from scratch, with no prior knowledge of the puzzle.

{% endcollapsible %}

{% collapsible Preliminaries %}

Although initially intimidating, the Square One is actually just composed of 2-faces each with 4-skinny ("edges") and 4-fat ("corners") slices.  This is because
1. Independence: the middle row pieces are not congruent with any of the top/bottom face pieces,
2. Middle Row Permutation: there is are only 2 pieces in the middle row so we don't have to worry about the permutation of the middle row, and
3. Middle Row Orientation: the orientation of the pieces is easy to flip-flop if we need to at the end with `/(6,0)/(6,0)/` (see notation section below).

Therefore, we can ignore the middle row and just worry about solving the top and bottom faces.  Note that pieces can be moved between the 2 faces (they are not independent of each other).

Then the possible non-redundant moves can be enumerated as:
* rotate the top face
* rotate the bottom face
* rotate the right-half by 180° (not always possible)

Finally, I will mention that I required some computer assistance (which I coded) for one part which you'll see when it comes up.  I guess if you're trying to learn to solve the Square-1 for real, it's best to refer to another guide for the most efficient algorithms anyway :)

{% endcollapsible %}

{% collapsible Notation %}

When I initially started working this out myself, I used some custom notations, but in the interest of making this more accessible to others, I learned the standard notations just for you ;).   I tried to change everything to standard notation, but let me know if I missed anywhere.  Here's the standard Square-1 notation:

* **(2, -1)** means turn the top layer 2-increments (60°) clockwise and the bottom layer 1-increment (30°) counterclockwise
* **/** (slash) means turn the right-half of the cube 180° ("slice" move)

So, for example, try the middle-row-orientation swap:

```/(6,0)/(6,0)/```

which means slice, turn the top face 180°, slice, turn the top face 180°, slice.

After executing, the cube should look exactly the same except the middle row looks wonky (but this doesn't change anything about the allowable moves).

{% endcollapsible %}

{% collapsible The strategy --expanded %}

This is by no means optimal, but it's what I came up with because I felt it would be easiest.  Also, it very likely already exists, but I haven't checked yet because I don't want to spoil the fun.

My strategy ("Gerry's strategy") is as follows:

1. Solve one half of one face (4 pieces in the correct location)
2. Make the topology correct for all pieces (12 pieces need to have the correct big-small-big-small pattern), i.e. make the puzzle into a cube
3. Permute edges
4. Permute corners
5. Fix parity

The reason I chose this strategy is because permuting corners and edges is "easy" once we have the correct topology (we don't have to worry about mis-sized pieces making certain moves impossible).  It kind of feels similar to a 3x3 once it's a cube shape.  The reason to permute before corners is because I think it's natural to align edges with corners like in Friedrich's method for 3x3 before placing the edge-corner pairs.

One major downside with this strategy is that we won't know about parity issues until basically the very end, at which point we'll need to re-do almost the entire puzzle to fix the parity, but it works and I'm not trying to win any races here.

  {% collapsible Step 1: Solve one half of one face %}

    The objective of this step is to get 4 pieces in the correct locations.  I like to put the bottom-left face in the correct location first since that's the hardest to see, so during the rest of the solve we'll have visibility of what we care about.  So holding the cube with the red face facing you and the white face up, that would be the 4 green pieces on the bottom-left side (GRB corner, GB edge, GBO corner, GO edge).

    This step is rather straightforward to complete using intuition so I won't really go into detail.  If you're having trouble, just keep playing around with the Square-1 to gather some intuition as to how it works.

    Generally, though, I assemble the 4-piece chunk on the top face one piece at a time.  I prep a piece in the bottom at either the bottom-front edge location or the bottom-right-back corner location, place the completed-so-far chunk on the top-left, then slice to add the piece to the chunk.  Then once the chunk is complete, I move it to the bottom-left with a `(6,0)/(0,6)`.

  {% endcollapsible %}

  {% collapsible Step 2: Cubify the Puzzle %}

    This part is by far the hardest part of the puzzle IMHO.  The trouble is that, in the scrambled state, edges might be next to other edges and corners might be next to other corners, but we need each face to look like edge-corner-edge-corner-edge-corner-edge-corner.

    Because slices are not always possible (if a corner is straddling the slice plane), I couldn't think of any obvious "commutation"-style algorithms to fix the edge-corner topology.  Instead, I just started writing out the permutations and transformations by hand on paper and eventually came up with enough of a procedure to code it up in python.

    In this step, we won't touch the bottom-left completed portion at all, so we only need to worry about top-face and slice moves.

    The idea is that there are always 3 half-faces that we can manipulate: one on the bottom-right and two making up the top row.  Let us notate these using 0 for edge and 1 for corner (since edges are skinnier than corners) and numbering them clock-wise.  So, for example, when the cube is solved, the 3 half-faces are 0101,0101,0101.

    Note that there are not that many possible half-faces (since they must add up to exactly 180°):
    * 000000,
    * 00001, 00010, 00100, 01000, 10000,
    * 0011, 0101, 0110, 1001, 1010, 1100,
    * 111

    There are 2 allowable operations that we can perform on the 3 half-faces:

       * rotate the top row (concatenate the 2 half-faces on the top face and barrel-rotate them)
       * slice (switch which 2 half-faces are on the top-face)

    So, for example, if we start in the solved configuration, here's an example sequence:
    ```
    start     : 0101,0101,0101
    choose top: 01010101, 0101
    rotate top: 10101010, 0101
    slice     : 1010,0101,1010
    choose top: 10100101, 1010
    rotate top: 10010110, 1010
    slice     : 1001,1010,0110
    ```


  {% endcollapsible %}

  {% collapsible Step 3: Permute Edges %}
  aoeu
  {% endcollapsible %}

  {% collapsible Step 4: Permute Corners %}
  aoeu
  {% endcollapsible %}

  {% collapsible Step 5: Fix Parity %}
  aoeu
  {% endcollapsible %}

{% endcollapsible %}

