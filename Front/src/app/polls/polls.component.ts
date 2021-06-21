import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { MainService } from '../main.service';
import { interval, Subscription } from 'rxjs';


@Component({
    selector: 'app-polls',
    templateUrl: './polls.component.html',
    styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit{
  subscription: Subscription;
  polls = [];
  results = [];
  moment: any;
  startDate: any;
  endDate: any;
  pollsId: any;
  optionId: any;
  i: any;
  j: any;
  constructor(
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.getPolls();
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.opensnack());
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // tslint:disable-next-line:typedef
  getPolls() {

    this.mainService.getPolls().subscribe(res => {

      if (res.response === 'ok'){
        this.polls = res.polls;
        this.results = [];
        res.polls.forEach(row => {
          this.results.push(
            {
              results: row.results,
              voted: false
            }
          );
        });
        console.log(this.polls);
        console.log(this.results);
      }else{
        console.log('algum erro a tratar.');
      }
    },
    (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse);
    });
  }
  opensnack(): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.polls.length; i++) {
      this.moment = new Date();
      this.startDate = new Date(this.polls[i].start_date);
      this.endDate =  new Date(this.polls[i].end_date);

      if (this.moment.getTime() >= this.startDate.getTime() && this.moment.getTime() <= this.endDate.getTime()) {
        this.polls[i]['status'] = 'started';
      }else if (this.moment.getTime() < this.startDate.getTime()){
        this.polls[i]['status'] = 'not_started';
      }else if (this.moment.getTime() > this.endDate.getTime()){
        this.polls[i]['status'] = 'finished';
      }

    }
  }

  // tslint:disable-next-line:typedef
  selectOption(i, j, pollsId, optionId){

    this.pollsId = pollsId;
    this.optionId = optionId;
    this.i = i;
    this.j = j;
  }
  vote(){
    this.results[this.i].results[this.j].result += 1;
    this.results[this.i].voted = true;

    this.mainService.sendVote(this.pollsId , this.optionId).subscribe(res => {
      console.log(res);
      if (res.response === 'ok'){
        console.log('voto resgistrado');
      }else{
        console.log('algum erro a tratar.');
      }
    },
    (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse);
    });

  }
}

