---
title: "Permutation Solver"

image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Square-1_half-turn.jpg/440px-Square-1_half-turn.jpg"
imageAltText: "The Square-1 puzzle was sold in this shape with instructions for turning it back to a cube. This is halfway through a vertical turn."
---

# Intro
Please refer to [Square-1: A Theoretical Perspective, Step 2: Cubify the Puzzle](./#step-2:-cubify-the-puzzle) for how to decode this into moves.

This solver helps put edges/corners in the right pattern to make the puzzle into the correct cube shape.

Powered by [PyScript](https://pyscript.net/)!!!

# Solver

<link rel="stylesheet" href="https://pyscript.net/releases/2023.11.1/core.css" />
<script type="module" src="https://pyscript.net/releases/2023.11.1/core.js"></script>

<py-config>
    [[fetch]]
    files = ['topology.py']
</py-config>

<!-- <script type="py" terminal>print("hello world")</script> -->

<div style="border: 3px solid magenta; padding: 5px 10px; border-style: outset;">
<label for="input1">Top Face:</label>
<input id="input1" type="text" value="01100110">
<label for="input2">Bottom-right half-face:</label>
<input id="input2" type="text" value="0101">
<button id="enterButton">Solve</button>

<div>
Procedure:
<pre style="font-family: monospace; margin-left: 8px;">Top      Bot    (3 half-faces split)</pre>
<pre id="output" style="font-family: monospace; margin-left: 8px;">Loading...</pre>
</div>
</div>

<py-script>
    from js import document
    from pyodide.ffi import create_proxy
    from topology import State, IntermediateState
    import topology

    print("Constructing graph...")
    graph = topology.construct_graph()
    print("Done constructing graph.")

    def process_inputs(event):
        try:
            input1_value = document.getElementById('input1').value
            input2_value = document.getElementById('input2').value
            print(f"Got: Input 1: {input1_value}, Input 2: {input2_value}")
            intermediate_state = IntermediateState(input1_value, input2_value)
            result = topology.query_configuration(graph, intermediate_state)
            document.getElementById('output').innerText = topology.path2str(result)
        except Exception as e:
            document.getElementById('output').innerText = f"Error: {e}"

    document.getElementById('output').innerText = "Ready :)"

    proxy = create_proxy(process_inputs)
    document.getElementById('enterButton').addEventListener('click', proxy)
    proxy(None)  # Run once to initialize

</py-script>

# Usage (Brief Summary)

0 = edge, 1 = corner

Read the top-face clockwise and type it into the first text box.  Read the bottom-right half-face clockwise and type it into the second text box.  Click "Solve".

The resulting solution is expressed as a sequence of configurations.  Here's how to read an example one:
```
Top      Bot    (3 half-faces split)
11001100-0101	(0101-1100-1100)            split the top-face into 1100,1100 to move 1100 to the bottom
11100010-1100	(00010-1100-111)            split the top-face into 00010,111 to move 00010 to the bottom
1111001-00010	(00010-1001-111)            split the top-face into 1001,111 to move ??? to the bottom
```
In my head, I think about:
1. First figure out where I'm supposed to split the top-face by using the right column
2. Next figure out which of the 2 half-faces I'm supposed to move to the bottom by using the left column of the *next* row
3. Execute the slice move
4. Double check that my top matches the left-column of the next row
5. Repeat
