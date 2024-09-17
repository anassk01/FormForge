///frontend/src/app/pipes/format-time.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number | null, unit: 'ms' | 's' = 'ms'): string {
    if (value === null || isNaN(value)) {
      return '00:00';
    }

    let totalSeconds: number;
    if (unit === 'ms') {
      totalSeconds = Math.floor(value / 1000);
    } else {
      totalSeconds = Math.floor(value);
    }

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    let result = '';
    if (days > 0) result += `${days}d `;
    if (hours > 0 || days > 0) result += `${this.pad(hours)}:`;
    result += `${this.pad(minutes)}:${this.pad(seconds)}`;
    
    return result.trim();
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
}