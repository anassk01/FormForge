import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-result-display',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule],
  template: `
    @if (result) {
      <h2>Analysis Result:</h2>
      <mat-expansion-panel class="entry-panel" [expanded]="true">
        <mat-expansion-panel-header>
          <mat-panel-title>Entry Name: {{ result.entryName }}</mat-panel-title>
        </mat-expansion-panel-header>
        @for (field of result.fields; track field.name) {
          <mat-expansion-panel class="field-panel" [expanded]="expandedFields().has(field.name)" (opened)="expandField(field.name)" (closed)="collapseField(field.name)">
            <mat-expansion-panel-header>
              <mat-panel-title>{{ field.name }} ({{ field.type }})</mat-panel-title>
            </mat-expansion-panel-header>
            <div class="field-details">
              <p><strong>Description:</strong> {{ field.description }}</p>
              <p><strong>Required:</strong> {{ field.required ? 'Yes' : 'No' }}</p>
              @if (hasOptions(field)) {
                <div class="options">
                  <h4>Options:</h4>
                  <ul>
                    @for (option of getOptionEntries(field.options); track option[0]) {
                      <li>
                        <strong>{{ formatOptionName(option[0]) }}:</strong>
                        @switch (option[0]) {
                          @case ('range') {
                            Min: {{ option[1].min }}, Max: {{ option[1].max }}
                          }
                          @case ('columns') {
                            <ul class="column-list">
                              @for (column of option[1]; track column.name) {
                                <li>
                                  <strong>{{ column.name }} ({{ column.type }})</strong>
                                  <p>Description: {{ column.description }}</p>
                                  <p>Required: {{ column.required ? 'Yes' : 'No' }}</p>
                                  @if (hasOptions(column)) {
                                    <div class="nested-options">
                                      <h6>Column Options:</h6>
                                      <ul>
                                        @for (colOption of getOptionEntries(column.options); track colOption[0]) {
                                          <li>
                                            <strong>{{ formatOptionName(colOption[0]) }}:</strong>
                                            @if (isObject(colOption[1])) {
                                              {{ formatObject(colOption[1]) }}
                                            } @else {
                                              {{ colOption[1] }}
                                            }
                                          </li>
                                        }
                                      </ul>
                                    </div>
                                  }
                                </li>
                              }
                            </ul>
                          }
                          @case ('laps') {
                            {{ option[1] }}
                          }
                          @case ('workDuration') {
                            {{ formatDuration(option[1]) }}
                          }
                          @case ('breakDuration') {
                            {{ formatDuration(option[1]) }}
                          }
                          @case ('sessions') {
                            {{ option[1] }}
                          }
                          @case ('longBreakDuration') {
                            {{ formatDuration(option[1]) }}
                          }
                          @case ('longBreakInterval') {
                            {{ option[1] }}
                          }
                          @default {
                            @if (isObject(option[1])) {
                              {{ formatObject(option[1]) }}
                            } @else {
                              {{ option[1] }}
                            }
                          }
                        }
                      </li>
                    }
                  </ul>
                </div>
              }
              @if (field.type === 'STOPWATCH') {
                <div class="stopwatch-info">
                  <h5>Stopwatch Configuration:</h5>
                  <p>Laps: {{ field.options.laps || 'Not specified' }}</p>
                </div>
              }
              @if (field.type === 'TIMER') {
                <div class="timer-info">
                  <h5>Timer Configuration:</h5>
                  <p>Work Duration: {{ formatDuration(field.options.workDuration) }}</p>
                  <p>Break Duration: {{ formatDuration(field.options.breakDuration) }}</p>
                  <p>Sessions: {{ field.options.sessions }}</p>
                  @if (field.options.longBreakDuration) {
                    <p>Long Break Duration: {{ formatDuration(field.options.longBreakDuration) }}</p>
                  }
                  @if (field.options.longBreakInterval) {
                    <p>Long Break Interval: Every {{ field.options.longBreakInterval }} sessions</p>
                  }
                </div>
              }
            </div>
          </mat-expansion-panel>
        }
      </mat-expansion-panel>
    }
  `,
  styleUrls: ['./result-display.component.scss']
})
export class ResultDisplayComponent {
  @Input() result: any = null;
  expandedFields = signal<Set<string>>(new Set());

  hasOptions(field: any): boolean {
    return field.options && Object.keys(field.options).length > 0;
  }

  getOptionEntries(options: Record<string, any>): [string, any][] {
    return Object.entries(options);
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  formatObject(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  formatOptionName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  expandField(fieldName: string): void {
    this.expandedFields().add(fieldName);
  }

  collapseField(fieldName: string): void {
    this.expandedFields().delete(fieldName);
  }

  formatDuration(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }
}