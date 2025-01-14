import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoundsModel } from '../models/rounds-model';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './rounds.component.html',
  styleUrl: './rounds.component.css'
})
export class RoundsComponent {
  @Input() model: RoundsModel | undefined = undefined;
  @Output() saved = new EventEmitter<RoundsModel>();

  getValue(event: any): string {
    return event.target.value;
  }

  getNumberValue(event: any): number {
    return Number(event.target.value);
  }

  save() {
    this.saved.emit(this.model);
  }
}
