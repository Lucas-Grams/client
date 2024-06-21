import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-principal',
  templateUrl: 'principal.component.html',
  styleUrls: ['principal.component.css']
})
export class PrincipalComponent implements OnInit {

  isLoading = false;
  option: number = 1;
  uuid?: string;

  constructor() { }

  ngOnInit(): void {

  }

}
