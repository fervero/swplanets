import { Planet } from './planet';
export interface StarWarsJSON {
	count: number,
	next: string,
	previous: string,
	results: Array<Planet>
}
