from dataclasses import dataclass

Word = str

@dataclass
class State:
    words: tuple[Word]
    def __str__(self) -> str:
        return '/'.join(sorted(self.words))
    def permutations(self) -> set["IntermediateState"]:
        return set([IntermediateState(Word(self.words[0] + self.words[1]), self.words[2]),
                    IntermediateState(Word(self.words[1] + self.words[2]), self.words[0]),
                    IntermediateState(Word(self.words[0] + self.words[2]), self.words[1])])
    def __eq__(self, __value: object) -> bool:
        return sorted(self.words) == sorted(__value.words)
    def __hash__(self):
        return hash(self.words)

def rotate(word, amt):
    return word[amt:] + word[:amt]
def circular_equal(s1, s2):
    if len(s1) != len(s2):
        return False
    return any((s1 == rotate(s2, i) for i in range(len(s2))))
def is_valid_word(word):
    return word.count('0') + 2 * word.count('1') == 6

@dataclass
class IntermediateState:
    top: Word
    bottom: Word
    def __str__(self) -> str:
        return f'{self.top}/{self.bottom}'
    def __eq__(self, other):
        return circular_equal(self.top, other.top) and self.bottom == other.bottom
    def __hash__(self):
        return hash((self.top, self.bottom))
    def permutations(self):
        ret = set()
        for i in range(8):
            t = rotate(self.top, i)
            for l in range(3, 7):
                s = State((t[:l], t[l:], self.bottom))
                if is_valid_word(s.words[0]) and is_valid_word(s.words[1]):
                    ret.add(s)
        return ret
    
def construct_graph():
    ## Construct bipartite graph
    nodesA = {}
    nodesB = {}
    edges = set()
    new_nodes = {'': State(['0101', '0101', '0101'])}
    for depth in range(999):
        next_new_nodes = {}
        for label, node in new_nodes.items():
            if node in nodesA.values():
                continue
            # nodesA[label] = node
            for i, perm in enumerate(node.permutations()):
                if perm in nodesB.values():
                    for k, v in nodesB.items():
                        if v == perm:
                            if k.count('_') < label.count('_'):
                                raise Exception('Found a parity loop! yay!')
                    continue
                nodesB[f'{label}_{i}'] = perm
                edges.add((label, f'{label}_{i}'))
                for j, node_a in enumerate(perm.permutations()):
                    if node_a in nodesA.values():
                        raise Exception('Found a parity loop! yay!')
                    if node_a in nodesA.values() or node_a in new_nodes.values():
                        continue
                    if node_a in next_new_nodes.values():
                        child_node = [k for k, v in next_new_nodes.items() if v == node_a][0]
                    else:
                        child_node = f'{label}_{i}-{j}'
                        next_new_nodes[child_node] = node_a
                    edges.add((child_node, f'{label}_{i}'))
        for label, node in new_nodes.items():
            if node not in nodesA.values():
                nodesA[label] = node
        new_nodes = {k:v for k, v in next_new_nodes.items()}
        if not new_nodes:
            break
    for label, node in new_nodes.items():
        if node in nodesA.values():
            continue
        nodesA[label] = node

    print(nodesA)
    print(nodesB)
    print(edges)
    return nodesA, nodesB, edges

def query_configuration(graph, config: IntermediateState, max_depth=999):
    """
    Searches through the tree/graph for the given configuration.
    graph: (nodesA, nodesB, edges)
    config: IntermediateState (Top-face, bottom half-face)
    """

    nodesA, nodesB, edges = graph
    for label, node in nodesB.items():
        if node == config:
            print("found:", label, node)
            break
    else:
        raise Exception('Not found')
    path = []
    for _ in range(max_depth):
        path.append(node)
        print(node, label)
        if label == '':
            print("Done")
            break
        for a, b in edges:
            if a == label and len(a) > len(b):
                label, node = b, nodesB[b]
                break
            if b == label and len(b) > len(a):
                label, node = a, nodesA[a]
                break
        else:
            raise Exception('No more edges')
    return path

def path2str(path):
    # return '\n'.join([f'{node}' for i, node in enumerate(path)]).replace('/', '-')
    ret = ''
    for node in path:
        if isinstance(node, State):
            ret += f'({node})\n'
        else:
            ret += f'{node}\t'
    return ret.replace('/', '-')
