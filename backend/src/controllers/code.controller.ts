// code.controller.ts
import { Request, Response } from 'express';
import { AsyncParserService } from '../services/parser.service';
import { ParserError } from '../services/parser-types';
import { ParserConfig } from '../services/config';
import { DefaultFieldParser } from '../services/fieldParsers'; // Add this import

const defaultConfig: ParserConfig = {
  fieldTypes: [
    { name: 'TEXT', parser: DefaultFieldParser, validationRules: [] },
    { name: 'NUMBER', parser: DefaultFieldParser, validationRules: [] },
    { name: 'DATE', parser: DefaultFieldParser, validationRules: [] },
    { name: 'BOOLEAN', parser: DefaultFieldParser, validationRules: [] },
    { name: 'SCALE', parser: DefaultFieldParser, validationRules: [] },
  ]
};

export const interpretCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    console.log("Received code for interpretation:");
    console.log(code); // Log the entire input
    const parser = new AsyncParserService(code, defaultConfig);
    const parsedStructure = await parser.parse();
    console.log("Parsed structure:", JSON.stringify(parsedStructure, null, 2));
    res.json({ success: true, structure: parsedStructure });
  } catch (error: unknown) {
    console.error('Error interpreting code:', error);
    if (error instanceof ParserError) {
      res.status(400).json({
        success: false,
        error: error.message,
        line: error.line,
        column: error.column,
        stack: error.stack
      });
    } else if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message,
        stack: error.stack
      });
    } else {
      res.status(500).json({ success: false, error: 'Unknown error occurred' });
    }
  }
};