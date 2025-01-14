import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoundsModel } from './models/rounds-model';
import { DataService } from '../services/data.service';
import { RoundsComponent } from "./rounds/rounds.component";

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, RoundsComponent],
  imports: [RoundsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  rounds:RoundsModel[]=[];

  modify: RoundsModel |undefined=undefined;
  new: RoundsModel |undefined=undefined;

  constructor(private dataService: DataService){ }

  ngOnInit(){
    this.dataService.getRounds().subscribe({
      next: (data: RoundsModel[]) => {this.rounds = data;},

      error: (err) =>console.log(err)
    });
  }

  //NEW STUFF STILL UNALLOWED!

  newRound(){
    this.new={
      id:undefined,
      type:"", //teamName: ''
      caliber:1, //category: ''
      length:1, //memberCount: 2
      weight:1, //teamLeader: ''
      effective_range:1, //teamLeaderEmail: ''
      range:1, //teamLeaderBirthDate: ''
      velocity:1,
      felt_recoil:1,
      price:1
    };
  }

  saveNew(round:RoundsModel){
    this.dataService.addRound(round).subscribe({
      next: (data: RoundsModel) => {
        const index = this.rounds.findIndex((p) => p.id === data.id);
        this.rounds.push(data);
        this.new = undefined;
      },

      error: (err) => console.log(err)
    })
  }

  modifyRound(round:RoundsModel)
  {
    this.modify=JSON.parse(JSON.stringify(round));
  }

  saveModify(round:RoundsModel)
  {
    this.dataService.modifyRound(round).subscribe({
      next: (data: RoundsModel) => {
        const index = this.rounds.findIndex((p) => p.id === data.id);
        this.rounds[index] = data;
        this.modify = undefined;
      },

      error: (err) => console.log(err)
    })
  }

  deleteRound(round:RoundsModel){
    this.dataService.deleteRound(round).subscribe({
      next: (data: RoundsModel) => {
        const index = this.rounds.findIndex((p) => p.id === data.id);
        this.rounds.splice(index, 1);
        this.modify = undefined;
      },

      error: (err) => console.log(err)
    })
  }
}
