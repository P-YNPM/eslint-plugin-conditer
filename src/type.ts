import { Node } from 'estree';

type Ranges = Readonly<Node['range']>;

type Locs = Readonly<Node['loc']>;

export { Ranges, Locs };
