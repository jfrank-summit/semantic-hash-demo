import seedrandom from 'seedrandom';

type Vector = number[];
type Hyperplane = Vector;
type Bucket = Vector[];
type Buckets = Map<string, Bucket>;

const random = seedrandom('subspace');

// Generate a random vector to represent a hyperplane
const generateRandomVector = (dimensions: number): Vector =>
    Array.from({ length: dimensions }, () => random() - 0.5);

// Generate multiple hyperplanes for hashing
const generateRandomHyperplanes = (
    numHashes: number,
    dimensions: number
): Hyperplane[] =>
    Array.from({ length: numHashes }, () => generateRandomVector(dimensions));

// Compute the hash for a point given a set of hyperplanes
const computeHash = (point: Vector, hyperplanes: Hyperplane[]): string =>
    hyperplanes
        .map((hyperplane) =>
            point.reduce((acc, val, idx) => acc + val * hyperplane[idx], 0) >= 0
                ? '1'
                : '0'
        )
        .join('');

// Add a point to the appropriate bucket
const addPoint = (
    point: Vector,
    hyperplanes: Hyperplane[],
    buckets: Buckets
): Buckets => {
    const hash = computeHash(point, hyperplanes);
    console.log(`hash: ${hash}`);
    const updatedBucket = buckets.get(hash)
        ? [...buckets.get(hash)!, point]
        : [point];
    return new Map(buckets).set(hash, updatedBucket);
};

// Query for points in the same bucket as the given point
const query = (
    point: Vector,
    hyperplanes: Hyperplane[],
    buckets: Buckets
): Bucket => buckets.get(computeHash(point, hyperplanes)) || [];

export const lsh = (dimensions: number, numHashes: number) => {
    const hyperplanes = generateRandomHyperplanes(numHashes, dimensions);
    let buckets: Buckets = new Map();
    return {
        addPoint: (point: Vector) => {
            buckets = addPoint(point, hyperplanes, buckets);
        },
        query: (queryPoint: Vector) => {
            return query(queryPoint, hyperplanes, buckets);
        },
        getBuckets: () => buckets,
    };
};
