//src/app/services/form-generator.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {
  generateHtmlForm(code: string): string {
    const lines = code.split('\n');
    let html = '<form>';
    
    for (const line of lines) {
      const [type, name, ...rest] = line.split(' ');
      switch (type) {
        case 'TEXT':
          html += `<div><label for="${name}">${rest.join(' ')}</label><input type="text" id="${name}" name="${name}"></div>`;
          break;
        case 'NUMBER':
          html += `<div><label for="${name}">${rest.join(' ')}</label><input type="number" id="${name}" name="${name}"></div>`;
          break;
        case 'DATE':
          html += `<div><label for="${name}">${rest.join(' ')}</label><input type="date" id="${name}" name="${name}"></div>`;
          break;
        // Add more cases for other field types
      }
    }
    
    html += '</form>';
    return html;
  }

  exportAsJson(code: string): string {
    const lines = code.split('\n');
    const jsonObj: any = {};
    
    for (const line of lines) {
      const [type, name, ...rest] = line.split(' ');
      jsonObj[name] = { type, description: rest.join(' ') };
    }
    
    return JSON.stringify(jsonObj, null, 2);
  }

  exportAsCsv(code: string): string {
    const lines = code.split('\n');
    let csv = 'Field Name,Type,Description\n';
    
    for (const line of lines) {
      const [type, name, ...rest] = line.split(' ');
      csv += `"${name}","${type}","${rest.join(' ')}"\n`;
    }
    
    return csv;
  }
}