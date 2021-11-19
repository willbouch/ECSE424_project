import { injectable } from 'inversify';
let SummarizerManager = require("node-summarizer").SummarizerManager;

@injectable()
export class ReadinessService {
    constructor() { }

    public getReadiness(text: string, length: number): any {
        let Summarizer = new SummarizerManager(text, length); 
        return { message: Summarizer.getSummaryByFrequency().summary };
    }
}