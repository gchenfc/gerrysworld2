import numpy as np

NAMES = [
    'Grandma',
    'Mom & Dad',
    'Fonda (Jim)',
    'Gerry (Virginia)',
    'Hanna (Keith)',
]

def main():
    while True:
        perm = np.random.permutation(range(len(NAMES)))
        if not np.any(perm == range(len(NAMES))):
            break
    print(perm)
    out = ''
    for i in range(len(NAMES)):
        out += '"{:}": "{:}",'.format(NAMES[i], NAMES[perm[i]])
    out = out[:-1] # remove trailing comma
    out = "data = '{{{:}}}';".format(out)
    print(out)
    with open('assignments.json', 'w') as f:
        f.write(out)

if __name__ == '__main__':
    main()
