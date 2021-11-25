import { Genre } from "./Genre";

export class Books {
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public image: string,
        public genre: Genre,
        public description: string,
    ) { }
}