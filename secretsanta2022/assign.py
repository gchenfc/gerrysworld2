import numpy as np
import json

NAMES = [
    'Grandma',
    'Mom & Dad (optional)',
    'Fonda & Jim',
    'Gerry & Virginia (optional)',
    'Hanna & Keith (optional)',
]

def main():
    while True:
        perm = np.random.permutation(range(len(NAMES)))
        if not np.any(perm == range(len(NAMES))):
            break
    print(perm)
    data = {NAMES[i]: NAMES[perm[i]] for i in range(len(NAMES))}
    with open('assignments.json', 'w') as f:
        out = json.dumps(data)
        f.write(f"data = '{out}'")

if __name__ == '__main__':
    main()
